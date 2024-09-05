import React from "react";
import cn from "classnames";

// Types
import type { FC } from "react";

type TCalculatorButton = {
  currentTheme: number;
  isHalfRow?: boolean;
  label: string;
  onClick: (value: string) => void;
  value: string;
  variant?: "reset" | "equal";
};

const CalculatorButton: FC<TCalculatorButton> = (props) => {
  const {
    currentTheme,
    label,
    isHalfRow,
    onClick,
    value,
    variant = "normal",
  } = props;

  // ボタン押下時の処理
  const handleClickButton = () => {
    onClick(value);
  };

  return (
    <div
      className={cn(
        "col-span-1 h-14 rounded-xl py-4 cursor-pointer",
        `bg-content-var-button-${variant}-${currentTheme}`,
        isHalfRow && "double_grid_column"
      )}
      onClick={handleClickButton}
    >
      <p
        className={cn(
          "text-xl font-black text-center",
          `font-color-button-${variant}-${currentTheme}`
        )}
      >
        {label}
      </p>
    </div>
  );
};

export default CalculatorButton;
