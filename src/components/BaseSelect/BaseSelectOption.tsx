import { MouseEventHandler, ReactNode, useContext, useId } from "react";
import { BaseSelectContext } from "./BaseSelectContext";
import * as Styled from "./BaseSelectOption.styled";

type Props = {
  value: string;
  children: ReactNode;
};

function BaseSelectOption(props: Props) {
  const id = useId();
  const { value: selectedValue, onChange } = useContext(BaseSelectContext);

  const onSelect: MouseEventHandler<HTMLLIElement> = (event) => {
    // In case we're inside a label element
    event.preventDefault();

    onChange(props.value);
  };

  return (
    <Styled.Root
      role="option"
      aria-labelledby={id}
      aria-selected={selectedValue === props.value}
      onClick={onSelect}
    >
      {props.children}
    </Styled.Root>
  );
}

export default BaseSelectOption;
