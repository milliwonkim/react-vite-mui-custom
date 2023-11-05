import { Checkbox, CheckboxProps } from "@mui/material";
import React from "react";

interface CheckboxsProps extends CheckboxProps {
  width?: string;
  height?: string;
}

const Checkboxs = ({ width, height, ...rest }: CheckboxsProps) => {
  return (
    <Checkbox
      sx={{
        padding: 0,
        [`& .MuiSvgIcon-root`]: {
          width: width || "16px",
          height: height || "16px",
        },
        svg: {
          display: "inline-block",
        },
      }}
      {...rest}
    />
  );
};

export default Checkboxs;
