import { TableCell, TableCellProps } from "@mui/material";
import { ReactNode } from "react";

interface TableCellsProps extends TableCellProps {
  children: ReactNode;
  isHeader?: boolean;
}

const TableCells = ({ isHeader, ...rest }: TableCellsProps) => {
  const headerSx = isHeader
    ? {
        background: "#f2f2f2",
        borderBottom: "none",
      }
    : undefined;

  const defaultStyle = {};

  if (rest.sx) console.log(rest.sx);

  return (
    <TableCell
      component="div"
      sx={{
        whiteSpace: "pre-wrap",
        ...headerSx,
        ...defaultStyle,
        ...rest.sx,
      }}
      {...rest}
    />
  );
};

export default TableCells;
