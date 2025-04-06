'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export default function DashboardPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  const handleLogout = () => {
    logout();
    router.push('/login');
  };
  
  if (!isAuthenticated) {
    return null; // リダイレクト中は何も表示しない
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">ダッシュボード</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card title="最近のワークアウト" className="h-64">
            <p className="text-gray-600">まだワークアウト記録がありません。</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => router.push('/workout/new')}
            >
              ワークアウトを記録する
            </Button>
          </Card>
          
          <Card title="ワークアウトプラン" className="h-64">
            <p className="text-gray-600">まだワークアウトプランがありません。</p>
            <Button
              variant="primary"
              className="mt-4"
              onClick={() => router.push('/workout-plans/new')}
            >
              プランを作成する
            </Button>
          </Card>
          
          <Card title="統計" className="h-64">
            <p className="text-gray-600">ワークアウトを記録して統計を表示します。</p>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
