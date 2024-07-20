import {
  useRouteLoaderData,
  json,
  useSubmit,
  redirect,
  defer,
  Await,
} from "react-router-dom";
import Button from "./UI/Button";
import { Suspense } from "react";
import EventData from "./EventData";

export default function EventDetail() {
  const { event, events } = useRouteLoaderData("event-details");
  const submit = useSubmit();

  function deleteEvent(id) {
    const proceed = window.confirm("Are you sure you want to delete this?");
    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  return (
    <>
      <Suspense fallback={<p>Loading..</p>}>
        <Await resolve={event}>
          {(event) => (
            <>
              <h1>{event.title}</h1>
              <p>{event.description}</p>
              <p>Date: {event.event_date}</p>
              <Button path={"edit"}>Edit</Button>
              <Button fnc={() => deleteEvent(event.id)}>Delete</Button>
            </>
          )}
        </Await>
      </Suspense>

      <Suspense fallback={<p>Loading...</p>}>
        <Await resolve={events}>
          {(events) => <EventData events={events} />}
        </Await>
      </Suspense>
    </>
  );
}

async function loadEvent(eventId) {
  const response = await fetch("http://127.0.0.1:8000/api/events/" + eventId);
  if (!response.ok) {
    throw json({ message: "Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.data;
  }
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

export async function eventDetailLoader({ request, params }) {
  return defer({
    event: await loadEvent(params.id),
    events: loadEvents(),
  });
}

//Deleting Viewed Event
export async function eventDeleteLoader({ request, params }) {
  const id = params.id;

  const response = await fetch("http://127.0.0.1:8000/api/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Server Error" }, { status: 500 });
  }

  return redirect("/events");
}
