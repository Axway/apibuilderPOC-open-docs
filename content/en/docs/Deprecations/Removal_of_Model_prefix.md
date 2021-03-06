---
title: Removal of Model prefix
linkTitle: Removal of Model prefix
description: ADD A DESCRIPTION
weight: 150
date: 2021-06-22
---

{{% alert title="Note" color="primary" %}}This document describes deprecation \[[D024](/docs/deprecations/#D024)\]{{% /alert %}}

## Removal of Model prefix

Beginning with the [Cairo](/docs/release_notes/standalone_-_11_october_2019/) release, Creating a Model with the `prefix` property is deprecated and will be removed in a future version of the product.

### Why we are making this change

If you need to host the autogenerated API for a Model on a path other than the configured `apiPrefix`, you can use the prefix property to do so. This is not recommended for a number of reasons:

* The path provided is not relative to the configured `apiPrefix` and therefore, won't be described in the Swagger for your service.

* The path provided may not have the configured auth strategy applied to it (since it's not relative to the configured [`apiPrefix`](/docs/developer_guide/project/configuration/project_configuration/#apiprefix)).

* The path will not be allowed access by default (will have to be added to the [list of public paths in config manually](/docs/developer_guide/project/configuration/project_configuration/)).

For these reasons, we will be deprecating this feature, and recommend using the default path for Model autogenerated APIs.

```
// Example of model using prefix

APIBuilder.Model.extend('user', {
  prefix: '/myuser',
  fields: {
    name: {
      type: 'string'
    }
  }
});
```

### How does this impact my service

If you have any Models which have a prefix in their definition and you use their automatically generated APIs, this will affect you after the next major release of {{% variables/apibuilder_prod_name %}}. The prefix will no longer be used, and the API will be available on the default path.
