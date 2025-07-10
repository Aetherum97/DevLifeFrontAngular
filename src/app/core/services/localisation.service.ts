import { inject, Injectable, LOCALE_ID, signal } from '@angular/core';
import { AVAILABLE_LOCALISATION } from '../../config';
import { ILanguage } from '../Interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalisationService {
  private readonly currentLocale = inject(LOCALE_ID);

  public readonly availableLocalisation: ILanguage[] = AVAILABLE_LOCALISATION;
  public currentLocalisation = signal<string>(this.currentLocale);

  constructor() {
    this.currentLocalisation.set(this.currentLocale);
  }

  public changeLocalisation(localisationCode: string): void {
    const targetLanguage = this.getLanguageInfo(localisationCode);

    if (this.currentLocale === targetLanguage.code) {
      return; 
    }

    const targetUrl = this.buildTargetUrl(targetLanguage);

    window.location.href = targetUrl;
  }

  private getLanguageInfo(localisationCode: string): ILanguage {
    const language = this.availableLocalisation.find(
      (lang) => lang.code === localisationCode
    );

    if (!language) {
      throw new Error(`Langue non supportée: ${localisationCode}`);
    }

    return language;
  }

  private buildTargetUrl(targetLanguage: ILanguage): string {
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const currentHash = window.location.hash;

    const cleanPath = this.removeLanguagePrefix(currentPath);

    const basePath =
      targetLanguage.code === 'fr' ? '' : `/${targetLanguage.code}`;
    return `${window.location.origin}${basePath}${cleanPath}${currentSearch}${currentHash}`;
  }

  private removeLanguagePrefix(path: string): string {
    const segments = path.split('/');

    if (segments.length > 1 && this.isLanguageCode(segments[1])) {
      return '/' + segments.slice(2).join('/');
    }

    return path;
  }

  private isLanguageCode(segment: string): boolean {
    return this.availableLocalisation.some((lang) => lang.code === segment);
  }

  public getCurrentLanguage(): ILanguage {
    return this.getLanguageInfo(this.currentLocale);
  }
}
