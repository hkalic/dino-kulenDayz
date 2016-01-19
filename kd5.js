var Dinos = new Meteor.Collection('DoomedDinos');

if (Meteor.isClient) {
    Template.header.helpers({
        'title': function(){
            return "Hello KD";
        },
        'tagline': function(){
            return "Killing all the Dinos"
        }
    });

    Template.addDino.events({
        'click #addDino': function(){
            var input = $('#dinoToAdd');
            Dinos.insert({name: input.val()});
            input.val('');
        }
    });

    Template.dinos.helpers({
        'dinos': function(){
            return Dinos.find({}, {sort:{votes: -1, name: 1}});
        }
    });

    Template.dino.helpers({
        'selected': function(){
            return Session.equals('selected_dino', this._id) ? 'selected' : '';
        }
    });

    Template.dino.events({
        'click tr': function(){
            Session.set('selected_dino', this._id);
        }
    });

    Template.hateAndDestroy.events({
        'click #hate': function(){
            var id=Session.get('selected_dino');
            Dinos.update(id,{$inc:{votes:1}});
        },
        'click #destroy': function(){
            var id = Dinos.findOne({}, {sort:{votes: -1, name: 1}})._id;
            Dinos.remove(id);
        }
    })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    if (Dinos.find({}).count()==0) {
        Dinos.insert({name: "Cobol", votes: 0});
        Dinos.insert({name: "Visual Basic", votes: 0});
        Dinos.insert({name: "Clipper", votes: 0});
        Dinos.insert({name: "ALGOL 68", votes: 0});
        Dinos.insert({name: "Clarion", votes: 0});
    }
  });
}
