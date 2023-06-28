import { Dictionaries } from '../i18n/dictionaries/types';

const dictionaries: any = {
  pt: () => import('@/app/i18n/dictionaries/pt.json').then((module): Dictionaries => module.default),
  en: () => import('@/app/i18n/dictionaries/en.json').then((module): Dictionaries => module.default),
};
 
export const getDictionary = async (locale: string) => dictionaries[locale]();