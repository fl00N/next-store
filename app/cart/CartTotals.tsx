import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/utils/format";
import { createOrderAction } from "@/utils/actions";
import FormContainer from "@/components/form/FormContainer";
import { SubmitButton } from "@/components/form/Buttons";
import { Cart } from "@/lib/generated/prisma/client";

function CartTotals({ cart }: { cart: Cart }) {
  const { cartTotal, shipping, tax, orderTotal } = cart;
  return (
    <div>
      <Card className="p-8">
        <CartTotalRow label="Subtotal" amount={cartTotal} />
        <CartTotalRow label="Shipping" amount={shipping} />
        <CartTotalRow label="Tax" amount={tax} lastRow />
        <CartTotalRow label="Order Total" amount={orderTotal} />
      </Card>
      <FormContainer action={createOrderAction}>
        <SubmitButton text="Place Order" className="w-full mt-8" />
      </FormContainer>
    </div>
  );
}

function CartTotalRow({
  label,
  amount,
  lastRow = false,
}: {
  label: string;
  amount: number;
  lastRow?: boolean;
}) {
  return (
    <>
      <p className="flex justify-between text-sm">
        <span>{label}</span>
        <span>{formatPrice(amount)}</span>
      </p>
      {lastRow ? <Separator className="p-[0.5px]" /> : null}
    </>
  );
}

export default CartTotals;
