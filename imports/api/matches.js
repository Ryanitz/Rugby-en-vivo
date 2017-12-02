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
  'match.insert'(match) {
    check(match, String);

    // Make sure the user is logged in before inserting a task
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Match.insert({
      match,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
});
