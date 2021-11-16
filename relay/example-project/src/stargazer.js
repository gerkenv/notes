import { useFragment } from "react-relay/hooks";
import graphql from "babel-plugin-relay/macro";
import React from "react";

const StargazerUserFragment = graphql`
  fragment stargazer_user on User {
    id
    name
    login
  }
`;

const StargazerTrackingUserFragment = graphql`
  fragment stargazer_tracking_user on User {
    name
    url
  }
`;

export const Stargazer = (props) => {
  const data = useFragment(StargazerUserFragment, props.user);
  const trackingData = useFragment(StargazerTrackingUserFragment, props.user);

  // console.log({ data });
  // console.log({ trackingData });

  return (
    <div style={{ backgroundColor: "#6091f3" }}>
      <div>{JSON.stringify({ data })}</div>
      <div>{JSON.stringify({ trackingData })}</div>
    </div>
  );
};
