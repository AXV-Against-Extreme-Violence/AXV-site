Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() {
        return Meteor.subscribe('reports') &&
            Meteor.subscribe('aggressors') &&
            Meteor.subscribe('generalUsers'); }
});

Router.route('/', {name: 'home'});
Router.route('/reports/', {name: 'reportsList'});
Router.route('/aggressors/', {name: 'aggressorsList'});
Router.route('/reports/add/', {name: 'addReport'});
Router.route('/aggressor/', {
    name: 'editAggressor'
});
Router.route('/report/:_id/', {
    name:'reportItem',
    data: function () {
        var _id  = this.params._id;
        return Reports.findOne(_id);
    }
});

Router.route('/aggressor/:_id/', {
    name:'aggressorItem',
    data: function () {
        var _id  = this.params._id;
        return Aggressor.findOne(_id);
    }
});

Router.route('/photo/:url', {
   name: 'photo',
    data: function(){
        return this.params.url;
    }
});