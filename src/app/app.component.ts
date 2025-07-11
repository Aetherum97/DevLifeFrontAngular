import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AVAILABLE_LOCALISATION } from './config';
import { LocalizationPickerComponent } from './shared/reusable/internationalization';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink, LocalizationPickerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public availableLocalisation = AVAILABLE_LOCALISATION;
  public username = signal<string>('User');
  public messageCount = signal<number>(3);
  public items = signal<{ id: number }[]>([{ id: 1 }, { id: 2 }, { id: 3 }]);
}
