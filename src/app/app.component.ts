import { Component, inject, signal } from '@angular/core';
import { LocalisationService } from './core/services';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private readonly localisationService = inject(LocalisationService);

  public username = signal<string>('User');
  public messageCount = signal<number>(3);
  public items = signal<{ id: number }[]>([{ id: 1 }, { id: 2 }, { id: 3 }]);

  public isDropdownOpen = signal(false);
  public currentLanguage = this.localisationService.getCurrentLanguage();
  public availableLanguages = this.localisationService.availableLocalisation;

  toggleDropdown(): void {
    this.isDropdownOpen.update((current) => !current);
  }

  closeDropdown(): void {
    this.isDropdownOpen.set(false);
  }

  selectLanguage(langCode: string): void {
    this.localisationService.changeLocalisation(langCode);
  }
}
