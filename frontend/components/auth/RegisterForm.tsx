import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';
import { useAuth } from '../../context/AuthContext';

type RegisterFormProps = {
  onSuccess?: () => void;
};

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSuccess }) => {
  const { register: registerUser } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const { register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>();
  const password = watch('password');
  
  const onSubmit = async (data: RegisterFormData) => {
    setError(null);
    setIsLoading(true);
    
    try {
      await registerUser(data.email, data.password);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      setError(err.response?.data?.message || '登録に失敗しました。もう一度お試しください。');
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
      
      <Input
        id="confirmPassword"
        label="パスワード（確認）"
        type="password"
        error={errors.confirmPassword?.message}
        {...register('confirmPassword', { 
          required: 'パスワード（確認）は必須です',
          validate: value => value === password || 'パスワードが一致しません'
        })}
      />
      
      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? '登録中...' : '新規登録'}
      </Button>
    </form>
  );
};

export default RegisterForm;
