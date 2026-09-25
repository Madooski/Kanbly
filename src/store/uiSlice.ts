import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PendingDelete {
  id: string;       // task id
  title: string;    // shown in toast
}

interface UIState {
  pendingDeletes: PendingDelete[];
}

const initialState: UIState = {
  pendingDeletes: [],
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
  },
});

export const { enqueuePendingDelete, cancelPendingDelete, commitPendingDelete } =
  uiSlice.actions;

export default uiSlice.reducer;
