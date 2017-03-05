var d3 = require('d3-selection');
var range = require('d3-array').range;
var accessor = require('accessor');

var getName = accessor('defname');
var getElementsHTML = accessor('elements');
var getGroups = accessor('groups');
var getGroupname = accessor('groupname');

function renderFigures(figureDefsByLayer) {
  var board = d3.select('#board');

  renderLayers(range(10));

  for (var layer in figureDefsByLayer) {
    renderFigureDefsOntoLayer(board, layer, figureDefsByLayer[layer]);
  }
}

function renderFigureDefsOntoLayer(board, layer, figureDefs) {
  var figures = board.select('#' + prefixIndex(layer)).selectAll('.figure')
    // When doing this in the actual app, use the instance's 'id', not defname, as the key.
    .data(figureDefs, getName);

  figures.exit().remove();
  var figuresToUpdate = figures.enter().append('g')
    .classed('figure', true)
    .merge(figures);

  var figGroups = figuresToUpdate.selectAll('.figure-group')
    .data(getGroups, getGroupname);

  figGroups.exit().remove();
  figGroups.enter().append('g')
    .merge(figGroups)
    .attr('class', getFigureGroupClasses)
    .html(getElementsHTML);
}

function renderLayers(layerIndexes) {
  var layers = d3.select('#board').selectAll('g').data(layerIndexes);
  layers.exit().remove();
  layers
    .enter().append('g')
    .merge(layers).attr('id', prefixIndex);
}

function prefixIndex(index) {
  return 'layer-' + index;
}

function getFigureGroupClasses(figureDef) {
  var classes = ['figure-group'];
  if (Array.isArray(figureDef.classes)) {
    classes = classes.concat(figureDef.classes);
  }
  return classes.join(' ');
}

module.exports = renderFigures;
