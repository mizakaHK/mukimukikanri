'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Button from '../components/common/Button';

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header isAuthenticated={isAuthenticated} />
      
      <main className="flex-grow">
        <div className="bg-blue-600 text-white">
          <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
                ムキムキ管理
              </h1>
              <p className="mt-6 text-xl">
                筋トレの記録と計画を簡単に管理できるアプリケーション。
                あなたのトレーニングをより効果的に、より楽しく。
              </p>
              <div className="mt-10 flex space-x-4">
                {isAuthenticated ? (
                  <Button
                    variant="primary"
                    onClick={() => router.push('/dashboard')}
                    className="bg-white text-blue-600 hover:bg-gray-100"
                  >
                    ダッシュボードへ
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => router.push('/login')}
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      ログイン
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => router.push('/register')}
                      className="border-white text-white hover:bg-blue-700"
                    >
                      新規登録
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">ワークアウト記録</h2>
              <p className="text-gray-600">
                日々のトレーニングを簡単に記録。エクササイズ、セット数、レップ数、重量を管理できます。
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">ワークアウトプラン</h2>
              <p className="text-gray-600">
                効果的なトレーニングプランを作成。目標に合わせたプランで効率的に筋トレを行えます。
              </p>
            </div>
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">進捗管理</h2>
              <p className="text-gray-600">
                トレーニングの進捗を視覚的に確認。モチベーション維持に役立ちます。
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
