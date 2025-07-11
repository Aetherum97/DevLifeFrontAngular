import { Injectable } from '@angular/core';
import { isSerializable } from '../utils';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  setItem<T>(key: string, value: T): void {
    const stringValue = isSerializable(value)
      ? JSON.stringify(value)
      : String(value);

    try {
      localStorage.setItem(key, stringValue);
    } catch (error) {
      console.error('Error on localStorage in setItem method :', error);
    }
  }

  getItem<T = unknown>(key: string): T | string | null {
    const rawValue = localStorage.getItem(key);
    if (rawValue == null) {
      return null;
    }

    try {
      return JSON.parse(rawValue);
    } catch {
      return rawValue;
    }
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
