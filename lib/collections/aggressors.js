<!-- TODO Aggressor face recognition -->
Aggressors  = new Mongo.Collection('aggressors');
Aggressors.initEasySearch(['aliases', 'firstName', 'lastName']);
Aggressor   = Astro.Class({
    name        : 'Aggressor',
    collection  : Aggressors,
    fields      : {
        name    : {
            type    : 'string',
            optional: true
        },
        lastName: {
            type    : 'string',
            optional: true
        },
        aliases : {
            type    : 'array',
            optional: true,
            nested  : 'string'
        },
        photos: {
            type: 'array',
            optional: true,
            nested: 'string'
        }
    }
});


Aggressors.allow({
    insert: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    },
    update: function(userId, doc) {
        // only allow posting if you are logged in
        return !! userId;
    }
});