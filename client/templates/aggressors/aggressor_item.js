Template.aggressorItem.helpers({
    firstPhoto: function (){
        return this.photos[0];
    },
    aliasesString: function () {
        return this.aliases.join(', ');
    },
    locationsString: function ()
    {
        return this.locations.join(', ');
    },
    realName: function (){
        return this.name || this.lastName;
    },
    reportsWithAggressor: function (){
        return Reports.find({aggressors:this._id});
    },
    shareString: function (){
        return this.name+' '+this.lastName;
    }
});


Template.aggressorItem.events({
    'click #edit': function (e){
        e.preventDefault();
        Session.set('aggressorEdit', Aggressors.findOne(this._id));
        Router.go('editAggressor');
    }
});