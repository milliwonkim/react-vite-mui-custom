import React, { useState } from "react";

const TreeNode = ({ node }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasChild = node.children ? true : false;

  return (
    <li>
      <div onClick={() => setIsExpanded(!isExpanded)}>
        {node.label}
        {hasChild && (isExpanded ? "[-]" : "[+]")}
      </div>
      {hasChild && isExpanded && (
        <ul>
          {node.children.map((childNode) => (
            <TreeNode key={childNode.id} node={childNode} />
          ))}
        </ul>
      )}
    </li>
  );
};

const TreeView = ({ data }) => {
  return (
    <ul>
      {data.map((node) => (
        <TreeNode key={node.id} node={node} />
      ))}
    </ul>
  );
};

// 사용 예시
const treeData = [
  {
    id: 1,
    label: "Node 1",
    children: [
      {
        id: 2,
        label: "Child 1",
      },
      {
        id: 3,
        label: "Child 2",
        children: [
          {
            id: 4,
            label: "Grandchild",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    label: "Node 2",
  },
];

const App = () => {
  return (
    <>
      <TreeView data={treeData} />;
    </>
  );
};

export default App;
