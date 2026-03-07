const express = require("express");
const { users } = require("../data/users.json")

const router = express.Router();


/*
route : /users
method : get
desc : get all the list of users here
access specifier : public
parameters : none

*/
router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        data: users
    })
})
/*
route : /users/:id
method : get
desc : get all the list of users here
access specifier : public
parameters : id
*/
router.get('/:id', (req, res) => {

    const { id } = req.params; // to fetch the parameter 
    const user = users.find((each) => each.id === id)

    if (!user) {
        return res.status(404).json({
            success: "false",
            message: `user not found ${id}`
        })
    }

    res.status(200).json({
        success: true,
        data: user  // to get a specific 
    })
})

/*
route : /users
method : POST
desc : Register the user
access specifier : public
parameters : none
*/

router.post("/", (req, res) => {
    // parameter passing
    const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;



    if (!id || !name || !surname || !email || !subscriptionType || !subscriptionDate) {
        return res.status(404).json({
            success: "false",
            message: `please provide all the required field`
        })
    }

    const user = users.find((each) => each.id === id)
    if (user) {
        return res.status(489).json({
            success: "false",
            message: "User already exists"
        })
    }

    users.push({
        id, name, surname, email, subscriptionType, subscriptionDate
    })
    res.status(201).json({
        success: "true",
        message: "user created successfully"
    })
    res.end()
})

/*
route : /users/:id
method : PUT
desc : updating user 
access specifier : public
parameters : ID
*/

router.put('/:id', (req, res) => {
    const { id } = req.params; // to fetch the parameter 
    const { data } = req.body;  // passing data from req.body

    const user = users.find((each) => each.id === id)

    if (!user) {
        return res.status(404).json({
            success: "false",
            meggase: `User Not found of id : ${id}`
        })
    }

    // if we are getting user then update
    // with spread operator 
    const updateUser = users.map((each) => {
        if (each.id === id) {
            return {
                ...each,  //spread operator --> read the notes 
                ...data,
            }
        }
        return each
    })
    // or use
    // Object.assign(user,data);
    res.status(200).json({
        success: true,
        data: updateUser,
        message: "user updated successfully"
    })
})
/*
route : /users/:id
method :DELETE
desc : DELETING user 
access specifier : public
parameters : ID
*/

router.delete("/:id", (req, res) => {

    const { id } = req.params;


    const user = users.find((each) => each.id === id)

    if (!user) {
        return res.status(404).json({
            success: false,
            message: `user not found  ${id}`

        })
    }

    const updateUser = users.filter((each) => each.id !== id)

    // const index = users.indexOf(user);
    // users.splice(index, 1);

    res.status(200).json({
        success: true,
        data: updateUser,
        message: "User deleted successfully"
    })

})

/*
route : /users/subscription-details/:id
method : GET
desc : get the subscription detail of the user by ID
access specifier : public
parameters : ID
*/

router.get("subscription-details/:id", (req, res) => {

    const { id } = req.params;

    // find the user by ID
    const user = users.find((each) => each.id === id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `user not found : ${id}`
        });
    }

    // extract the subs details

    const getDateInDays = (data = '') => {
        let date;
        if (data) {
            data = new Date(data);

        } else {
            date = new Date();
        }
        let days = Math.floor(data / (1000 * 60 * 60 * 24));
        return days;
    }
    const subscriptionType = (data) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90;
        } else if (user.subscriptionType === "standard") {
            date = date + 180;
        } else if (user.subscriptionType === "Premium") {
            date = date + 365;
        }
        return date;
    }

    //  subscription claculation expiration
    //  january 1, 1970 UTC  // milliseconds


    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionexpiration = subscriptionType(subscriptionDate);


    const data = {
        ...user,
        subscriptionExpired: subscriptionExpired < currentDate,
        subscriptionDastleft: subscriptionExpired - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? " Books is overdue " : returnDate,
        fine: returnDate < currentDate ? subscriptionexpiration<=currentDate ? 200 : 100 :0

    }


    res.status(200).json({
        success: true,
        data: data
    });


})




module.exports = router;




