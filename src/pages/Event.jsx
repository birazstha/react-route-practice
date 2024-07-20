import styled from "styled-components";
import { Suspense } from "react";
import {
  json,
  redirect,
  useLoaderData,
  useSubmit,
  Link,
  defer,
  Await,
} from "react-router-dom";
import Button from "./UI/Button";
import EventData from "./EventData";

export default function Event() {
  const { events } = useLoaderData();




  return (
    <>
      <div style={{ marginBottom: "10px", textAlign: "end" }}>
        <Button path={"create"}>Add</Button>
      </div>

      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>
          {(events) => <EventData events={events} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvents() {
  const response = await fetch("http://127.0.0.1:8000/api/events");

  if (!response.ok) {
    throw json({ message: "Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.data;
  }
}

export function eventLoader() {
  return defer({
    events: loadEvents(),
  });
}

//Deleting Listed Events
export async function deleteEventAction({ request, params }) {
  const data = await request.formData();
  const id = data.get("eventId");
  const response = await fetch("http://127.0.0.1:8000/api/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Server Error" }, { status: 500 });
  }

  return redirect("/events");
}
