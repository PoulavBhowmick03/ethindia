// components/Sidebar.tsx 

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  HiHome, 
  HiOutlineUserCircle,
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight, 
  HiChat,
  HiBell,
  HiTicket,
  HiPencil
} from 'react-icons/hi';
const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if the current path includes "/dao/vote" when the route changes
    const isDaoVotePage = router.pathname.includes('/dao/vote');
    setIsOpen(isDaoVotePage);
  }, [router.pathname]);

  return (
    <div className={`bg-gray-900 text-gray-100 min-h-screen ${open ? 'w-72' : 'w-20'} duration-500 text-sm overflow-hidden`}>
      <div className="py-3 px-4 mb-6 flex justify-between">
        <h2 className="text-xl font-semibold">My App</h2>
        <button onClick={() => setOpen(!open)}>
          {open ? <HiOutlineChevronDoubleLeft size={28} /> : <HiOutlineChevronDoubleRight size={28} />}
        </button>  
      </div>
      
      <ul className="py-2">
      <li>
          <a href="/" className="flex items-center p-3 text-white rounded-md bg-gray-900">
            <HiHome className="text-2xl mr-3" />
            {open && 'Home'}
          </a>
        </li>
        <li>
          <a href="/dao" className="flex items-center p-3 text-white rounded-md bg-gray-900">
            <HiChat className="text-2xl mr-3" />
            {open && 'Chat'}
          </a>
        </li>
        
        <li>
          <a href="/dao/vote" className="flex items-center p-3 text-gray-400 rounded-md hover:bg-gray-800 hover:text-white">
            <HiOutlineUserCircle className="text-2xl mr-3" />
            {open && 'Forum'}
          </a>
        </li>
        <li>
        <a href="/" className="flex items-center p-3 text-white rounded-md bg-gray-900">
          {isOpen && 
          <div>
            <HiTicket className="text-2xl mr-3" /><div>Proposals</div>
          </div>}
        </a>
      </li>
        <li>
          <a href="/" className="flex items-center p-3 text-white rounded-md bg-gray-900">
            <HiBell className="text-2xl mr-3" />
            {open && ''}
          </a>
        </li>
        <li>
          <a href="/dao/proposals" className="flex items-center p-3 text-white rounded-md bg-gray-900">
            <HiPencil className="text-2xl mr-3" />
            {open && 'Create'}
          </a>
        </li>
        
      </ul>
    </div>
  );
};

export default Sidebar;