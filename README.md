# P5: Neighborhood Map Project
## A single-page application featuring a map of my neighborhood 

Includes: map markers to identify popular locations or places you might like to visit, a search function to easily discover these locations, and a listview to support simple browsing of all locations.

### Instructions

Simply [click on this text to view the project](www2.hawaii.edu/~dwilkie/udacity/frontend/p5-neighborhood-map/index.html "Neighborhood Map Project")

### Installation 

To install this software on your own machine:

1. Clone the git repo to a directory on your computer (or download the zip from the sidebar on the right).
2. In your terminal from the project's root directory, install the build dependencies with Node Package Manager by invoking `npm i`. If you don't have NPM, [here are installation instructions](http://nodejs.org/download/).
3. Run `gulp`. If you don't have Gulp installed, run `npm i -g gulp` first. Your build will be in the *dist* folder.

### Copyright, warranty and licensing

All resources are open source under the MIT license. I provide no guarantees regarding this program, etc.

### Authors & Contact

_Davey Wilkie_ // Web: http://www2.hawaii.edu/~dwilkie/ // GitHub: https://github.com/daveywilkie/

### Project Documentation

This README file is the primary documentation for this software project. Further documentation is also maintained as docstrings within the source code files with the intention of conforming to the JSDoc 3 format. 

### Known Issues

- Google returns "OVER_REQUEST_LIMIT" errors even though the program's throttle'd to 8QPS, or 80% of [their stated limit](https://developers.google.com/maps/documentation/business/articles/usage_limits#basics).
- The photos come form Flickr's search API and might not be relevant to the entries under which they appear.
- "use strict" throws irresolvable errors. Namely, when I assign `var self=this`, subsequent property assignments to `self` such as `self.query = ko.observable()` cause errors.
