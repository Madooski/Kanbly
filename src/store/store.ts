import { configureStore } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import tasksReducer from './tasksSlice';
import uiReducer from './uiSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    tasks: tasksReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
