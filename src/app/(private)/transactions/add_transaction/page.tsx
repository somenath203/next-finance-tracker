import TransactionForm from "../_common/transaction_form"

const Page = () => {
  return (
    <div>

      <h1 className="text-xl font-bold text-primarycolor">Add New Transaction</h1>

      <TransactionForm isEditForm={false} />

    </div>
  )
}

export default Page;