import { IProduct } from "@/Types/Products";
import { useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import React from "react";

interface IModal {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  postNewProduct: (product: IProduct) => void;
}

const Modal = ({ isOpen, setIsOpen, postNewProduct }: IModal) => {
  const queryClient = useQueryClient();
  const { register, reset, handleSubmit } = useForm<IProduct>();

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
              {...register("title")}
              placeholder={"title"}
              className="border-solid border-2 border-black rounded-lg"
            />
          </label>
          <label className="flex flex-col mt-3">
            Price
            <input
              {...register("price")}
              placeholder={"price"}
              className="border-solid border-2 border-black rounded-lg"
            />
          </label>
          <label className="flex flex-col mt-3">
            Description
            <input
              {...register("description")}
              placeholder={"description"}
              className="border-solid border-2 border-black rounded-lg"
            />
          </label>
          <label className="flex flex-col mt-3">
            Category
            <input
              {...register("category")}
              placeholder={"category"}
              className="border-solid border-2 border-black rounded-lg"
            />
          </label>
          <label className="flex flex-col mt-3">
            Image
            <input
              {...register("image")}
              placeholder={"image"}
              className="border-solid border-2 border-black rounded-lg"
            />
          </label>
          <input
            type="submit"
            className="mt-10 cursor-pointer	border-solid border-2 border-black"
          />
        </form>
      </div>
    </div>
  );
};

export default Modal;
