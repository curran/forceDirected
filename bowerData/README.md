A quest to get the Bower dependency graph.

## App.js

This script installs ALL bower packages locally.

## extractDependencyGraph.js

Initially it was my hope that the `bower list --map` command could be used to extract the full Bower dependency graph data for further processing. However, that command fails after intalling all packages, so I resorted to writing code. This script reads the `bower.json` for each installed component, extracts the dependencies, and writes the file `bowerDependencyGraph.json`.
