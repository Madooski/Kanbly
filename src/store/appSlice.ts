import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { FieldId } from '@/types';
import { ROLE_CONFIG } from '@/config/roleConfig';
import type { RootState } from './store';

export type ActiveView = 'board' | 'planning' | 'archive';

interface AppState {
  currentField: FieldId | null;
  isSidebarOpen: boolean;
  activeView: ActiveView;
}

const initialState: AppState = {
  currentField: null,
  isSidebarOpen: true,
  activeView: 'board',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setCurrentField: (state, action: PayloadAction<FieldId | null>) => {
      state.currentField = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    setActiveView: (state, action: PayloadAction<ActiveView>) => {
      state.activeView = action.payload;
    },
    logout: (state) => {
      state.currentField = null;
      state.isSidebarOpen = false;
      state.activeView = 'board';
    },
  },
});

export const { setCurrentField, toggleSidebar, setSidebarOpen, setActiveView, logout } = appSlice.actions;

export const selectColumnLabels = (state: RootState) => {
  const currentField = state.app.currentField;
  if (currentField && ROLE_CONFIG[currentField]) {
    return ROLE_CONFIG[currentField].columns;
  }
  return { drafting: "To Do", review: "In Progress", scheduled: "Done" };
};

export default appSlice.reducer;
