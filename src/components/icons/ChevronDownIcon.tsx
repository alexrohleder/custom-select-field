import { ComponentPropsWithoutRef } from "react";

type Props = Omit<ComponentPropsWithoutRef<"svg">, "viewBox" | "fill">;

function ChevronDownIcon(props: Props) {
  return (
    <svg
      {...props}
      viewBox="0 0 14 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.606995 1.27173L6.60699 7.27173L12.607 1.27173"
        stroke="black"
        strokeWidth="1.2"
      />
    </svg>
  );
}

export default ChevronDownIcon;
