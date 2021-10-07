import React, { useState } from "react";
import styled from "styled-components";
import { Card } from "./Card";

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

export const Home = (props) => {
  const [inputField, setInputField] = useState({
    rowField: 0,
    columnField: 0,
  });
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);

  const handleSubmit = () => {
    setInputField({
      rowField: parseInt(row ? row : 0),
      columnField: parseInt(column ? column : 0),
    });
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
              return <Card />;
            }
          )}
        </div>
      </CardContainer>
    </div>
  );
};
