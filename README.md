Portfolio-Server

This project holds a MySQL-backend-server for Portfolio 2023 project. Install dependencies by entering 'npm install' command to CLI in the project's root folder. Before starting the server ensure:

    1. you have MySQL server installed and it's up and running.
    2. you have created a .env file in the project's root directory with required information, for example:

        PORT=3001
        HOST='localhost'
        DBUSER='node_client'
        PASSWORD='1234'
        DATABASE='dbname'
        DBPORT=3306
        DB_RANDOM_TABLE_NAME='tablename'
        DB_RANDOM_TABLE_NAME_JSON_FILE='tablename'
    	FRONT_END_URL=http://localhost:3000

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

Enter 'npm start' in the CLI to start the server. Run the tests with 'npm test' -command.

To run the project in a docker container, first create a new file named 'initdb.d/init.sql' to the root directory. This is the file you should write your SQL initialization script. Then run 'docker-compose up'. This command pulls both the project's image and mysql image from the registry and then creates the containers from them. Also write the environment variables that are needed in the docker-compose file to the .env file. If you want to build the project's image locally, then you have to comment out the image-line in the docker-compose file and also uncomment the build-line.

Copyright 2023 Tapani Voutilainen

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
