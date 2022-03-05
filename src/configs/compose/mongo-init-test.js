db.createUser({ user: 'admin', pwd: 'admin', roles: [{ role: 'root',db: 'admin' }]});


// docker exec -it mongodb bash
// mongo admin
// db.auth("admin","admin");