const { UserModel, BookModel } = require('../models');

// create the method for each route 


exports.getAllUsers = async (req, res) => {

    const users = await UserModel.find();
    if (!users || users.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No user found"
        })
    }

    res.status(200).json({
        success: true,
        data: users
    })
}
exports.getSingleUsersById = async (req, res) => {

    const { id } = req.params; // to fetch the parameter 
    const user = await UserModel.findById(id);
    // const user = await UserModel.findOne({ _id : id });

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
}
exports.createUser = async (req, res) => {
    // parameter passing
    //     const { id, name, surname, email, subscriptionType, subscriptionDate } = req.body;



    //     if (!id || !name || !surname || !email || !subscriptionType || !subscriptionDate) {
    //         return res.status(404).json({
    //             success: "false",
    //             message: `please provide all the required field`
    //         })
    //     }

    //     const user = users.find((each) => each.id === id)
    //     if (user) {
    //         return res.status(489).json({
    //             success: "false",
    //             message: "User already exists"
    //         })
    //     }

    //     users.push({
    //         id, name, surname, email, subscriptionType, subscriptionDate
    //     })
    //     res.status(201).json({
    //         success: "true",
    //         message: "user created successfully"
    //     })
    //     res.end()
    // }

    const { data } = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(404).json({
            success: false,
            message: " please provide data to create user "
        })
    }

    await UserModel.create(data);
    const getAllUser = await UserModel.find();
    res.status(201).json({
        success: "true",
        message: "user created successfully",
        data: getAllUser
    })

}
exports.updateAUserById = async (req, res) => {
    //  (req, res) => {
    //     const { id } = req.params; // to fetch the parameter 
    //     const { data } = req.body;  // passing data from req.body

    //     const user = users.find((each) => each.id === id)

    //     if (!user) {
    //         return res.status(404).json({
    //             success: "false",
    //             meggase: `User Not found of id : ${id}`
    //         })
    //     }

    //     // if we are getting user then update
    //     // with spread operator 
    //     const updateUser = users.map((each) => {
    //         if (each.id === id) {
    //             return {
    //                 ...each,  //spread operator --> read the notes 
    //                 ...data,
    //             }
    //         }
    //         return each
    //     })
    //     // or use
    //     // Object.assign(user,data);
    //     res.status(200).json({
    //         success: true,
    //         data: updateUser,
    //         message: "user updated successfully"
    //     })
    // }

    const { id } = req.params;
    const { data } = req.body;
    if (!data || Object.keys(data).length === 0) {
        return res.status(404).json({
            success: false,
            message: " please provide data to create user "
        })
    }

    const user = await UserModel.findById(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `User Not found of id : ${id}`
        })
    }

    const updatedUser = await UserModel.findByIdAndUpdate(id, data, { new: true });
    res.status(200).json({
        success: true,
        data: updatedUser,
        message: "book  updated successfully",
    })
}
exports.deleteUserById = async (req, res) => {

    // (req, res) => {

    //     const { id } = req.params;


    //     const user = users.find((each) => each.id === id)

    //     if (!user) {
    //         return res.status(404).json({
    //             success: false,
    //             message: `user not found  ${id}`

    //         })
    //     }

    //     const updateUser = users.filter((each) => each.id !== id)

    //     // const index = users.indexOf(user);
    //     // users.splice(index, 1);

    //     res.status(200).json({
    //         success: true,
    //         data: updateUser,
    //         message: "User deleted successfully"
    //     })

    // }

    const { id } = req.params;
    const user = await UserModel.findOneAndDelete(id);
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `user not found  ${id}`
        })
    }
    res.status(200).json({
        success: true,
        message: "user delete successfully.. ",
    })

}

exports.getSubscriptionDetailsByUserId = async () => {


    // (req, res) => {

    //     const { id } = req.params;

    //     // find the user by ID
    //     const user = users.find((each) => each.id === id);
    //     if (!user) {
    //         return res.status(404).json({
    //             success: false,
    //             message: `user not found : ${id}`
    //         });
    //     }

    //     // extract the subs details

    //     const getDateInDays = (data = '') => {
    //         let date;
    //         if (data) {
    //             data = new Date(data);

    //         } else {
    //             date = new Date();
    //         }
    //         let days = Math.floor(data / (1000 * 60 * 60 * 24));
    //         return days;
    //     }
    //     const subscriptionType = (data) => {
    //         if (user.subscriptionType === "Basic") {
    //             date = date + 90;
    //         } else if (user.subscriptionType === "standard") {
    //             date = date + 180;
    //         } else if (user.subscriptionType === "Premium") {
    //             date = date + 365;
    //         }
    //         return date;
    //     }

    //     //  subscription claculation expiration
    //     //  january 1, 1970 UTC  // milliseconds


    //     let returnDate = getDateInDays(user.returnDate);
    //     let currentDate = getDateInDays();
    //     let subscriptionDate = getDateInDays(user.subscriptionDate);
    //     let subscriptionexpiration = subscriptionType(subscriptionDate);


    //     const data = {
    //         ...user,
    //         subscriptionExpired: subscriptionExpired < currentDate,
    //         subscriptionDastleft: subscriptionExpired - currentDate,
    //         daysLeftForExpiration: returnDate - currentDate,
    //         returnDate: returnDate < currentDate ? " Books is overdue " : returnDate,
    //         fine: returnDate < currentDate ? subscriptionexpiration <= currentDate ? 200 : 100 : 0

    //     }


    //     res.status(200).json({
    //         success: true,
    //         data: data
    //     });


    // }

    const { id } = req.params;
    const user = UserModel.findById(id)
    if (!user) {
        return res.status(404).json({
            success: false,
            message: `user not found : ${id}`
        });
    }
    // extract the seubscription details 
    const getDateIndays = (data = '') => {
        let date;
        if (data) {
            date = new Date(data);
        } else {
            date = new Date();
        }
        let days = Math.floor(date / (1000 * 60 * 60 * 24));
        return days;

    }
    const subscriptionType = (date) => {
        if (user.subscriptionType === "Basic") {
            date = date + 90
        } else if (user.subscriptionType === "Standard") {
            date = date + 180
        } else if (user.subscriptionType === "Standard") {
            date = date + 365
        }
        return date;
    }
    let returnDate = getDateInDays(user.returnDate);
    let currentDate = getDateInDays();
    let subscriptionDate = getDateInDays(user.subscriptionDate);
    let subscriptionexpiration = subscriptionType(subscriptionDate);


    const data = {
        ...user._doc,
        subscriptionExpired: subscriptionExpired < currentDate,
        subscriptionDastleft: subscriptionExpired - currentDate,
        daysLeftForExpiration: returnDate - currentDate,
        returnDate: returnDate < currentDate ? " Books is overdue " : returnDate,
        fine: returnDate < currentDate ? subscriptionexpiration <= currentDate ? 200 : 100 : 0

    }

    res.status(200).json({
        success: true,
        data
    });


}









