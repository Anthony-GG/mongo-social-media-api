const { ObjectId } = require('mongoose').Types;
const { Thought, } = require('../models');
const { Reaction } = require('../models/Thought')

// Aggregate function to get the number of thoughts overall
const thoughtCount = async () => {
  const numberOfThoughts = await Thought.aggregate()
    .count('ThoughtCount');
  return numberOfThoughts;
}

module.exports = {
  // Get all thoughts
  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find().populate('username'); //.populate lets the username show instead of just mongoDB's user id

      const thoughtObj = {
        thoughts,
        thoughtCount: await thoughtCount(),
      };

      res.json(thoughtObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtID }).populate('username')
        .select('-__v');

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }

      res.json({
        thought
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

    //Update information about a user
    async updateThought(req,res){
  
      try{
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtID }, 
        {
          $set:{
            thoughtText: req.body.thoughtText,
            username: req.body.username,
            userID: req.body.userID,
          }
        },
        {new:true}); //updates the info before passing it to be returned to request maker
  
      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' })
      }
  
      return res.json(thought);
     } catch (err){
      console.log(err);
      res.status(500).json(err);
     }
  },

  // Delete a thought and remove them from the user
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtID });

      if (!thought) {
        return res.status(404).json({ message: 'No such thought exists' });
      }

      res.json({ message: 'Thought successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  async createReaction(req, res){
    try {
      const { thoughtID } = req.params;
      const { reactionBody, username } = req.body;

      // Use findOneAndUpdate to update the Thought document
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtID },
        {
          // Adds the new reaction to the reactions array
          $push: {
            reactions: {
              reactionBody,
              username,
            },
          },
        },
        { new: true } // Return the updated document
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  async deleteReaction(req, res){
    try {
      const { thoughtID } = req.params;
      const { reactionID } = req.params;

      // Use findOneAndUpdate to update the Thought document
      const thought = await Thought.findOneAndUpdate(
        { _id: thoughtID },
        {
          // Adds the new reaction to the reactions array
          $pull: {
            reactions: { _id: reactionID },
          },
        },
        { new: true } // Return the updated document
      );

      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};