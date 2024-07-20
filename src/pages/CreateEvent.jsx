import styled from "styled-components";

import EventForm from "./EventForm";
import { json, redirect } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export default function CreateEvent() {
  return (
    <Container>
      <h1>New Event</h1>
      <EventForm method="post" />
    </Container>
  );
}


