"use client";

import { useState } from "react";
import SelectProductAmount from "@/components/single-product/SelectProductAmount";
import { Mode } from "@/components/single-product/SelectProductAmount";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { removeCartItemAction, updateCartItemAction } from "@/utils/actions";
import { toast } from "sonner";

function ThirdColumn({ quantity, id }: { quantity: number; id: string }) {
  const [amount, setAmount] = useState(quantity);
  const [isLoading, setIsLoading] = useState(false);

  const handleAmountChange = async (value: number) => {
    setIsLoading(true);
    toast.promise<{ message: string; success: boolean }>(
      updateCartItemAction({ amount: value, cartItemId: id }),
      {
        loading: "Updating cart...",
        success: (data) => `${data.message}`,
        error: "Error",
      },
    );
    setAmount(value);
    setIsLoading(false);
  };

  return (
    <div className="md:ml-8">
      <SelectProductAmount
        amount={amount}
        setAmount={handleAmountChange}
        mode={Mode.CartItem}
        isLoading={isLoading}
      />
      <FormContainer action={removeCartItemAction} refreshOnSuccess>
        <input type="hidden" name="id" value={id} />
        <SubmitButton size="sm" className="mt-4" text="remove" />
      </FormContainer>
    </div>
  );
}
export default ThirdColumn;
