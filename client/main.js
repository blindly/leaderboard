import { Template } from 'meteor/templating';
import './main.html';
import '/imports/api/methods.js';

Template.leaderboard.helpers({
    'player': function(){
        var currentUserId = Meteor.userId();
        return PlayersList.find({ createdBy: currentUserId }, { sort: {score: -1, name: 1} });
    },
    'otherHelperFunction': function(){
        return "Some other function";
    },
    'playerCount': function(){
        var currentUserId = Meteor.userId();            
        var count = PlayersList.find({ createdBy: currentUserId }).count();
        if (! count)
            count = 0;
        return count;
    },
    'selectedClass': function(){
        var playerId = this._id;
        var selectedPlayer = Session.get('selectedPlayer');
        
        if (playerId == selectedPlayer){
            return "selected";
        }
    },
    'selectedPlayer': function (){
        var selectedPlayer = Session.get('selectedPlayer');
        return PlayersList.findOne({_id: selectedPlayer});
    }
});


Template.leaderboard.events({
    'click .player': function(){
        var playerId = this._id;
        Session.set('selectedPlayer', playerId);
        var selectedPlayer = Session.get('selectedPlayer');
        console.log(selectedPlayer);
    },
    
    'click .increment': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('updateScore', selectedPlayer, 5);
    },
    
    'click .decrement': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        Meteor.call('updateScore', selectedPlayer, -5);

    },
    
    'click .update': function(){
        var selectedPlayer = Session.get('selectedPlayer');
        var selectedPlayerName = document.getElementById('playerName').value;
        
        console.log("name: " + selectedPlayerName);
        
        Meteor.call('renamePlayer', selectedPlayer, selectedPlayerName);
    },
    
    'click .remove': function(){
        
        if (confirm('Are you sure you want remove this player?')) {

            var selectedPlayer = Session.get('selectedPlayer');
            //PlayersList.remove({ _id: selectedPlayer });
            Meteor.call('removePlayer', selectedPlayer);

        } 
        else {
            // Do nothing!
        }
        
    }
});

Template.addPlayerForm.events({
    'submit form': function(event){
        event.preventDefault();
        var currentUserId = Meteor.userId();
        var playerNameVar = event.target.playerName.value;
        var playerScoreVar = Number( event.target.playerScore.value );

        console.log(playerNameVar);
        
        Meteor.call('createPlayer', playerNameVar, playerScoreVar);
        
        event.target.playerName.value = "";
        event.target.playerScore.value = "";


    },
});

Meteor.subscribe('thePlayers');