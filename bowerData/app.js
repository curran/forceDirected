var bower = require('bower'),
    async = require('async'),
    _ = require('underscore'),
    fs = require('fs');

var errors = [];

// This happens from time to time.
// Assume it was caused by the call above.
var currentPackageName, currentCallback
process.on('uncaughtException', function (exception) {
  var error = {
    name: currentPackageName,
    message: (exception.details ? exception.details : (exception+''))
  };
  errors.push(error);
  console.log("Error for package '"+error.name+"':"+error.message);
  currentCallback();
});

bower.commands.search('', {}).on('packages', function (packages) {
  numPackages = packages.length;
  numPackagesInstalled = 0;
  console.log("Attempting to install all "+numPackages+" Bower packages.");
  async.eachSeries(packages, function(p, callback){

    // Ensure the callback only gets called once.
    // The callback pattern is not clear for all the errors that arise,
    // so better enforce this without a doubt.
    callback = _.once(callback);

    // Stash these two things so they can be used when
    // an exception is raised.
    currentCallback = callback;
    currentPackageName = p.name;

    // Install the package with Bower
    bower.commands
      .install([currentPackageName], {})
      .on('end', function (data) {
        console.log("Installed package '"+currentPackageName+"'");
        numPackagesInstalled++;

        if(numPackagesInstalled % 50 === 0){
          console.log();
          console.log("***********************************************************************");
          console.log("* Progress: installed "+numPackagesInstalled+" of "+numPackages+" packages.");
          console.log("***********************************************************************");
          console.log();
        }

        callback();
      })
  }, function(err){
    console.log("Finished!");
    var errorsJSON = JSON.stringify(errors, null, 2);
    fs.writeFile("packageErrors.json", errorsJSON, function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log("Wrote packageErrors.json");
      }
    }); 
  });
});

