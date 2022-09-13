import { createContext, useContext } from 'react';
//登入狀態
export const UserRights = createContext();

export function useUserRights() {
  return useContext(UserRights);
}
