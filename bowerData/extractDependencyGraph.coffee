fs = require 'fs'
async = require 'async'
_ = require 'underscore'

depGraph = {}
depGraphFile = 'dependencyGraph.json'
writeDependencyGraphFile = ->
  depGraphJSON = JSON.stringify depGraph, null, 2
  fs.writeFile depGraphFile, depGraphJSON, (err) ->
    if err
       console.log err
     else
       console.log "Wrote #{depGraphFile}"

readInfoFile = (name, callback) ->
  jsonPath = "components/#{name}/bower.json"
  if !(fs.existsSync jsonPath)
    jsonPath = "components/#{name}/component.json"
  if !(fs.existsSync jsonPath)
    jsonPath = "components/#{name}/package.json"
  if !(fs.existsSync jsonPath)
    return callback()

  fs.readFile jsonPath, 'utf8', (err,data) ->
    if err
      console.log "Missing file: "+jsonPath
      return callback()
    else
      console.log "Read "+ jsonPath
      callback data


fs.readdir 'components', (err, names) ->
  if err then return console.log err
  iterator = (name, callback) ->
    readInfoFile name, (data) ->
      try
        info = JSON.parse data
        if info.dependencies
          deps = _.keys info.dependencies
          if deps.length > 0
            depGraph[name] = deps
      catch e
        console.log "Caught Error"
        console.log e
      finally
        callback()


        #console.log data

  allDone = (err) ->
    if err then console.log err
    console.log "All done! Indexed #{(_.keys depGraph).length} dependencies."
    writeDependencyGraphFile()
  async.eachSeries names, iterator, allDone
