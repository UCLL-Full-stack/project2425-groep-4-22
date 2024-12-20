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
  const [isAdmin, setIsAdmin] = useState(false);
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
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const decodedToken = JSON.parse(jsonPayload);

      if (decodedToken.role === 'Admin') {
        setIsAuthenticated(true);
        setIsAdmin(true);
        getUsers(); // Fetch users if the token exists and the user is an admin
      } else {
        setIsAuthenticated(true);
        setIsAdmin(false);
      }
    } else {
      setIsAuthenticated(false);
      setIsAdmin(false);
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

  if (!isAdmin) {
    return (
      <>
        <Head>
          <title>Users</title>
        </Head>
        <Header />
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-2xl font-bold text-red-500 mb-4">Access Denied</h1>
          <p className="mb-6 text-lg">You do not have permission to access this page.</p>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Go to Home Page
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