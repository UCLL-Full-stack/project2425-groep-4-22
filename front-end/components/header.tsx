import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import userService from 'service/userService'; // Adjust the import path as needed

const Header: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    setLoggedIn(userService.isLoggedIn());
  }, []);

  const handleLogout = () => {
    userService.logout();
  };

  return (
    <header className="bg-gray-800 p-4">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/users" legacyBehavior>
              <a className="text-white hover:text-gray-400">Users</a>
            </Link>
          </li>
          <li>
            <Link href="/expenses" legacyBehavior>
              <a className="text-white hover:text-gray-400">Expenses</a>
            </Link>
          </li>
          <li>
            <Link href="/incomes" legacyBehavior>
              <a className="text-white hover:text-gray-400">Incomes</a>
            </Link>
          </li>
          {loggedIn ? (
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-400"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" legacyBehavior>
                <a className="text-white hover:text-gray-400">Login</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;