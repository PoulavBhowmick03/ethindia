import React, { useEffect, useState } from 'react';
import { createLightNode, waitForRemotePeer, Protocols } from '@waku/sdk';
import protobuf from 'protobufjs';
import 'tailwindcss/tailwind.css';
import Sidebar from './sidebar';

import {
  generateSymmetricKey,
  createEncoder as createSymmetricEncoder,
  createDecoder as createSymmetricDecoder,
} from '@waku/message-encryption/symmetric';

const ChatMessage = new protobuf.Type('ChatMessage')
  .add(new protobuf.Field('timestamp', 1, 'uint64'))
  .add(new protobuf.Field('sender', 2, 'string'))
  .add(new protobuf.Field('message', 3, 'string'));

const contentTopic = '/chat/1';
const symmetricKey: Uint8Array = generateSymmetricKey();
const encoder = createSymmetricEncoder({ contentTopic, symKey: symmetricKey });
const decoder = createSymmetricDecoder(contentTopic, symmetricKey);

const CommunityForum: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [messageInput, setMessageInput] = useState<string>('');
  const [node, setNode] = useState<any>(null);

  useEffect(() => {
    async function initWaku() {
      try {
        const wakuNode = await createLightNode({ defaultBootstrap: true });
        await wakuNode.start();
        await waitForRemotePeer(wakuNode, [Protocols.LightPush, Protocols.Filter]);

        const callback = (wakuMessage: any) => {
          if (wakuMessage.payload) {
            const messageObj = ChatMessage.decode(wakuMessage.payload);
            setMessages((prevMessages) => [...prevMessages, messageObj]);
          }
        };

        const subscription = await wakuNode.filter.createSubscription();
        await subscription.subscribe([decoder], callback);

        // Load historical messages from the store
        await loadHistoricalMessages(wakuNode);

        setNode(wakuNode);
      } catch (error) {
        console.error('Error initializing Waku:', error);
      }
    }

    async function loadHistoricalMessages(wakuNode: any) {
      const historicalDecoder = createSymmetricDecoder(contentTopic, symmetricKey);

      const historicalCallback = (wakuMessage: any) => {
        if (wakuMessage.payload) {
          const messageObj = ChatMessage.decode(wakuMessage.payload);
          setMessages((prevMessages) => [...prevMessages, messageObj]);
        }
      };

      await wakuNode.store.queryWithOrderedCallback([historicalDecoder], historicalCallback);
    }

    initWaku();

    return () => {
      if (node) {
        if (node.filter && typeof node.filter.stop === 'function') {
          node.filter.stop();
        }
        node.stop();
      }
    };
  }, [decoder, node]);

  const sendMessage = async () => {
    if (node && messageInput.trim() !== '') {
      const protoMessage = ChatMessage.create({
        timestamp: Date.now(),
        sender: 'You',
        message: messageInput.trim(),
      });

      const serialisedMessage = ChatMessage.encode(protoMessage).finish();

      console.log('Original message:', messageInput.trim());
      console.log('Encrypted message (before sending):', serialisedMessage);

      await node.lightPush.send(encoder, {
        payload: serialisedMessage,
      });

      setMessageInput('');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
        <div className="mb-4">
          <h1 className="text-2xl font-semibold">Community Forum</h1>
          <p className="text-gray-500">Discuss and connect with your local community</p>
        </div>

        <div className="border rounded-lg overflow-y-auto h-64 p-4 mb-4 bg-gray-200">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}
            >
              <span className="text-gray-500">
                {new Date(msg.timestamp).toLocaleString()}
              </span>
              <div className="mb-2">
                <b>{msg.sender}:</b> {msg.message}
              </div>
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            type="text"
            placeholder="Type your message"
            className="flex-1 p-2 rounded-l-lg"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
          />
          <button
            className="p-2 bg-blue-500 text-white rounded-r-lg"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;
