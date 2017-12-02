import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Matches = new Mongo.Collection('matches');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish matches that are public or belong to the current user
  Meteor.publish('matches', function matchesPublication() {
    return Matches.find();
  });
}

Meteor.methods({
  'matches.insert'(match) {
    check(match, Object);

    // Make sure the user is logged in before inserting a match
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Matches.insert({
      local: {
        name: match.local,
        points: 0
      },
      visit: {
        name: match.visit,
        points: 0
      },
      startingTime: match.startingTime,
      endingTime: match.endingTime,
      finished: false,
      public: true,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
});
