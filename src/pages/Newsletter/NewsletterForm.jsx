import { useFetcher } from "react-router-dom";

import InputField from "../UI/InputField";
import Button from "../UI/Button";
import { useEffect } from "react";

export default function NewsletterForm() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data && data.message) {
      window.alert(data.message);
    }
  }, [data, state]);

  return (
    <fetcher.Form method="post" action="/newsletter">
      <InputField
        name="email"
        type="email"
        required={true}
        placeholder="Signup for Newsletter"
      />
      <Button>Signup</Button>
    </fetcher.Form>
  );
}
