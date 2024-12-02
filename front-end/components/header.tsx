import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
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
        </ul>
      </nav>
    </header>
  );
};

export default Header;