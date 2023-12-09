import React from 'react';
import CardPhoto from './images/cardmockphoto.jpg';
import { LinearGradient } from 'react-text-gradients';
import Storage from './images/storage.png';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Cards() {
  const router = useRouter();

  return (
    <div className="text-center p-8" style={{borderRadius:"0.4rem" }} >
      <h1 className="text-3xl mb-8 text-white bg-gradient-to-r from-blue-500 to-pink-500 p-4 rounded-md">
          WHAT WE OFFER
      </h1>

      <div className="flex justify-around items-center flex-wrap mt-8 p-6">
        <div
          className="bg-blue-800 rounded-lg p-8 cursor-pointer transition-transform transition-shadow max-w-md w-full hover:scale-105 hover:shadow-md"
          onClick={() => router.push('/dao')}
        >
          <Image alt='images of the cards ' src={Storage} width={300} height={200} className="rounded-md" />
          <h2 className="text-2xl text-white mt-4">DAO</h2>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-pink-500 transition-background">
            Explore DAO
          </button>
        </div>

        <div
          className="bg-blue-800 rounded-lg p-8 cursor-pointer transition-transform transition-shadow max-w-md w-full hover:scale-105 hover:shadow-md"
          onClick={() => router.push('/room')}
        >
          <Image alt='images of the cards ' src={CardPhoto} width={300} height={200} className="rounded-md" />
          <h2 className="text-2xl text-white mt-4">1-1 Interaction</h2>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-pink-500 transition-background">
            Join Room
          </button>
        </div>

        <div className="bg-blue-800 rounded-lg p-8 max-w-md w-full transition-transform transition-shadow hover:scale-105 hover:shadow-md">
          <Image alt='images of the cards ' src={CardPhoto} width={300} height={200} className="rounded-md" />
          <h2 className="text-2xl text-white mt-4">Quadratic Funding</h2>
          <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md font-bold hover:bg-pink-500 transition-background">
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}
