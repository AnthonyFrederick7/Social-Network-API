const User = require('../models/User');

const userController = {
  // Creates a new user
  createUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
  // Gets all users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Gets a single user by id
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate("friends")
      .populate("thoughts")
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Updates a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body,},
      { runValidators: true,
          new: true,
      }
      )
      .then((user) => {
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user);
    })
    .catch((err) => res.status(500).json(err));
  },
  // Deletes a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) => {
        !user 
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.Thought.deleteMany({ _id: { $in: user.thoughts } })
    })
    .then(() => { res.json({ message: 'User and thoughts deleted!' })})
    .catch((err) => res.status(500).json(err));
  },
  // Adds a friend
  addFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      )
        .then((user) => {
          !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user);
        })
        .catch((err) => res.status(500).json(err));
  },
  // Remove friend from friend list
  removeFriend(req, res) {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      )
        .then((user) => {
          !user 
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user);
        })
        .catch((err) => res.status(500).json(err));
    },
}

module.exports = userController;