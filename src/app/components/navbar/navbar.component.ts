import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleTheme } from '../../store/actions/theme.actions';
import { selectThemeMode } from '../../store/reducers/theme.reducers';
import { CommonModule, AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-navbar',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private store = inject(Store);
  themeMode$ = this.store.select(selectThemeMode);

  onToggle() {
    this.store.dispatch(toggleTheme());
  }
}
