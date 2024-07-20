import styled from "styled-components";

const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function Textarea({ type, data, name }) {
  const ucfirst = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <>
      <TextArea name={name} id={name} placeholder={"Enter " + ucfirst(name)}>
        {data}
      </TextArea>
    </>
  );
}
