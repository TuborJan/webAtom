"use client";

import { useState } from "react";
import { IProduct } from "@/Types/Products";
import { usePostProducts } from "@/hooks/usePostProduct";
import { useQueryClient } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { schemaNewProduct } from "@/Types/zodSchema";

const Header = () => {
  const queryClient = useQueryClient();
  const session = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IProduct>({
    resolver: zodResolver(schemaNewProduct),
  });
  const { mutate: postNewProduct } = usePostProducts();

  const postProduct: SubmitHandler<IProduct> = (formData) => {
    const newProduct = {
      category: formData.category,
      description: formData.description,
      id: Math.random(),
      image: formData.image,
      price: formData.price,
      rating: { rate: 0, count: 0 },
      title: formData.title,
    };
    setIsOpen(false);
    postNewProduct(newProduct);
    queryClient.setQueryData(["PRODUCTS"], (products?: IProduct[]) => {
      return [...products, newProduct];
    });
    reset();
  };
  return (
    <>
      <header className="flex justify-between max-w-[1440px] m-auto py-4">
        <Link href="/">
          <h1 className="text-4xl">Shop</h1>
        </Link>
        {session?.data ? (
          <div className="flex items-center gap-6">
            <p className="text-3xl">{session.data.user?.name}</p>
            <Link
              href="#"
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
              className="text-3xl rounded-lg bg-slate-600 text-zinc-50"
            >
              SignOut
            </Link>
            <p
              className="text-3xl rounded-lg bg-slate-600 text-zinc-50 cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              ADD
            </p>
          </div>
        ) : (
          <Link
            href="/api/auth/signin"
            className="text-3xl rounded-lg bg-slate-600 text-zinc-50"
          >
            SignIn
          </Link>
        )}
      </header>
      <div
        className={`${
          isOpen ? "flex" : "hidden"
        } flex items-center flex-col fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none bg-black opacity-90`}
      >
        <div className="w-fit h-fit mt-36 p-4 bg-white ">
          <p
            className="text-2xl text-right cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            X
          </p>
          <form
            onSubmit={handleSubmit(postProduct)}
            className="flex flex-col text-2xl"
          >
            <label className="flex flex-col mt-2">
              Title
              <input
                type="text"
                {...register("title")}
                className="border-solid border-2 border-black rounded-lg"
              />
              {errors.title && (
                <p className="text-red-500">{errors.title.message}</p>
              )}
            </label>
            <label className="flex flex-col mt-3">
              Price
              <input
                type="number"
                {...register("price", { valueAsNumber: true })}
                className="border-solid border-2 border-black rounded-lg"
              />
              {errors.price && (
                <p className="text-red-500">{errors.price.message}</p>
              )}
            </label>
            <label className="flex flex-col mt-3">
              Description
              <textarea
                {...register("description")}
                className="border-solid border-2 border-black rounded-lg"
              />
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </label>
            <label className="flex flex-col mt-3">
              Category
              <input
                type="text"
                {...register("category")}
                className="border-solid border-2 border-black rounded-lg"
              />
              {errors.category && (
                <p className="text-red-500">{errors.category.message}</p>
              )}
            </label>
            <label className="flex flex-col mt-3">
              Image
              <input
                type="text"
                {...register("image")}
                className="border-solid border-2 border-black rounded-lg"
              />
              {errors.image && (
                <p className="text-red-500">{errors.image.message}</p>
              )}
            </label>
            <input
              type="submit"
              className="mt-10 cursor-pointer	border-solid border-2 border-black"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Header;
