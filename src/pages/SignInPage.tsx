import { useState } from "react";
import LoginContainer from "../components/LoginContainer";
import SignUpContainer from "../components/SignUpContainer";

const SignInPage = () => {
  const [toggleEvent, setToggleEvent] = useState(false);

  return (
    <div>
      {toggleEvent ? (
        <LoginContainer setToggleEvent={setToggleEvent} />
      ) : (
        <SignUpContainer setToggleEvent={setToggleEvent} />
      )}
    </div>
  );
};

export default SignInPage;
