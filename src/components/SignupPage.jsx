import React from "react";
import MainContentWrapper from "./MainContentWrapper";
import ContentPaper from "./ContentPaper";
import SignUp from "./SignUp";
import Head from './Head';
export default function LoginPage() {
  return (
    <MainContentWrapper>
      <Head title="Sign Up" description={"Sign up to aCasa here."} />
      <ContentPaper style={{ margin: "2em .5em 5em" }}>
        <div
          style={{
            minHeight: "65vh",
            display: "flex",
            alignItems: "center",
            padding: "1em",
          }}
        >
          <SignUp />
        </div>
      </ContentPaper>
    </MainContentWrapper>
  );
}
