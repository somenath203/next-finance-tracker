import React from "react";

import { getAllTransactions } from "@/server-actions/transactions";
import TransactionsTable from "./transaction_table";


async function TransactionsData({ searchParams }: { searchParams: any}) {

  const transactions = await getAllTransactions(searchParams);

  return (
    <div>
      <TransactionsTable allTransactions={transactions} />
    </div>
  );

}

export default TransactionsData;