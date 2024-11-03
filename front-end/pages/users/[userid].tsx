import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import userService from '../../service/userService';
import { User } from '../../types';
import Head from 'next/head';
import Header from '../../components/header';
import UserDetails from '../../components/users/UserDetails';

const UserPage: React.FC = () => {
  const router = useRouter();
  const { userid } = router.query;
  const [user, setUser] = useState<User | null>(null);

  const getUserDetails = async (id: string) => {
    try {
      const data = await userService.getUserById(id);
      setUser(data);
    } catch (error) {
      console.error('Failed to fetch user details:', error);
    }
  };

  useEffect(() => {
    if (userid) {
      getUserDetails(userid as string);
    }
  }, [userid]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Head>
        <title>User Details</title>
      </Head>
      <Header />
      <main className="d-flex flex-column justify-content-center align-items-center">
        <h1>User Details</h1>
        <UserDetails user={user} />
      </main>
    </>
  );
};

export default UserPage;