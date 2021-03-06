Template.reportItem.helpers({
    isCurrentUserReport: function ()
    {
        return Meteor.userId() && Meteor.userId() == this.userID;
    }
});

Template.reportItem.events({
   'click #edit': function ()
   {
       Session.set('report', this);
   }
});

Template.reportDetails.helpers({
    formattedDate: function (){
        return moment(this.eventDate).format("DD/MM/YYYY HH:MM");
    },
    shareData: function (){
        var title = this.kind;
        var excerpt= this.location+', '+this.explanation+'.';
        return {title: title, excerpt:excerpt};
    },
    shareString: function (){
        return this.kind+', '+this.location;
    }
});

Template.aggressors.helpers({
    aggressorForId: function(id)
    {
        return Aggressor.findOne(id);
    }
});

Template.aggressor.helpers({
   aliasesString: function () {
       return this.aliases.join(', ');
   },
    realName: function (){
        return this.firstName || this.lastName;
    }
});