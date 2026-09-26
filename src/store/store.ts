import { configureStore, combineReducers } from '@reduxjs/toolkit';
import appReducer from './appSlice';
import tasksReducer from './tasksSlice';
import uiReducer from './uiSlice';

const STATE_KEY = 'kanbly-state';

export const loadState = () => {
  try {
    if (typeof window === 'undefined') return undefined; // Ensure we only access localStorage on the client
    const serializedState = localStorage.getItem(STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    const parsed = JSON.parse(serializedState);

    return {
      app: {
        currentField: parsed.app?.currentField ?? null,
        // Provide defaults for UI state so they aren't overwritten as undefined
        isSidebarOpen: true,
        activeView: 'board' as const,
      },
      tasks: parsed.tasks,
    };
  } catch (err) {
    console.error("Could not load state from localStorage", err);
    return undefined;
  }
};

const saveState = (state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (err) {
    console.error("Could not save state to localStorage", err);
  }
};

const appReducers = combineReducers({
  app: appReducer,
  tasks: tasksReducer,
  ui: uiReducer,
});

type CombinedState = ReturnType<typeof appReducers>;

const rootReducer = (state: CombinedState | undefined, action: any): CombinedState => {
  if (action.type === 'HYDRATE_STATE' && state) {
    return {
      ...state,
      app: {
        ...state.app,
        ...(action.payload.app || {}),
      },
      tasks: action.payload.tasks || state.tasks,
    };
  }
  return appReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
});

// Debounce the save operation to avoid writing to localStorage too frequently
let timeoutId: ReturnType<typeof setTimeout> | null = null;

store.subscribe(() => {
  if (timeoutId) {
    clearTimeout(timeoutId);
  }
  timeoutId = setTimeout(() => {
    const state = store.getState();
    saveState({
      app: {
        currentField: state.app.currentField,
      },
      tasks: state.tasks,
      // Intentionally omitting 'ui' slice and other 'app' slice properties
    });
  }, 800); // 800ms debounce
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
