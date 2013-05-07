# match = require 'match'
type = ->
arrayOf = ->

canvas.width  = innerWidth
canvas.height = innerHeight

ctx = canvas.getContext '2d'
centerX = canvas.width / 2
centerY = canvas.height / 2
radius = 10
repulsionStrength = 100000
attractionStrength = 50
dampeningFactor = 0.95

numFrames = 1000

class Graph
  constructor: (@v=[], @e=[]) ->
    type @v, arrayOf Vertex
    type @e, arrayOf Edge
 
class Vertex
  constructor: (@x=0, @y=0, @vx=0, @vy=0) ->
    type [@x, @y, @vx, @vy], Number
      
class Edge
  constructor: (@u, @v) ->
    type [@u, @v], Vertex

render = (g) ->
  ctx.clearRect 0, 0, canvas.width, canvas.height
  for vertex in g.v
    drawCircle vertex.x, vertex.y
  for {u, v} in g.e
    drawLine u.x, u.y, v.x, v.y
    
drawCircle = (x, y) ->
  ctx.beginPath()
  ctx.arc x, y, radius, 0, Math.PI * 2
  ctx.closePath()
  ctx.fill()
  
drawLine = (x1, y1, x2, y2) ->
  ctx.moveTo x1, y1
  ctx.lineTo x2, y2
  ctx.stroke()
  
makeGraph = ->
  vertices = [
    a = new Vertex(centerX - 20, centerY - 20),
    b = new Vertex(centerX + 20, centerY - 20),
    c = new Vertex(centerX - 20, centerY + 20),
    d = new Vertex(centerX + 20, centerY + 20)
  ]
  edges = [
    new Edge(a, b),
    new Edge(a, c),
    new Edge(d, c),
    new Edge(a, d)
  ]
  new Graph vertices, edges

iterate = (g) ->
  n = g.v.length
  
  # iterate repulsion
  for i in [0...n]
    for j in [(i+1)...n]
      
      # derive the vertex pair (a, b)
      a = g.v[i]
      b = g.v[j]
      
      # compute the difference vector (dx, dy)
      dx = b.x - a.x
      dy = b.y - a.y
   
      # compute the distance d between a and b
      d = dx*dx + dy*dy
  
      # compute the unit vector (ux, uy)
      ux = dx/d
      uy = dy/d
      
      # compute the repulsion force f
      f = repulsionStrength/(d+1)
      
      # apply repulsion force to (a, b)
      b.vx += ux * f
      b.vy += uy * f
      a.vx -= ux * f
      a.vy -= uy * f
  
  # iterate attraction
  for edge in g.e
    a = edge.u
    b = edge.v
    
    # compute the difference vector (dx, dy)
    dx = b.x - a.x
    dy = b.y - a.y
  
    # compute the distance d between a and b
    d = dx*dx + dy*dy
  
    # compute the unit vector (ux, uy)
    ux = dx/d
    uy = dy/d
      
    # compute the repulsion force f
    f = - attractionStrength
      
    # apply attraction force to (a, b)
    b.vx += ux * f
    b.vy += uy * f
    a.vx -= ux * f
    a.vy -= uy * f
  
  # increment position by velocity
  # and multiply velocity by dampening factor
  for vertex in g.v
    vertex.x += (vertex.vx *= dampeningFactor)
    vertex.y += (vertex.vy *= dampeningFactor)

graph = makeGraph()

animLoop = ( ->
  frame = 0
  ->
    iterate graph
    render graph
    if (frame++ < numFrames)
      requestAnimFrame animLoop
)()
animLoop()
