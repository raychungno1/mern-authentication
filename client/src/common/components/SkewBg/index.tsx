import React from "react";

const SkewBg = () => {
  return (
    <>
      <div
        className="absolute -z-10 w-full top-[10%] h-1/2 -skew-y-2"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(254,198,139,0.5) 0%, rgba(255,69,105,0.5) 50%, rgba(102,187,245,0.5) 100%)",
        }}
      />
      <div
        className="absolute -z-10 w-full top-[9%] h-[0.5%] -skew-y-2"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(254,198,139,0.5) 0%, rgba(255,69,105,0.5) 50%, rgba(102,187,245,0.5) 100%)",
        }}
      />
      <div
        className="absolute -z-10 w-full top-[60.5%] h-[0.5%] -skew-y-2"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(254,198,139,0.5) 0%, rgba(255,69,105,0.5) 50%, rgba(102,187,245,0.5) 100%)",
        }}
      />
      <div
        className="absolute -z-10 w-full top-[61.5%] h-[0.5%] -skew-y-2"
        style={{
          backgroundImage:
            "linear-gradient(45deg, rgba(254,198,139,0.5) 0%, rgba(255,69,105,0.5) 50%, rgba(102,187,245,0.5) 100%)",
        }}
      />
    </>
  );
};

export default SkewBg;
