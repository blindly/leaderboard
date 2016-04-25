PlayersList = new Mongo.Collection('players');

Meteor.methods({
    
    'createPlayer': function(playerNameVar, playerScoreVar){
        check(playerNameVar, String);
        var currentUserId = Meteor.userId();
        
        if (currentUserId){
            PlayersList.insert({
                name: playerNameVar,
                score: Number(playerScoreVar),
                createdBy: currentUserId
            });
        }
    },
    
    'updateScore': function(selectedPlayer, playerScoreVar){
        check(selectedPlayer, String);
        check(playerScoreVar, Number);
        var currentUserId = Meteor.userId();
        
        if (currentUserId){        
            PlayersList.update({_id: selectedPlayer}, { $inc: {score: playerScoreVar} });
        }
    },
    
    'renamePlayer': function(selectedPlayer, selectedPlayerName){
        
        check(selectedPlayer, String);
        check(selectedPlayerName, String);
        var currentUserId = Meteor.userId();
        
        if (currentUserId){        
            PlayersList.update({_id: selectedPlayer}, { $set: {name: selectedPlayerName} });
        }
    },
    
    'removePlayer': function(selectedPlayer){
        check(selectedPlayer, String);
        var currentUserId = Meteor.userId();
        
        if (currentUserId){
            PlayersList.remove({ _id: selectedPlayer, createdBy: currentUserId });
        }

    }
});