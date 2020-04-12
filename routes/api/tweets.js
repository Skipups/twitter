const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Tweet = require('../../models/Tweet');
const validateTweetInput = require('../../validation/tweets');

//router.get('/test', (req, res) => res.json({ msg: 'this is tweets route' }));

//routes to retrive all tweets newest first
router.get('/', (req, res) => {
  Tweet.find()
    .sort({ date: -1 })
    .then((tweets) => res.status(200).json(tweets))
    .catch((err) => res.status(400).json({ notweetsfound: 'No tweets found' }));
});

//routes to retrive a singel user's tweets
router.get('/user/:user_id', (req, res) => {
  Tweet.find({ user: req.params.user_id })
    .then((tweets) => res.status(200).json(tweets))
    .catch((err) =>
      res.status(404).json({ nottweetsfound: 'No tweets from this user' })
    );
});

//routes to retrive individual tweets
router.get('/:id', (req, res) => {
  Tweet.findById(req.params.id)
    .then((tweet) => res.status(200).json(tweet))
    .catch((err) => res.status(404).json({ notweetfound: 'No tweet found' }));
});

//protected route of user to post tweets
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateTweetInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }
    const newTweet = new Tweet({
      text: req.body.text,
      user: req.body.id,
    });
    newTweet.save().then((tweet) => res.status(200).json(tweet));
  }
);

//protected route to delete tweets

module.exports = router;
