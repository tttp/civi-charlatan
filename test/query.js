'use strict';

var start = Date.now();
var nbqueries =0;

console.log (start);

//var Charlatan = require('charlatan');
var fs = require('fs');
var async = require('async');
var crmAPI = require('civicrm');

var argv = process.argv;
var params = {};

if (argv.length < 3) {
    console.error('Usage: node '+argv[1]+' example(site in config/example.json(site in config/example.json) nbrequest action(getquick/getgoodquick/get...)');
    process.exit(1);
}

var action= argv[4];
var field="name";
if (action == "get") field="sort_name";
if (!action) action = "getquick";
 
var config = fs.readFileSync ("config/" + argv[2] + ".json", 'utf8');
var api = crmAPI (JSON.parse(config));
var search=[];
api.get ("Contact",{"option.sort":"RAND()",return:"sort_name,first_name,email","option.limit":100},function(data) { 
  var max=data.count;
  for (var i=0; i<max; i++) {
    search.push(data.values[i].sort_name.substring(0, 5));
    if (typeof data.values[i].email != "undefined" && data.values[i].email)
      search.push(data.values[i].email.substring(0, 5));
    if (typeof data.values[i].first_name != "undefined" && data.values[i].first_name)
      search.push(data.values[i].first_name.substring(0, 5));
  }
  generateQueries(argv[3]);
});


function generateQueries (max) {
for (var i=0; i<max; i++) {

  var str=search [Math.floor(Math.random() * search.length)];
  for (var j=1; j<=4; j++) { // 4 searches by string
    q.push({name: str.substring(0,j)}, function (err) {  });
  }
}
}

var q = async.queue(function (task, callback) {
  params[field] = task.name; 
  api.call("Contact",action,params,function(data) { 
    nbqueries +=1;
    if (!data.is_error) {
      console.log(task.name + " found " + data.count);
    } else {
      console.log (data);
      console.log ("invalid server, check the params");
    }
    callback();
  });
}, 1);

q.drain = function() {
  var end=Date.now();
  console.log(((end-start)/nbqueries) +"ms/q. "+ nbqueries +" "+ action  +" queries "+ " processed in " + (end-start) + " milliseconds");
}


