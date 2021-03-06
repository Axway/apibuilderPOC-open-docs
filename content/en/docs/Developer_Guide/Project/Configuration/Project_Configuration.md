---
title: Project configuration
linkTitle: Project configuration
description: ADD A DESCRIPTION
weight: 10
date: 2021-06-22
---

## Introduction

{{% variables/apibuilder_prod_name %}} uses the configuration files in the project's `conf` directory to initialize the application and its connectors. Each JavaScript file in the directory should expose an object of key-value pairs. You may add any arbitrary key-value pair beside the one described below. The values will be passed to any method that is passed the {{% variables/apibuilder_prod_name %}} configuration object.

{{% alert title="⚠️ Note" color="primary" %}}API key values and session objects are auto-generated when you create a new project.{{% /alert %}}

## Settings

The following topics describe the project configuration settings.

### admin

\[object\] Configures the Admin Console. The `admin` object may contain the following key-value pairs:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| allowedHosts | Array<String> | \- | Restricts access to the Admin Console to the specified hosts. |
| apiDocPrefix | String | '/apidoc' | ****Deprecated [\[D002\]](/docs/deprecations/#D002)**.** Prefix for the API documentation. |
| disableAPIDoc | Boolean | false | ******Deprecated [\[D003\]](/docs/deprecations/#D003)****.** Set to `true` to display the generated Swagger API Docs. Changing the setting only works in production. Swagger documentation is always available in dev mode. |
| enabled | Boolean | true | Set to `true` to enable the Admin Console. |

### apidoc

\[object\] Configures the Swagger API documentation since the {{% variables/apibuilder_prod_name %}} Standalone - Boston release. The `apidoc` object may contain the following key-value pairs:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| disabled | Boolean | false | Set to `true` to display the generated Swagger API Docs. Changing the setting only works in production. Swagger documentation is always available in dev mode. |
| prefix | String | '/apidoc' | Prefix for the API documentation. |
| overrides | object | {} | Overrides to Swagger documentation. Any values set here do not change the functionality of the server, only what is exposed in the Swagger. |
| overrides.host | string | \- | Hostname and optional port on which the server can be accessed. |
| overrides.schemes | array | \- | Schemes which the server can be accessed using. Can be an array containing any of `http`, `https`, `ws`, or `wss`. |
| overrides.basePath | string | \- | The root path on which the APIs hosted by the server are available. If provided, this must start with a leading slash (`/`). The value can be set to `null` to clear the `basePath`. |

### apikey

\[string\] Generated API key.

### apiPrefix

\[string\] Required. Defaults to `/api`, and **must** start with a leading slash (`/`).

The `apiPrefix` forms the base of **all secured API** in the {{% variables/apibuilder_prod_name %}} service that you are developing. Authenticated access to all APIs that are bound to `apiPrefix` is controlled via `accessControl`.

For example, the model "testuser" has its API bound to `/api/testuser`, the "testapi" has its API bound to `/api/testapi`, and the API endpoint examlple for Greet flow is bound to `/api/greet`.

The apiPrefix is an important consideration when you are designing your API for use as an API endpoint in {{% variables/apibuilder_prod_name %}}. You might design your API so that all methods start with `/api`. For example, you might design your API as `/api/v1/calendar`. However, when it is imported into {{% variables/apibuilder_prod_name %}}, your path will be bound to `/api/api/v1/calendar`, which is not what you want. To achieve the desired result, the API needs to be designed _without_ the apiPrefix. The recommendation is to design your API with a versioned basePath "/v1", and then design your paths; for example, "/calendar". Your designed API, including its basePath, would have the method `/v1/calendar`, but when imported into {{% variables/apibuilder_prod_name %}}, it would be accessible as `/api/v1/calendar`.

To clarify, your Swagger 2.0 for this API might look similar to this:

```
// API design without API prefix

basePath: '/v1',
paths: {
    '/calendar': {
        get: {}
    }
}
```

### limits

\[object\] Configures request limits for the {{% variables/apibuilder_prod_name %}} server.

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| multipartPartSize | number|string | Infinity | Configures the maximum allowed part size for `multipart/form-data` requests. If any part exceeds this limit, the server will respond with a [413 Payload Too Large](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/413). Allowed values are:<br /><br />**number** - represents the maximum part size, in bytes.  <br />**string** - supports values such as "10B", "1KB", "100MB". Units are powers of two (1KB = 1024B). Stringified numbers without commas or decimals are also accepted. For example "65536". This allows full control via [environment](/docs/how_to/environmentalization/) variables.<br /><br />Negative numbers and `Infinity` are equivalent and represent **no limit**. It is recommended that your service be configured with a limit, otherwise it can be subjected to [DoS attacks](https://en.wikipedia.org/wiki/Denial-of-service_attack).<br /><br />When no value is provided, the default behavior is **no limit** for file type parts and **1mb** for other types of multipart fields. Due to the inconsistency, This behavior is deprecated **[\[D048\]](/docs/deprecations/#D048)**<br /><br />When a limit is configured, 413 responses will be added to all methods in the service's Swagger document. |

### accessControl

\[object\] Configures authentication access since the {{% variables/apibuilder_prod_name %}} Standalone - Kobe release. The `accessControl` object may contain the following key-value pairs:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| apiPrefixSecurity | string | none | Configures the authentication scheme to use on APIs that are hosted on `apiPrefix`. The built-in schemes are `none`, `basic`, `apikey`, and `ldap`. Also, it is possible to set this to `"plugin"` to provide custom authentication. |
| public | array | \- | An array of paths that are always accessible. The paths are prefixes, do not support any regex or parameterization, and should always start with a slash (for example, `/foo`). If `"/foo"` is a public path, then it is a path prefix (`"/foo/"`) such that all children are also public (for example, `"/foo/bar"`). If admin UI is enabled, then `/console` and `/adminapi` are automatic public paths. If `apidoc` is enabled, then `/apidoc` ([apidoc.prefix](#apidoc)) is also added. |
| plugin | string | \- | When `apiPrefixSecurity` is set to `"plugin"`, this should be the plugin module to load (see [Custom Authentication](/docs/developer_guide/project/configuration/authentication_schemes/#Customauthentication)). |

### APIKeyAuthPlugin

\[string\] Path to the authorization module js file. Only used if `APIKeyAuthType` is set to `plugin`.

For details, see [Authentication Schemes](/docs/developer_guide/project/configuration/authentication_schemes/). This key is deprecated **[\[D010\]](/docs/deprecations/#D010)**, use `accessControl` instead.

### APIKeyAuthType

\[string\] Value indicating the authorization type for the application. By default, it is set to '`basic'`.

For details, see [Authentication Schemes](/docs/developer_guide/project/configuration/authentication_schemes/). This key is deprecated **[\[D010\]](/docs/deprecations/#D010)**, use `accessControl` instead.

### connectors

\[object\] Configures the connectors used by the application. The connectors field is an object of key-value pairs where the key is the name of the connector, and the value is another key-value pair object used to configure the connector. The configuration object is specific to each connector.

Most connectors will have a default configuration file in the `conf` directory.

### cookieSecret

\[string\] If you want signed cookies, you can set this value. If you don't want to sign cookies, remove this value, or make it null.

### cors

\[object\] Configures the CORS settings. The `cors` object may contain the following key-value pairs:

| Key | Type | Description |
| --- | --- | --- |
| Access-Control-Allow-Origin | String | Specifies the URI that can access the server. Defaults to none. |
| Access-Control-Allow-Credentials | Boolean | Specifies whether or not to allow access by credentials. |
| Access-Control-Allow-Methods | String (comma separated or array) | If specified, only the listed methods will be allowed. All available methods are allowed by default. |
| Access-Control-Allow-Headers | String (comma separated or array) | Allowed request headers. |
| Access-Control-Expose-Headers | String (comma separated or array) | List of response headers exposed to the user. |

### proxy

\[string\] Configuration option for configuring the proxy server URL that can be leveraged in plugins that do HTTP or HTTPS communication.

Example:

proxy: `http://localhost:8081`

### flags

\[object\] Flags to enable features that are not ready for production or whose use may require manual upgrade steps in legacy services.

| Key | Type | Description |
| --- | --- | --- |
| enableAliasesInCompositeOperators | Boolean | Enable support for comparison operators - `$lt`, `$gt`, `$lte`, `$gte`, `$in`, `$nin`, `$ne`, and `$eq` - on aliased fields in Composite models. Previously, attempting to use these operators on aliased fields would result in unexpected behavior. The old functionality is deprecated **[\[D007\]](/docs/deprecations/#D007)**, so enabling this feature is recommended. |
| enableMemoryConnectorLike | Boolean | Enable `$like` comparison operator support in models based on the Memory connector. Previously, attempts to perform these queries would just have returned an empty result set. The old functionality is deprecated **[\[D008\]](/docs/deprecations/#D008)**, so enabling this feature is recommended. |
| enableModelsWithNoPrimaryKey | Boolean | Enable support for Models that do not have a primary key. The `enableModelsWithNoPrimaryKey` feature is a breaking change for previous {{% variables/apibuilder_prod_name %}} Standalone versions, as Create API previously returned a location header. Also, the model advertised unsupported methods. The old functionality is deprecated **[\[D004\]](/docs/deprecations/#D004)**, so enabling this feature is recommended. |
| usePrimaryKeyType | Boolean | Generate APIs and Flows that use primary key type for the Model ID instead of assuming that the Model ID is a string. The `usePrimaryKeyType` feature is a breaking change for previous {{% variables/apibuilder_prod_name %}} Standalone versions, as the generated APIs will change when the feature is enabled. The old functionality is deprecated **[\[D005\]](/docs/deprecations/#D005)**, so enabling this feature is recommended. |
| exitOnPluginFailure | Boolean | Enabling this flag will cause the service to exit when there is a problem loading a plugin. The old functionality is deprecated **[\[D006\]](/docs/deprecations/#D006)**, so enabling this feature is recommended. |
| enableScopedConfig | Boolean | Enabling this flag ensures that a plugin only receives the config relevant to that plugin. The old functionality is deprecated **[\[D009\]](/docs/deprecations/#D009),** so enabling this feature is recommended. |
| enableNullModelFields | Boolean | Enable support for null fields coming from Models. The old functionality is deprecated **[\[D013\]](/docs/deprecations/#D013)**, so enabling this feature is recommended. |
| enableModelNameEncoding | Boolean | Enable support for model names being percent-encoded as per RFC-3986 in auto-generated API. The old functionality is deprecated **\[[D012](/docs/deprecations/#D012)\]**, so enabling this feature is recommended. |
| enableModelNameEncodingInSwagger | Boolean | Enable support for model names being percent-encoded as per RFC-3986 in {{% variables/apibuilder_prod_name %}}'s Swagger. The old functionality is deprecated **[\[D014\]](/docs/deprecations/#D014)**, so enabling this feature is recommended. |
| enableModelNameEncodingWithConnectorSlash | Boolean | Enable support for model names being encoded while preserving the connector's slash. The old functionality is deprecated **[\[D015\]](/docs/deprecations/#D015)**, so enabling this feature is recommended. |
| enableOverrideEndpointContentType | Boolean | Enable support for overriding endpoint content-type using the flow's HTTP response headers, and returning raw data from flows. The old functionality is deprecated **[\[D042\]](/docs/deprecations/#D042)**, so enabling this feature is recommended. |
| enableModelErrorOutputs | Boolean | Enable support for model flow-nodes having Error outputs. The old functionality is deprecated **[\[D043\]](/docs/deprecations/#D043)**, so enabling this feature is recommended. |
| exitOnSwaggerSchemaValidationError | Boolean | Enabling this flag will cause the service to exit when there is an error validating the service Swagger or any loaded JSON schema. The old functionality is deprecated **[\[D045\]](/docs/deprecations/#D045)**, so enabling this feature is recommended. |

### logLevel

\[string\] Sets the log level for the logger utility. Accepted values are (in order of most-verbose to least) _trace_, _debug_, _info_, _warn_, _error_, _fatal, none_.

### session

\[object\] You can generally leave this as-is since it is generated for each new project you create. The `session` object may contain the following key-value pairs:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| encryptionAlgorithm | String | aes256 | Encryption algorithm. |
| encryptionKey | String | \- | Encryption key. |
| signatureAlgorithm | String | sha512-drop256 | Signature algorithm. |
| signatureKey | String | \- | Signature key. |
| secret | String | \- | Should be a large un-guessable string. |
| duration | String | 86400000 | How long the session will stay valid in milliseconds. |
| activeDuration | String | 300000 | The session will be extended by activeDuration milliseconds. |

### port

\[number/string\] The port to listen on for HTTP requests. Defaults to 8080. This key is deprecated **[\[D038\]](/docs/deprecations/#D038)**, use http.port instead.

### http

\[object\] Your HTTP configuration goes here:

| Key | Type | Description |
| --- | --- | --- |
| port | Number | The port to listen on for HTTP requests. |
| disabled | Boolean | False by default. When this flag is set to True HTTP traffic is disabled.<br /><br />For this to work, _baseurl_ should point to https path and _`ssl`_ must be configured and used. |

### ssl

\[object\] Your SSL configuration goes here. The options are the same as what is used by Node.js [https.createServer()](https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener) method. A subset is as follows:

| Key | Type | Description |
| --- | --- | --- |
| port | Number | The port to listen on for HTTPS requests. |
| key | String/Buffer/Array | Private keys in PEM format. PEM allows the option of private keys being encrypted. Encrypted keys will be decrypted with `options.passphrase`. Multiple keys using different algorithms can be provided either as an array of unencrypted key strings or buffers, or an array of objects in the form `{pem: <string|buffer>[, passphrase: <string>]}`. The object form can only occur in an array. `object.passphrase` is optional. Encrypted keys will be decrypted with `object.passphrase` if provided, or `options.passphrase` if it is not. |
| cert | String/Buffer/Array | Cert chains in PEM format. One cert chain should be provided per private key. Each cert chain should consist of the PEM formatted certificate for a provided private `key`, followed by the PEM formatted intermediate certificates (if any), in order, and not including the root CA (the root CA must be pre-known to the peer, see `ca`). When providing multiple cert chains, they do not have to be in the same order as their private keys in `key`. If the intermediate certificates are not provided, the peer will not be able to validate the certificate, and the handshake will fail. |
| passphrase | string | Encrypted keys will be decrypted with this if provided. |

### timeout

\[number\] The number of milliseconds before timing out a request to the server.

### healthCheckAPI

\[string\] Path to a file that exports an express middleware function, which is used as a healthcheck. See [Middleware callback function examples](https://expressjs.com/en/4x/api.html#middleware-callback-function-examples) for more information on express middleware functions.

This healthcheck middleware is executed by invoking `GET /apibuilderPing.json`. By default, invoking this endpoint will return `{ success: <bool> }`, where `<bool>` is `true` as long as the service is not shutting down.

Example:

```javascript
// default.js

healthCheckAPI: '../healthCheck.js'
```

```javascript
// ../healthCheck.js

module.exports = function (req, resp) {
  return resp.json({ success: 'Service is up' });
}
```

### bindProcessHandlers

\[boolean\] True by default. When this is set to false, {{% variables/apibuilder_prod_name %}} won't automatically shut down or restart on process signals such as SIGUSR2, SIGINT and SIGABRT, as well as on exit and uncaught exception events. bindProcessHandlers should be set to false when starting {{% variables/apibuilder_prod_name %}} as part of another process (i.e. during mocha unit tests), otherwise any bound process handlers may interfere with the main process and cause unexpected behaviour.

## Configuration files

{{% variables/apibuilder_prod_name %}} will look for two sets of configuration files in the **`./conf`** directory of the application, those ending in `default.js` and `local.js`. The `default` files are part of the source for your application, whereas the `local` files might contain sensitive information (such as passwords) and are not source controlled (these files will be ignored by the Git repository). At startup, all `default` files are loaded and sorted and merged into a single configuration object. Then, all `local` files are loaded, sorted, and merged with the single configuration object.

Usually, the values for configuration parameters are directly specified in the configuration file. However, for sensitive information, those values could be environmentalized. For how to do that, refer to the [Environmentalization guide](/docs/how_to/environmentalization/). The important thing to know is that if environmentalization is used, all the values will come as strings and might need subsequent type conversion like this:

```javascript
// default.js

module.exports = {
  // In this case we convert the string value that comes from the environment to integer. Similar approach would be with floats.
  timeout: parseInt(process.env.TIMEOUT, 10),

  // In this case we convert the string value to boolean
  printEnvVars: process.env.PRINT_ENV_VARS === "true"
}
```
