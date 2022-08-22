import React from "react";

interface IProps {
  onClick?: () => void;
  children: JSX.Element | string;
}
const Button = ({ onClick, children }: IProps) => {
  return (
    <div
      className="bg-[#6cac48] hover:bg-[#5d933e] rounded-full px-8 py-2 cursor-pointer border-none text-white font-bold"
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
