import { ReactNode } from "react";
import { Root, Trigger, Content } from "./BaseSelect";
import Option from "./BaseSelectOption";

export * from "./BaseSelect";
export { default as Option } from "./BaseSelectOption";

type Props = {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

function BaseSelect(props: Props) {
  return (
    <Root value={props.value} onChange={props.onChange}>
      <Trigger>{props.value}</Trigger>
      <Content>{props.children}</Content>
    </Root>
  );
}

BaseSelect.Option = Option;

export default BaseSelect;
