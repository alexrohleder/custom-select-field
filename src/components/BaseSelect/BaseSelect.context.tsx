import { createContext, ReactNode, useId, useState } from "react";

type ContextValue = {
  controlsId: string;
  value: string;
  onChange: (value: string) => void;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
};

export const BaseSelectContext = createContext<ContextValue>({
  controlsId: "",
  value: "",
  onChange: () => undefined,
  isOpen: false,
  setOpen: () => undefined,
});

type Props = {
  value: string;
  onChange: (value: string) => void;
  onOpenStateChange?: (open: boolean) => void;
  children: ReactNode;
};

function BaseSelectContextProvider(props: Props) {
  const controlsId = useId();
  const [isOpen, setOpen] = useState(false);

  return (
    <BaseSelectContext.Provider
      value={{
        controlsId,
        value: props.value,
        onChange: (newValue) => {
          props.onChange(newValue);
          setOpen(false);
        },
        isOpen,
        setOpen: (newOpen) => {
          setOpen(newOpen);
          props.onOpenStateChange?.(newOpen);
        },
      }}
    >
      {props.children}
    </BaseSelectContext.Provider>
  );
}

export default BaseSelectContextProvider;
