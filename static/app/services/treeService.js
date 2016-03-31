angular.module('genome.treeService', [])
.factory('TreeService', function(){

  function flatten(root) {
    var nodes = [], i = 0, depth = 0, level_widths = [1], max_width, max_depth = 1, kx, ky;

    var recurse = function(node, parent, depth, x) {
      if (node.children) {
        var w = level_widths[depth + 1] || 0;
        level_widths[depth + 1] = w + node.children.length;
        max_depth = Math.max(max_depth, depth + 1);
        node.size = node.children.reduce(function(p, v, i) {
          return p + recurse(v, node, depth + 1, w + i);
        }, 0);
      }
      //if (!node.id) {
        node.id = ++i;
        node.parent = parent;
        node.depth = depth;
      //}
      //node.fixed = 8;
      if (!node.px && !node.fixed && 0) {
        node.y = depth;
        node.x = x;
      }
      nodes.push(node);
      return node.size;
    };

    root.size = recurse(root, null, 0, 0);

    if (0) {
      // now correct/balance the x positions:
      max_width = 1;
      for (i = level_widths.length; --i > 0; ) {
        max_width = Math.max(max_width, level_widths[i]);
      }
      kx = (width - 20) / max_width;
      ky = (height - 20) / max_depth;
      for (i = nodes.length; --i >= 0; ) {
        var node = nodes[i];
        if (!node.px && !node.fixed) {
          var kkx = kx * max_width / level_widths[node.depth];
          node.y *= ky;
          //node.y += 10 + ky / 2;
          node.x *= kkx;
          node.x += 10 + kkx / 2;
          node.x = width / 2;

          node.qx = node.px = node.x;
          node.qy = node.py = node.y;
        }
      }
    }

    return nodes;
  }

  return {
    flatten : flatten,
  };
});