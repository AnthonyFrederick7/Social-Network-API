const { Thought, User } = require('../models');

const thoughtController = {
  // Creates a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        !user 
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json({ message: 'Thought sucessfully created!' });
      })
      .catch((err) => res.status(500).json(err));
},
  // Gets all thoughts
  getThoughts(req, res) {
    Thought.find()
      .sort({ createdAt: -1 })
      .then((thoughts) => {
        res.json(thoughts);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Gets a single thought by id
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Updates a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought 
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Deletes a thought
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : User.findOneAndUpdate(
          { thoughts: req.params.thoughtId },
          { $pull: { thoughts: req.params.thoughtId } },
          { new: true }
        );
      })
      .then((user) => {
        !user
            ? res.status(404).json({ message: 'No user with this id!' })
            : res.json({ message: 'Thought deleted!' });
      })
      .catch((err) => res.status(500).json(err));
  },
  // Adds a reaction to a thought
  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought 
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
  // Removes a reaction from a thought
  removeReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    )
      .then((thought) => {
        !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;