import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Button from '../common/Button';
import Input from '../common/Input';

type WorkoutFormProps = {
  onSubmit: (data: WorkoutFormData) => void;
  isLoading?: boolean;
};

export type WorkoutExercise = {
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
};

export type WorkoutFormData = {
  exercises: WorkoutExercise[];
};

const WorkoutForm: React.FC<WorkoutFormProps> = ({ onSubmit, isLoading = false }) => {
  const { register, control, handleSubmit, formState: { errors } } = useForm<WorkoutFormData>({
    defaultValues: {
      exercises: [{ exerciseName: '', sets: 3, reps: 10, weight: 0 }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'exercises',
  });
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div key={field.id} className="p-4 border border-gray-200 rounded-md">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-medium">エクササイズ {index + 1}</h3>
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
                id={`exercises.${index}.sets`}
                label="セット数"
                type="number"
                error={errors.exercises?.[index]?.sets?.message}
                {...register(`exercises.${index}.sets` as const, {
                  required: 'セット数は必須です',
                  min: { value: 1, message: '1以上の値を入力してください' },
                  valueAsNumber: true
                })}
              />
              
              <Input
                id={`exercises.${index}.reps`}
                label="レップ数"
                type="number"
                error={errors.exercises?.[index]?.reps?.message}
                {...register(`exercises.${index}.reps` as const, {
                  required: 'レップ数は必須です',
                  min: { value: 1, message: '1以上の値を入力してください' },
                  valueAsNumber: true
                })}
              />
              
              <Input
                id={`exercises.${index}.weight`}
                label="重量 (kg)"
                type="number"
                error={errors.exercises?.[index]?.weight?.message}
                {...register(`exercises.${index}.weight` as const, {
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
          onClick={() => append({ exerciseName: '', sets: 3, reps: 10, weight: 0 })}
        >
          エクササイズを追加
        </Button>
        
        <Button
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? '保存中...' : 'ワークアウトを記録'}
        </Button>
      </div>
    </form>
  );
};

export default WorkoutForm;
