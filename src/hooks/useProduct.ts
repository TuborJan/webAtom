import { productsController } from "@/config/productsControllers";
import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["PRODUCT"],
    queryFn: () => productsController.getProduct(id),
  });
};
