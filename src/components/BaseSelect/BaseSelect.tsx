import { forwardRef, ReactNode, useContext } from "react";
import { RemoveScroll } from "react-remove-scroll";
import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import * as Popper from "../BasePopper";
import * as Styled from "./BaseSelect.styled";
import ContextProvider, { BaseSelectContext } from "./BaseSelectContext";

type RootProps = {
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
};

export const Root = function BaseSelectRoot(props: RootProps) {
  return (
    <ContextProvider value={props.value} onChange={props.onChange}>
      <Popper.Root>
        <Styled.Root>{props.children}</Styled.Root>
      </Popper.Root>
    </ContextProvider>
  );
};

type TriggerProps = {
  children: ReactNode;
};

export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  function BaseSelectTrigger(props, ref) {
    const { isOpen, controlsId, setOpen } = useContext(BaseSelectContext);

    return (
      <Popper.Anchor>
        <Styled.Trigger
          ref={ref}
          type="button"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={controlsId}
          aria-autocomplete="list"
          onClick={() => setOpen(true)}
        >
          {props.children}
        </Styled.Trigger>
      </Popper.Anchor>
    );
  }
);

type ContentProps = {
  children: ReactNode;
};

export const Content = forwardRef<HTMLUListElement, ContentProps>(
  function BaseSelectContent(props, ref) {
    const { isOpen, controlsId, setOpen } = useContext(BaseSelectContext);

    if (!isOpen) {
      return null;
    }

    return (
      <RemoveScroll allowPinchZoom>
        <DismissableLayer onDismiss={() => setOpen(false)}>
          <Popper.Content>
            <Styled.Content id={controlsId} role="listbox" ref={ref}>
              {props.children}
            </Styled.Content>
          </Popper.Content>
        </DismissableLayer>
      </RemoveScroll>
    );
  }
);
