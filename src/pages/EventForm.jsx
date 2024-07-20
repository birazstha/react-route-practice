import React from "react";
import styled from "styled-components";
import Input from "./UI/InputField";
import Textarea from "./UI/Textarea";
import {
  Form,
  useNavigation,
  useActionData,
  json,
  redirect,
} from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Forms = styled(Form)`
  display: flex;
  flex-direction: column;
  width: 300px;
`;

const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function EventForm({ method, data }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const errMessages = useActionData();
  const errors = errMessages && errMessages.errors ? errMessages.errors : {};

  return (
    <Container>
      <Forms method={method}>
        {/* Title */}
        <Input name="title" data={data ? data.title : ""} />

        {errors.title && <div className="error-message">{errors.title[0]}</div>}

        {/* Description */}
        <Textarea name="description" data={data ? data.description : ""} />
        {errors.description && (
          <div className="error-message">{errors.description[0]}</div>
        )}

        {/* Location */}
        <Input name="location" data={data ? data.location : ""} />

        {/* Event Date */}
        <Input
          type="date"
          name="event_date"
          data={data ? data.event_date : ""}
        />

        <Button type="submit" disabled={isSubmitting}>
          {data
            ? isSubmitting
              ? "Updating.."
              : "Update"
            : isSubmitting
            ? "Saving.."
            : "Save"}
        </Button>
      </Forms>
    </Container>
  );
}

export async function storeUpdateAction({ request, params }) {
  const data = await request.formData();
  const eventData = {
    title: data.get("title"),
    description: data.get("description"),
    location: data.get("location"),
    event_date: data.get("event_date"),
  };

  let url = "http://127.0.0.1:8000/api/events";

  if (request.method === "PUT") {
    url = `${url}/` + params.id;
  }

  console.log(url);

  const response = await fetch(url, {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Server error" }, { status: 500 });
  }

  return redirect("/events");
}
