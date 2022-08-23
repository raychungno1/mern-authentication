import React from "react";

interface IProps {
  className?: string;
  onClick?: () => void;
  children: JSX.Element | string;
}
const Button = ({ className, onClick, children }: IProps) => {
  return (
    <div
      className={`bg-[#6cac48] hover:bg-[#5d933e] rounded-full cursor-pointer border-none text-white font-bold ${
        className || ""
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
