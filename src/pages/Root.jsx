import { Outlet } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
`;

export default function Root() {
  return (
    <>
      <Container>
        <MainNavigation />
        <Outlet />
      </Container>
    </>
  );
}
