import { TableContainer, styled } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Tables from "./components/table/Tables";
import TableHeaders from "./components/table/TableHeaders";
import TableRows from "./components/table/TableRows";
import TableCells from "./components/table/TableCells";
import TableBodys from "./components/table/TableBodys";
import TextFields from "./components/table/TextFields";
import Checkboxs from "./components/input/Checkboxs";
import Buttons from "./components/button/Buttons";
import {
  TreeItem,
  TreeView,
  treeItemClasses,
  treeViewClasses,
} from "@mui/x-tree-view";

const App = () => {
  const getKey = <T extends object>(list: T[]): (T & { key: string })[] => {
    return list.map((el, i) => {
      return {
        ...el,
        key: String(i),
      };
    });
  };

  const HEADER_ROW_1 = [
    {
      element: <Checkboxs />,
      isHeader: true,
    },
    {
      element: "header1",
      isHeader: true,
    },
    {
      element: `header2`,
      isHeader: true,
    },
    {
      element: "header3",
      isHeader: true,
    },
    {
      element: "header4",
      isHeader: true,
    },
  ];

  const HEADER_ROW_2 = [
    {
      element: "",
    },
    {
      element: <TextFields />,
    },
    {
      element: (
        <Buttons endIcon={">"} variant="contained">
          버튼
        </Buttons>
      ),
    },
    {
      element: <TextFields label="dijos" />,
    },
    {
      element: <TextFields />,
    },
  ];

  const BODY_ROW_1 = [
    { element: "" },
    { element: "body1" },
    { element: "body2" },
    { element: "body3" },
    { element: "body4" },
  ];

  const HEADER = [getKey(HEADER_ROW_1), getKey(HEADER_ROW_2)];

  const BODY = [
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
    getKey(BODY_ROW_1),
  ];

  const stickyHeaderStyle = (index: number) => ({
    position: "sticky",
    top: `${index * 36}px`, // Each header will be 50px down from the previous one
    zIndex: 3, // Ensure it's above body rows
  });

  type StyledTreeItemProps = {
    rootNode?: boolean;
  };

  console.log(treeItemClasses);

  const StyledTreeItem = styled(TreeItem)<StyledTreeItemProps>(
    ({ rootNode }) => {
      const borderColor = "gray";

      return {
        position: "relative",
        "&:before": {
          pointerEvents: "none",
          content: '""',
          position: "absolute",
          width: 32,
          left: -16,
          top: 12,
          borderBottom:
            // only display if the TreeItem is not root node
            !rootNode ? `1px dashed ${borderColor}` : "none",
        },
        [`& .${treeItemClasses.group}`]: {
          marginLeft: 16,
          paddingLeft: 18,
          borderLeft: `1px dashed ${borderColor}`,
        },
      };
    }
  );

  return (
    <>
      <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <StyledTreeItem
          rootNode
          sx={{
            [`&. ${treeViewClasses.root}`]: {
              marginLeft: 15,
              paddingLeft: 18,
              borderLeft: `1px dashed #f2f2f2`,
            },
          }}
          nodeId="1"
          label="Applications"
        >
          <StyledTreeItem nodeId="2" label="Calendar" />
        </StyledTreeItem>
        <StyledTreeItem rootNode nodeId="5" label="Documents">
          <StyledTreeItem nodeId="10" label="OSS" />
          <StyledTreeItem nodeId="6" label="MUI">
            <StyledTreeItem nodeId="8" label="index.js" />
          </StyledTreeItem>
        </StyledTreeItem>
      </TreeView>
      <TableContainer
        sx={{ maxHeight: "500px", overflow: "auto" }}
        component="div"
      >
        <Tables stickyHeader>
          <TableHeaders>
            {HEADER.map((header, i) => {
              return (
                <TableRows
                  sx={{
                    ...stickyHeaderStyle(i),
                    ["& .MuiTableCell-root"]: { padding: "6px" },
                  }}
                  isHeader
                  key={i}
                >
                  {header.map((el) => {
                    return (
                      <TableCells isHeader key={el.key}>
                        {el.element}
                      </TableCells>
                    );
                  })}
                </TableRows>
              );
            })}
          </TableHeaders>
          <TableBodys>
            {BODY.map((body, i) => {
              return (
                <TableRows
                  sx={{
                    "& .MuiTableCell-root": { padding: "6px" },
                  }}
                  key={i}
                >
                  {body.map((el) => {
                    return <TableCells key={el.key}>{el.element}</TableCells>;
                  })}
                </TableRows>
              );
            })}
          </TableBodys>
        </Tables>
      </TableContainer>
    </>
  );
};

export default App;
