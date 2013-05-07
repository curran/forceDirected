require.config({
  "baseUrl": "./js",
  "shim": {

  },
  "paths": {
    "gl-matrix": "../components/gl-matrix"
  }
});
require(["forceDirected"], function(forceDirected){
  forceDirected.start();
});
