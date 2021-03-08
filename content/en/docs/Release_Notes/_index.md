---
title: Release Notes
linkTitle: Release Notes
weight: 60
date: 2021-03-02
no_list: true
---

## {{% variables/apibuilder_prod_name %}} - Hanoi

### Summary

This release includes:

* [Upgrade](#upgrade)

* [Features](#features)

* [Fixes](#fixes)

* [Updated Modules](#updated-modules)

* [Plugins](#updated-plugins)

* [Known Issues](#known-issues)

### Upgrade

Before updating, we recommend deleting package-lock.json if it exists.

To update an existing {{% variables/apibuilder_prod_name %}} application, execute the following command from within the application directory:

```bash
npm update
```

### Features

* #6739: Previously, the version of the [marked](https://www.npmjs.com/package/marked) module that {{% variables/apibuilder_prod_name %}} was using had a vulnerability [CVE-2021-21306](https://nvd.nist.gov/vuln/detail/CVE-2021-21306). Now, the module was upgraded to marked@2.0.0, however, the module is no longer fully compatible with Node.js 8.x (see [#1927](https://github.com/markedjs/marked/issues/1927)) and since {{% variables/apibuilder_prod_name %}} Web is deprecated (see D011APIBuilderWeb\]) and Node.js 8.x is also deprecated (see D039UnmaintainedNode.jsversions\]), {{% variables/apibuilder_prod_name %}} will now emit a warning if using marked web routes on Node.js 8.x.

* #6754: Previously, new {{% variables/apibuilder_prod_name %}} projects were installed with `version` 3.0.0 of `@axway/api-builder-plugin-fn-base64.` Now, new projects install with version 4.0.0.

### Fixes

* #5082: {{% variables/apibuilder_prod_name %}} will no longer throw an exception if the user tries to create a Model without a `models` directory in their project, or the user tries to create a Flow without a `flows` directory in their project.

* #5401: Fixed bug where logs would be incorrect when the first value to be logged was a printf-like string format.

* #5401: Previously, some logs would contain \[request-id: undefined\] when Flows were executed via flow-triggers or the Flow editor debugger. Now, the logged request-id is a unique GUID for Flows executed via the debugger, and Flows executed by flow-triggers display the current \[trigger-id: \]

* #6555: Previously, `@axway/api-builder-plugin-fn-base64` Encode method did not correctly base64 encode `Buffers`, and would encode the JSON representation of a Buffer. Now, the raw `Buffer` will be encoded.

* #6703: Previously, Endpoints that use remote schema references, that refer another another schema, were dereferenced incorrectly, which subsequently caused invalid service Swagger generation with the error `JSON_OBJECT_VALIDATION_FAILED`. Now, chained schema references can be used and will produce valid service Swagger.

* #6704: Previously, long endpoint paths that exceeded the rendering width of the flow-node properties panel were illegible in the UI when inspecting the endpoint flow-trigger. Now, long endpoint paths are rendered with an ellipsis (...), and have titles to allow the user to see the full path on hover.

* #6704: Previously, in the Flow editor's parameter dialog editor (e.g. Mustache), the horizontal scroll bar was visible even if the text did not overflow the editor. Now, the scroll bar is hidden when there is no horizontal scrolling.

* #6711: Previously, the Apply button in the Flow Editor would incorrectly become enabled when a new trigger was added, but then subsequently removed. Now, the Apply button correctly becomes disabled once the newly added trigger is removed.

* #6719: Previously, the Apply button in the Flow Editor would incorrectly become enabled when the flow was edited while it contained an invalid-flow trigger that was uninstalled. Now, the flow cannot be saved until the uninstalled flow-trigger is deleted from the Flow, and all other error(s) are resolved.

* #6755: Fixed a problem where some syntactically valid flows were not rendered in the UI.

### Updated modules

* [@axway/amplify-api-builder-cli@1.14.0](https://www.npmjs.com/package/@axway/amplify-api-builder-cli/v/1.14.0)

* [@axway/api-builder@4.23.0](https://www.npmjs.com/package/@axway/api-builder/v/4.23.0)

* [@axway/api-builder-admin@1.37.8](https://www.npmjs.com/package/@axway/api-builder-admin/v/1.37.8)

* [@axway/api-builder-runtime@4.55.4](https://www.npmjs.com/package/@axway/api-builder-runtime/v/4.55.4)

### Updated plugins

* [@axway/api-builder-plugin-fn-base64@4.0.0](https://www.npmjs.com/package/@axway/api-builder-plugin-fn-base64/v/4.0.0)

### Known Issues

To see a list of up-to-date known-issues see [{{% variables/apibuilder_prod_name %}} Known Issues](/docs/known_issues/).

## Recent Releases

* [{{% variables/apibuilder_prod_name %}} - 12 February 2021](/docs/release_notes/-_12_february_2021/)

* [{{% variables/apibuilder_prod_name %}} - 29 January 2021](/docs/release_notes/-_29_january_2021/)

* [{{% variables/apibuilder_prod_name %}} - 15 January 2021](/docs/release_notes/-_15_january_2021/)

* [{{% variables/apibuilder_prod_name %}} - 18 December 2020](/docs/release_notes/-_18_december_2020/)

* [{{% variables/apibuilder_prod_name %}} - 4 December 2020](/docs/release_notes/-_4_december_2020/)

* [{{% variables/apibuilder_prod_name %}} - 20 November 2020](/docs/release_notes/-_20_november_2020/)

* [{{% variables/apibuilder_prod_name %}} - 6 November 2020](/docs/release_notes/-_6_november_2020/)

* [{{% variables/apibuilder_prod_name %}} - 23 October 2020](/docs/release_notes/-_23_october_2020/)

* [{{% variables/apibuilder_prod_name %}} - 8 October 2020](/docs/release_notes/-_8_october_2020/)

* [{{% variables/apibuilder_prod_name %}} - 25 September 2020](/docs/release_notes/-_25_september_2020/)