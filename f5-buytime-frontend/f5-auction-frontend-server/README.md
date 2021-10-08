# WARNING!
Switch does not require any authentication/authorisation. Server can be used only for demo purposes.

## General Overview
Server to serve auction frontend react application. 

#### Sourcecode for the rest of the project 
- Frontend: [here](https://bitbucket.org/yoctopeople/f5-auction-frontend/src/master/)
- Backend: [here](https://bitbucket.org/yoctopeople/f5-auction-backend/src/master/)
- Codebase: [here](https://bitbucket.org/yoctopeople/f5-auction-codebase/src/master/)

## Structure
1. public/build is to contain the build of the React App 
2. public/alt contains alternate pages to return

## Configuration
#### config.js:
Config has mapping key where target maps file and error code.
```json
{
    "mapping": {
      "target": "[filename, return status code]"
    }
}
```

#### Example:
```json
{
    "mapping": {
      "404": ["404.html", 404]
    }
}
```

## REST API 
- GET `./switch/:target` changes the return of the server. `:target` has a default value: `default`

#### Samples:
- `http://localhost:3000/switch/404` - switches server to return `404.html` file from `./public/alt` folder and eror `404`
- `http://localhost:3000/switch/default` - switches server back to default behaviour. Default is when regular server returns default React App

 
