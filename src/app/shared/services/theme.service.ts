import { Injectable } from "@angular/core";

// theme.service.ts
@Injectable({ providedIn: 'root' })
export class ThemeService {
  setTheme(theme: 'light' | 'dark') {
    document.documentElement.classList.remove('light-theme', 'dark-theme');
    document.documentElement.classList.add(`${theme}-theme`);
    document.cookie = `theme=${theme}; path=/; SameSite=Lax;`;
  }

  getTheme(): 'light' | 'dark' {
    const match = document.cookie.match(/theme=(dark|light)/);
    return match ? (match[1] as 'light' | 'dark') : 'light';
  }
}
