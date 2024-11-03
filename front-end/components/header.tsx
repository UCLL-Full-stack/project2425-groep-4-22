import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/users" legacyBehavior>
              <a>Users</a>
            </Link>
            <Link href="/expenses" legacyBehavior>
              <a>Expenses</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;