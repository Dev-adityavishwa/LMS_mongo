const express = require("express");
const { users } = require("../data/users.json");
const { getAllUsers, getSingleUsersById, createUser, updateAUserById, deleteUserById, getSubscriptionDetailsByUserId } = require("../controllers/user-controller");

const router = express.Router();


/*
route : /users
method : get
desc : get all the list of users here
access specifier : public
parameters : none

*/
router.get('/', getAllUsers)
/* 
route : /users/:id
method : get
desc : get all the list of users here
access specifier : public
parameters : id
*/
router.get('/:id', getSingleUsersById)

/*
route : /users
method : POST
desc : Register the user
access specifier : public
parameters : none
*/

router.post("/", createUser)

/*
route : /users/:id
method : PUT
desc : updating user 
access specifier : public
parameters : ID
*/

router.put('/:id', updateAUserById)
/*
route : /users/:id
method :DELETE
desc : DELETING user 
access specifier : public
parameters : ID
*/

router.delete("/:id", deleteUserById)

/*
route : /users/subscription-details/:id
method : GET
desc : get the subscription detail of the user by ID
access specifier : public
parameters : ID
*/

router.get("subscription-details/:id", getSubscriptionDetailsByUserId)




module.exports = router;




