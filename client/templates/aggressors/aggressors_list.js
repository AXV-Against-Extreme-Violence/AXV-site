Template.aggressorItemTable.helpers({
   listOfAliases: function (){
       return this.aliases.join(', ');
   },
    noNames: function (){
        return !(this.name || this.lastName);
    }
});

Template.aggressorItemTable.events({
    'click .rowItem': function ()
    {
        Router.go('aggressorItem', {_id: this._id});
    }
});