import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { toggleTheme, setTheme } from '../actions/theme.actions';
import { tap, withLatestFrom } from 'rxjs/operators';
import { selectThemeMode } from '../reducers/theme.reducers';

@Injectable()
export class ThemeEffects {
  applyTheme$;
  constructor(private actions$: Actions, private store: Store) {
    this.applyTheme$ = createEffect(
      () =>
        this.actions$.pipe(
          ofType(toggleTheme, setTheme),
          withLatestFrom(this.store.select(selectThemeMode)),
          tap(([_, mode]) => {
            const html = document.documentElement;

            localStorage.setItem('theme', mode);
            if (mode === 'dark') {
              html.setAttribute('dark-theme', 'dark');
            } else {
              html.removeAttribute('dark-theme');
            }
          })
        ),
      { dispatch: false }
    );
  }
}
