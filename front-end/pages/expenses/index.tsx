import Head from 'next/head';
import Header from 'components/header';
import { useState } from 'react';
import AddExpenseForm from 'components/expenses/Addexpense';

const Home: React.FC = () => {
  const [expenses, setExpenses] = useState([]);

  const handleExpenseAdded = () => {
    // Fetch the updated list of expenses or handle the new expense addition
    console.log('Expense added');
  };

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>Home</h1>
        <section>
          <h2>Add Expense</h2>
          <AddExpenseForm onExpenseAdded={handleExpenseAdded} />
        </section>
      </main>
    </>
  );
};

export default Home;