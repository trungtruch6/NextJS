"use client";
import React, { memo } from "react";
import { Button } from "@material-tailwind/react";
// interface IButtonProps {
//   text: string;
// }
// : React.FC<IButtonProps>
const ButtonDefault = ({
  text,
  colorDefault,
  onClick,
}: {
  text: string;
  colorDefault: any;
  onClick?: (type?: string) => void;
}) => {
  return (
    <Button onClick={() => onClick?.()} color={colorDefault} size="sm">
      {text}
    </Button>
  );
};

export default memo(ButtonDefault);
