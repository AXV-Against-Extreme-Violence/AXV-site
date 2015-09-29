Router.configure({
    layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound',
    waitOn: function() { return Meteor.subscribe('reports'); }
});

Router.route('/', {name: 'home'});
Router.route('/reports/', {name: 'reportsList'});