'use strict';

var Charlatan = require('charlatan');
var fs = require('fs');
var crmAPI = require('civicrm');

var argv = process.argv;

if (argv.length < 3) {
    console.error('Usage: node '+argv[1]+' example(site in config/example.json(site in config/example.json)');
    process.exit(1);
}

var data = fs.readFileSync ("config/" + argv[2] + ".json", 'utf8');
var api = crmAPI (JSON.parse(data));


//var locale = ['en-us','en-gb','de','nl','pt-br'];
var locale = ['en-us','en-gb','de','nl'];
var length = locale.length;
for (var i=0;i< argv[3];i++) { 
//for (var i=0;i<1;i++) { 
  var lang = locale[Math.floor(Math.random()*locale.length)];
  Charlatan.setLocale(lang);

    //'debug':1,

  var param = {
    'contact_type' : 'Individual',
    'preferred_language': lang,
    'source':'charlatan',
    'first_name'    : Charlatan.Name.firstName(),
    'last_name'    : Charlatan.Name.lastName(),
    'job_title': Charlatan.Name.title(),
    'email'   : Charlatan.Internet.email(),  // glover_ii@voluptas.name
    'current_employer' : Charlatan.Company.name(),    // Wilkinson LLC
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
//  console.log (param);

}

