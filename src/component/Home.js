import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Card } from "./Card";
import {
  FaHome,
  FaAccessibleIcon,
  FaAmazon,
  FaAmazonPay,
  FaAlipay,
  FaAngellist,
  FaApple,
  FaAsymmetrik,
} from "react-icons/fa";

const Input = styled.input`
  border: 1px solid #ccc;
  width: 25%;
  padding: 5px;
  background-color: transparent;
  font-size: 14px;
  color: #000;
  margin-right: 20px;
`;

const Button = styled.button`
  color: #fff;
  padding: 4px 20px;
  background-color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 5px;
  font-size: 16px;
`;

const CardContainer = styled.div`
  margin: 20px 0;
`;

const icons = [
  {
    icon: <FaHome />,
  },
  {
    icon: <FaAccessibleIcon />,
  },
  {
    icon: <FaAmazon />,
  },
  {
    icon: <FaAmazonPay />,
  },
  {
    icon: <FaAlipay />,
  },
  {
    icon: <FaAngellist />,
  },
  {
    icon: <FaApple />,
  },
  {
    icon: <FaAsymmetrik />,
  },
];

const color = [
  "#FF6633",
  "#FFB399",
  "#FF33FF",
  "#FFFF99",
  "#00B3E6",
  "#E6B333",
  "#3366E6",
  "#999966",
  "#99FF99",
  "#B34D4D",
  "#80B300",
  "#809900",
  "#E6B3B3",
  "#6680B3",
  "#66991A",
  "#FF99E6",
  "#CCFF1A",
  "#FF1A66",
  "#E6331A",
  "#33FFCC",
  "#66994D",
  "#B366CC",
  "#4D8000",
  "#B33300",
  "#CC80CC",
  "#66664D",
  "#991AFF",
  "#E666FF",
  "#4DB3FF",
  "#1AB399",
  "#E666B3",
  "#33991A",
  "#CC9999",
  "#B3B31A",
  "#00E680",
  "#4D8066",
  "#809980",
  "#E6FF80",
  "#1AFF33",
  "#999933",
  "#FF3380",
  "#CCCC00",
  "#66E64D",
  "#4D80CC",
  "#9900B3",
  "#E64D66",
  "#4DB380",
  "#FF4D4D",
  "#99E6E6",
  "#6666FF",
];

export const Home = (props) => {
  const [inputField, setInputField] = useState({
    rowField: 0,
    columnField: 0,
  });
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [newIcons, setNewIcons] = useState([]);
  const [shuffleColors, setShuffleColors] = useState([]);
  const [newColors, setNewColors] = useState([]);

  const handleSubmit = () => {
    setInputField({
      rowField: parseInt(row ? row : 0),
      columnField: parseInt(column ? column : 0),
    });
    let newIcons = [];
    let newColors = [];
    for (
      let i = 0;
      i < parseInt(row ? row : 0) * parseInt(column ? column : 0);
      i++
    ) {
      let index = i;
      if (icons.length <= i) {
        index = i % icons.length;
      }
      const element = icons[index];
      newIcons.push({ id: i, ...element });
      setNewIcons(newIcons);
      
      const color = shuffleColors[index];
      newColors.push(color);
      setNewColors(newColors);

    }
  };

  const handleDragStart = (event, data) => {
    let fromBox = JSON.stringify({ id: data.id });
    event.dataTransfer.setData("dragContent", fromBox);
  };

  const swapBoxes = (fromBox, toBox) => {
    let boxes = newIcons.slice();
    let fromIndex = -1;
    let toIndex = -1;

    for (let i = 0; i < boxes.length; i++) {
      if (boxes[i].id === fromBox.id) {
        fromIndex = i;
      }
      if (boxes[i].id === toBox.id) {
        toIndex = i;
      }
    }

    if (fromIndex !== -1 && toIndex !== -1) {
      let { fromId, ...fromRest } = boxes[fromIndex];
      let { toId, ...toRest } = boxes[toIndex];
      boxes[fromIndex] = { id: fromBox.id, ...toRest };
      boxes[toIndex] = { id: toBox.id, ...fromRest };

      setNewIcons(boxes);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    return false;
  };

  const handleDrop = (event, data) => {
    event.preventDefault();

    let fromBox = JSON.parse(event.dataTransfer.getData("dragContent"));
    let toBox = { id: data.id };

    swapBoxes(fromBox, toBox);
    return false;
  };

  useEffect(() => {
    setShuffleColors(shuffleArray(color));
  }, []);

  const shuffleArray = (array) => {
    let i = array?.length - 1;
    for (; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  return (
    <div
      style={{
        flex: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Input
        type="number"
        className="input-field"
        placeholder="Please enter no. of row"
        name="rowField"
        onChange={(e) => setRow(e.target.value)}
      />
      <Input
        type="number"
        className="input-field"
        placeholder="Please enter no. of column"
        name="columnField"
        onChange={(e) => setColumn(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>

      <CardContainer>
        <div
          style={{
            display: "grid",
            gridTemplate: `repeat(${inputField?.rowField}, calc(100% / ${inputField?.rowField})) / repeat(${inputField?.columnField}, calc(100% / ${inputField?.columnField})`,
          }}
        >
          {[...Array(inputField?.columnField * inputField?.rowField)].map(
            (e, i) => {
              return newIcons[i]?.icon ? (
                <Card
                  colorCode={newColors[i]}
                  icon={newIcons[i]}
                  key={newIcons[i].id}
                  draggable="true"
                  onDragStart={handleDragStart}
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                />
              ) : null;
            }
          )}
        </div>
      </CardContainer>
    </div>
  );
};
