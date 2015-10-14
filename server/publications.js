Meteor.publish('reports', function(){
    return Reports.find({});
});

Meteor.publish('aggressors', function(){
    return Aggressors.find({});
});

Meteor.publish('generalUsers', function() {
    Counts.publish(this, 'userCount', Meteor.users.find());
});