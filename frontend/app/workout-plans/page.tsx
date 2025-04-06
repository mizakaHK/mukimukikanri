'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import apiClient from '../../lib/api/client';

type WorkoutPlan = {
  id: number;
  userId: number;
  name: string;
  description: string;
  exercises: {
    exerciseName: string;
    targetSets: number;
    targetReps: number;
    targetWeight: number;
  }[];
  createdAt: string;
};

export default function WorkoutPlansPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [plans, setPlans] = useState<WorkoutPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  useEffect(() => {
    const fetchPlans = async () => {
      if (!isAuthenticated) return;
      
      try {
        setIsLoading(true);
        const { data } = await apiClient.get<WorkoutPlan[]>('/workout-plans');
        setPlans(data);
      } catch (err) {
        setError('ワークアウトプランの取得に失敗しました');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPlans();
  }, [isAuthenticated]);
  
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">ワークアウトプラン</h1>
          <Button
            variant="primary"
            onClick={() => router.push('/workout-plans/new')}
          >
            新規プラン作成
          </Button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <p className="text-center py-8">読み込み中...</p>
        ) : plans.length === 0 ? (
          <Card>
            <p className="text-center py-4 text-gray-600">
              ワークアウトプランがありません。新しくプランを作成してください。
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                title={plan.name}
                className="hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => router.push(`/workout-plans/${plan.id}`)}
              >
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <p className="text-sm text-gray-500 mb-2">エクササイズ: {plan.exercises.length}種類</p>
                <p className="text-sm text-gray-500">
                  作成日: {new Date(plan.createdAt).toLocaleDateString('ja-JP')}
                </p>
              </Card>
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
