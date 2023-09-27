import { IProduct } from "@/Types/Products";
import { productsController } from "@/config/productsControllers";
import { useMutation } from "@tanstack/react-query";

export const usePostProducts = () => {
  return useMutation((item: IProduct) => productsController.addProducts(item));
};
