import StatisticsCard from "./StatisticsCard";

const Statistics = ({ allTransactions } : { allTransactions: any }) => {

  let totalIncome = 0;
  let totalExpense = 0;
  let totalNumberOfTransaction = 0;

  allTransactions?.data?.forEach((transaction: any) => {

    if (transaction?.type === 'income') {

      totalIncome = totalIncome + transaction?.amount;

    } else if (transaction?.type === 'expense') {

      totalExpense = totalExpense + transaction?.amount;

    }

    totalNumberOfTransaction = totalNumberOfTransaction + 1;

  });

  const totalBalance = totalIncome - totalExpense;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center gap-5">

      <StatisticsCard 
        cardTitle="Total Income" 
        cardAmount={totalIncome} 
        cardIcon="./icons/income.png" 
        cardAmountColor="#436850" 
        isCurrency={true} 
      />

      <StatisticsCard 
        cardTitle="Total Expense" 
        cardAmount={totalExpense} 
        cardIcon="./icons/expenses.png" 
        cardAmountColor="#602932" 
        isCurrency={true} 
      />

      <StatisticsCard 
        cardTitle="Total Transactions" 
        cardAmount={totalNumberOfTransaction} 
        cardIcon="./icons/transaction.png" 
        cardAmountColor="#474F7A" 
        isCurrency={false} 
      />

      <StatisticsCard 
        cardTitle="Total Balance" 
        cardAmount={totalBalance} 
        cardIcon="./icons/wallet.png" 
        cardAmountColor="#7E2553" 
        isCurrency={true} 
      />

    </div>
  )

};

export default Statistics;