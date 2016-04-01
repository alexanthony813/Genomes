# Genomie
Genetic visualization application

Please visit [**our deployed website**](http://genomie.herokuapp.com).

## Introduction 

Genomie is a web application that provides beautiful data visualizations of hereditary information based on the information received from 23AndMe.com. Providing the user with a varieties of different views, anyone can easily interpret and understand their unique genetic information in an interactive and elegant way. Genomie provides clear and vibrant perspectives in multiple viewing environments for an optimized user experience. 

<hr>
## Table of Contents

  - [Example](#example)
  - [Installation](#installation)
  - [Technologies](#technologies)
  - [Architecture](#architecture)
  	- [API Endpoints](#api)
  - [Contributing](#contributing)
  - [Meet the Engineers](#meet-the-engineers)
  - [Questions and Issues](#questions-and-issues)

==========
## Example
![alt tag](http://i67.tinypic.com/2wce5wl.gif)

===============
## Installation
Please install Python/Flask dependencies within the root directory
```
$ virtualenv .
$ source bin/activate
$ pip install -r requirements.txt
```

Next, install the client-side dependencies
```
$ sudo npm install -g bower
$ bower install
```
**For testing**
```
$ npm install
```

You're good to go. Start the server with:
```
$ npm start
```

===============
## Technologies
Front-end
- AngularJS 
- Angular-Material
- D3.js

Back-end
- Python/Flask
- PostgreSQL
- SQLAlchemy

Testing/Automation
- Mocha/Chai
- Jasmine
- Grunt

===============
## Architecture
### High Level Architecture
![](http://i64.tinypic.com/2zpp661.png)

### Database Schema
Database in Postgres, using SQLAlchemy
![](http://i68.tinypic.com/23i6plz.jpg)

======
## API
##### Public End Points
|Description|Endpoint|
|---|---|
|[Log-in OAuth](routing.md#get-receive_code)|GET /receive_code/|
|[Log-in Demo](routing.md#post-demo)|POST /demo/|
|[Log-out current user](routing.md#post-logout)|POST /logout|
|[Get User Info](routing.md#get-currentuserinfo)|GET /currentuser_info/|
|[Get User Relatives](routing.md#post-apirelatives)|POST /api/relatives/|
|[Get User's SNP Data](routing.md#post-apisnpdata)|POST /api/snp_data/|

##### Admin Only
|Description|Endpoint|
|---|---|
|[Access to 23&Me Individual data](routing.md#get-individual-data)|/1/user/:userID|
|[Access to 23&Me Genotype data](routing.md#get-genotype-data)|/1/genotype/:userID|
|[Access to 23&Me Relative data](routing.md#get-relative-data)|/1/relatives/:userID|

===============
## Contributing
Genomie was built using waffle.io as the project organization tool.
Please visit [here](gitflow.md) for our workflow guidelines.

=====================
## Meet The Engineers
Product Owner 
- [**Gar Lee**](https://github.com/LeeGar)

Scrum Master 
- [**Alex Anthony**](https://github.com/alexanthony813)

Development Team 
- [**Chris Bassano**](https://github.com/christo4b)
- [**Peter Lollo**](https://github.com/Peterlollo)

## Questions and Issues
For any issues, please refer to [**our issues page**](https://github.com/ThunderousFigs/Genomes/issues)
Please direct any questions regarding Genomie to [**our wiki page**](https://github.com/ThunderousFigs/Genomes/wiki)

Thank you!

