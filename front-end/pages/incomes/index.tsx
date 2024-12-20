import Head from 'next/head';
import { useRouter } from 'next/router';
import Header from 'components/header';
import { useState, useEffect } from 'react';

import IncomeOverviewTable from 'components/incomes/IncomeOverviewTable';
import AddIncomeForm from 'components/incomes/Addincomedorm'; // Import the popup form
import EditIncomeForm from 'components/incomes/edditincomeform'; // Import the edit form
import incomeService from 'service/incomeService';
import { Income } from 'types';

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

  const [incomes, setIncomes] = useState<Income[]>([]);
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState<number | null>(null);

  const fetchIncomes = async () => {
    try {
      const data = await incomeService.getAllIncomes();
      setIncomes(data);
    } catch (error) {
      console.error('Failed to fetch incomes:', error);
    }
  };

  const handleIncomeAdded = () => {
    fetchIncomes(); // Refresh incomes when a new income is added
    setShowAddPopup(false);
  };

  const handleIncomeUpdated = () => {
    fetchIncomes(); // Refresh incomes when an income is updated
    setShowEditPopup(false);
  };

  const handleEdit = (incomeId: number) => {
    setSelectedIncomeId(incomeId);
    setShowEditPopup(true);
  };

  useEffect(() => {
    if (!isAuthenticated) {
      // If not authenticated, no need to fetch data
      return;
    }
    fetchIncomes();
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Incomes</title>
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
        <title>Incomes</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100 pt-8">
        <section className="w-full max-w-4xl p-4">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowAddPopup(true)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Add Income
            </button>
          </div>
          <div className="mt-8">
            <IncomeOverviewTable
              incomes={incomes}
              selectIncome={() => {}}
              onEdit={handleEdit}
            />
          </div>
        </section>
      </main>

      {/* Add Popup */}
      {isAuthenticated && showAddPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <AddIncomeForm
            onClose={() => setShowAddPopup(false)}
            onIncomeAdded={handleIncomeAdded}
          />
        </div>
      )}

      {/* Edit Popup */}
      {isAuthenticated && showEditPopup && selectedIncomeId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <EditIncomeForm
            onClose={() => setShowEditPopup(false)}
            onIncomeUpdated={handleIncomeUpdated}
            incomeId={selectedIncomeId}
          />
        </div>
      )}
    </>
  );
};

export default Home;