# Genomie
Genetic visualization application

# Introduction 

Genomie is a web application that provides beautiful data visualizations of hereditary information based on the information receieved from 23AndMe.com. Providing the user with a varieties of different views, anyone can easily interpret and understand their unique genetic information in an interactive and elegant way. Genomie provides clear and vibrant perspectives in multiple viewing environments for an optimized user experience. 

# Questions and Issues
For any issues, please refer to [**our issues page**](https://github.com/ThunderousFigs/Genomes/issues)
Please direct any questions regarding Genomie to [**our wiki page**](https://github.com/ThunderousFigs/Genomes/wiki)

Thank you!

  - [Installation](#installation)
  - [Example](#example)
  - [Technologies](#technologies)
  - [Features](#features)
  - [Architecture](#architecture)
  - [Meet the engineers](#meet-the-engineers)
  - [Contributing](#contributing)

===============
## Installation
===============
Please install Python/Flask dependencies
```
$ virtualenv .
$ source bin/activate
$ pip install -r requirements.txt
```

Next, install the client-side dependencies
```
$ bower install
```

You're good to go. Start the server with:
```
$ npm start
```

==========
## Example
==========
![alt tag](http://i68.tinypic.com/2d1nwi9.jpg)

===============
## Technologies
===============
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
===============
### High Level Architecture
![](http://i64.tinypic.com/2zpp661.png)

### Database Schema
Database in Postgres, using SQLAlchemy
![](http://i68.tinypic.com/23i6plz.jpg)

======
## API
======
##### Public End Points
|Request|URL|Response|
|---|---|---|
|Log-in|/receive_code/|   |
|Log-in Demo|/demo/|   |
|Log-out|/logout|   |
|Get User Info|/get_info/|userObj|
|Get User Relatives|/api/relatives/|[RelativesObj...]|
|Get/Post SNP Data|/api/getsnps|[SnpObj...]|

##### Admin Only
|Request|URL|Response|
|---|---|---|
|Access to 23&Me Individual data|/1/user/:userID|[userObj...]|
|Access to 23&Me Genotype data|/1/genotype/|[genotypeObj...]|
|Access to 23&Me Relative data|/1/relatives/:userID|[relativesObj...]|


=====================
## Meet The Engineers
=====================
Product Owner 
- [**Gar Lee**](https://github.com/LeeGar)

Scrum Master 
- [**Alex Anthony**](https://github.com/alexanthony813)

Development Team 
- [**Chris Bassano**](https://github.com/christo4b)
- [**Peter Lollo**](https://github.com/Peterlollo)


