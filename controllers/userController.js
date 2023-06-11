const { ObjectId } = require('mongoose')
const { Thought, User, Reaction, reactionSchema } = require('../modelss');

module.exports = {
    
    async getThoughts(req, res) {
      try {
        const thoughts = await Thought.find();
        res.json(thoughts);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    async getSingleThought(req, res) {
      try {
        const thought = await Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v');
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    async createThought(req, res) {
      try {
        //Find the user
        const userExists = await User.findOne({ _id: req.body.userId })
  
        //If the user exist return an error
        if (!userExists) {
          res.status(400).json(user)
          return;
        }
  
        
        const thought = await Thought.create(req.body);
  
        const user = await User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought } },
          { runValidators: true, new: true })
  
        res.json({ thought });
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    },
    
    async deleteThought(req, res) {
      try {
        const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with that ID' });
        }
  
        const users = await User.updateMany({},
          {
            $pull: {
              thoughts: req.params.thoughtId
            }
          })
  
        res.json({ message: 'Thought deleted!', users });
      } catch (err) {
        res.status(500).json(err);
      }
    },
   
    async updateThought(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res.status(404).json({ message: 'No thought with this id!' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    
    async addReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
   
    async removeReaction(req, res) {
      try {
        const thought = await Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        );
  
        if (!thought) {
          return res
            .status(404)
            .json({ message: 'No thought found with that ID' });
        }
  
        res.json(thought);
      } catch (err) {
        res.status(500).json(err);
      }
    },
  };