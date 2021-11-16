/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type stargazer_tracking_user$ref: FragmentReference;
declare export opaque type stargazer_tracking_user$fragmentType: stargazer_tracking_user$ref;
export type stargazer_tracking_user = {|
  +name: ?string,
  +url: any,
  +$refType: stargazer_tracking_user$ref,
|};
export type stargazer_tracking_user$data = stargazer_tracking_user;
export type stargazer_tracking_user$key = {
  +$data?: stargazer_tracking_user$data,
  +$fragmentRefs: stargazer_tracking_user$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "stargazer_tracking_user",
  "selections": [
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
      "name": "url",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
// prettier-ignore
(node/*: any*/).hash = 'e780b420e71ff26c4b93e36fc9b0cbd1';

module.exports = node;
