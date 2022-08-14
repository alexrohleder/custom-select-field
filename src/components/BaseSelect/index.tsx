import { ReactNode } from "react";
import { Root, Trigger, Content, Option, Value, Icon } from "./BaseSelect";

export * from "./BaseSelect";

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  children: ReactNode;
};

function BaseSelect(props: Props) {
  const placeholder = props.placeholder ?? "Velg";

  return (
    <Root value={props.value} onChange={props.onChange}>
      <Trigger>
        <Value placeholder={placeholder}>{props.value}</Value>
        <Icon />
      </Trigger>
      <Content>{props.children}</Content>
    </Root>
  );
}

BaseSelect.Option = Option;

export default BaseSelect;
