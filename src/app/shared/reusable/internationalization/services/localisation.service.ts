import { inject, Injectable, LOCALE_ID, signal } from '@angular/core';
import { ILocalisation } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class LocalisationService {
  private readonly currentLocale = inject(LOCALE_ID);
  public currentLocalisation = signal<string>(this.currentLocale);

  constructor() {
    this.currentLocalisation.set(this.currentLocale);
    console.log(this.currentLocale);
  }

  public changeLocalisation(
    localisationCode: string,
    availableLocalisation: ILocalisation[]
  ): void {
    const targetLanguage = this.getLanguageInfo(
      localisationCode,
      availableLocalisation
    );

    if (this.currentLocale === targetLanguage.code) {
      return;
    }

    const targetUrl = this.buildTargetUrl(
      targetLanguage, 
      availableLocalisation
    );

    window.location.href = targetUrl;
  }

  private getLanguageInfo(
    localisationCode: string,
    availableLocalisation: ILocalisation[]
  ): ILocalisation {
    const language = availableLocalisation.find(
      (lang) => lang.code === localisationCode
    );

    if (!language) {
      throw new Error(`Langue non supportée: ${localisationCode}`);
    }

    return language;
  }

  private buildTargetUrl(
    targetLanguage: ILocalisation,
    availableLocalisation: ILocalisation[]
  ): string {
    const currentPath = window.location.pathname;
    const currentSearch = window.location.search;
    const currentHash = window.location.hash;

    const cleanPath = this.removeLanguagePrefix(
      currentPath,
      availableLocalisation
    );

    const basePath = `/${targetLanguage.code}`;
    return `${window.location.origin}${basePath}${cleanPath}${currentSearch}${currentHash}`;
  }

  private removeLanguagePrefix(
    path: string,
    availableLocalisation: ILocalisation[]
  ): string {
    const segments = path.split('/');

    if (
      segments.length > 1 &&
      this.isLanguageCode(segments[1], availableLocalisation)
    ) {
      return '/' + segments.slice(2).join('/');
    }

    return path;
  }

  private isLanguageCode(
    segment: string,
    availableLocalisation: ILocalisation[]
  ): boolean {
    return availableLocalisation.some((lang) => lang.code === segment);
  }

  public getCurrentLanguage(
    availableLocalisation: ILocalisation[]
  ): ILocalisation {
    return this.getLanguageInfo(this.currentLocale, availableLocalisation);
  }
}
