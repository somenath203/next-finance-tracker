'use client';

import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Table } from 'antd';

const Analysis = ({ allTransactions }: { allTransactions: any }) => {

  const COLORS = ["#0088FE", "#00C49F", "#A94438", "#FF8042", "#6DA4AA", "#637A9F", "#A94438", "#6DA4AA", "#F2C57C", "#F2A365"];

  function getColor(index: number) {
    return COLORS[index % COLORS.length];
  }

  let finalAnalysisData: any = {
    income: {
      totalAmount: 0
    },
    expense: {
      totalAmount: 0
    }
  };

  allTransactions?.data?.forEach((transaction: any) => {

    finalAnalysisData[transaction?.type].totalAmount += transaction?.amount;

    if (finalAnalysisData[transaction?.type][transaction?.category]) {

      finalAnalysisData[transaction?.type][transaction?.category] += transaction?.amount;

    } else {

      finalAnalysisData[transaction?.type][transaction?.category] = transaction?.amount;

    }

  });


  let incomeAnalysisArray: any = [];

  Object.keys(finalAnalysisData?.income)?.forEach((key: any, index: any) => {

    if (key === 'totalAmount') {

      return;

    }

    let percentage = (finalAnalysisData?.income[key] / finalAnalysisData?.income?.totalAmount) * 100;
    
    let objectAsPerPieChart = {
      name: key,
      value: percentage,
      amount: finalAnalysisData.income[key],
      color: getColor(index)
    }

    incomeAnalysisArray.push(objectAsPerPieChart);

  });



  let expenseAnalysisArray: any = [];

  Object.keys(finalAnalysisData?.expense)?.forEach((key: any, index: any) => {

    if (key === 'totalAmount') {
      return;
    }

    let percentage = (finalAnalysisData?.expense[key] / finalAnalysisData?.expense?.totalAmount) * 100;
    
    let objectAsPerPieChart = {
      name: key,
      value: percentage,
      amount: finalAnalysisData.expense[key],
      color: getColor(index)
    }

    expenseAnalysisArray.push(objectAsPerPieChart);

  });


  const AnalysisTable = ({ data }: { data: any[] }) => {

    const columns: any = [
      {
        title: 'Category',
        dataIndex: 'name',
        key: 'name',
        render: (text: string, record: any) => (
          <div className='flex items-center gap-2'>
            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: record.color }}></div>
            <span>{text}</span>
          </div>
        ),
      },
      {
        title: 'Percentage',
        dataIndex: 'value',
        key: 'value',
        render: (value: number) => `${value.toFixed(2)}%`,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        key: 'amount',
        render: (amount: number) => `Rs.${amount}`,
      },
    ];
  
    return (
      <div className='overflow-x-auto'>
        <Table
          dataSource={data}
          columns={columns}
          scroll={{ x: 'max-content' }}
          rowKey="key"  
        />
      </div>
    );

  };
 

  return (
    <div className='flex flex-col gap-5 mt-10'>

      {incomeAnalysisArray?.length !== 0 && <div className='border border-gray-300 border-solid rounded-sm p-5 shadow-lg'>

        <h1 className='text-center text-lg text-gray-600'>Income Analysis</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center capitalize">

          <ResponsiveContainer width="100%" height={400}>
            <PieChart onMouseEnter={incomeAnalysisArray}>
              <Pie
                data={incomeAnalysisArray}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {incomeAnalysisArray.map((entry: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div>

            <AnalysisTable data={incomeAnalysisArray} />

          </div>


        </div>

      </div>}

      {expenseAnalysisArray?.length !== 0 && <div className='border border-gray-300 border-solid rounded-sm p-5 mt-4 shadow-lg'>

        <h1 className='text-center text-lg text-gray-600'>Expense Analysis</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 items-center capitalize">

          <ResponsiveContainer width="100%" height={400}>
            <PieChart onMouseEnter={expenseAnalysisArray}>
              <Pie
                data={expenseAnalysisArray}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {expenseAnalysisArray.map((entry: any, index: any) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div>

            <AnalysisTable data={expenseAnalysisArray} />

          </div>

        </div>

      </div>}

    </div>
  )
};

export default Analysis;
