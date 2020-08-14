import React from 'react';
import Helmet from 'react-helmet';

export default function HelmetHead({title, description, img, additionalNodes, ...props}){

    return (
      <Helmet {...props}>
        {!!title && <title>{title} - aCasa</title>}
        {!!description && <meta name="description" content={description} />}

        {/* SOCIAL STUFF */}
        {/* NOTE: ONLY WORKS FOR SERVERSIDE RENDERING */}
        {!!title && <meta property="og:title" content={`${title} - aCasa`} />}
        {!!title && <meta property="twitter:title" content={`${title} - aCasa`} />}
        {!!description && <meta property="og:description" content={description} />}
        {!!description && <meta property="twitter:description" content={description} />}
        {!!img && <meta property="og:image" content={img} />}
        {!!img && <meta property="twitter:image" content={img} />}

        {/* SUPPORTS ADDING ADDITIONAL HEAD TYPES AS WELL */}
        {additionalNodes &&
          !!additionalNodes.length &&
          additionalNodes.map((node) => node)}
      </Helmet>
    );

}