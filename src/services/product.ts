import { IProductItem, IProductList } from "./@type";
import http from "./http-common";

interface params {
  limit: number;
  skip: number;
  search?: string;
}
const getListProduct = (params: params) => {
  const { limit, skip } = params;
  return http.get(`products?limit=${limit}&skip=${skip}`);
};
const searchProduct = (params: string) => {
  //   const { search } = params;
  return http.get(`/products/search?q=${params}`);
};

const product = {
  getListProduct,
  searchProduct,
};

export default product;
