'use client';

import { Button, Form, Input, message, Select } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";

import userGlobalStore from "@/store/users";
import { AddNewTransaction, EditParticularTransaction } from "@/server-actions/transactions";


const TransactionForm = ({ isEditForm = false, inititalValuesOfTheForm } : { isEditForm: boolean, inititalValuesOfTheForm?: any }) => {


  const [ form ] = Form.useForm();

  const { loggedInUserInGlobalStore }: any = userGlobalStore();
  
  const [ categoriesToShow, setCategoriesToShow ] = useState<string[]>([]);

  const [ loading, setLoading ] = useState(false);

  const router = useRouter();
  


  const onSubmitForm = async (values: any) => {

    try {

      setLoading(true);

      let response: any = null; 

      if(!isEditForm) {

        response = await AddNewTransaction({
          ...values,
          amount: Number(values?.amount),
          user: loggedInUserInGlobalStore?.data?._id
        });

      } else {

        response = await EditParticularTransaction({
          transactionId: inititalValuesOfTheForm?._id,
          payload: values
        });

      }

      if (response.success) {

        message.success(response.message);

        router.push("/transactions");

      } 
      
    } catch (error: any) {
      
      message.error('Something went wrong. Please try again after sometime.');

      console.log(error);
      
    } finally {

      setLoading(false);

    }

  }


  return (
    <div className="mt-7">

      <Form layout="vertical" form={form} onFinish={onSubmitForm} initialValues={inititalValuesOfTheForm}>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          <Form.Item 
            name="name" 
            label="Transaction Name" 
            className="col-span-1 md:col-span-2"
            rules={[{ required: true, message: 'transaction name is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item 
            name="date" 
            label="Date of Transaction" 
            className="col-span-1"
            rules={[{ required: true, message: 'transaction date is required' }]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item 
            name="amount" 
            label="Transaction Amount" 
            className="col-span-1"
            rules={[{ required: true, message: 'transaction amount is required' }]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item 
            name="type" 
            label="Transaction Type" 
            className="col-span-1"
            rules={[{ required: true, message: 'transaction type is required' }]}
          >
            <Select onChange={(value) => {

              if(value === 'income') {

                setCategoriesToShow(loggedInUserInGlobalStore?.data?.incomeCategories);

              } else {

                setCategoriesToShow(loggedInUserInGlobalStore?.data?.expenseCategories);

              }

              form.setFieldsValue({ category: "" });

            }}>
              <Select.Option value="income">Income</Select.Option>
              <Select.Option value="expense">Expense</Select.Option>
            </Select>
          </Form.Item>

          {categoriesToShow?.length !== 0 && 
            <Form.Item 
              name="category" 
              label="Transaction Category" 
              className="col-span-1"
              rules={[{ required: true, message: 'transaction category is required' }]}
            >
            <Select>
              {categoriesToShow.map((category) => (
                <Select.Option value={category}>{category.toUpperCase()}</Select.Option>
              ))}
            </Select>
          </Form.Item>}

          <Form.Item 
            name="note" 
            label="Additional Information regarding Transaction" 
            className="col-span-1 md:col-span-2 lg:col-span-3"
            rules={[{ required: true, message: 'additional information is required' }]}
          >
            <Input.TextArea rows={5} className="!resize-none" />
          </Form.Item>

        </div>

        <div className="flex justify-end items-center gap-5">
          
          <Button disabled={loading} onClick={() => router.push("/transactions")}>Cancel</Button>
          
          <Button type="primary" htmlType="submit" loading={loading}>Save</Button>

        </div>

      </Form>

    </div>
  )
};

export default TransactionForm;