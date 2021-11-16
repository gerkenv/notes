/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type stargazer_user$ref: FragmentReference;
declare export opaque type stargazer_user$fragmentType: stargazer_user$ref;
export type stargazer_user = {|
  +id: string,
  +name: ?string,
  +login: string,
  +$refType: stargazer_user$ref,
|};
export type stargazer_user$data = stargazer_user;
export type stargazer_user$key = {
  +$data?: stargazer_user$data,
  +$fragmentRefs: stargazer_user$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "stargazer_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "login",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = '62820f8b6d67e4109a2b3f4067b7c775';

module.exports = node;
