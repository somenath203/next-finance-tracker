'use client';

import { Button, message, Table } from "antd";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { DeleteParticularTransaction } from "@/server-actions/transactions";


const TransactionTable = ({ allTransactions } : { allTransactions: any }) => {


  const [transactions, setTransactions] = useState(allTransactions?.data || []);

  const [ loading, setLoading ] = useState<boolean>(false);
  
  const router = useRouter();

  
  const deleteTransaction = async (transactionID: string) => {

    try {

      setLoading(true);

      setTransactions((prevTransactions: any[]) => prevTransactions.filter(transaction => transaction._id !== transactionID));

      const response = await DeleteParticularTransaction(transactionID);

      if(response?.success) {

        message.success(response?.message);
        
      }

      
    } catch (error: any) {

      console.log(error);

      message.error('Something went wrong. Please try again after sometime.');
      
      
    } finally {

      setLoading(false);

    }

  }


  const columns = [
    { 
        title: 'Date of Transaction', 
        dataIndex: 'date' 
    },
    { 
        title: 'Name of Transaction', 
        dataIndex: 'name' 
    },
    { 
        title: 'Transaction Amount', 
        dataIndex: 'amount', 
        render: (amount: number) => {
            return `Rs.${amount}`
        } 
    },
    { 
        title: 'Transaction Type', 
        dataIndex: 'type' 
    },
    { 
        title: 'Transaction Category', 
        dataIndex: 'category' 
    },
    {
        title: 'Actions',
        dataIndex: 'action',
        render: (value: any, record: any) => {
          
          return <div className="flex gap-5">

            <Button size="small" onClick={() => router.push(`/transactions/edit_transaction/${record._id}`)}>
              <i className="ri-pencil-line"></i>
            </Button>

            <Button size="small" onClick={() => deleteTransaction(record?._id)}>
              <i className="ri-delete-bin-line"></i>
            </Button>

          </div>
        }
    }
  ] 
  
  return (
    <div className="overflow-x-auto">
        <Table dataSource={transactions} columns={columns} loading={loading} />
    </div>
  )
};

export default TransactionTable