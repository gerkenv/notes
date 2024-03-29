import React from "react";
import "./App.css";
import fetchGraphQL from "./fetchGraphQL";
import graphql from "babel-plugin-relay/macro";
import {
  RelayEnvironmentProvider,
  loadQuery,
  usePreloadedQuery,
} from "react-relay/hooks";
import RelayEnvironment from "./RelayEnvironment";
import { Stargazer } from "./stargazer";

const { Suspense } = React;

// Define a query
const AppRepositoryQuery = graphql`
  query AppRepositoryQuery {
    repository(owner: "facebook", name: "relay") {
      name
      stargazers(first: 2) {
        edges {
          node {
            # Include child fragment:
            ...stargazer_user
            ...stargazer_tracking_user
          }
        }
      }
    }
  }
`;

// Immediately load the query as our app starts. For a real app, we'd move this
// into our routing configuration, preloading data as we transition to new routes.
const preloadedQuery = loadQuery(RelayEnvironment, AppRepositoryQuery, {
  /* query variables */
});

// Inner component that reads the preloaded query results via `usePreloadedQuery()`.
// This works as follows:
// - If the query has completed, it returns the results of the query.
// - If the query is still pending, it "suspends" (indicates to React that the
//   component isn't ready to render yet). This will show the nearest <Suspense>
//   fallback.
// - If the query failed, it throws the failure error. For simplicity we aren't
//   handling the failure case here.
function App(props) {
  const data = usePreloadedQuery(AppRepositoryQuery, props.preloadedQuery);

  // console.log(
  //   data.repository.stargazers.edges.map((edge) => {
  //     const { id, login, name } = edge.node;
  //   })
  // );

  return (
    <div className="App">
      <header className="App-header">
        <p>{data.repository.name}</p>
        {data.repository.stargazers.edges.map((edge) => {
          return (
            <>
              <br />
              <Stargazer user={edge.node}></Stargazer>
            </>
          );
        })}
      </header>
    </div>
  );
}

// The above component needs to know how to access the Relay environment, and we
// need to specify a fallback in case it suspends:
// - <RelayEnvironmentProvider> tells child components how to talk to the current
//   Relay Environment instance
// - <Suspense> specifies a fallback in case a child suspends.
function AppRoot(props) {
  return (
    <RelayEnvironmentProvider environment={RelayEnvironment}>
      <Suspense fallback={"Loading..."}>
        <App preloadedQuery={preloadedQuery} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default AppRoot;
