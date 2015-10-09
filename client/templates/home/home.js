Template.home.helpers({
    reports: function()
    {
        return Reports.find({});
    },
    countReports: function ()
    {
        return Reports.find({}).count();
    },
    countAggressors: function ()
    {
        return Aggressors.find({}).count();
    },
    countVictims: function ()
    {
        return Meteor.users.find({}).count();
    },
    isPlural: function (number)
    {
        return number!=0 && number>1;
    }
});