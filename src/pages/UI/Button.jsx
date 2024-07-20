import { Link } from "react-router-dom";
import styled from "styled-components";

const AnchorBtn = styled(Link)`
  text-decoration: none;
  border: 1px solid white;
  padding: 5px;
  border-radius: 5px;
  color: white;
  margin-left: 10px;
`;

const Btn = styled.button`
  border: 1px solid white;
  padding: 5px;
  border-radius: 5px;
  color: white;
  margin-left: 10px;
  background-color: transparent;
`;

export default function Button({ path, fnc, children }) {
  return (
    <>
      {path ? (
        <AnchorBtn to={path}>{children}</AnchorBtn>
      ) : (
        <Btn onClick={fnc}>{children}</Btn>
      )}
    </>
  );
}
