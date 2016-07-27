# Yeti CMS
Yeti CMS is a Sitebuilder-Style CMS that treats your static site like a simple collection of HTML documents that you can edit.

![demo](http://g.recordit.co/iN2JalXJRs.gif "Yeti CMS Demo")

Demo: http://g.recordit.co/iN2JalXJRs.gif

## Requirements
- A Modern Web Browser (Should work on Chrome / Firefox / Safari / IE > 9, Edge)
- Some kind of backend for persistence (DIY or use our example. More to come!)

## Download Distributable
If you would like to download a ready-to-use CMS, see: https://github.com/Yeti-CMS/Distributable


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
Include `loader.js` in your `.html` document to enable Yeti. `loader.js` expects the `/yeti-cms/` folder to be at the root of your website. Download the `yeti-admin` package or `yeti-distributable` package if you're interested in a complete CMS (with Backend).

## Todo
- Documentation of existing code
- Module creation guide
- Build an example backend implementation (PHP, NodeJS)

## Demos
http://yeti-cms.github.io/yeti-frontend/?yedit&editing=true

## Backend
An example backend implementation exists, if you would like to try it: https://github.com/Yeti-CMS/Yeti-Simple-Persistence-Layer

## License
For now, Yeti CMS is under a Creative Commons license. A less-restrictive license will be considered in the future, as the project matures.

*Yeti images and example template on `gh-pages` branch are copyright by their respective authors and used under license. These contents are not subject to the above license and should not be reused or re-distributed without permission.*

<a rel="license" href="http://creativecommons.org/licenses/by-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-sa/4.0/88x31.png" /></a>


## Disclaimer
THE PROGRAM IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL, BUT WITHOUT ANY WARRANTY. IT IS PROVIDED "AS IS" WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM IS WITH YOU. SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF ALL NECESSARY SERVICING, REPAIR OR CORRECTION.

IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW THE AUTHOR WILL BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY GENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE USE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF DATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD PARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS), EVEN IF THE AUTHOR HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.

