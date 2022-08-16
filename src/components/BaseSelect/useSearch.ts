import { useLayoutEffect } from "react";

function useSearch(controlsId: string) {
  useLayoutEffect(() => {
    const controls = document.getElementById(controlsId)!;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key.length === 1) {
        const nodes = controls.querySelectorAll("[role='option']");
        const searchTerm = event.key.toLowerCase();

        const result = (Array.from(nodes) as HTMLElement[]).find((node) =>
          node.dataset.label?.toLowerCase()?.startsWith(searchTerm)
        );

        if (result) {
          result.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [controlsId]);
}

export default useSearch;
