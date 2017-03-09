/* global process */

var svgpath = require('svgpath');
var pathParse = require('../node_modules/svgpath/lib/path_parse')

// Assumes absolute instructions in path.
var originalPath = process.argv[2];
var parsed = pathParse(originalPath);
console.log(parsed);


var top;
var bottom;
var left;
var right;

parsed.segments.forEach(updateBounds);
console.log(left, top, right, bottom);

var width = right - left;
var height = bottom - top;
console.log('width', width, 'height', height);

// Fit a path into a square with this side length:
const desiredLength = 100;

var verticalDifference = Math.abs(height - desiredLength);
var horizontalDifference = Math.abs(width - desiredLength);
var neededScale;

if (verticalDifference > horizontalDifference) {
  neededScale = desiredLength/height;
}
else {
  neededScale = desiredLength/width;
}

console.log('neededScale', neededScale);

var transformed = svgpath(originalPath)
  .translate(-left, -top)
  .scale(neededScale)
  .round(1)
  .toString();

console.log(transformed);

function updateBounds(segment) {
  if (left === undefined) {
    left = segment[1];
  }
  if (right === undefined) {
    right = segment[1];
  }
  if (top === undefined) {
    top = segment[2];
  }
  if (bottom === undefined) {
    bottom = segment[2];
  }

  if (segment[1] < left) {
    left = segment[1];
  }
  else if (segment[1] > right) {
    right = segment[1];
  }
  if (segment[2] < top) {
    top = segment[2];
  }
  else if (segment[2] > bottom) {
    bottom = segment[2];
  }
}

