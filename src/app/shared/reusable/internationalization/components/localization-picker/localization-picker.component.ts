import { Component, computed, inject, input } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { ILocalisation } from '../../interfaces';
import { LocalisationService } from '../../services';

@Component({
  selector: 'shared-localization-picker',
  imports: [MatButtonModule, MatMenuModule],
  templateUrl: './localization-picker.component.html',
  styleUrl: './localization-picker.component.scss',
})
export class LocalizationPickerComponent {
  public availableLocalisations = input.required<ILocalisation[]>();

  private readonly localisationService = inject(LocalisationService);

  public readonly curentLocalisation = computed(() => {
    const localisations = this.availableLocalisations();
    return localisations.length > 0
      ? this.localisationService.getCurrentLanguage(localisations)
      : null;
  });

  public handleLocalisationChange(localisationCode: string) {
    this.localisationService.changeLocalisation(localisationCode, this.availableLocalisations());
  }
}
