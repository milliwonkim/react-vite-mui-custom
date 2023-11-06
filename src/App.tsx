import {
  SvgIcon,
  TableContainer,
  collapseClasses,
  styled,
} from "@mui/material";
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
// import { TreeItem, TreeView, treeViewClasses } from "@mui/x-tree-view";
import { updateBookmark } from "./features/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootState } from "./app/store";

const TreeItem = ({ node, onToggleBookmark }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center" }}>
        {node.children && (
          <button onClick={handleToggle}>{isOpen ? "-" : "+"}</button>
        )}
        {node.name}
        <input
          type="checkbox"
          checked={node.isBookMark}
          onChange={() => dispatch(onToggleBookmark(node.id))}
        />
      </div>
      {isOpen && node.children && (
        <div style={{ paddingLeft: "20px" }}>
          {node.children.map((child: any) => (
            <TreeItem
              key={child.id}
              node={child}
              onToggleBookmark={onToggleBookmark}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = ({ data, onToggleBookmark }: any) => {
  return (
    <div>
      {data.map((node: any) => (
        <TreeItem
          key={node.id}
          node={node}
          onToggleBookmark={onToggleBookmark}
        />
      ))}
    </div>
  );
};

const App = () => {
  const getKey = <T extends object>(list: T[]): (T & { key: string })[] => {
    return list.map((el, i) => {
      return {
        ...el,
        key: String(i),
      };
    });
  };

  const dispatch = useDispatch();

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
      element: <TextFields placeholder="jfiosd" />,
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

  const [pages, setPages] = useState([]);
  const pageInfo = useSelector((state: RootState) => state.counter.pageInfo);

  useEffect(() => {
    setPages(pageInfo);
  }, [pageInfo]);

  const toggleBookmark = (id: any) => {
    const toggle = (items: any) => {
      return items.map((item: any) => {
        if (item.id === id) {
          return { ...item, isBookMark: !item.isBookMark };
        } else if (item.children) {
          return { ...item, children: toggle(item.children) };
        }
        return item;
      });
    };

    setPages(toggle(pages));
  };

  return (
    <>
      <button onClick={() => dispatch(updateBookmark(2))}>fjdiso</button>
      <TreeView data={pages} onToggleBookmark={updateBookmark} />
      {/* <TreeView
        aria-label="file system navigator"
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ChevronRightIcon />}
        sx={{ height: 240, flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        <StyledTreeItem
          rootNode
          style={{ position: "relatve" }}
          isFolder
          sx={{
            [`&. ${treeViewClasses.root}`]: {
              marginLeft: 15,
              paddingLeft: 18,
              borderLeft: `1px dashed #f2f2f2`,
            },
          }}
          child={1}
          nodeId="1"
          label="Applications"
        >
          <StyledTreeItem nodeId="2" label="Calendar" />
        </StyledTreeItem>
        <StyledTreeItem
          style={{ position: "relative" }}
          isFolder
          child={6}
          rootNode
          nodeId="5"
          label="Documents"
        >
          <StyledTreeItem nodeId="10" label="OSS" />
          <StyledTreeItem isFolder child={1} nodeId="11" label="MUI">
            <StyledTreeItem isFolder child={1} nodeId="19" label="MUI">
              <StyledTreeItem nodeId="20" label="index.js" />
            </StyledTreeItem>
          </StyledTreeItem>
          <StyledTreeItem isFolder child={1} nodeId="12" label="MUI">
            <StyledTreeItem nodeId="8" label="index.js" />
          </StyledTreeItem>
          <StyledTreeItem isFolder child={1} nodeId="13" label="MUI">
            <StyledTreeItem nodeId="8" label="index.js" />
          </StyledTreeItem>
          <StyledTreeItem isFolder child={1} nodeId="14" label="MUI">
            <StyledTreeItem nodeId="8" label="index.js" />
          </StyledTreeItem>
          <StyledTreeItem isFolder child={1} nodeId="15" label="MUI">
            <StyledTreeItem nodeId="8" label="index.js" />
          </StyledTreeItem>
        </StyledTreeItem>
      </TreeView> */}
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
