'use strict';
module.exports = function(app) {
  var users = require('../controllers/testAppController');

// Add headers
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


  // todoList Routes
  app.route('/getUsers')
    .get(users.get_all_users);

  app.route('/setUser')
    .post(users.add_user);

app.route('/editUser')
    .put(users.update_user);

app.route('/deleteUser')
    .delete(users.delete_user);


  app.route('/users/:userId')
    .get(users.get_user);
};