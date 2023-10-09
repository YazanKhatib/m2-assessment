# Magazine subscription service

See all of your favorite magazines and subscript to get the latest releases

### How to run the application

Backend:

- navigate to server project and run `yarn` to install all the dependecies
- create a database in postgres using pgadmin interface and change the database connection string under `server/prisma/schema.prisma`
- connection string format: `postgres://{user}:{password}@{hostname}:{port}/{database-name}`

```
datasource db {
  provider = "postgresql"
  url      = CONNECTION_STRING_HERE
}
```

- run `npx prisma migrate deploy` to run migrations and create tables in db
- run `yarn dev` to start the project

Frontend:

- navigate to client project and run `yarn` to install all the dependecies
- run `yarn dev` to start the project

### Screenshots

![Alt text](<Screenshot 2023-10-09 at 4.30.52 PM.png>)

![Alt text](<Screenshot 2023-10-09 at 4.31.58 PM.png>)

![Alt text](<Screenshot 2023-10-09 at 4.32.15 PM.png>)
