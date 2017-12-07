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
      status: "not started",
      started: false,
      timeline: [],
      public: true,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'matches.setStatus'(matchId, newStatus, newEvent) {
    let started = (newStatus !== "not started" && newStatus !== "finished");
    const match = Matches.findOne(matchId);
    if (!match.public && match.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Matches.update(matchId, {
      $set: {
        started = started,
        status: newStatus,
        timeline: match.timeline.concat(newEvent)
      }
    });
  },
  'matches.setPointsLocal'(matchId, newPoints, newEvent) {
    const match = Matches.findOne(matchId);
    if (!match.public && match.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Matches.update(matchId, {
      $set: {
        local: {
          name: match.local.name,
          points: newPoints
        },
        timeline: match.timeline.concat(newEvent)
      }
    });
  },
  'matches.setPointsVisit'(matchId, newPoints, newEvent) {
    const match = Matches.findOne(matchId);
    if (!match.public && match.owner !== this.userId) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Matches.update(matchId, {
      $set: {
        visit: {
          name: match.visit.name,
          points: newPoints
        },
        timeline: match.timeline.concat(newEvent)
      }
    });
  },
});
