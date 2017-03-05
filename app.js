var qs = require('qs');
var handleError = require('handle-error-web');
var sb = require('standard-bail')();
var listEmAll = require('list-em-all');
var renderFigures = require('./representers/render-figures');
var groupBy = require('lodash.groupby');

((function go() {
  debugger;
  route();
})());

function parseRoute() {
  // Skip the # part of the hash.
  return qs.parse(window.location.hash.slice(1));
}

function route() {
  var routeDict = parseRoute();
  var dataURL = 'data/figure-defs.yaml';
  if ('dataURL' in routeDict) {
    dataURL = routeDict.dataURL;
  }
  listEmAll.loadList({url: dataURL}, sb(filterFigures, handleError));

  function filterFigures(figures) {
    // TODO: filter if necessary.
    renderFigures(groupBy(figures, 'layer'));
  }
}
