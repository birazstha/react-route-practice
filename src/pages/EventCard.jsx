import styled from "styled-components";


const Card = styled.div`
  border: 1px solid wheat;
  padding: 1rem;
  height: 280px;
  width: 390px;
  border-radius: 10px;
  text-align: center;
`;


export default function EventCard(ev) {
  return (
    <Card>
      <h2>{ev.data.title}</h2>
      <p>{ev.data.description}</p>
      <p>Date: {ev.data.event_date}</p>
      <p>Location: {ev.data.location}</p>

    </Card>
  );
}
