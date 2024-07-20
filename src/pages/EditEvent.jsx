import styled from "styled-components";

import EventForm from "./EventForm";
import { Await, defer, json, useRouteLoaderData } from "react-router-dom";
import { Suspense } from "react";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export default function EditEvent() {
  const { event } = useRouteLoaderData("event-edit");

  return (
    <Container>
      <h1>Edit Event</h1>

      <Suspense fallback={<p>Loading..</p>}>
        <Await resolve={event}>
          {(event) => <EventForm method="put" data={event} />}
        </Await>
      </Suspense>
    </Container>
  );
}

async function editEvent(eventId) {
  const response = await fetch("http://127.0.0.1:8000/api/events/" + eventId);
  if (!response.ok) {
    throw json({ message: "Error occurred" }, { method: "500" });
  } else {
    const resData = await response.json();
    return resData.data;
  }
  
}

export async function eventEditLoader({ request, params }) {
  return defer({
    event: editEvent(params.id),
  });
}

export async function updateAction({ request, params }) {
  const response = await fetch(
    "http://127.0.0.1:8000/api/events/" + params.id,
    {
      data: [],
    }
  );
  console.log(response);
}
