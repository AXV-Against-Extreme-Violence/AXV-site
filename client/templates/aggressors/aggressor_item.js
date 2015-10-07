Template.aggressorItem.helpers({
    aliasesString: function () {
        return this.aliases.join(', ');
    },
    realName: function (){
        return this.firstName || this.lastName;
    },
    reportsWithAggressor: function (){
        return Reports.find({aggressors:this._id});
    }
});