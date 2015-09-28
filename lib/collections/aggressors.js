Aggressors  = new Mongo.Collection('aggressors');
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
        }
    }
});
