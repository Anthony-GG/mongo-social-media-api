const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const userCount = async () => {
  const numberOfUsers = await User.aggregate()
    .count('UserCount');
  return numberOfUsers;
}

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        userCount: await userCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userID })

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }

      res.json({
        user
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  //Update information about a user
  async updateUser(req,res){
    try{
    const user = await User.findOneAndUpdate(
      { _id: req.params.userID }, 
      {
        $set:{
          username: req.body.username,
          email: req.body.email,
        }
      },
      {new:true}); //updates the info before passing it to be returned to request maker

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' })
    }

    return res.json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
},

  // Delete a user
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.userID });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }
      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  async addFriend(req, res){
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userID },
            { $addToSet: { friends: req.params.friendID } },
            { new: true }
        )

        await User.findOneAndUpdate(
            { _id: req.params.friendID },
            { $addToSet: { friends: req.params.userID } },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        res.json({
            user,
            message: "Friend added to user and friend's lists."
        })   
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
  },

  async deleteFriend(req, res){
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userID },
            { $pull: { friends: req.params.friendID } },
            { new: true }
        )

        await User.findOneAndUpdate(
            { _id: req.params.friendID },
            { $pull: { friends: req.params.userID } },
            { new: true }
        )

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' })
        }

        res.json({
            user,
            message: "Friend removed from user and friend's lists."
        })   
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
  },
  

};

