import styled from "styled-components";
import {
  json,
  redirect,
  useLoaderData,
  useSubmit,
  Link,
} from "react-router-dom";
import Button from "./UI/Button";

const Table = styled.table`
  border: 1px solid gray;
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.th`
  border: 1px solid gray;
  padding: 1rem;
`;

const TableRow = styled.tr`
  border: 1px solid gray;
`;

const TableCell = styled.td`
  border: 1px solid gray;
  text-align: center;
  padding: 1rem;
`;

const EventTitle = styled(Link)`
  text-decoration: none;
  color: white;
  transition: color 0.3s ease;
  &:hover {
    color: wheat;
  }
`;

export default function Event() {
  const events = useLoaderData();
  const submit = useSubmit();

  function deleteEvent(eventId) {
    const proceed = window.confirm("Are you sure you want to delete this?");
    const formData = new FormData();

    formData.append("eventId", eventId);
    if (proceed) {
      submit(formData, { method: "DELETE" });
    }
  }

  return (
    <>
      <div style={{ marginBottom: "10px", textAlign: "end" }}>
        <Button path={"create"}>Add</Button>
      </div>

      <Table>
        <thead>
          <TableHead>S.N</TableHead>
          <TableHead>Event</TableHead>
          <TableHead>Action</TableHead>
        </thead>
        <tbody>
          {events.length > 0 ? (
            events.map((ev, index) => (
              <TableRow key={ev.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <EventTitle to={`${ev.id}`}>{ev.title}</EventTitle>
                </TableCell>
                <TableCell>
                  <Button path={`${ev.id}/edit`}>Edit</Button>
                  <Button path={`${ev.id}`}>View</Button>
                  <Button fnc={() => deleteEvent(ev.id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} style={{ textAlign: "center" }}>
                No Events found
              </TableCell>
            </TableRow>
          )}
        </tbody>
      </Table>
    </>
  );
}

export async function loader() {
  const response = await fetch("http://127.0.0.1:8000/api/events");
  if (!response.ok) {
    throw json({ message: "Server Error" }, { status: 500 });
  } else {
    const resData = await response.json();
    return resData.data;
  }
}

export async function action({ request, params }) {
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
