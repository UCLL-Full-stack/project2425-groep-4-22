import Head from 'next/head';
import Header from 'components/header';
import { useState, useEffect } from 'react';
import AddExpensePopup from '../../components/expenses/Addexpense';
import ExpenseOverviewTable from 'components/expenses/ExpenseOverviewTable';
import expenseService from 'service/expenseService';
import { Expense } from 'types';

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const fetchExpenses = async () => {
    try {
      const data = await expenseService.getAllExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    }
  };

  const handleExpenseAdded = () => {
    fetchExpenses();
    setShowPopup(false);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-8">
        <section className="w-full max-w-4xl p-4">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowPopup(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Add Expense
            </button>
          </div>
          <div className="mt-8">
            <ExpenseOverviewTable expenses={expenses} selectExpense={() => { }} />
          </div>
        </section>
      </main>
      {showPopup && (
        <AddExpensePopup onClose={() => setShowPopup(false)} onExpenseAdded={handleExpenseAdded} />
      )}
    </>
  );
};

export default Home;