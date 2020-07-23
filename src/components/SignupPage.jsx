import React from "react";
import MainContentWrapper from "./MainContentWrapper";
import ContentPaper from "./ContentPaper";
import SignUp from "./SignUp";

export default function LoginPage() {
  return (
    <MainContentWrapper>
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
