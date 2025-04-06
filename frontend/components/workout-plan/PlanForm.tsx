import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';

type PlanFormProps = {
  onSubmit: (data: PlanFormData) => void;
  isLoading?: boolean;
};

export type PlanExercise = {
  exerciseName: string;
  targetSets: number;
  targetReps: number;
  targetWeight: number;
};

export type PlanFormData = {
  name: string;
  description: string;
  exercises: PlanExercise[];
};

const PlanForm: React.FC<PlanFormProps> = ({ onSubmit, isLoading = false }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<PlanFormData>({
    defaultValues: {
      name: '',
      description: '',
      exercises: [{ exerciseName: '', targetSets: 3, targetReps: 10, targetWeight: 0 }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Input
        id="name"
        label="プラン名"
        placeholder="週2回の全身トレーニング"
        error={errors.name?.message}
        {...register('name', {
          required: 'プラン名は必須です'
        })}
      />
      
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          説明
        </label>
        <textarea
          id="description"
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          rows={3}
          placeholder="このプランの目的や注意点など"
          {...register('description')}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>
      
      <h3 className="text-lg font-medium">エクササイズ</h3>
      
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-medium">エクササイズ {index + 1}</h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  削除
                </button>
              )}
            </div>
            
            <Input
              id={`exercises.${index}.exerciseName`}
              label="エクササイズ名"
              placeholder="ベンチプレス"
              error={errors.exercises?.[index]?.exerciseName?.message}
              {...register(`exercises.${index}.exerciseName` as const, {
                required: 'エクササイズ名は必須です'
              })}
            />
            
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Input
                id={`exercises.${index}.targetSets`}
                label="目標セット数"
                type="number"
                error={errors.exercises?.[index]?.targetSets?.message}
                {...register(`exercises.${index}.targetSets` as const, {
                  required: 'セット数は必須です',
                  min: { value: 1, message: '1以上の値を入力してください' },
                  valueAsNumber: true
                })}
              />
              
              <Input
                id={`exercises.${index}.targetReps`}
                label="目標レップ数"
                type="number"
                error={errors.exercises?.[index]?.targetReps?.message}
                {...register(`exercises.${index}.targetReps` as const, {
                  required: 'レップ数は必須です',
                  min: { value: 1, message: '1以上の値を入力してください' },
                  valueAsNumber: true
                })}
              />
              
              <Input
                id={`exercises.${index}.targetWeight`}
                label="目標重量 (kg)"
                type="number"
                error={errors.exercises?.[index]?.targetWeight?.message}
                {...register(`exercises.${index}.targetWeight` as const, {
                  required: '重量は必須です',
                  min: { value: 0, message: '0以上の値を入力してください' },
                  valueAsNumber: true
                })}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={() => append({ exerciseName: '', targetSets: 3, targetReps: 10, targetWeight: 0 })}
        >
          エクササイズを追加
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? '保存中...' : 'プランを保存'}
        </Button>
      </div>
    </form>
  );
};

export default PlanForm;
