import { productsController } from "@/config/productsControllers";
import { useQuery } from "@tanstack/react-query";

export const useProducts = () => {
  return useQuery(["PRODUCTS"], productsController.getProducts, {
    staleTime: Infinity,
  });
};
