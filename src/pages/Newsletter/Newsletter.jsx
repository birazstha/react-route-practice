import NewsletterForm from "./NewsletterForm";

export default function Newsletter() {
  return (
    <>
      <h1>Join our awesome Newsletter</h1>
      <NewsletterForm />
    </>
  );
}

export async function signupAction({ request }) {
  const data = await request.formData();
  const email = data.get("email");

  console.log(email);
  return { message: "Signup successful" };
}
