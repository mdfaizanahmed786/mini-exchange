// docker run command to start the container
// docker run -e POSTGRES_PASSWORD=mysecretpassword -d -p 5432:5432 postgres
// docker exec -it <container_id> /bin/bash
// psql -U postgres


export * from "@prisma/client"