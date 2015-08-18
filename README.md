# Credit Union Lookup
## Hapi service for querying credit union data from NCUA

The goal of this script is to allow you to parse through the CU data file
provided by NCUA.gov. Available to you now is the ability to query member size,
state, and asset size.

Initially, for the DB (after installed): 

    mongo
    use hapicreditunion
    // Open another terminal window
    mongod

Run these commands to start
    
    npm install
    npm start

Navigate your browser to localhost:3000

### Additional Information
See: http://www.ncua.gov/dataapps/pages/default.aspx

### Dependencies

good

good-console

hapi

### Considerations

Could consider using Boom for http
