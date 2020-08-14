import React from 'react';
import MainContentWrapper from './MainContentWrapper';
import ContentPaper from './ContentPaper';
import LogIn from './LogIn';
import Head from './Head';

export default function LoginPage(){


    return (
      <MainContentWrapper>
        <Head title="Log In" description={"Log into aCasa here."} />
        <ContentPaper style={{ margin: "2em .5em 5em" }}>
          <div
            style={{
              minHeight: "65vh",
              display: "flex",
              alignItems: "center",
              padding: "1em",
            }}
          >
            <LogIn />
          </div>
        </ContentPaper>
      </MainContentWrapper>
    );
}