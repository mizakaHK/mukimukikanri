'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import Header from '../../../components/common/Header';
import Footer from '../../../components/common/Footer';
import Card from '../../../components/common/Card';
import PlanForm, { PlanFormData } from '../../../components/workout-plan/PlanForm';
import apiClient from '../../../lib/api/client';

export default function NewPlanPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  const handleSubmit = async (data: PlanFormData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      await apiClient.post('/workout-plans', {
        ...data,
        createdAt: new Date().toISOString(),
      });
      
      router.push('/workout-plans');
    } catch (err) {
      setError('ワークアウトプランの保存に失敗しました');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  
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
        <div className="mb-6">
          <h1 className="text-2xl font-bold">ワークアウトプラン作成</h1>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <Card>
          <PlanForm onSubmit={handleSubmit} isLoading={isLoading} />
        </Card>
      </main>
      
      <Footer />
    </div>
  );
}
