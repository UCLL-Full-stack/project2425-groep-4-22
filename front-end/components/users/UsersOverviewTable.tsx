import React from 'react';
import { useRouter } from 'next/router';
import { User } from '../../types/index';

type Props = {
  users: Array<User>;
  selectUser: (user: User) => void;
};

const UsersOverviewTable: React.FC<Props> = ({ users, selectUser }: Props) => {
  const router = useRouter();

  const handleUserClick = (user: User) => {
    selectUser(user);
    router.push(`/users/${user.userId}`);
  };

  return (
    <>
      {users && (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Firstname</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lastname</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user, index) => (
              <tr key={index} onClick={() => handleUserClick(user)} className="hover:bg-gray-100 cursor-pointer">
                <td className="px-6 py-4 whitespace-nowrap">{user.firstName}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UsersOverviewTable;