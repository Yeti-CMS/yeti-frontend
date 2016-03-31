# Yeti CMS
Yeti CMS is a Sitebuilder-Style CMS that treats your static site like a simple collection of HTML documents that you can edit.

<img style="-webkit-user-select: none; cursor: zoom-in;" src="http://g.recordit.co/iN2JalXJRs.gif">

## Refactor & Rewrite
This repository is the rewrite of a previous project, WPCE. I've done my best to clean-up the codebase and only include features that work. Hopefully it will grow into something better, with community support. If the project interests you, please reach out and let me know!

## What makes Yeti Special?
- Triple-clicking anywhere on your website opens editor mode (knock to unlock!)
- Works with *any* HTML document
- Powerful drag-and-drop features
- No templates
- Server & Backend-agnostic
- Dynamicly-generated content via a static-site-generator-style syntax
- Image Editing (via Uploadcare & Pixlr)
- Dynamic processing of any Icon fonts included in your CSS
- Automatically determines the structure of your document, to facilitate editing


## Modules Enabled
- Editor Base (Required)
- Async HTML Includes (Recommended)
- Improved Editor UI (Required)
- Content Editable
- Section Management
- Add Section
- Dynamic Site Data (Similar to a site generator)
- Link Editor
- Section Link Editor (for #sections)
- Image Editor
- Icon Editor
- Clone Element
- Remove Element

## Usage
Include `loader.js` in your `.html` document to enable Yeti. `loader.js` expects the `/yeti-cms/` folder to be at the root of your website. Your changes will not be saved, because currently no backend is distributed with Yeti CMS. Join or follow the project to see features like this come to Yeti CMS in the future!

## Todo
- Documentation of existing code
- Module creation guide
- Build an example backend implementation (PHP, NodeJS)

## Demo
<a href="http://yeti-cms.github.io/yeti-frontend/?yedit&editing=true" target="_blank">http://yeti-cms.github.io/yeti-frontend/</a>

## License
For now, Yeti CMS is under a Creative Commons license. A less-restrictive license will be considered in the future, as the project matures.

*Yeti images and example template on `gh-pages` branch are copyright by their respective authors and used under license. These contents are not subject to the above license and should not be reused or re-distributed without permission.*

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>

