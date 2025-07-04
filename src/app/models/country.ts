export interface Country {
  name: CountryName;
  capital: string[];
  region: Region;
  subregion?: string;
  flags: {
    png: string;
    svg?: string;
    alt?: string;
  };
  population: number;
  cca3: string;
  tld?: string[];
  currencies?: {
    [currencyCode: string]: {
      symbol: string;
      name: string;
    };
  };
  languages?: {
    [languageCode: string]: string;
  };
  borders?: string[];
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
