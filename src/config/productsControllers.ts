import { IProduct } from "@/Types/Products";
import axios from "axios";

class ProductsController {
  public async getProducts() {
    const response = await axios.get("https://fakestoreapi.com/products/");
    return response.data;
  }

  public async getProduct(id: string) {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    return response.data;
  }

  public async addProducts(product: IProduct) {
    const response = await axios.post(
      "https://fakestoreapi.com/products/",
      product
    );
    return response.data;
  }

  public async deleteProducts(id: number) {
    const response = await axios.delete(
      `https://fakestoreapi.com/products/${id}`
    );
    return response.data;
  }

  public async changeProducts(updatedProduct: IProduct) {
    const response = await axios.put(
      `https://fakestoreapi.com/products/${updatedProduct.id}`,
      updatedProduct
    );
    return response.data;
  }
}

export const productsController = new ProductsController();
