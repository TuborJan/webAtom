import { productsController } from "@/config/productsControllers";
import { useMutation } from "@tanstack/react-query";

export const useDeleteProducts = () => {
  return useMutation((id: number) => productsController.deleteProducts(id));
};
