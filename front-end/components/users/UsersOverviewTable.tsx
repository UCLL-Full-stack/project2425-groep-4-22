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
        <table className="table table-hover">
          <thead>
            <tr>
              <th scope="col">Firstname</th>
              <th scope="col">Lastname</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index} onClick={() => handleUserClick(user)} role="button">
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default UsersOverviewTable;