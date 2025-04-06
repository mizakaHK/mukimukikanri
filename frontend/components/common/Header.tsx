import React from 'react';
import Link from 'next/link';

type HeaderProps = {
  isAuthenticated?: boolean;
  onLogout?: () => void;
};

const Header: React.FC<HeaderProps> = ({ isAuthenticated = false, onLogout }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-blue-600">
                ムキムキ管理
              </Link>
            </div>
            {isAuthenticated && (
              <nav className="ml-6 flex space-x-4 items-center">
                <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  ダッシュボード
                </Link>
                <Link href="/workout" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  ワークアウト記録
                </Link>
                <Link href="/workout-plans" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  ワークアウトプラン
                </Link>
              </nav>
            )}
          </div>
          <div className="flex items-center">
            {isAuthenticated ? (
              <button
                onClick={onLogout}
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
              >
                ログアウト
              </button>
            ) : (
              <div className="flex space-x-2">
                <Link href="/login" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
                  ログイン
                </Link>
                <Link href="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md">
                  新規登録
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
