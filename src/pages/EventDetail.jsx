import {
  useRouteLoaderData,
  json,
  useSubmit,
  redirect,
} from "react-router-dom";
import Button from "./UI/Button";

export default function EventDetail() {
  const submit = useSubmit();
  function deleteEvent(id) {
    const proceed = window.confirm("Are you sure you want to delete this?");
    if (proceed) {
      submit(null, { method: "DELETE" });
    }
  }

  const event = useRouteLoaderData("event-details");

  return (
    <>
      <h1>{event.data.title}</h1>
      <p>{event.data.description}</p>
      <p>Date: {event.data.event_date}</p>
      <Button path={"edit"}>Edit</Button>
      <Button fnc={() => deleteEvent(event.data.id)}>Delete</Button>

    </>
  );
}

export async function loader({ request, params }) {
  const id = params.id;

  const response = await fetch("http://127.0.0.1:8000/api/events/" + id);

  if (!response.ok) {
    throw json({ message: "Server Error" }, { status: 500 });
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const id = params.id;

  const response = await fetch("http://127.0.0.1:8000/api/events/" + id, {
    method: request.method,
  });

  if (!response.ok) {
    throw json({ message: "Server Error" }, { status: 500 });
  }

  return redirect("/events");
}
