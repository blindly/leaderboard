import { Meteor } from 'meteor/meteor';
import '/imports/api/methods.js';

Meteor.startup(() => {
  Meteor.publish('thePlayers', function(){
      var currentUserId = this.userId;
      return PlayersList.find({ createdBy: currentUserId });
  });
});

/*
Meteor.publish('thePlayers', function(){
    var currentUserId = this.userId;
    return PlayersList.find({ createdBy: currentUserId });
});
*/