import { TextField, TextFieldProps } from "@mui/material";

const TextFields = ({ ...rest }: TextFieldProps) => {
  return (
    <TextField
      sx={{
        [`& .MuiInputBase-input`]: {
          padding: 0,
        },
        ...rest.sx,
      }}
      {...rest}
    />
  );
};

export default TextFields;
