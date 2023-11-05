import { TableRow, TableRowProps } from "@mui/material";
import { ReactNode } from "react";
import { MUI_REPLACE_TAG } from "../../constants/etc";

interface TableRowsProps extends TableRowProps {
  children: ReactNode;
  isHeader?: boolean;
}

const TableRows = ({ isHeader, ...rest }: TableRowsProps) => {
  const headerColor = isHeader
    ? {
        background: "#f2f2f2",
        "&:last-child": {
          // Remove bottom border except for the last cell
          borderBottom: "1px solid #e2e2e2",
        },
      }
    : undefined;

  const defaultStyle = {
    [`& .${MUI_REPLACE_TAG}TableCell-root`]: {
      padding: 0,
    },
  };
  return (
    <TableRow
      sx={{ ...headerColor, ...defaultStyle }}
      component="div"
      {...rest}
    />
  );
};

export default TableRows;
