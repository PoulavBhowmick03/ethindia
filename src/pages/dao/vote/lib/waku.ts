"use client";

import {
  DecodedMessage,
  LightNode,
  createDecoder,
  createEncoder,
  createLightNode,
  waitForRemotePeer,
} from "@waku/sdk";
import { IPollMessage, PPollMessage } from "../types";

const contentTopic = "/wapoll/0";

const encoder = createEncoder({ contentTopic });
const decoder = createDecoder(contentTopic);

// TODO: createNode
// TODO: subscribeToIncomingVotes
// TODO: retrieveExistingVotes
// TODO: sendVote


export const createNode = async () => {
  const waku = await createLightNode({ defaultBootstrap: true });
  await waitForRemotePeer(waku);
  return waku;
};

export const receiveVotes = async (
  waku: LightNode,
  callback: (pollMessage: IPollMessage) => void,
) => {
  const _callback = (wakuMessage: DecodedMessage): void => {
    try {
      if (!wakuMessage.payload) return;
      const pollMessageObj = PPollMessage.decode(wakuMessage.payload);
      const pollMessage = pollMessageObj.toJSON() as IPollMessage;
      callback(pollMessage);
    } catch (error) {
      console.error('Error processing Waku message:', error);
    }
  };

  try {
    const unsubscribe = await waku.filter.subscribe([decoder], _callback);
    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to Waku filter:', error);
  }
};

export const sendVote = async (waku: LightNode, pollMessage: IPollMessage) => {
  const protoMessage = PPollMessage.create({
    id: pollMessage.id,
    question: pollMessage.question,
    answers: pollMessage.answers,
  });

  // Serialise the message using Protobuf
  const serialisedMessage = PPollMessage.encode(protoMessage).finish();

  // Send the message using Light Push
  await waku.lightPush.send(encoder, {
    payload: serialisedMessage,
  });
};

export const retrieveExistingVotes = async (
  waku: LightNode,
  callback: (pollMessage: IPollMessage) => void, 
) => {

  const _callback = (wakuMessage: DecodedMessage): void => {
    if (!wakuMessage.payload) return;

    try {
      // Wrap decode call in try/catch
      const pollMessageObj = PPollMessage.decode(wakuMessage.payload);  

      // Additional validation  
      if(!pollMessageObj || !pollMessageObj.toJSON) {
        throw new Error('Invalid payload')  
      }

      const pollMessage = pollMessageObj.toJSON() as IPollMessage;
      callback(pollMessage);

    } catch (error) {
      // Handle errors 
      console.log('Decoding error', error); 
    }
  };

  // Query the Store peer
  await waku.store.queryWithOrderedCallback([decoder], _callback);
};