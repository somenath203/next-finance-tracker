'use client';

import React from 'react';
import { message } from "antd";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation';

import { storeAndGetCurrentLoggedInUserDetailsFromMongoDB } from "@/server-actions/users";
import Header from './Header';
import userGlobalStore from '@/store/users';
import Loader from '@/app/components/Loader';


const LayoutProvider = ({ children }: { children: React.ReactNode }) => {

  const { loggedInUserInGlobalStore, setLoggedInUserInGlobalStore }: any = userGlobalStore();


  const pathname = usePathname();

  
  let isPublicRoute = pathname.includes('/sign-in') || pathname.includes('/sign-up');


  const getloggedInUserFullName = async () => {

    try {

      const loggedInUserData = await storeAndGetCurrentLoggedInUserDetailsFromMongoDB();
  
      if(loggedInUserData?.success) {
  
        setLoggedInUserInGlobalStore(loggedInUserData);
  
      }
      
    } catch (error) {
  
      console.log(error);
      
      message.error('Something went wrong. Please try again.')
  
    }

  }

  useEffect(() => {
    
    if(!loggedInUserInGlobalStore && !isPublicRoute) {
      getloggedInUserFullName()
    }

  }, [pathname]);


  if (isPublicRoute) {

    return children; 

  }

  if(!loggedInUserInGlobalStore) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <>

      <Header />

      {loggedInUserInGlobalStore && <div className="p-5">
        {children}
      </div>}

    </>
  );
};

export default LayoutProvider;
