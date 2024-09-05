import React from "react";
import cn from "classnames";

// Types
import type { FC } from "react";

type TToggle = {
  currentTogglePosition: number;
  onClickToggle: () => void;
  toggleAmount: number;
};

const Toggle: FC<TToggle> = (props) => {
  const { currentTogglePosition, onClickToggle, toggleAmount } = props;
  // トグルの数に基づいて配列を作成
  const toggleAmountArray: number[] = Array.from(
    { length: toggleAmount },
    (_, index) => index + 1
  );

  return (
    <div className={"block"}>
      <div>
        {toggleAmountArray.map((value) => {
          return (
            <span
              className={cn(
                "text-xs mr-4 ml-2",
                `font-color-${currentTogglePosition}`
              )}
              key={`toggle-label-${value}`}
            >
              {value}
            </span>
          );
        })}
      </div>
      <div
        className={cn(
          "w-20 h-7 rounded-2xl relative cursor-pointer",
          `bg-content-var-a-${currentTogglePosition}`
        )}
        onClick={onClickToggle}
      >
        <div
          className={cn(
            `transition-left duration-200 ease-in-out absolute w-4 h-4 rounded-2xl top-1.5`,
            `toggle-position-${currentTogglePosition}`,
            `bg-content-var-b-${currentTogglePosition}`
          )}
        />
      </div>
    </div>
  );
};

export default Toggle;
