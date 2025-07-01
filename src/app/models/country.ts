export interface Country {
  name: CountryName;
  capital: string[];
  region: Region;
  flag: string;
  population: number;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName: {
    [languageCode: string]: NativeLanguageName;
  };
}

export interface NativeLanguageName {
  official: string;
  common: string;
}

export enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania',
  Antarctic = 'Antarctic',
}
