import React from "react";
import { FaUserShield } from "react-icons/fa";

interface IProps {
  icon: JSX.Element;
  title: string;
  desc: string;
}

const FeatureCard = ({ icon, title, desc }: IProps) => {
  return (
    <div className="flex sm:flex-col gap-4 p-6 bg-white bg-opacity-50 rounded-2xl shadow-lg">
      <div className="flex gap-4 items-center">
        <div className="min-w-[48px] w-12 h-12 rounded-full bg-[#9bc148] text-3xl text-white flex items-center justify-center">
          {icon}
        </div>
        <p className="hidden sm:block text-xl font-bold">{title}</p>
      </div>
      <div>
        <p className="sm:hidden text-xl font-bold">{title}</p>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
