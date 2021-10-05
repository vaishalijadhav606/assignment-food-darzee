import react from "react";
import styled from "styled-components";

const CardContent = styled.div`
  margin: 10px 10px 0 0;
  border-radius: 2px;
  border: 3px solid #000;
  width: 70px;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Card = (props) => {
  return (
      <CardContent>
          <div>Text</div>
      </CardContent>
  )
};
