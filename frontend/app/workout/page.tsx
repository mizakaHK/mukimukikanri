'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import apiClient from '../../lib/api/client';

type WorkoutRecord = {
  id: number;
  userId: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
  recordedAt: string;
};

export default function WorkoutPage() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [workouts, setWorkouts] = useState<WorkoutRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);
  
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!isAuthenticated) return;
      
      try {
        setIsLoading(true);
        const { data } = await apiClient.get<WorkoutRecord[]>('/workout');
        setWorkouts(data);
      } catch (err) {
        setError('ワークアウト記録の取得に失敗しました');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchWorkouts();
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
          <h1 className="text-2xl font-bold">ワークアウト記録</h1>
          <Button
            variant="primary"
            onClick={() => router.push('/workout/new')}
          >
            新規記録
          </Button>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        {isLoading ? (
          <p className="text-center py-8">読み込み中...</p>
        ) : workouts.length === 0 ? (
          <Card>
            <p className="text-center py-4 text-gray-600">
              ワークアウト記録がありません。新しく記録を追加してください。
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workouts.map((workout) => (
              <Card key={workout.id} className="hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-medium mb-2">{workout.exerciseName}</h3>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div>
                    <p className="text-sm text-gray-500">セット</p>
                    <p className="font-medium">{workout.sets}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">レップ</p>
                    <p className="font-medium">{workout.reps}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">重量</p>
                    <p className="font-medium">{workout.weight} kg</p>
                  </div>
                </div>
                <p className="text-sm text-gray-500">
                  {new Date(workout.recordedAt).toLocaleString('ja-JP')}
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
