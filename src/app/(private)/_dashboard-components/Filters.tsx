'use client';

import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";


const Filters = ({ searchParamsFromDashboardComponent } : { searchParamsFromDashboardComponent: any }) => {

  const [fromDate, setFromDate] = useState(searchParamsFromDashboardComponent?.fromDate || '');

  const [toDate, setToDate] = useState(searchParamsFromDashboardComponent?.toDate || '');

  const router = useRouter();


  const applyFilter = () => {

    router.push(`/?fromDate=${fromDate}&toDate=${toDate}`);
    
  }

  const clearFilter = () => {

    setFromDate('');

    setToDate('');

    router.push(`/`);

  }
  
  return (
    <div className="p-5 flex flex-col lg:flex-row gap-5 items-end my-7 w-11/12">

      <div className="w-full">

        <h1 className="text-gray-400 text-sm">From Date</h1>

        <Input
          value={fromDate} 
          type="date"
          onChange={(e) => setFromDate(e.target.value)} 
        />

      </div>

      <div className="w-full">

        <h1 className="text-gray-400 text-sm">To Date</h1>

        <Input 
          value={toDate} 
          type="date"
          onChange={(e) => setToDate(e.target.value)} 
          min={fromDate} 
          disabled={!fromDate}
        />

      </div>

      <div className="flex items-center gap-4 lg:gap-2">

        <Button onClick={clearFilter}>Clear</Button>

        <Button type="primary" disabled={!fromDate || !toDate} onClick={applyFilter}>Filter</Button>

      </div>


    </div>
  )
};

export default Filters;