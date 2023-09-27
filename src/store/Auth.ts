import { IAuth } from "@/Types/Auth";
import { create } from "zustand";

interface IUseAuthStore extends IAuth {
  setIsAuth: (isAuthenticated: boolean) => void;
}

export const useAuthStore = create<IUseAuthStore>()((set) => ({
  isAuth: false,
  setIsAuth: (isAuthenticated: boolean) =>
    set(() => ({ isAuth: isAuthenticated })),
}));
