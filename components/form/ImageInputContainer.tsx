"use client";

import Image from "next/image";
import { Button } from "../ui/button";
import FormContainer from "./FormContainer";
import ImageInput from "./ImageInput";
import { SubmitButton } from "./Buttons";
import { type actionFunction } from "@/utils/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

type ImageInputContainerProps = {
  image: string;
  name: string;
  action: actionFunction;
  text: string;
  children?: React.ReactNode;
};

const ImageInputContainer = (props: ImageInputContainerProps) => {
  const { image, name, action, text } = props;
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-8">
      <Image
        src={image}
        width={200}
        height={200}
        className="rounded-md object-cover mb-4 w-[200px] h-[200px]"
        alt={name}
      />
      <Dialog modal open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="secondary" size="sm" className="capitalize">
            {text}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <FormContainer action={action} onSuccess={() => setOpen(false)}>
            <div className="p-4">
              {props.children}

              <ImageInput />
              <SubmitButton size="sm" />
            </div>
          </FormContainer>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImageInputContainer;
