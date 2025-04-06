import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';
import { useAuth } from '../../context/AuthContext';

type LoginFormProps = {
  onSuccess?: () => void;
};

type LoginFormData = {
  email: string;
  password: string;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSuccess }) => {
  const { login } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();
  
  const onSubmit = async (data: LoginFormData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await login(data.email, data.password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      setError('ログインに失敗しました。メールアドレスとパスワードを確認してください。');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <Input
        id="email"
        label="メールアドレス"
        type="email"
        placeholder="example@example.com"
        error={errors.email?.message}
        {...register('email', { 
          required: 'メールアドレスは必須です',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: '有効なメールアドレスを入力してください',
          }
        })}
      />
      
      <Input
        id="password"
        label="パスワード"
        type="password"
        error={errors.password?.message}
        {...register('password', { 
          required: 'パスワードは必須です',
          minLength: {
            value: 6,
            message: 'パスワードは6文字以上で入力してください',
          }
        })}
      />
      
      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'ログイン中...' : 'ログイン'}
      </Button>
    </form>
  );
};

export default LoginForm;
