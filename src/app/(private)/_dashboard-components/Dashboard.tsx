import { getAllTransactions } from "@/server-actions/transactions";
import Analysis from "./Analysis";
import Filters from "./Filters";
import Statistics from "./Statistics";


const Dashboard = async ({ searchParams } : { searchParams: any }) => {


  const transactions = await getAllTransactions(searchParams); 
  
  if(transactions?.data?.length === 0) {

    return (

      <div className="min-h-screen flex justify-center mt-48">
        
        <p className="text-base lg:text-2xl tracking-wider text-gray-700 uppercase text-center">No Records to Display</p>
      
      </div>
    )

  }

  return (
    <div>

      <Filters searchParamsFromDashboardComponent={searchParams} />

      <Statistics allTransactions={transactions} />

      <Analysis allTransactions={transactions}  />

    </div>
  )
};

export default Dashboard;