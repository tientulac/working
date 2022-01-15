import { InjectionToken } from '@angular/core';

export interface AppConfiguration {
  production: boolean;
  QA_API: string;
  System_API: string;
}

export const AppConfig = new InjectionToken<AppConfiguration>(
  '@@appConfiguration'
);
