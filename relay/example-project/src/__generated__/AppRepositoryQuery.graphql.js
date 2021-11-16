/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type stargazer_tracking_user$ref = any;
type stargazer_user$ref = any;
export type AppRepositoryQueryVariables = {||};
export type AppRepositoryQueryResponse = {|
  +repository: ?{|
    +name: string,
    +stargazers: {|
      +edges: ?$ReadOnlyArray<?{|
        +node: {|
          +$fragmentRefs: stargazer_user$ref & stargazer_tracking_user$ref
        |}
      |}>
    |},
  |}
|};
export type AppRepositoryQuery = {|
  variables: AppRepositoryQueryVariables,
  response: AppRepositoryQueryResponse,
|};
*/


/*
query AppRepositoryQuery {
  repository(owner: "facebook", name: "relay") {
    name
    stargazers(first: 2) {
      edges {
        node {
          ...stargazer_user
          ...stargazer_tracking_user
          id
        }
      }
    }
    id
  }
}

fragment stargazer_tracking_user on User {
  name
  url
}

fragment stargazer_user on User {
  id
  name
  login
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "kind": "Literal",
    "name": "name",
    "value": "relay"
  },
  {
    "kind": "Literal",
    "name": "owner",
    "value": "facebook"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v2 = [
  {
    "kind": "Literal",
    "name": "first",
    "value": 2
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "AppRepositoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "StargazerConnection",
            "kind": "LinkedField",
            "name": "stargazers",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "StargazerEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "stargazer_user"
                      },
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "stargazer_tracking_user"
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "stargazers(first:2)"
          }
        ],
        "storageKey": "repository(name:\"relay\",owner:\"facebook\")"
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AppRepositoryQuery",
    "selections": [
      {
        "alias": null,
        "args": (v0/*: any*/),
        "concreteType": "Repository",
        "kind": "LinkedField",
        "name": "repository",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "StargazerConnection",
            "kind": "LinkedField",
            "name": "stargazers",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "concreteType": "StargazerEdge",
                "kind": "LinkedField",
                "name": "edges",
                "plural": true,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "node",
                    "plural": false,
                    "selections": [
                      (v3/*: any*/),
                      (v1/*: any*/),
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "login",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "url",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              }
            ],
            "storageKey": "stargazers(first:2)"
          },
          (v3/*: any*/)
        ],
        "storageKey": "repository(name:\"relay\",owner:\"facebook\")"
      }
    ]
  },
  "params": {
    "cacheID": "5ab5081f1a5d56cd6fe843af3cc51caf",
    "id": null,
    "metadata": {},
    "name": "AppRepositoryQuery",
    "operationKind": "query",
    "text": "query AppRepositoryQuery {\n  repository(owner: \"facebook\", name: \"relay\") {\n    name\n    stargazers(first: 2) {\n      edges {\n        node {\n          ...stargazer_user\n          ...stargazer_tracking_user\n          id\n        }\n      }\n    }\n    id\n  }\n}\n\nfragment stargazer_tracking_user on User {\n  name\n  url\n}\n\nfragment stargazer_user on User {\n  id\n  name\n  login\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'ef1b71a9c434598e236bb986f2a8fa3c';

module.exports = node;
