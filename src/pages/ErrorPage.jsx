import { useRouteError } from "react-router-dom";
export default function ErrorPage() {
  const error = useRouteError();

  console.log(error);

  let errorMessage;

  if (error.status == 500) {
    errorMessage = error.data.message;
  }

  if (error.status == 404) {
    errorMessage = "No page found";
  }

  return (
    <div style={{ textAlign: "center" }}>
      <h1>{error.status}</h1>
      <h1>{errorMessage}</h1>
    </div>
  );
}
