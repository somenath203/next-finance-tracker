import { Suspense } from "react";
import { Spin } from "antd";

import LinkButton from "@/app/components/LinkButton";
import TransactionData from "./_common/transaction_data";
import Filters from "@/app/components/Filters";


const Page = ({ searchParams } : { searchParams: any }) => {

  const suspenseKey = JSON.stringify(searchParams);
  
  
  return (
    <div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center lg:justify-between">

        <h1 className="text-lg lg:text-xl font-bold text-primarycolor">Transactions</h1>

        <LinkButton title="Add New Transaction" path="/transactions/add_transaction" />

      </div>


      <Filters />
      

      <Suspense key={suspenseKey} fallback={
        <div className="flex justify-center items-center h-48">

          <Spin size="large" />

          <span className="ml-4">Loading...</span>
          
        </div>
      }>

        <TransactionData searchParams={searchParams} />
        
      </Suspense>

    </div>
  )
};

export default Page;