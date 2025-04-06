'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import RegisterForm from '../../../components/auth/RegisterForm';
import Card from '../../../components/common/Card';

export default function RegisterPage() {
  const router = useRouter();
  
  const handleRegisterSuccess = () => {
    router.push('/dashboard');
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">ムキムキ管理</h1>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">新規登録</h2>
        </div>
        
        <Card>
          <RegisterForm onSuccess={handleRegisterSuccess} />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              すでにアカウントをお持ちの方は{' '}
              <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                ログイン
              </Link>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
