---
title: Known Issues
linkTitle: Known Issues
weight: 70
date: 2021-03-02
---

* #3825: Filtering the {{% variables/apibuilder_prod_name %}} Console administrator access using IPv6 addresses may cause ENOTFOUND errors.

* #3867: When attempting to create and save a flow for an imported Swagger endpoint that contains a path or paths defined by references, the save will fail.

* #3979: Attempting to delete an endpoint in the UI that was created as a result of dereferencing a JSON `$ref` will yield a 404 error. {{% variables/apibuilder_prod_name %}} will fail to locate the method since it only exists when the whole Swagger document is dereferenced. An example of a Swagger document using `$ref`:

    ```
    {
     "swagger": "2.0",
     "paths" {
      "x-path": {
       "get": {}
      },
      "/find": {
       "$ref": "#/paths/x-path"
      },
      "/search": {
       "$ref": "#/paths/x-path"
      }

     }
    }
    ```

* #4107: In the flow editor, If flow-node method descriptions contain words which are too long, they may not be visible in their entirety.

* #4528: Initializing a new project with `api-builder init 1234` where `1234` is any number will throw an ERR_INVALID_ARG_TYPE error rather than an "invalid npm package name" error.

* #4735: Invoking Upsert will fail for all data connectors when creating a composite model from an existing model and renaming one of the fields.

* #4749: A query on a `distinct` API created from the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) does not honor the value of the `order` parameter.

* #4750: The Upsert or FindAndModify methods are not present in the APIs generated from Mongo or MySQL connector based models.

* #4751: The FindAndModify method from APIs created using the Mongo plugin (`@axway/api-builder-plugin-dc-mongo`) responds with a 404 error rather than creating a new entry when the `upsert` parameter is `true`.

* #4752: The format of a distinct query response depends on the type of connector.

* #4759: Calling Update or FindAndModify on a model that uses the composite connector and contains the required fields may fail and cause the server to terminate.

* #4795: The MongoDB plugin `@axway/api-builder-plugin-dc-mongo` does not support primary keys that are not object identifiers correctly. The MongoDB specification allows for primary keys of other types. As a result, trying to use the plugin will result in errors:

    ```
    {
     "message": "Invalid Value for Find By ID: 'YOUR_STRING_PK_NAME'",
     "success": false,
     "request-id": "c118f187-2090-4a68-b939-37367ac55b80"
    }
    ```

* #4813: If the endpoint Swagger file in the `/endpoints` folder contains special characters in its name, for example `[test].json`, the endpoint is not rendered correctly in the UI.

* #4856: Passing in an invalid column name as a parameter to APIs generated from data connectors may result in an exception being thrown rather than the callback being executed with an error. A similar error may occur when using model flow-nodes, resulting in an error which cannot be handled by the flow.

* #4859: When endpoints are generated from a model, the endpoint descriptions do not use the correct plurals defined by the model.

* #4891: When saving a configuration file in the UI, the editor will briefly display the old version of the configuration while the server restarts. Any changes to the configuration will be saved as intended.

* #4951: When endpoint or flow files with URL encoded characters in the filename are present in a project, unexpected errors may occur. For example, the wrong flow or endpoint could be modified. Using files with encoded characters in their names is not recommended.

* #4961: Having the `%` symbol in various file names can cause problems in the {{% variables/apibuilder_prod_name %}} Console and with direct linking. It is therefore advisable to avoid using `%` in API, Endpoint, Flow, Model, and Configuration file names. This is a result of an issue in react-router/history. For additional information, refer to [https://github.com/ReactTraining/history/issues/505](https://github.com/ReactTraining/history/issues/505).

* #4966: {{% variables/apibuilder_prod_name %}} will generate invalid Swagger for programmatic APIs in `./apis` that bind to a path other than the `apiPrefix` defined in the configuration. These APIs must be bound to the same root path as defined by the `apiPrefix`.

* #5236: When invoking "Upsert" on an autogenerated API, where the primary key for the connected model is not "id", the response code will be 200 instead of 204 when the upsert results in an updated record.

* #5247: When calling Create on a connector with the payload containing a fasly required primary key, the create will fail.

* #5408: When uploading a Swagger file with security definitions (`apiKey`, `basic`, or `oauth2`) into the `swagger` dir of your service and changing the authorization credential type to `type:'invalid'` in the corresponding configuration file, the credential card in the {{% variables/apibuilder_prod_name %}} user interface is updated to authorized status and ready to use, which is not a valid response.

* #5463: Starting with Lisbon release, new projects, and old projects which have been [upgraded](https://docs.axway.com/bundle/API_Builder_4x_allOS_en/page/change_in_the_way_of_handling_authentication_and_authentication_plugins.html), which also have the configuration option "apiPrefix" set to '/' will not be able to access the Admin UI, or any other public URLs. "apiPrefix" should instead be set to a resource which doesn't clash with any URLs which should not have authentication.

* #5538: A model with a single-quote "'foo" is a valid model name, but not a valid endpoint name, so the single-quote will be stripped when generating endpoints. If another model "foo" exists and has generated endpoints, then generating endpoints for "'foo" with single-quote, will overwrite existing endpoints for "foo". The following characters are stripped from model names: `"?", ":", "'",` and `"."`.

* #6039: If including a slash "/" in a Model or Connector name, Invalid Swagger, Models, Flows and Endpoints may be encountered or generated. Therefore, it's recommended not to use this character.

* #6150: Stoplight always encodes default parameter values as strings, even though the type may not be a string (e.g. "number"). The Swagger validation will fail with an error, e.g. "Not a valid number". To work around the problem, you can manually change the parameter default from a string (e.g. `"42"`) to a number (e.g. `42`) by editing the Swagger directly, but that is not always an option. Alternatively, you can change the parameter type to a "string", and add a validation "pattern", e.g. `"[0-9]+"`.

* #6763: When a service is configured to use apikey auth, the API Doc & Test page does not reflect this and shows examples for basic. When testing the API, basic auth is also incorrectly used. As a workaround, a tool such as Postman or CURL should be used to invoke these APIs instead.