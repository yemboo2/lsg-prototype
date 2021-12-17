// import Cookies from 'universal-cookie';
import cookies from 'react-cookies';

import { ISequence } from '../interfaces/sequence-interface';

const expires = new Date();
expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 365);

const COOKIE_OPTIONS = {
  expires,
};

// Getter & setter
const getCookie = (key: string) => cookies.load(key);
const setCookie = (key: string, value: any) => cookies.save(key, value, COOKIE_OPTIONS);

/* ---- */

// User-id
const USER_ID_COOKIE_KEY = 'lsg_user_id';
export const getUserId = (): string | undefined => getCookie(USER_ID_COOKIE_KEY);
export const setUserId = (id: string) => setCookie(USER_ID_COOKIE_KEY, id);

/* ---- */

// User-sequence
const USER_SEQUENCE_COOKIE_KEY = 'lsg_user_sequence';
export const getUserSequences = (): ISequence[] | undefined => getCookie(USER_SEQUENCE_COOKIE_KEY);
export const setUserSequences = (userSequences: ISequence[]) =>
  setCookie(USER_SEQUENCE_COOKIE_KEY, JSON.stringify(userSequences));
