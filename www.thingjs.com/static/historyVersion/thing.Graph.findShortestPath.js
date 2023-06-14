var Graph = function(canCreateDiscussions) {
  var extractKeys = function(obj) {
    var prop;
    var keys = [];
    for (prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        keys.push(prop);
      }
    }
    return keys;
  };
  var compare = function(b, a) {
    return parseFloat(b) - parseFloat(a);
  };
  var findPaths = function(map, start, end, path) {
    path = path || 1 / 0;
    var keys;
    var costs = {};
    var open = {
      0 : [start]
    };
    var data = {};
    var addToOpen = function(cost, vertex) {
      var key = "" + cost;
      if (!open[key]) {
        open[key] = [];
      }
      open[key].push(vertex);
    };
    costs[start] = 0;
    for (; open && (keys = extractKeys(open)).length;) {
      keys.sort(compare);
      var key = keys[0];
      var bucket = open[key];
      var node = bucket.shift();
      var currentCost = parseFloat(key);
      var adjacentNodes = map[node] || {};
      var vertex;
      for (vertex in bucket.length || delete open[key], adjacentNodes) {
        if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
          var totalCost = adjacentNodes[vertex] + currentCost;
          var vertexCost = costs[vertex];
          if (undefined === vertexCost || vertexCost > totalCost) {
            costs[vertex] = totalCost;
            addToOpen(totalCost, vertex);
            data[vertex] = node;
          }
        }
      }
    }
    return undefined === costs[end] ? null : data;
  };
  var extractShortest = function(predecessors, end) {
    var remaining = [];
    var u = end;
    for (; undefined !== u;) {
      remaining.push(u);
      u = predecessors[u];
    }
    return remaining.reverse(), remaining;
  };
  var findShortestPath = function(map, nodes) {
    var end;
    var predecessors;
    var shortest;
    var start = nodes.shift();
    var path = [];
    for (; nodes.length;) {
      if (end = nodes.shift(), !(predecessors = findPaths(map, start, end))) {
        return null;
      }
      if (shortest = extractShortest(predecessors, end), !nodes.length) {
        return path.concat(shortest);
      }
      path.push.apply(path, shortest.slice(0, -1));
      start = end;
    }
  };
  var toArray = function(obj, format) {
    try {
      return Array.prototype.slice.call(obj, format);
    } catch (o) {
      var result = [];
      var f = format || 0;
      var len = obj.length;
      for (; f < len; ++f) {
        result.push(obj[f]);
      }
      return result;
    }
  };
  var Graph = function(map) {
    this.map = map;
  };
   Graph.prototype.findShortestPath = function(start, end) {
    return "[object Array]" === Object.prototype.toString.call(start) ? findShortestPath(this.map, start) : findShortestPath(this.map, 2 === arguments.length ? [start, end] : toArray(arguments));
  }
   Graph.findShortestPath = function(map, start, end) {
    return "[object Array]" === Object.prototype.toString.call(start) ? findShortestPath(map, start) : findShortestPath(map, 3 === arguments.length ? [start, end] : toArray(arguments, 1));
  } 
  return Graph;
}();
