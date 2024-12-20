import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from 'components/header';
import { useState, useEffect } from 'react';

import ExpenseOverviewTable from 'components/expenses/ExpenseOverviewTable';
import AddExpenseForm from 'components/expenses/Addexpenseform'; // Import the popup form
import EditExpenseForm from 'components/expenses/edditexpense'; // Import the edit form
import expenseService from 'service/expenseService';
import { Expense } from 'types';

// Custom hook to simulate authentication check
const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Example: Adjust based on your auth setup
    setIsAuthenticated(!!token); // Update this logic based on how you verify login
  }, []);

  return isAuthenticated;
};

const Home: React.FC = () => {
  const isAuthenticated = useAuth();
  const router = useRouter();

  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);

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
    setShowAddPopup(false);
  };

  const handleExpenseUpdated = () => {
    fetchExpenses(); 
    setShowEditPopup(false);
  };

  const handleEdit = (expenseId: number) => {
    setSelectedExpenseId(expenseId);
    setShowEditPopup(true);
  };

  const handleDelete = (updatedExpenses: Expense[]) => {
    setExpenses(updatedExpenses);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, no need to fetch data
      return;
    }
    fetchExpenses();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Expenses</title>
        </Head>
        <Header />
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-2xl font-bold text-red-500 mb-4">You are not logged in!</h1>
          <p className="mb-6 text-lg">Please log in to access this page.</p>
          <button
            onClick={() => router.push('/login')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go to Login Page
          </button>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Expenses</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-8">
        <section className="w-full max-w-4xl p-4">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowAddPopup(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Expense
            </button>
          </div>
          <div className="mt-8">
            <ExpenseOverviewTable 
              expenses={expenses} 
              selectExpense={() => {}} 
              onEdit={handleEdit} 
              onDelete={handleDelete} 
            />
          </div>
        </section>
      </main>

      {/* Add Popup */}
      {isAuthenticated && showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AddExpenseForm
            onClose={() => setShowAddPopup(false)}
            onExpenseAdded={handleExpenseAdded}
          />
        </div>
      )}

      {/* Edit Popup */}
      {isAuthenticated && showEditPopup && selectedExpenseId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <EditExpenseForm
            onClose={() => setShowEditPopup(false)}
            onExpenseUpdated={handleExpenseUpdated}
            expenseId={selectedExpenseId}
          />
        </div>
      )}
    </>
  );
};

export default Home;