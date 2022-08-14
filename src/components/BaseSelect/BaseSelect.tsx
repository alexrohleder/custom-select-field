import { DismissableLayer } from "@radix-ui/react-dismissable-layer";
import {
  forwardRef,
  MouseEventHandler,
  ReactNode,
  useContext,
  useId,
  useLayoutEffect,
} from "react";
import { RemoveScroll } from "react-remove-scroll";
import * as Popper from "../BasePopper";
import ChevronDownIcon from "../icons/ChevronDownIcon";
import LoadingIcon from "../icons/LoadingIcon";
import ContextProvider, { BaseSelectContext } from "./BaseSelect.context";
import * as Styled from "./BaseSelect.styled";

type RootProps = {
  value: string;
  onChange: (value: string) => void;
  onOpenStateChange?: (isOpen: boolean) => void;
  children: ReactNode;
};

export const Root = function BaseSelectRoot(props: RootProps) {
  return (
    <ContextProvider
      value={props.value}
      onChange={props.onChange}
      onOpenStateChange={props.onOpenStateChange}
    >
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
    const isRendered = isOpen && props.children;

    useLayoutEffect(() => {
      if (isRendered) {
        const controls = document.getElementById(controlsId);

        if (controls) {
          const selected = controls.querySelector("[aria-selected='true']");
          const option = controls.querySelector("[role='option']");
          const target = (selected || option) as HTMLElement | null;

          if (target) {
            target.focus();
          }
        }
      }
    }, [isRendered, controlsId]);

    if (!isOpen || !props.children) {
      return null;
    }

    return (
      <RemoveScroll allowPinchZoom>
        <DismissableLayer
          onDismiss={() => setOpen(false)}
          onFocusOutside={(event) => event.preventDefault()}
          onKeyDown={(event) => {
            const target = event.target as HTMLElement;

            if (event.key === "Tab") {
              event.preventDefault();
            }

            if (event.key === "Enter") {
              target.click();
            }

            if (["ArrowUp", "ArrowDown"].includes(event.key)) {
              let nodes = Array.from(
                event.currentTarget.querySelectorAll('[role="option"]')
              );

              if (event.key === "ArrowUp") {
                nodes = nodes.slice().reverse();
              }

              const currentIndex = nodes.indexOf(target);
              const el = nodes.slice(currentIndex + 1).at(0) as HTMLElement;

              el?.focus();
              event.preventDefault();
            }
          }}
        >
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

type OptionProps = {
  value: string;
  children: ReactNode;
};

export const Option = forwardRef<HTMLLIElement, OptionProps>(
  function BaseSelectOption(props, ref) {
    const id = useId();
    const { value: selectedValue, onChange } = useContext(BaseSelectContext);

    const onSelect: MouseEventHandler<HTMLLIElement> = (event) => {
      // In case we're inside a label element
      event.preventDefault();

      onChange(props.value);
    };

    return (
      <Styled.Option
        ref={ref}
        role="option"
        aria-labelledby={id}
        aria-selected={selectedValue === props.value}
        tabIndex={0}
        onClick={onSelect}
      >
        {props.children}
      </Styled.Option>
    );
  }
);

type ValueProps = {
  placeholder: ReactNode;
  children: ReactNode;
};

export const Value = forwardRef<HTMLDivElement, ValueProps>(
  function BaseSelectValue(props, ref) {
    const { value } = useContext(BaseSelectContext);

    return (
      <Styled.Value ref={ref}>
        {value ? props.children : props.placeholder}
      </Styled.Value>
    );
  }
);

type IconProps = {
  isLoading?: boolean;
};

export const Icon = forwardRef<HTMLDivElement, IconProps>(
  function BaseSelectIcon(props, ref) {
    return (
      <Styled.Icon ref={ref} aria-hidden>
        {props.isLoading ? (
          <LoadingIcon width={16} height={16} />
        ) : (
          <ChevronDownIcon width={16} height={8} />
        )}
      </Styled.Icon>
    );
  }
);
