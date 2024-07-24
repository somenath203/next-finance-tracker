'use client';

import { useRouter } from 'next/navigation';
import { useClerk } from '@clerk/nextjs';

import userGlobalStore from "@/store/users";


const Header = () => {

  const router = useRouter();

  const { signOut } = useClerk();

  const { setLoggedInUserInGlobalStore }: any = userGlobalStore();

  const handleLogout = async () => {

    try {

      setLoggedInUserInGlobalStore(null);

      await signOut(); 

    } catch (error) {

      console.error('Failed to sign out:', error);

    }

  };

  return (
    <div className="p-5 px-10 bg-primarycolor flex flex-col gap-2 lg:flex-row items-center justify-between">

      <div>
        <h1
          className="font-bold text-white text-base text-center lg:text-xl tracking-wide hover:cursor-pointer"
          onClick={() => router.push('/')}
        >
          Next Finance Tracker
        </h1>
      </div>

      <div>
        <div className="flex items-center justify-center gap-5">
          <span
            className="text-white text-center hover:text-gray-200 hover:cursor-pointer"
            onClick={() => router.push('/profile')}
          >
            Profile
          </span>
          <span
            className="text-center hover:text-gray-200 hover:cursor-pointer"
            onClick={handleLogout}
          >
            <i className="ri-logout-circle-r-line text-white"></i>
          </span>
        </div>
      </div>

    </div>
  );
};

export default Header;
