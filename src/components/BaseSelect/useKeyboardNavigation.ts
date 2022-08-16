import { useLayoutEffect } from "react";

function useKeyboardNavigation(controlsId: string) {
  useLayoutEffect(() => {
    const controls = document.getElementById(controlsId)!;

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = controls.querySelector(":focus") as HTMLElement;

      if (!target) {
        return;
      }

      if (event.key === "Tab") {
        event.preventDefault();
      }

      if (event.key === "Enter" || event.key === "Space") {
        target.click();
      }

      if (["ArrowUp", "ArrowDown"].includes(event.key)) {
        let nodes = Array.from(controls.querySelectorAll('[role="option"]'));

        if (event.key === "ArrowUp") {
          nodes = nodes.slice().reverse();
        }

        const currentIndex = nodes.indexOf(target);
        const nextFocus = nodes.slice(currentIndex + 1).at(0) as HTMLElement;

        nextFocus?.focus();
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [controlsId]);
}

export default useKeyboardNavigation;
