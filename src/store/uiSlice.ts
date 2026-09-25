import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PendingDelete {
  id: string;       // task id
  title: string;    // shown in toast
}

export interface GenericToast {
  id: string;
  message: string;
  icon?: string;
  iconColor?: string;
}

interface UIState {
  pendingDeletes: PendingDelete[];
  toasts: GenericToast[];
}

const initialState: UIState = {
  pendingDeletes: [],
  toasts: [],
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    enqueuePendingDelete: (state, action: PayloadAction<PendingDelete>) => {
      // Prevent duplicates
      if (!state.pendingDeletes.find((d) => d.id === action.payload.id)) {
        state.pendingDeletes.push(action.payload);
      }
    },
    cancelPendingDelete: (state, action: PayloadAction<string>) => {
      state.pendingDeletes = state.pendingDeletes.filter(
        (d) => d.id !== action.payload
      );
    },
    commitPendingDelete: (state, action: PayloadAction<string>) => {
      state.pendingDeletes = state.pendingDeletes.filter(
        (d) => d.id !== action.payload
      );
    },
    enqueueToast: (state, action: PayloadAction<GenericToast>) => {
      state.toasts.push(action.payload);
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { enqueuePendingDelete, cancelPendingDelete, commitPendingDelete, enqueueToast, removeToast } =
  uiSlice.actions;

export default uiSlice.reducer;
