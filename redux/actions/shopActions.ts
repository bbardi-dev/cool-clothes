import { Category, Product } from "../../utils/types";
import { UPDATE_CATEGORIES, UPDATE_PRODUCTS } from "../types";

export const updateProducts = (products: Product[]) => ({
  type: UPDATE_PRODUCTS,
  payload: products,
});
export const updateCategories = (categories: Category[]) => ({
  type: UPDATE_CATEGORIES,
  payload: categories,
});
