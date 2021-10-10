import React, { useRef } from "react";
import styled from "styled-components";
import { useElementSize } from "usehooks-ts";

const CardContent = styled.div`
  margin: 10px 10px 0 0;
  border-radius: 2px;
  border: 2px solid #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = (props) => {
  const { icon } = props;

  const squareRef = useRef(null);

  const { width } = useElementSize(squareRef);

  return (
    <CardContent
      ref={squareRef}
      style={{ backgroundColor: `${props.colorCode}`, height: width }}
    >
      <div
        style={{ fontSize: "5vw" }}
        draggable={props.draggable}
        onDragStart={(e) => props.onDragStart(e, { id: props.icon.id })}
        onDragOver={(e) => props.onDragOver(e, { id: props.icon.id })}
        onDrop={(e) => props.onDrop(e, { id: props.icon.id })}
      >
        {icon?.icon}
      </div>
    </CardContent>
  );
};
