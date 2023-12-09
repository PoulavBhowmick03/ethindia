// pages/index.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [pincode, setPincode] = useState<string>('');

  const handlePincodeSubmit = () => {
    router.push(`/dao/forum`);
  };

  return (
    <div className=' bg-black h-screen pt-9'>
    <div className="container mx-auto mt-8 p-6 shadow-md max-w-md rounded-md" style={{background:"radial-gradient(circle, rgba(128,37,148,1) 0%, rgba(50,7,84,1) 100%)"}}>
      <label className="block text-lg font-semibold mb-2">
        Enter Pincode:
        <input
          type="text"
          className="w-full py-2 px-4 mt-2 border border-gray-300 rounded-md"
          value={pincode}
          onChange={(e) => setPincode(e.target.value)}
        />
      </label>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
        onClick={handlePincodeSubmit}
      >
        Enter Forum
      </button>
    </div>
    </div>
  );
};

export default HomePage;
