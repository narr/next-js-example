import { DevTool } from "@hookform/devtools";
import { Control } from "react-hook-form";
import React, { useRef, useState } from "react";

export type StyledFormDevtoolProps = {
  id?: string;
  control: Control<any>;
};

export default function StyledFormDevtool({
  id,
  control,
}: StyledFormDevtoolProps) {
  const rootEl = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const rootElOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    console.log("clicked element", target);
    if (target.title === "Close dev panel") {
      // close
      console.log("close devtool");
      setIsOpen(false);
    } else if (target.ariaLabel === "React Hook Form Logo") {
      // open
      console.log("open devtool");
      setIsOpen(true);
    }
  };

  return (
    <div
      ref={rootEl}
      onClick={rootElOnClick}
      className={
        {
          true: `
            [&>div>div]:scale-x-[1.4] [&>div>div]:scale-y-[1.4] 
            [&>div>div]:translate-x-[-50px] [&>div>div]:translate-y-[188px] 
            [&>div>div>div]:!h-[calc(100vh-310px)]
            [&_td[data-testid=imageUrl-field-value]]:break-all
          `,
          false: "",
        }[String(isOpen)]
      }
    >
      <DevTool id={id} control={control} placement="top-right" />
    </div>
  );
}
