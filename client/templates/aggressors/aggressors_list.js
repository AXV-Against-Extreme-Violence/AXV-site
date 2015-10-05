Template.aggressorItemTable.helpers({
   listOfAliases: function (){
       return this.aliases.join(', ');
   },
    noNames: function (){
        return !(this.firstName || this.lastName);
    }
});

Template.aggressorItemTable.events({
    'click .rowItem': function ()
    {
        Router.go('aggressorItem', {_id: this._id});
    }
});