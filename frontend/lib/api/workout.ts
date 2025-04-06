import apiClient from './client';

export type WorkoutRecord = {
  id?: number;
  userId?: number;
  exerciseName: string;
  sets: number;
  reps: number;
  weight: number;
  recordedAt?: string;
};

export const getWorkouts = async () => {
  const { data } = await apiClient.get<WorkoutRecord[]>('/workout');
  return data;
};

export const createWorkout = async (workout: WorkoutRecord) => {
  const { data } = await apiClient.post<WorkoutRecord>('/workout', {
    ...workout,
    recordedAt: workout.recordedAt || new Date().toISOString(),
  });
  return data;
};
