Template.aggressorItem.helpers({
    aliasesString: function () {
        return this.aliases.join(', ');
    },
    realName: function (){
        return this.name || this.lastName;
    },
    reportsWithAggressor: function (){
        return Reports.find({aggressors:this._id});
    }
});

Template.aggressorItem.events({
    'click #edit': function (e){
        e.preventDefault();
        Session.set('aggressorEdit', Aggressors.findOne(this._id));
        Router.go('editAggressor');
    }
});