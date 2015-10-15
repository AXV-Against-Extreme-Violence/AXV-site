Template.home.helpers({
    aggressors: function()
    {
        return Aggressors.find({});
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
        return Counts.get('userCount');
    },
    isPlural: function (number)
    {
        return number!=0 && number>1;
    }
});