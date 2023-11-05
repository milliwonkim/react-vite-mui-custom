import { TableHead, TableHeadProps } from "@mui/material";
import { ReactNode } from "react";

interface TableHeadersProps extends TableHeadProps {
  children: ReactNode;
}

const TableHeaders = ({ ...rest }: TableHeadersProps) => {
  return <TableHead component="div" {...rest} />;
};

export default TableHeaders;
