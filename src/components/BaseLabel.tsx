import { ComponentPropsWithoutRef, forwardRef } from "react";
import * as Styled from "./BaseLabel.styled";

type Props = Omit<ComponentPropsWithoutRef<"label">, "title"> & {
  error?: string;
  title: string;
};

const BaseLabel = forwardRef<HTMLLabelElement, Props>(function BaseLabel(
  { title, error, children, ...props },
  ref
) {
  return (
    <Styled.Root {...props} ref={ref}>
      <Styled.Title hasError={!!error}>{title}</Styled.Title>
      {children}
      <Styled.Error>{error}</Styled.Error>
    </Styled.Root>
  );
});

export default BaseLabel;
