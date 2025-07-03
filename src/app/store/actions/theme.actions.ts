import { createAction, props } from '@ngrx/store';
import { ThemeMode } from '../state/theme.state';

export const toggleTheme = createAction('[Theme] Toggle Theme');

export const setTheme = createAction(
  '[Theme] Set Theme',
  props<{ mode: ThemeMode }>()
);