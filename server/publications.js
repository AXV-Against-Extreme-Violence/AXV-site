Meteor.publish('reports', function(){
    return Reports.find({});
});

Meteor.publish('aggressors', function(){
    return Aggressors.find({});
});