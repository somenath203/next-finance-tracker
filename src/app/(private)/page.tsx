import { Suspense } from "react";
import { Spin } from "antd";

import LinkButton from "../components/LinkButton";
import Dashboard from "./_dashboard-components/Dashboard";


const Page = async ({ searchParams } : { searchParams : any }) => {

  const suspenseKey = JSON.stringify(searchParams);

  return (
    <div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center">

        <h1 className="text-base lg:text-xl font-bold text-primarycolor">Dashboard</h1>

        <LinkButton title="Transactions" path="/transactions" />

      </div>


      <Suspense key={suspenseKey} 
        fallback={
          <div className="flex justify-center items-center h-48">

            <Spin size="large" />

            <span className="ml-4">Loading...</span>
            
          </div>
      }
      >

        <Dashboard searchParams={searchParams} />
        
      </Suspense>


    </div>
  )
};


export default Page;