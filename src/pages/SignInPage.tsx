import { useState } from "react";
import LoginContainer from "../components/LoginContainer";
import SignUpContainer from "../components/SignUpContainer";

const SignInPage = () => {
  const [toggleEvent, setToggleEvent] = useState(false);

  return (
    <div className="min-h-screen">
      {toggleEvent ? (
        <SignUpContainer setToggleEvent={setToggleEvent} />
      ) : (
        <LoginContainer setToggleEvent={setToggleEvent} />
      )}
    </div>
  );
};

export default SignInPage;
