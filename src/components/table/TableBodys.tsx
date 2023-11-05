import { TableBody, TableBodyProps } from "@mui/material";

interface TableBodysProps extends TableBodyProps {}

const TableBodys = ({ ...rest }: TableBodysProps) => {
  return <TableBody component="div" {...rest} />;
};

export default TableBodys;
