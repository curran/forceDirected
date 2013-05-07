(function() {
  var Edge, Graph, Vertex, animLoop, arrayOf, attractionStrength, centerX, centerY, ctx, dampeningFactor, drawCircle, drawLine, graph, iterate, makeGraph, numFrames, radius, render, repulsionStrength, type;

  type = function() {};

  arrayOf = function() {};

  canvas.width = innerWidth;

  canvas.height = innerHeight;

  ctx = canvas.getContext('2d');

  centerX = canvas.width / 2;

  centerY = canvas.height / 2;

  radius = 10;

  repulsionStrength = 100000;

  attractionStrength = 50;

  dampeningFactor = 0.95;

  numFrames = 1000;

  Graph = (function() {
    function Graph(v, e) {
      this.v = v != null ? v : [];
      this.e = e != null ? e : [];
      type(this.v, arrayOf(Vertex));
      type(this.e, arrayOf(Edge));
    }

    return Graph;

  })();

  Vertex = (function() {
    function Vertex(x, y, vx, vy) {
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
      this.vx = vx != null ? vx : 0;
      this.vy = vy != null ? vy : 0;
      type([this.x, this.y, this.vx, this.vy], Number);
    }

    return Vertex;

  })();

  Edge = (function() {
    function Edge(u, v) {
      this.u = u;
      this.v = v;
      type([this.u, this.v], Vertex);
    }

    return Edge;

  })();

  render = function(g) {
    var u, v, vertex, _i, _j, _len, _len1, _ref, _ref1, _ref2, _results;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    _ref = g.v;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      vertex = _ref[_i];
      drawCircle(vertex.x, vertex.y);
    }
    _ref1 = g.e;
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      _ref2 = _ref1[_j], u = _ref2.u, v = _ref2.v;
      _results.push(drawLine(u.x, u.y, v.x, v.y));
    }
    return _results;
  };

  drawCircle = function(x, y) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.closePath();
    return ctx.fill();
  };

  drawLine = function(x1, y1, x2, y2) {
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    return ctx.stroke();
  };

  makeGraph = function() {
    var a, b, c, d, edges, vertices;

    vertices = [a = new Vertex(centerX - 20, centerY - 20), b = new Vertex(centerX + 20, centerY - 20), c = new Vertex(centerX - 20, centerY + 20), d = new Vertex(centerX + 20, centerY + 20)];
    edges = [new Edge(a, b), new Edge(a, c), new Edge(d, c), new Edge(a, d)];
    return new Graph(vertices, edges);
  };

  iterate = function(g) {
    var a, b, d, dx, dy, edge, f, i, j, n, ux, uy, vertex, _i, _j, _k, _l, _len, _len1, _ref, _ref1, _ref2, _results;

    n = g.v.length;
    for (i = _i = 0; 0 <= n ? _i < n : _i > n; i = 0 <= n ? ++_i : --_i) {
      for (j = _j = _ref = i + 1; _ref <= n ? _j < n : _j > n; j = _ref <= n ? ++_j : --_j) {
        a = g.v[i];
        b = g.v[j];
        dx = b.x - a.x;
        dy = b.y - a.y;
        d = dx * dx + dy * dy;
        ux = dx / d;
        uy = dy / d;
        f = repulsionStrength / (d + 1);
        b.vx += ux * f;
        b.vy += uy * f;
        a.vx -= ux * f;
        a.vy -= uy * f;
      }
    }
    _ref1 = g.e;
    for (_k = 0, _len = _ref1.length; _k < _len; _k++) {
      edge = _ref1[_k];
      a = edge.u;
      b = edge.v;
      dx = b.x - a.x;
      dy = b.y - a.y;
      d = dx * dx + dy * dy;
      ux = dx / d;
      uy = dy / d;
      f = -attractionStrength;
      b.vx += ux * f;
      b.vy += uy * f;
      a.vx -= ux * f;
      a.vy -= uy * f;
    }
    _ref2 = g.v;
    _results = [];
    for (_l = 0, _len1 = _ref2.length; _l < _len1; _l++) {
      vertex = _ref2[_l];
      vertex.x += (vertex.vx *= dampeningFactor);
      _results.push(vertex.y += (vertex.vy *= dampeningFactor));
    }
    return _results;
  };

  graph = makeGraph();

  animLoop = (function() {
    var frame;

    frame = 0;
    return function() {
      iterate(graph);
      render(graph);
      if (frame++ < numFrames) {
        return requestAnimFrame(animLoop);
      }
    };
  })();

  animLoop();

}).call(this);

/*
//@ sourceMappingURL=forceDirected.js.map
*/