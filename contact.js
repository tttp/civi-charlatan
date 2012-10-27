'use strict';

var Charlatan = require('charlatan');
var fs = require('fs');
var crmAPI = require('civicrm');

var argv = process.argv;

if (argv.length < 3) {
    console.error('Usage: node '+argv[1]+' example(site in config/example.json(site in config/example.json)');
    process.exit(1);
}

var config = fs.readFileSync ("config/" + argv[2] + ".json", 'utf8');
var api = crmAPI (JSON.parse(config));

api.get("Contact",0,function(data) {
  if (!data.is_error) {
    console.log ("Connection OK. Bringing "+ argv[3] +" imaginary friends to the party!"),
    generateContacts(argv[3]);
  } else {
    console.log ("invalid server, check the params");
    console.log (config);
  }
});


var generateContacts = function (total) {
  //var locale = ['en-us','en-gb','de','nl','pt-br'];
  var locale = ['en-us','en-gb','de','nl'];
  var length = locale.length;
  var rateNewEmployer = 0.2; //how often to create a new employer or keep the existing one
  var employer = Charlatan.Company.name();
  for (var i=0;i< total;i++) { 
  //for (var i=0;i<1;i++) { 
    var lang = locale[Math.floor(Math.random()*locale.length)];
    Charlatan.setLocale(lang);

    if (Math.random() <= rateNewEmployer) {
      employer = Charlatan.Company.name();
    }

      //'debug':1,
    var param = {
      'contact_type' : 'Individual',
      'preferred_language': lang,
      'source':'imaginary friend',
      'first_name'    : Charlatan.Name.firstName(),
      'last_name'    : Charlatan.Name.lastName(),
      'job_title': Charlatan.Name.title(),
      'email'   : Charlatan.Internet.email(),
      'current_employer' : employer,
      'api.phone.create': {
        'phone':Charlatan.PhoneNumber.phoneNumber(),
      },
      'api.address.create': {
        'location_type_id':1,
        'street_address':Charlatan.Address.streetAddress(),
        'postal_code': Charlatan.Address.postcode(),
        'city':Charlatan.Address.city(),
        'state':Charlatan.Address.state(),
      }
    }

    Charlatan.setLocale('en-us');//or the language of the install
    param['api.address.create'].country = Charlatan.Address.country();
    
    api.create("contact",param,function(data) {
      if (data.is_error) {
        console.log(data);
      } else {
        console.log ("created "+data.id+ " " + data.values[0].sort_name);
      }
    });
  }
}

