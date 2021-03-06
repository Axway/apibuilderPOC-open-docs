/**
 * Docs page collections require the following minimal dataset:
 *   name: [string] used in routes, ie.: /admin/collections/:slug/edit
 *   label: [string] used in CMS UI left nav
 *   label_singular: [string] used in CMS UI, ie.: 'New Post'
 *   description: [string] used in CMS UI
 */
const docsDefaults = (contentDirectory, imageDirectory) => ({
  folder: `content/en/docs/${contentDirectory}`,
  media_folder: `{{media_folder}}/${imageDirectory}`,
  public_folder: `{{public_folder}}/${imageDirectory}`,
  preview_path: `docs/${contentDirectory}/{{filename}}/`,
  create: true, // Allow users to create new documents in this collection
  delete: false, // Allow users to delete documents in this collection
  format: 'json-frontmatter', // Specify frontmatter for YAML or json-frontmatter for JSON
  fields: [
    { name: 'title', label: 'Title', widget: 'string' },
    { name: 'linkTitle', widget: 'hidden', required: false },
    { name: 'no_list', widget: 'hidden', required: false },
    { name: 'simple_list', widget: 'hidden', required: false },
    { name: 'draft', widget: 'hidden', required: false },
    { name: 'weight', widget: 'hidden', required: false },
    { name: 'date', widget: 'hidden', required: false },
    { name: 'description', label: 'Summary', widget: 'text', required: false },
    { name: 'body', label: 'Body', widget: 'markdown' },
  ],
})

/**
 * Post collections require the same minimal dataset as docs pages.
 */
const postDefaults = {
  create: true,
  delete: false,
  fields: [
    { label: 'Title', name: 'title', widget: 'string' },
    { label: 'Author', name: 'author', widget: 'string' },
    { label: 'Publish Date', name: 'date', widget: 'datetime' },
    { label: 'Summary', name: 'description', widget: 'text' },
    { label: 'Image', name: 'image', widget: 'image', required: false },
    { label: 'Body', name: 'body', widget: 'markdown' },
  ],
}

/**
 * Add new collections here.
 */
 const collections = [{
  ...docsDefaults('', 'docbook/images/general'), // content directory, image directory
  name: 'docs',
  label: 'API Builder Documentation',
  description: 'Top level pages in API Builder documentation.',
  format: 'frontmatter',
  create: false,
}, {
  ...docsDefaults('Developer_Guide', 'Developer_Guide'),
  name: 'Developer_Guide',
  label: 'Developer Guide',
  label_singular: 'page in Developer Guide section',
  description: 'All pages relating to Developer Guide section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('HOW_TO', 'HOW_TO'),
  name: 'HOW_TO',
  label: 'How to',
  label_singular: 'page in How to section',
  description: 'All pages relating to How to section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('Release_Notes', 'Release_Notes'),
  name: 'Release_Notes',
  label: 'Release Notes',
  label_singular: 'page in Release Notes section',
  description: 'All pages relating to Release Notes section.',
  format: 'frontmatter',
}, {
  ...docsDefaults('Deprecations', 'Deprecations'),
  name: 'Deprecations',
  label: 'Deprecations',
  label_singular: 'page in Deprecations section',
  description: 'All pages relating to Deprecations section.',
  format: 'frontmatter',
},];

const cms_branch = window.location.hostname.includes('develop') ? 'develop' : 'master'; // Additional config for a develop branch and develop site

const config = {
  backend: {
    name: 'github',
    branch: cms_branch,
    repo: 'Axway/apibuilderpoc-open-docs', // Path to your GitHub repository.
    open_authoring: true,
  },
  publish_mode: 'editorial_workflow',
  media_folder: '/static/Images', // Media files will be stored in the repo under static/Images
  public_folder: '/Images', // The src attribute for uploaded media will begin with /Images
  site_url: 'https://apibuilderpoc-open-docs.netlify.com/', // URL to netlify site
  collections,
};

// Make the config object available on the global scope for processing by
// subsequent scripts.Don't rename this to `CMS_CONFIG` - it will cause the
// config to be loaded without proper processing.
window.CMS_CONFIGURATION = config;

CMS.init({ config })
