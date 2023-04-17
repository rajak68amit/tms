const { user } = require('../models');

// const userDetails = async (id) => {
//     try {
//        const userExist = await User.findOne({
//            // attributes: ['id', 'roleid', 'name', 'phone','email'], where: {id: id }
//             attributes: ['name'], where: {id: id }
//         });
//         console.log("helper",userExist.dataValues.name);
        
//         return userExist.dataValues.name
//         //console.log(userdetails)
//     } catch (error) {
//         console.log(error.message);
      
//     }
// }
const userDetails = async (id) => {
    try {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    user.findOne({
                        // attributes: ['id', 'roleid', 'name', 'phone','email'], where: {id: id }
                        attributes: ['name'], where: { id: id }
                    });
                }, id);
            })

    //    const userExist = await User.findOne({
    //        // attributes: ['id', 'roleid', 'name', 'phone','email'], where: {id: id }
    //         attributes: ['name'], where: {id: id }
    //     });
    //     console.log("helper",userExist.dataValues.name);
        
    //     return userExist.dataValues.name
        //console.log(userdetails)
    } catch (error) {
        console.log(error.message);
      
    }
}

module.exports = {
    userDetails
}