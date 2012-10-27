This generates contacts (with address, email and phone) and add them to your civicrm install over REST

You have a civicrm, but don't have friends or contacts? fed up of having activities with the same 102 contacts that ship by default with civi?

civi-charlatan is going to fill your social life with lots of interesting sounding contacts from all around the word. You will even have their emails, addresses and phones!

It's like buying followers on twitter or "like" on facebook, but even better, it's free.
 
That or you want more realistic development enviroments containing a few 1000th contacts.

###Installation###
you need to have a working node with npm

download civi-charlatan
npm install

##Configuration##
You need to set up your civicrm to accept REST. The usual setup:
- be sure you have an site key in your site civicrm.settings.php (it should be there already)
- you need a user (that is going to be the creator of the contacts) that have a api_key
connect to your civicrm database
mysql> update civicrm_contact set api_key="aaaa" where id=1;
or whatever user id you have

If your civicrm version is < 4.2.5,  you need to apply this patch
http://issues.civicrm.org/jira/browse/CRM-11169

you then need to copy (or edit) the config file config/example.json
and put the url of your site, the api key and (site) key.

##Usage##

$node fill.js example 42

will create 42 contacts in the site defined into config/example.json
I used the german, uk, us and nl locale (randomly) to have fields with chars outside of a-z and see if unicode is with us all the way. You will have names with quotes too (o' ...)

ex:
Adela Ebert conn_phd@sit.com  0151 435 9957
Constantin Goedicke christiano_rabenstein_von@velit.de  +49-2384-28111896
Viktor Freigang rania@quia.org  +49-962-9540190
Collin Erdman georgiana.weimann@assumenda.biz 0118 262 1969
Ashly Emard verla@distinctio.name 0800 794 4163
Amber Effertz aisha_lockman@nesciunt.com  0800 475 3134
...

To make it easier to clean if needed, the source is "charlatan". 
