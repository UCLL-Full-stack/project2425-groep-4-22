import Head from 'next/head';
import Header from '../../components/header';
import { useState, useEffect } from 'react';
import userService from '../../service/userService';
import UsersOverviewTable from '../../components/users/UsersOverviewTable';
import { User } from '../../types';

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const getUsers = async () => {
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Head>
        <title>Users</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        
        <section>
          
          <UsersOverviewTable users={users} selectUser={setSelectedUser} />
        </section>
      </main>
    </>
  );
};

export default Users;