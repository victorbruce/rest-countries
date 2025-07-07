import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { toggleTheme, setTheme } from '../../store/actions/theme.actions';
import { selectThemeMode } from '../../store/reducers/theme.reducers';
import { CommonModule, AsyncPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-navbar',
  imports: [RouterModule, CommonModule, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit{
  private store = inject(Store);
  themeMode$ = this.store.select(selectThemeMode);

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      this.store.dispatch(setTheme({ mode: savedTheme }));
    }
  }

  onToggle() {
    this.store.dispatch(toggleTheme());
  }
}
