# Useful commands to remember

### Install PostgreSQL

```
sudo apt update
apt install postgresql postgresql-contrib
```

### Check PostgreSQL status

`service postgresql status`

### Start Using PostgreSQL Command Line Tool

`sudo -u postgres psql`

### Check details of your connection

`\conninfo`

### List of all the databases that are available on a server,

`\l`

### List of all the users with their privileges

`\du`

### Since the default “postgres” user does not have a password, you should set it yourself.

`\password postgres`

### Create and Populate a New Database

`CREATE DATABASE test_erp;`

### Connect to it

`\c test_erp`

### Create table with primary key

```
CREATE TABLE clients (id SERIAL PRIMARY KEY, first_name VARCHAR, last_name VARCHAR, role VARCHAR);
```

### Double check table is created

`\dt`

### Insert into new table

```
INSERT INTO clients (first_name, last_name, role) VALUES ('John', 'Smith', 'CEO');
```

### Get all rows

`SELECT * FROM clients;`

### Setup PostgreSQL server

Let’s now exit the interactive psql session by typing exit, and access `postgresql.conf` configuration file of PostgreSQL version 14 by using vim text editor

`vim /etc/postgresql/14/main/postgresql.conf`

Uncomment and edit the listen_addresses attribute to start listening to start listening to all available IP addresses.

`listen_addresses = '*'`

Now edit the PostgreSQL access policy configuration file.

`vim /etc/postgresql/14/main/pg_hba.conf`

Append a new connection policy (a pattern stands for `[CONNECTION_TYPE][DATABASE][USER] [ADDRESS][METHOD])` in the bottom of the file.

`host all all 0.0.0.0/0 md5`

We are allowing TCP/IP connections (`host`) to all databases (`all`) for all users (`all`) with any IPv4 address (`0.0.0.0/0`) using an MD5 encrypted password for authentication (`md5`).

It is now time to restart your PostgreSQL service to load your configuration changes.

`systemctl restart postgresql`

And make sure your system is listening to the 5432 port that is reserved for PostgreSQL.

`ss -nlt | grep 5432`

### Connect to PostgreSQL database through a remote host

- Connect via Command Line Tool
- You may now connect to a remote database by using the following command pattern:

`psql -h [ip address] -p [port] -d [database] -U [username]`

`e.g. psql -h 5.199.162.56 -p 5432 -d test_erp -U postgres`

Double check connection details

`\conninfo`


Now you can start writing SQL queries to retrieve data from your database tables.

``` SELECT * FROM clients; ```

###  Connect via GUI Client (pgAdmin)

After installing pgAdmin 4 and running it you will get to a standard pgAdmin 4 dashboard.

- Press ``` Add New Server ``` button and enter the information of your remote server.
- Enter your connection details
- After saving your credentials you will be automatically connected to a remote database server.
- You may now open a Query Tool for your selected database ``` test_er ``` and start writing your queries.

Links

[Installing PostgreSQL](https://www.cherryservers.com/blog/how-to-install-and-setup-postgresql-server-on-ubuntu-20-04)

Notes

Selecting date and formating from 6 digits

``` SELECT to_char(to_timestamp('310322', 'DDMMYY'),'YYYY-MM-DD') ```