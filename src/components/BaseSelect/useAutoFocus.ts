import { useLayoutEffect } from "react";

function useAutoFocus(controlsId: string) {
  useLayoutEffect(() => {
    const controls = document.getElementById(controlsId);

    if (controls) {
      const selected = controls.querySelector("[aria-selected='true']");
      const option = controls.querySelector("[role='option']");
      const target = (selected || option) as HTMLElement | null;

      if (target) {
        target.focus();
      }
    }
  }, [controlsId]);
}

export default useAutoFocus;
