import { createReducer, on } from '@ngrx/store';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { initialThemeState, ThemeMode, ThemeState } from '../state/theme.state';
import { toggleTheme, setTheme } from '../actions/theme.actions';

export const themeReducer = createReducer(
  initialThemeState,
  on(toggleTheme, (state) => ({
    ...state,
    mode: (state.mode === 'light' ? 'dark' : 'light') as ThemeMode,
  })),
  on(setTheme, (state, { mode }) => ({
    ...state,
    mode,
  }))
);

export const selectThemeState = createFeatureSelector<ThemeState>('theme');

export const selectThemeMode = createSelector(
  selectThemeState,
  (state) => state.mode
);
