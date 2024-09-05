"use client";

// Node Modules
import { useState } from "react";
import cn from "classnames";

// Component
import Toggle from "@/components/Toggle";
import CalculatorButton from "@/components/CalculatorButton";

// Lib
import { numberWithCommas } from "@/lib/helpers";

const CalculatorPage = () => {
  // テーマのトグル状態を管理するためのuseStateフック
  const [toggleTheme, setToggleTheme] = useState(1);

  // 計算に使うオペランドや演算子を管理するためのuseStateフック
  const [operand1, setOperand1] = useState<string>("0");
  const [operator, setOperator] = useState<string | undefined>();
  const [operand2, setOperand2] = useState<string | undefined>();

  // テーマ切り替えボタンクリック時のハンドラー
  const handleClickToggle = () => {
    setToggleTheme((toggleTheme % 3) + 1);
  };

  // 計算実行
  const operateCalculator = (
    operand1: string,
    operator: string,
    operand2: string
  ): string => {
    const sanitizeOperand1 = operand1.includes(".")
      ? parseFloat(operand1)
      : parseInt(operand1);
    const sanitizeOperand2 = operand2.includes(".")
      ? parseFloat(operand2)
      : parseInt(operand2);

    // 演算子に応じて計算実行
    switch (operator) {
      case "ADD":
        return (sanitizeOperand1 + sanitizeOperand2).toString();
      case "SUBSTRACT":
        return (sanitizeOperand1 - sanitizeOperand2).toString();
      case "MULTIPLY":
        return (sanitizeOperand1 * sanitizeOperand2).toString();
      // ゼロ除算エラー
      case "DIVIDE": {
        if (operand2 === "0") {
          return "Error";
        }
        return (sanitizeOperand1 / sanitizeOperand2).toString();
      }
      default:
        return "";
    }
  };

  // ボタンがクリック時のハンドラー
  const handleClickButton = (value: string) => {
    // 数字か小数点押下時の処理
    if (parseInt(value) || value === "0" || value === ".") {
      if (!operator) {
        // operatorが選択されていない場合、operand1を更新
        let newOperand1 = operand1;
        if (value === ".") {
          if (!operand1.includes(".")) {
            newOperand1 = operand1 + ".";
          }
        } else {
          if (operand1 === "0" || operand1 === "Error") {
            newOperand1 = value;
          } else {
            newOperand1 = operand1 + value;
          }
        }
        // 最大入力桁数を設定
        if (newOperand1.replace(/[^0-9]/g, "").length > 9) {
          newOperand1 = newOperand1.slice(0, newOperand1.lastIndexOf(value));
        }
        setOperand1(newOperand1);
      } else {
        // operatorが存在する場合、operand2を更新
        let newOperand2 = operand2 || "";
        if (value === ".") {
          if (!operand2 || !operand2.includes(".")) {
            newOperand2 = operand2 + ".";
          }
        } else {
          if (!operand2 || operand2 === "0") {
            newOperand2 = value;
          } else {
            newOperand2 = operand2 + value;
          }
        }
        // 最大入力桁数を設定
        if (newOperand2.replace(/[^0-9]/g, "").length > 9) {
          newOperand2 = newOperand2.slice(0, newOperand2.lastIndexOf(value));
        }
        setOperand2(newOperand2);
      }
    }

    // 演算子ボタン押下時の処理
    if (
      value === "SUBSTRACT" ||
      value === "ADD" ||
      value === "MULTIPLY" ||
      value === "DIVIDE"
    ) {
      return setOperator(value);
    }

    // Deleteボタン押下時の処理
    if (value === "DELETE") {
      if (!!operand1) {
        if (operand1.length > 1) {
          return setOperand1(operand1.slice(0, -1));
        }
        return setOperand1("0");
      }

      if (!!operand2) {
        if (operand2.length > 1) {
          return setOperand2(operand2.slice(0, -1));
        }
        return setOperand2("0");
      }
    }

    // ACボタン押下時の処理
    if (value === "AC") {
      setOperand1("0");
      setOperator(undefined);
      setOperand2(undefined);
    }

    // =ボタン押下時の処理
    if (value === "RESULT") {
      if (!!operand1 && !!operator && !!operand2) {
        const result = operateCalculator(operand1, operator, operand2);

        setOperand1(result);
        setOperator(undefined);
        setOperand2(undefined);
      }
    }
  };

  return (
    <main className={cn("min-h-screen", `bg-main-${toggleTheme}`)}>
      <div className="block max-w-xl mx-auto py-20 px-6">
        {/* テーマトグル */}
        <div className="flex justify-between space-x-0 h-full w-full items-center">
          <h1 className={cn("text-2xl font-bold", `font-color-${toggleTheme}`)}>
            Dentaku
          </h1>
          <div className="flex">
            <p
              className={cn(
                "text-sm font-bold mr-8 pb-1 self-end",
                `font-color-${toggleTheme}`
              )}
            >
              テーマ
            </p>
            <Toggle
              currentTogglePosition={toggleTheme}
              onClickToggle={handleClickToggle}
              toggleAmount={3}
            />
          </div>
        </div>
        {/* 出力画面 */}
        <div
          className={cn(
            "h-32 w-full mt-6 p-8 rounded-lg",
            `bg-content-var-a-${toggleTheme}`
          )}
        >
          <p
            className={cn(
              "font-bold text-6xl text-right overflow-none",
              `font-color-${toggleTheme}`
            )}
          >
            {!operand2
              ? numberWithCommas(operand1)
              : numberWithCommas(operand2)}
          </p>
        </div>
        {/* ボタン */}
        <div
          className={cn(
            "w-full grid grid-cols-4 gap-6 mt-6 p-8 rounded-lg",
            `bg-content-var-a-${toggleTheme}`
          )}
        >
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"7"}
            onClick={handleClickButton}
            value={"7"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"8"}
            onClick={handleClickButton}
            value={"8"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"9"}
            onClick={handleClickButton}
            value={"9"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"DEL"}
            onClick={handleClickButton}
            value={"DELETE"}
            variant={"reset"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"4"}
            onClick={handleClickButton}
            value={"4"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"5"}
            onClick={handleClickButton}
            value={"5"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"6"}
            onClick={handleClickButton}
            value={"6"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"+"}
            onClick={handleClickButton}
            value={"ADD"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"1"}
            onClick={handleClickButton}
            value={"1"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"2"}
            onClick={handleClickButton}
            value={"2"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"3"}
            onClick={handleClickButton}
            value={"3"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"-"}
            onClick={handleClickButton}
            value={"SUBSTRACT"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"."}
            onClick={handleClickButton}
            value={"."}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"0"}
            onClick={handleClickButton}
            value={"0"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"/"}
            onClick={handleClickButton}
            value={"DIVIDE"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            label={"x"}
            onClick={handleClickButton}
            value={"MULTIPLY"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            isHalfRow
            label={"AC"}
            onClick={handleClickButton}
            value={"AC"}
            variant={"reset"}
          />
          <CalculatorButton
            currentTheme={toggleTheme}
            isHalfRow
            label={"="}
            onClick={handleClickButton}
            value={"RESULT"}
            variant={"equal"}
          />
        </div>
      </div>
    </main>
  );
};

export default CalculatorPage;
