'use client';

import { Button, Form, Input, message, Modal, Select, Tag } from "antd";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import userGlobalStore from "@/store/users";


const Filters = () => {

  const [ form ] = Form.useForm();

  const searchParams = useSearchParams();

  const { loggedInUserInGlobalStore }: any = userGlobalStore();

  const [ showFiltersModal, setShowFiltersModal ] = useState<boolean>(false);

  const [ categoriesToShow, setCategoriesToShow ] = useState<string[]>([]);

  const [ fromDateInputField, setFormDateInputField ] = useState<string>('');

  const router = useRouter();

  const [ appliedFilters, setAppliedFilters ] = useState<any>({
    type: "",
    category: "",
    fromDate: "",
    toDate: "",
    sortOrder: ""
  });


  useEffect(() => {

    const params = Object.fromEntries(searchParams.entries());

    setAppliedFilters(params);

    form.setFieldsValue(params);

    if (params.type) {

      setCategoriesToShow(params.type === "income" ? loggedInUserInGlobalStore?.data?.incomeCategories || [] : loggedInUserInGlobalStore?.data?.expenseCategories || []);
    
    }

  }, [searchParams, form, loggedInUserInGlobalStore]);


  const onSubmitForm = (values: any) => {

    try {

        const searchParams = new URLSearchParams();

        Object.keys(values).forEach((key) => {

            if(values[key]) {

                searchParams.append(key, values[key]);

            }

        });

        setAppliedFilters(values);

        router.push(`/transactions?${searchParams.toString()}`);

        setShowFiltersModal(false);
        
    } catch (error: any) {
        
        console.log(error);

        message.error('Something went wrong. Please try again.');
        
    }

  }


  const removeFilterOnClose = (key: any) => {

    const filters = { ...appliedFilters };

    filters[key] = "";

    form.setFieldsValue(filters);

    onSubmitForm(filters);

  }


  let getTotalNumbersOfAppliedFilters = () => {

    let count = 0;

    Object.keys(appliedFilters).forEach((key) => {

        if (appliedFilters[key]) {

            count++;

        }
    });

    return count;

  }
  

  return (

    <div className="p-5 my-5 border border-solid border-gray-200 overflow-x-auto">

        <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">

            <div>

                {getTotalNumbersOfAppliedFilters() > 0 ? <div className="flex gap-5">
                    
                    {Object.keys(appliedFilters).map((key) => {
                        

                        if (!appliedFilters[key]) {

                            return null;
                        
                        }

                        return (
                            <div className="flex flex-col capitalize">

                                <span className="text-gray-500 text-xs">{key}</span>

                                <Tag 
                                    closable 
                                    className="px-5 py-1 border-gray-300 font-semibold mt-1"
                                    onClose={() => removeFilterOnClose(key)} 
                                >{appliedFilters[key]}</Tag>

                            </div>
                        )

                    })}

                </div> : <span className="text-sm text-gray-600">No Filters Applied</span>}

            </div>

            <div className="flex items-center gap-5">

                <Button size="middle" onClick={() => {

                    onSubmitForm([]);

                    form.resetFields();

                    setAppliedFilters([]);

                    setFormDateInputField('');
                    
                }}>Clear</Button>

                <Button type="primary" size="middle" onClick={() => setShowFiltersModal(true)}>Apply</Button>

            </div>

        </div>

        <Modal 
            open={showFiltersModal} 
            onCancel={() => setShowFiltersModal(false)} 
            centered 
            okText='Apply Filters'
            title='Transactions Filters'
            width={800}
            okButtonProps={{
                htmlType: 'submit'
            }}
            onOk={() => {
                form.submit()
            }}
        >
            <Form layout="vertical" form={form} onFinish={onSubmitForm} initialValues={appliedFilters}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    <Form.Item name="type" label="Transaction Type">
                        <Select
                            onChange={(value) => {
                                if (value === "income") {
                                    setCategoriesToShow(loggedInUserInGlobalStore?.data?.incomeCategories || []);
                                } else {
                                    setCategoriesToShow(loggedInUserInGlobalStore?.data?.expenseCategories || []);
                                }
                                form.setFieldsValue({ category: "" });
                            }}
                        >
                            <Select.Option value="income">Income</Select.Option>
                            <Select.Option value="expense">Expense</Select.Option>
                        </Select>
                    </Form.Item>

                    {categoriesToShow?.length !== 0 && 
                        <Form.Item 
                            name="category" 
                            label="Transaction Category" 
                            className="col-span-1"
                        >
                            <Select>
                                {categoriesToShow.map((category) => (
                                    <Select.Option value={category}>{category.toUpperCase()}</Select.Option>
                                ))}
                            </Select>
                        </Form.Item>}

                    <Form.Item name="fromDate" label="From Date">
                        <Input 
                            type="date" 
                            onChange={(e) => setFormDateInputField(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item name="toDate" label="To Date">
                        <Input 
                            type="date" 
                            min={fromDateInputField}
                            disabled={!fromDateInputField}
                        />
                    </Form.Item>

                    <Form.Item name="sortOrder" label="Sort Order">
                        <Select>
                            <Select.Option value="asc">Ascending</Select.Option>
                            <Select.Option value="desc">Descending</Select.Option>
                        </Select>
                    </Form.Item>
                </div>
            </Form>
        </Modal>

    </div>

  )
}

export default Filters;