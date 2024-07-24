'use client';

import { useEffect, useState } from "react";
import { Button, Input, message, Modal, Tag } from "antd";

import userGlobalStore from "@/store/users";
import { updateIncomeExpenseOfUser } from "@/server-actions/users";

const Page = () => {

  const { loggedInUserInGlobalStore, setLoggedInUserInGlobalStore }: any = userGlobalStore();


  const [incomeCategories, setIncomeCategories] = useState<string[]>([]);

  const [expenseCategories, setExpenseCategories] = useState<string[]>([]);


  const [showAddNewCategoryModal, setShowAddNewCategoryModal] = useState(false);

  const [selectNewCategoryType, setSelectNewCategoryType] = useState("Income"); 

  const [newCategory, setNewCategory] = useState("");


  const [ loading, setLoading ] = useState(false);


  useEffect(() => {

    if (loggedInUserInGlobalStore?.data?.incomeCategories && loggedInUserInGlobalStore?.data?.expenseCategories) {

      setIncomeCategories(loggedInUserInGlobalStore?.data?.incomeCategories);

      setExpenseCategories(loggedInUserInGlobalStore?.data?.expenseCategories);

    }

  }, [loggedInUserInGlobalStore]);


  const updateIncomeExpenseListOfUser = async () => {

    try {

      setLoading(true);
      

      const incomeExpenseDetailsOfUserUpdated = await updateIncomeExpenseOfUser({
        userId: loggedInUserInGlobalStore?.data?._id,
        payload: {
          incomeCategories,
          expenseCategories
        }
      });

      if(incomeExpenseDetailsOfUserUpdated?.success) {

        message.success('Details updated successfully.');

        setLoggedInUserInGlobalStore(incomeExpenseDetailsOfUserUpdated);

      }
      
    } catch (error: any) {
      
      message.error('Something went wrong. Please try again.');

    } finally {

      setLoading(false);
      
    }

  }


  const getProperty = ({ key, value }: { key: string, value: string }) => {
    return (
      <div className="flex flex-col">
        <span className="text-sm font-bold">{key}</span>
        <span className="text-sm">{value}</span>
      </div>
    );
  };

  return (
    <div className="px-4">

      <h1 className="text-xl font-bold text-primarycolor">Profile</h1>

      <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 items-center gap-5">

        {getProperty({ key: "Full Name", value: loggedInUserInGlobalStore?.data?.fullname })}

        {getProperty({ key: "Email Address", value: loggedInUserInGlobalStore?.data?.email })}

        {getProperty({ key: "Id", value: loggedInUserInGlobalStore?.data?._id })}

      </div>


      <div className="mt-7">

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center">

          <h1 className="text-lg lg:text-xl font-bold text-primarycolor">Income Categories</h1>

          <Button
            size="middle"
            onClick={() => {
              setShowAddNewCategoryModal(true);
              setSelectNewCategoryType('Income'); 
            }}
          >
            Add Income Category
          </Button>

        </div>

        <div className="flex flex-wrap gap-5 mt-5">

          {incomeCategories.length !== 0 ? incomeCategories.map((incomeCategory: any) => (
              <Tag
                key={incomeCategory}
                className="text-sm font-semibold text-primarycolor px-5 py-2 capitalize"
                closable
                onClose={() => {
                  setIncomeCategories(incomeCategories.filter((currCategory) => currCategory !== incomeCategory));
                }}
              >
                {incomeCategory}
              </Tag>
            )) : <p>No Income Categories to display. Please add one.</p>}

        </div>


        <div className="mt-7">

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 justify-between items-center">

            <h1 className="text-lg lg:text-xl font-bold text-primarycolor">Expense Categories</h1>

            <Button
              size="middle"
              onClick={() => {
                setShowAddNewCategoryModal(true);
                setSelectNewCategoryType('Expense');
              }}
            >
              Add Expense Category
            </Button>

          </div>

        </div>

        <div className="flex flex-wrap gap-5 mt-5">

          {expenseCategories.length !== 0 ? expenseCategories.map((expenseCategory: any) => (
              <Tag
                key={expenseCategory}
                className="text-sm font-semibold text-primarycolor px-5 py-2 capitalize"
                closable
                onClose={() => {
                  setExpenseCategories(expenseCategories.filter((currCategory) => currCategory !== expenseCategory));
                }}
              >
                {expenseCategory}
              </Tag>
            )) : <p>No Expense Categories to display. Please add one.</p>}

        </div>

      </div>


      <div className="flex justify-end mt-7">

        <Button 
          type="primary" 
          onClick={updateIncomeExpenseListOfUser}
          loading={loading}
        >Save Changes</Button>

      </div>


      <Modal

        open={showAddNewCategoryModal}

        title={`Add new ${selectNewCategoryType} Type`}

        onCancel={() => setShowAddNewCategoryModal(false)}

        centered

        footer={[

          <Button key="cancel" onClick={() => setShowAddNewCategoryModal(false)}>
            Cancel
          </Button>,

          <Button 
            key={`ADD ${selectNewCategoryType.toUpperCase()}`}
            type="primary" 
            onClick={() => {
              if (selectNewCategoryType === 'Income') {

                setIncomeCategories([...incomeCategories, newCategory]);

              } else {

                setExpenseCategories([...expenseCategories, newCategory]);

              }
              setNewCategory('');

              setShowAddNewCategoryModal(false);

            }} 
            disabled={!newCategory.trim()}
          >
            ADD {selectNewCategoryType.toUpperCase()}
          </Button>

        ]}
      >
        <Input
          value={newCategory}
          type="text"
          onChange={(e: any) => setNewCategory(e.target.value)}
          placeholder={`enter ${selectNewCategoryType.toLowerCase()} name`}
        />
      </Modal>
    </div>
  );
};

export default Page;


