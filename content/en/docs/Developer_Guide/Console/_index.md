---
title: Console
linkTitle: Console
description: ADD A DESCRIPTION
weight: 10
date: 2021-06-22
---

## Introduction

The **Admin Console** allows you to create applications and allows you to manage the data in your applications.

By default, when you create a new project and run it locally, the **Admin Console** is enabled and available using the `http://localhost:8080/console` path. You should navigate to the Admin Console in your web browser to view what the {{% variables/apibuilder_prod_name %}} UI has to offer.

![summary_latest](/Images/summary_latest.png)

## Configuration

To configure access to the Admin Console, open the project's `./conf/default.js` file, and edit the `admin` key. The `admin` key is a dictionary of key-value pairs that control the access to the Admin Console, such as restricting which hosts can access the Admin Console.

The `admin` dictionary can contain the following keys:

| Key | Type | Default | Description |
| --- | --- | --- | --- |
| allowedHosts | Array`<String>` | \- | Restrict access to the Admin Console to the specified hosts. |
| enabled | Boolean | true | Set to `true` to enable the Admin Console. |

**Example:**

```javascript
// ./conf/default.js

// Control the settings for the @axway/api-builder-admin UI console
    admin: {
        // Control whether the admin website is available
        enabled: true,
        // The hostnames or IPs from which connections to admin are allowed. Hostnames must be resolvable on the
        // server. IP ranges can also be specified. e.g. [ 'localhost', '192.168.1.0/24', '10.1.1.1' ]
        // An empty list [] will allow unrestricted access, though this is not recommended due to security
        // concerns.
        allowedHosts: [
            'localhost', '::1'
        ]
    },
```

## {{% variables/apibuilder_prod_name %}} tabs

{{% variables/apibuilder_prod_name %}} provides a list of tabs on the left-hand side that helps you get started building your applications. Click the different sections of the UI to hop between functions and features of {{% variables/apibuilder_prod_name %}}.

### Summary

The **Summary** tab lists basic information about your application like app name, version, description, author, license, and API key. To quickly navigate to the **Summary** tab, click on the Axway icon or click on {{% variables/apibuilder_prod_name %}}.

![summary_latest](/Images/summary_latest.png)

### API Doc & Test

On startup, API endpoints are automatically generated for all models as per their default configuration. An API provides a way for a client to access your application, such as `GET <SERVER_ADDRESS>/api/users/query`, execute custom logic, internally access the application's models and APIs, and return data to the client application.

The **API Doc & Test** tab in the Admin Console contains generated docs of your application APIs, including how to call the API, multiple examples, and the ability to test the APIs. The generated docs use the information in the `description` fields of your JavaScript definition files to fill in some of the information. API definitions can also be imported by selecting the **\+ API** button. You can import an API from a Swagger definition by either selecting a file from your local file system or entering a URL. For additional information, refer to [Manage Endpoints](/docs/developer_guide/flows/manage_endpoints/).

![API_Doc_n_Test_latest](/Images/55476678_api_doc_n_test_latest.png)

### Models

A Model is the data model, backed by a connector, and exposed as an API endpoint. A model can consist of other models or fields from other models. Once again, {{% variables/apibuilder_prod_name %}} will generate API endpoints for your models by default. Changes to models require a restart.

The **Models** tab lets you create new models. The model build process involves the following steps:

1. Name your new model, select a connector, and add a description.

2. Add fields to your new model.

3. Select the auto-generated API endpoint.

![model_page_latest](/Images/55476678_model_page_latest.png)

You may only build models when executing the project locally. The build console will not work in production even if you enable the Admin Console in production.

See the _Create a new model_ section of [Getting Started With {{% variables/apibuilder_prod_name %}}](/docs/getting_started_with_api_builder/) for instructions on how to create a new model. For additional information on creating and editing models, refer to [Models](/docs/developer_guide/console/models/).

### Configurations

The **Configurations** tab displays the list of configuration files on the {{% variables/apibuilder_prod_name %}} instance. You can edit the configuration files here.

{{% alert title="⚠️ Note" color="primary" %}}Edits to these files will trigger a server restart once the files have been saved.{{% /alert %}}

See [Project Configuration](/docs/developer_guide/project/configuration/project_configuration/) for an example and settings.

![Configurations_latest](/Images/configurations_latest.png)

### Credentials

The **Credentials** tab displays a card view listing of all the currently configured credentials. For additional information, refer to [Managing Credentials](/docs/developer_guide/credentials/managing_credentials/).

### Connectors

The **Connectors** tab lists the components to extend the core functionality of {{% variables/apibuilder_prod_name %}}, and that can be used to connect to different data sources and services or enhance the Flow editor. For additional connectors and plugin information, refer to [{{% variables/apibuilder_prod_name %}} Connectors](/docs/developer_guide/connectors/) and [{{% variables/apibuilder_prod_name %}} Plugins](/docs/developer_guide/plugins/). For additional flow-node information, refer to [Flow-nodes](/docs/developer_guide/flows/flow-nodes/).

![connectors_latest](/Images/connectors_latest.png)

#### Install a listed connector

Installed connectors are shown as Installed. Additionally, the version of the installed connectors is displayed.

To install additional listed connectors:

1. Click the **Install** button associated with the connector to install. Clicking the **Install** button will open the _Installation in progress_ screen.
    While the connector is being installed, an **Installing** spinner is displayed.
    Once the installation is successfully completed, the status of the screen will change to _Install complete_.

2. To cancel an in-progress installation, click **Cancel Installation.**

3. To display the install log, click **Show install log**.

4. Additionally, once the connector installation is completed, click **Edit <connector>.default.js** to edit the connector configuration.

5. Click **Close** to close the _Install complete_ screen.

#### Create a connector

To create a connector, select the **Create connector** link and follow the instructions. For additional information, refer to [Axway Flow SDK](/docs/developer_guide/flows/axway_flow_sdk/).

## Information and search

Most {{% variables/apibuilder_prod_name %}} tabs include the title of the page, followed by an information icon and a search bar. The information icon, when clicked, will display a short description of its function and purpose.

To locate a particular record, enter a search term in the search bar at the top to filter the table or click Advanced to restrict the search to a specific model field.

## Navigation

To quickly navigate to the **Summary** tab, click on the Axway icon or click on {{% variables/apibuilder_prod_name %}}.
