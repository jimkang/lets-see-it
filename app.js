var qs = require('qs');
var handleError = require('handle-error-web');
var sb = require('standard-bail')();
var listEmAll = require('list-em-all');
var renderFigures = require('./representers/render-figures');
var groupBy = require('lodash.groupby');
var flatten = require('lodash.flatten');
var createFigure = require('./create-figure');

((function go() {
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

  function filterFigures(figureDefs) {
    // TODO: filter if necessary.
    var figures = flatten(figureDefs.map(createVariants));
    renderFigures(groupBy(figures, 'layer'));
  }
}

function createVariants(figureDef) {
  var variants = [createFigure({figureDef: figureDef})];
  for (var i = 0; i < 3; ++i) {
    let figure = createFigure({figureDef: figureDef, addVariance: true});
    figure.position = [0, (i + 1) * 100];
    variants.push(figure);
  }
  return variants;
}
