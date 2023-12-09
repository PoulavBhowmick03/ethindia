// pages/index.tsx

import { useState } from 'react';
import { useRouter } from 'next/router';

const HomePage: React.FC = () => {
  const router = useRouter();
  const [pincode, setPincode] = useState<string>('');

  const handlePincodeSubmit = () => {
    router.push(`/forum/${pincode}`);
  };

  return (
    <div>
      <label>
        Enter Pincode:
        <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} />
      </label>
      <button onClick={handlePincodeSubmit}>Enter Forum</button>
    </div>
  );
};

export default HomePage;
