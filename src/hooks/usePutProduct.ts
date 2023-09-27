import { IProduct } from "@/Types/Products";
import { productsController } from "@/config/productsControllers";
import { useMutation } from "@tanstack/react-query";

export const usePutProducts = () => {
  return useMutation((updatedProduct: IProduct) =>
    productsController.changeProducts(updatedProduct)
  );
};
