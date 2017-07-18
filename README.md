-------------------------------------------------------------------------------------------------------------------------------------
Documentation created By : Abhishek H Shetty,
Created On : 17th July 2017
-------------------------------------------------------------------------------------------------------------------------------------

This project is developed to understand the MEAN stack. This application has a basic implementation of a "Social Networking site".
Users can create their ids and then post messages. Other users can like or comment on these posts. User can modify profile as well.
A complete flow fron UI (View) via the controller & Model to the Mongo DB.

-------------------------------------------------------------------------------------------------------------------------------------
Steps to run this application.
-------------------------------------------------------------------------------------------------------------------------------------
- Install Node from nodejs.org & Mongo DB from https://docs.mongodb.com/manual/installation/
- For better and easy usage of Mongo, install Robomongo.
- Check out the code from this repository https://github.com/shettyabhishek/meanStackApp-Social-Networking.git
- Run the below command for setting up the node modules  
  $npm install
- The above command will install all the dependencies for running this application, mentioned/configured in package.json
- Configure the server port as per you choice in server.js. So that you can run the localhost on that port of ur choice

-------------------------------------------------------------------------------------------------------------------------------------
Other specification
-------------------------------------------------------------------------------------------------------------------------------------
Package.json
- Dependencies => body-parser,connect-multiparty  //Are required for reading the request parameters when a service is triggered
               => express //For writing the api and configuring them
               => fs-extra, path //For accessing the file system and IO operations
               => mongoose //For MongoDB operations, read or write activities

- running server => //The project set up builds the configuration for running the server using
              $npm start 
