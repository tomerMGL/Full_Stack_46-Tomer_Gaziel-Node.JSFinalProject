const userModel = require("../Models/userModel");

const scheduleUpdateUserActions = async () => {
    const allUsers = await userModel.find({});
    for (let i = 0; i < allUsers.length; i++) {
        const user = allUsers[i];
        await userModel.findByIdAndUpdate(user._id, { actionsAllowed: user.numOfActions });
    }
    const date = new Date();
    
    console.log(`${date.toString().split("GMT")[0]} | Updated All Users Actions`);
}


module.exports = {scheduleUpdateUserActions};
