//@ts-ignore
import Commerce from "@chec/commerce.js";

const commerce = new Commerce(process.env.NEXT_PUBLIC_COMMERCE_PUBLIC_KEY);

export default commerce;
