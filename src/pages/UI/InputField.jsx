import styled from "styled-components";

const Input = styled.input`
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default function InputField({
  name,
  type,
  placeholder,
  data,
  required,
}) {
  return (
    <>
      <Input
        type={type}
        name={name}
        required={required && required === true ? true : false}
        placeholder={placeholder ? placeholder : "Enter " + name}
        defaultValue={data}
      />
    </>
  );
}
