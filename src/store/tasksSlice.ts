import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { TaskCard, TaskStatus, TaskStage, FieldId } from '@/types';
import { SEED_TASKS } from '@/config/seedTasks';

interface TasksState {
  tasks: TaskCard[];
}

const initialState: TasksState = {
  tasks: [],
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    seedTasksForRole: (state, action: PayloadAction<FieldId>) => {
      state.tasks = SEED_TASKS[action.payload].map((t) => ({
        ...t,
        id: crypto.randomUUID(),
      }));
    },
    addTask: (
      state,
      action: PayloadAction<{ tag: string; title: string; description: string; dueDate: string }>
    ) => {
      state.tasks.push({
        ...action.payload,
        id: crypto.randomUUID(),
        comments: 0,
        avatars: [],
        status: 'drafting',
        stage: 'active',
      });
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
    },
    moveTaskStatus: (
      state,
      action: PayloadAction<{ id: string; status: TaskStatus }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.status = action.payload.status;
    },
    moveTaskStage: (
      state,
      action: PayloadAction<{ id: string; stage: TaskStage }>
    ) => {
      const task = state.tasks.find((t) => t.id === action.payload.id);
      if (task) task.stage = action.payload.stage;
    },
  },
});

export const { seedTasksForRole, addTask, deleteTask, moveTaskStatus, moveTaskStage } =
  tasksSlice.actions;

export default tasksSlice.reducer;
