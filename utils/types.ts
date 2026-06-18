export type actionFunction = (
  prevState: any,
  formData: FormData,
) => Promise<{ message: string; success: boolean }>;

export type CartItem = {
  name: string;
  image: string;
  title: string;
  price: string;
  amount: number;
  company: string;
};

export type CartState = {
  cartItems: CartItem[];
  numItemsInCart: number;
  cartTotal: number;
  shipping: number;
  tax: number;
  orderTotal: number;
};
