"use client";

import { useProduct } from "@/hooks/useProduct";
import Spinner from "@/components/UI/Spinner";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { usePutProducts } from "@/hooks/usePutProduct";
import { zodResolver } from "@hookform/resolvers/zod";
import { schemaEditProduct } from "@/Types/zodSchema";

interface Props {
  params: {
    id: string;
  };
}

interface IFormData {
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

export default function Product({ params: { id } }: Props) {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useProduct(id);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate } = usePutProducts();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    resolver: zodResolver(schemaEditProduct),
  });

  const onSubmit: SubmitHandler<IFormData> = (formData) => {
    const editedProduct = {
      id: data.id,
      title: formData.title ? formData.title : data.title,
      price: formData.price ? +formData.price : data.price,
      description: formData.description
        ? formData.description
        : data.description,
      category: formData.category ? formData.category : data.category,
      image: formData.image ? formData.image : data.image,
      rating: data.rating,
    };
    setIsOpen(false);
    mutate(editedProduct);
    queryClient.setQueryData(["PRODUCT"], editedProduct);
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || data === "") {
    return (
      <div>
        <Link
          href={"/"}
          className="block w-40 text-center p-1 rounded-xl text-2xl bg-slate-600 text-zinc-50"
        >
          На главную
        </Link>
        <h1>No data found</h1>
      </div>
    );
  }

  return (
    <>
      <div className="m-auto py-6 max-w-[1440px]">
        <Link
          href={"/"}
          className="block w-40 text-center p-1 rounded-xl text-2xl bg-slate-600 text-zinc-50"
        >
          На главную
        </Link>
        <div className="mt-10 flex flex-col p-10 lg:flex-row lg:p-0 gap-20">
          <img src={data.image} className="w-1/3" />
          <div>
            <h1 className="text-3xl w-fit max-w-[500px]">
              {data.title}
              <span className="text-xl flex justify-between">
                <p>price - {data.price}$</p>
                <p>rate - {data.rating.rate}</p>
              </span>
            </h1>

            <p className="block w-40 mt-10 text-center p-1 rounded-lg bg-slate-600 text-zinc-50">
              {data.category}
            </p>

            <p className="mt-10">{data.description}</p>

            <p
              className="w-20 mt-10 text-center cursor-pointer text-3xl rounded-lg bg-slate-600 text-zinc-50"
              onClick={() => setIsOpen(true)}
            >
              EDIT
            </p>
          </div>
        </div>
      </div>
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
            onSubmit={handleSubmit(onSubmit)}
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
}
