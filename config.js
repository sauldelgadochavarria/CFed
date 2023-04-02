module.exports = {
    'secretKey': '12345-67890-09876-54321',
    'mongoUrl' : 'mongodb://docsdbadmin:docsdbadmin@127.0.0.1:27017/docsdb'
 }


//  use admin
// db.createUser(
//   {
//     user: "myUserAdmin",
//     pwd: "docsdb_abc123",
//     roles: [ { role: "userAdminAnyDatabase", db: "admin" }, 
//              { role: "dbAdminAnyDatabase", db: "admin" }, 
//              { role: "readWriteAnyDatabase", db: "admin" } ]
//   }
// )

// use docsdb
// db.createUser(
//   {
//     user: "docsdbadmin",
//     pwd: "docsdbadmin",
//     roles: [ { role: "dbAdminAnyDatabase", db: "admin" }, 
//              { role: "readWriteAnyDatabase", db: "admin" } ]
//   }
// )
