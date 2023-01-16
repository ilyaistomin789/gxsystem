import React from "react";

interface ButtonProps {
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <button className="gxs-button__container">{children}</button>;
};

export default Button;
