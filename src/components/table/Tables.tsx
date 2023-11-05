import { Table, TableProps } from "@mui/material";

interface TablesProps extends TableProps {}

const Tables = ({ ...rest }: TablesProps) => {
  return <Table component="div" {...rest} />;
};

export default Tables;
