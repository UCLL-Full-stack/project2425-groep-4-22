import Head from 'next/head';
import Header from '../../components/header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import userService from '../../service/userService';
import UsersOverviewTable from '../../components/users/UsersOverviewTable';
import { User } from '../../types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const getUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    const token = sessionStorage.getItem('token'); // Fix: Use the correct key
    if (token) {
      setIsAuthenticated(true);
      getUsers(); // Fetch users if the token exists
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <Head>
          <title>Users</title>
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
        <title>Users</title>
      </Head>
      <Header />
      <main className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
        <section className="w-full max-w-4xl p-4">
          <h1 className="text-2xl font-bold mb-4">Users Overview</h1>
          <UsersOverviewTable users={users} selectUser={() => {}} />
        </section>
      </main>
    </>
  );
};

export default Users;
