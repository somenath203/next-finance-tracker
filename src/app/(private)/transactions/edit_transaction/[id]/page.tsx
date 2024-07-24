import TransactionModel from "@/models/trransactionModel";
import TransactionForm from "../../_common/transaction_form";

const Page = async ({ params }: { params: { id: string } }) => {
  
  const transactionToBeEdited = await TransactionModel.findById(params?.id);
  
  return (
    <div>

      <h1 className="text-xl font-bold text-primarycolor">Edit Transaction</h1>

      <TransactionForm isEditForm={true} inititalValuesOfTheForm={JSON.parse(JSON.stringify(transactionToBeEdited))} />

    </div>
  )
}

export default Page;