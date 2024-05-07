import { jwtDecode } from 'jwt-decode';
import { UserType } from '../types/data-types';

export function getTokenFromLocal() {
  return localStorage.getItem('token');
}

export function setTokenToLocal(token: string) {
  localStorage.setItem('token', token);
}

export function removeToken() {
  localStorage.removeItem('token');
}

export function decodeUser(token: string | null) {
  // checking if token exist
  if (!token) return null;
  // checking if the token if valid of not
  const user = jwtDecode(token);
  if (!user) return null;

  return user as UserType;
}
