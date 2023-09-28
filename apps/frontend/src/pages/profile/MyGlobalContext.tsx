import { createContext, useContext } from 'react';
export type GlobalContent = {
  isEditable: boolean;
  setisEditable: (c: boolean) => void;
  isChangePass: boolean;
  setIsChangePass: (c: boolean) => void;
};
export const MyGlobalContext = createContext<GlobalContent>({
  isEditable: false, // set a default value
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setisEditable: () => {},
  isChangePass: false, // set a default value
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsChangePass: () => {},
});
export const useGlobalContext = () => useContext(MyGlobalContext);
