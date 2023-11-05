import { Button, ButtonProps } from "@mui/material";

interface ButtonsProps extends ButtonProps {}

const Buttons = ({ ...rest }: ButtonsProps) => {
  return (
    <Button
      sx={{
        padding: 0,
      }}
      disableRipple
      disableElevation
      {...rest}
    />
  );
};

export default Buttons;
