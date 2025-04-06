import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600 text-sm">
              © {currentYear} ムキムキ管理. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              利用規約
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              プライバシーポリシー
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 text-sm">
              お問い合わせ
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
