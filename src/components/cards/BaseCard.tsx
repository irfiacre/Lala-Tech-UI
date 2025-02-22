import React from "react";

const BaseCard = ({
  children,
  className,
  onClick,
}: {
  children: any;
  className?: string; // For tailwind additional styles
  onClick?: () => void;
}) => {
  return (
    <div
      className={`w-full bg-white border border-backgroundColor2 rounded-3xl ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default BaseCard;
