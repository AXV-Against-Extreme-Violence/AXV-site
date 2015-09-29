Meteor.publish('reports', function(){
    return Reports.find();
});