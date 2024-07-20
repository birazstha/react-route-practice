import styled from "styled-components";

import EventForm from "./EventForm";
import { useRouteLoaderData } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export default function EditEvent() {
  const event = useRouteLoaderData("event-details");

  return (
    <Container>
      <h1>Edit Event</h1>
      <EventForm method="put" data={event.data}></EventForm>
    </Container>
  );
}
