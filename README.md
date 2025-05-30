Portfolio-Server

This project holds a backend-server for Portfolio 2023 project. The "/\_api" endpoints handle the requests to MySQL database. The "/nasa_api" endpoint handles the requests to NASA API. Install dependencies by entering 'npm install' command to CLI in the project's root folder. Before starting the server ensure:

    1. you have MySQL server installed and it's up and running.
    2. You have created a NASA API key in NASA's web page api.nasa.gov.
    3. you have created a .env file in the project's root directory with required information, for example:

        PORT=3001
        HOST='localhost'
        DBUSER='node_client'
        PASSWORD='1234'
        DATABASE='dbname'
        DBPORT=3306
        DB_RANDOM_TABLE_NAME='tablename'
        DB_RANDOM_TABLE_NAME_JSON_FILE='tablename'
    	FRONT_END_URL=http://localhost:3000
        NASA_API_TOKEN=[nasa-api key]

Before running tests ensure:

    1. the MySQL database has tables in it.
    2. the MySQL database has at least one table that has data in it and the name of this table must be written to DB_RANDOM_TABLE_NAME variable in .env file.
    3. you have alltables.json and another json file in the test folder with exactly the same name specified in the DB_RANDOM_TABLE_NAME_JSON variable in .env file, for example 'tablename.json'.
    4. alltables.json file has exactly the same table names that are in the database in json format, for example:


        [
        {
        "Table": "Table 1"
        },
        {
        "Table": "Table 2"
        },
        {
        "Table": "Table 3"
        },
        ...
        ]

    5. the json-file written to DB_RANDOM_TABLE_NAME_JSON_FILE variable must have exactly the same table content that's in the table written to DB_RANDOM_TABLE_NAME variable in a json format for example:


        [
        {
        "id": 1,
        "name": "John Doe",
        "address": Gatepark 77,
        "email": "jd@bbbb.it"
        },
        {
        "id": 2,
        ...
        },
        ...
        ]

    6. In server.test.js there is a test case in which nasa api query is performed with parameters { sol: 4074, camera: "FHAZ" }. You should first test the query manually and then copy the result to a file test/apiresult.json to make this test case to pass.

Enter 'npm start' in the CLI to start the server. Run the tests with 'npm test' -command.

To run the project in a docker container:

    1. Create a new file named 'initdb.d/init.sql' to the root directory. This is the file you should write your SQL initialization script.

    2. Create a file 'mysql_root_password.txt' to the root directory. Write to this file only the root password to the mysql database.

    3. Create a file 'password.txt'. Write to this file only the same password that you would've normally written to .env PASSWORD value.

    4. Create a .env file. Write to it the following details. Replace the example values with real values:

        PORT=3001
        DBUSER=node_client
        DATABASE=dbname
        DBPORT=3306
        DB_RANDOM_TABLE_NAME=customers
        DB_RANDOM_TABLE_NAME_JSON_FILE=table-content
        FRONT_END_URL=http://localhost:3000
        NASA_API_TOKEN=[nasa-api key]
        SECRET_PATH=/run/secrets/password

    5. Run 'docker-compose up'. This command pulls both the project's image and mysql image from the registry and then creates the containers from them. If you want to build the project's image locally, then you have to comment out the image-line in the docker-compose file and also uncomment the build-line.

Copyright 2023 Tapani Voutilainen

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
