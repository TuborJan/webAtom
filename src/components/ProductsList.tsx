"use client";

import { IProduct } from "@/Types/Products";
import Link from "next/link";
import Spinner from "./UI/Spinner";
import { useSession } from "next-auth/react";
import { useProducts } from "@/hooks/useProducts";
import { useDeleteProducts } from "@/hooks/useDeleteProduct";
import { useAuthStore } from "@/store/Auth";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";

const ProductsList = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useProducts();
  const { mutate: deleteProduct } = useDeleteProducts();
  const setIsAuth = useAuthStore((state) => state.setIsAuth);
  const isAuth = useAuthStore((state) => state.isAuth);
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [session]);

  const onDelete = (id: number) => {
    deleteProduct(id);
    queryClient.setQueryData(["PRODUCTS"], (products?: IProduct[]) => {
      return (products || [])?.filter((product) => product.id !== id);
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || data === "") {
    return (
      <div>
        <h1>No data found</h1>
      </div>
    );
  }

  return (
    <div className="flex gap-10 flex-wrap m-auto py-6 max-w-[1440px]">
      {data.map((item: IProduct) => (
        <div
          className="flex flex-col justify-between w-72 h-[400px] p-4 m-auto rounded-xl shadow-2xl hover:shadow-none"
          key={item.id}
        >
          <Link href={`/product/${item.id}`} className="h-[inherit]">
            <img
              src={item.image}
              alt="product img"
              className="m-auto w-auto h-48"
            />
            <p className="mt-8">{item.title}</p>
          </Link>
          <div className="flex justify-between">
            {isAuth && (
              <p
                onClick={() => onDelete(item.id)}
                className="w-28 text-center cursor-pointer rounded-lg bg-slate-600 text-zinc-50"
              >
                DELETE
              </p>
            )}
            <p>{item.price}$</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
