import React from 'react';
import UploadOneImage from './UploadOneImage';
import ThemeButton from './Button'
import MainContentWrapper from './MainContentWrapper';
import ContentPaper from './ContentPaper';

export default function Testing(){
    return (
      <MainContentWrapper>
        <ContentPaper style={{ padding: "3em", width: 800, minHeight: 500 }}>
          <UploadOneImage />
        </ContentPaper>
      </MainContentWrapper>
    );
}