import { Slot } from "@radix-ui/react-slot";
import { createContext, ReactNode, useContext, useState } from "react";
import { usePopper } from "react-popper";

type Ref = HTMLElement | null;

type ContextValue = {
  setAnchorRef: (ref: Ref) => void;
  setContentRef: (ref: Ref) => void;
  contentStyle: React.CSSProperties;
};

const PopperContext = createContext<ContextValue>({
  setAnchorRef: () => undefined,
  setContentRef: () => undefined,
  contentStyle: {},
});

type Props = {
  children: ReactNode;
};

export function Root(props: Props) {
  const [anchorRef, setAnchorRef] = useState<Ref>(null);
  const [contentRef, setContentRef] = useState<Ref>(null);

  const { styles } = usePopper(anchorRef, contentRef, {
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 5],
        },
      },
    ],
  });

  return (
    <PopperContext.Provider
      value={{
        setAnchorRef: setAnchorRef,
        setContentRef,
        contentStyle: styles.popper,
      }}
    >
      {props.children}
    </PopperContext.Provider>
  );
}

export function Anchor(props: Props) {
  const { setAnchorRef } = useContext(PopperContext);

  return <Slot {...props} ref={setAnchorRef} />;
}

export function Content(props: Props) {
  const { setContentRef, contentStyle } = useContext(PopperContext);

  return <Slot {...props} ref={setContentRef} style={contentStyle} />;
}
