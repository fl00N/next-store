import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export enum Mode {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

const SelectProductAmount = (
  props: SelectProductAmountProps | SelectCartItemAmountProps,
) => {
  const { mode, amount, setAmount } = props;

  const cartItem = mode === Mode.CartItem;

  return (
    <>
      <h4 className="mb-2">Amount: </h4>

      <Select
        defaultValue={amount.toString()}
        disabled={cartItem ? props.isLoading : false}
        onValueChange={(value) => setAmount(Number(value))}
      >
        <SelectTrigger className={cartItem ? "w-[100px]" : "w-[150px]"}>
          <SelectValue placeholder={amount} />
        </SelectTrigger>
        <SelectContent>
          {Array.from({ length: 10 }, (_, i) => {
            const selectValue = (i + 1).toString();

            return (
              <SelectItem key={i} value={selectValue}>
                {selectValue}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};

export default SelectProductAmount;
