import { useEffect, useState } from "react";
import { createLightNode, waitForRemotePeer, Protocols, createEncoder, createDecoder } from "@waku/sdk";
import protobuf from "protobufjs";

// Import Tailwind CSS
import "tailwindcss/tailwind.css";

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<any[]>([]);
    const [inputMessage, setInputMessage] = useState<string>("");
    const [node, setNode] = useState<any>(null);
  
    const ChatMessage = new protobuf.Type("ChatMessage")
      .add(new protobuf.Field("timestamp", 1, "uint64"))
      .add(new protobuf.Field("sender", 2, "string"))
      .add(new protobuf.Field("message", 3, "string"));
  
    const contentTopic = "/chat/1";
    const encoder = createEncoder({ contentTopic });
    const decoder = createDecoder(contentTopic);
  
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
  
          setNode(wakuNode);
        } catch (error) {
          console.error('Error initializing Waku:', error);
        }
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
      if (node && inputMessage.trim() !== "") {
        const protoMessage = ChatMessage.create({
          timestamp: Date.now(),
          sender: "You",
          message: inputMessage.trim(),
        });
  
        const serialisedMessage = ChatMessage.encode(protoMessage).finish();
  
        await node.lightPush.send(encoder, {
          payload: serialisedMessage,
        });
  
        setInputMessage("");
      }
    };
  
    return (
      <div className="container mx-auto my-8 p-8 bg-gray-100 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Waku Chat</h1>
        <div className="flex flex-col-reverse space-y-4">
          {messages.reverse().map((msg, index) => (
            <div
              key={index}
              className={`${
                msg.sender === "You" ? "self-start" : "self-end"
              } bg-white p-4 rounded-lg shadow`}
            >
              <b>{msg.sender}:</b> {msg.message}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow p-2 border border-gray-300 rounded-l-md"
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 transition"
          >
            Send
          </button>
        </div>
      </div>
    );
  };
  
  export default ChatPage;
  