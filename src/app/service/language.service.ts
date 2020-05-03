import {Injectable} from '@angular/core';

declare var languages: {
  isValid: (string) => boolean;
  getAllLanguageCode: () => Array<string>;
  getLanguageInfo: (string) => {
    name?: string,
    nativeName?: string,
    direction?: string,
  }
};

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private languageCodes: Array<string>;
  private languages: { [key: string]: string };

  constructor() {
    this.languageCodes = languages.getAllLanguageCode();
    this.languages = {};
    for (let i = 0; i < this.languageCodes.length; i++) {
      this.languages[this.languageCodes[i]] = languages.getLanguageInfo(this.languageCodes[i]).name;
    }
  }

  public getLanguages() {
    return this.languages;
  }

  public getLanguageInfo(langId: string) {
    return languages.getLanguageInfo(langId);
  }

  public getLanguageCodes() {
    return this.languageCodes;
  }

  public isValid(langId: string) {
    return languages.isValid(langId);
  }
}
