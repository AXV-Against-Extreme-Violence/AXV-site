<!-- TODO Aggressor face recognition -->
cubanCities = ["Havana",
    "Santiago de Cuba",
    "Camagüey",
    "Holguín",
    "Guantánamo",
    "Santa Clara",
    "Las Tunas",
    "Bayamo",
    "Cienfuegos",
    "Pinar del Río",
    "Matanzas",
    "Ciego de Ávila",
    "Sancti Spíritus",
    "Manzanillo",
    "Cárdenas",
    "Palma Soriano",
    "Moa",
    "Florida",
    "Morón",
    "Nueva Gerona",
    "Contramaestre",
    "Colón",
    "Artemisa",
    "Güines",
    "Sagua la Grande",
    "Trinidad",
    "Placetas",
    "Baracoa",
    "Nuevitas",
    "Banes",
    "San Luis",
    "San José de las Lajas",
    "Caibarién",
    "San Antonio de los Baños",
    "Puerto Padre",
    "Jagüey Grande",
    "Cabaiguán",
    "Mayarí",
    "Vertientes",
    "Varadero",
    "Consolación del Sur",
    "Amancio",
    "San Cristóbal",
    "Güira de Melena",
    "San Germán",
    "Cumanayagua",
    "Sagua de Tánamo",
    "Guanajay",
    "Jatibonico",
    "Manicaragua",
    "Camajuaní",
    "Colombia",
    "Sandino",
    "Jovellanos",
    "Niquero",
    "La Maya",
    "Bauta",
    "Jiguaní",
    "Guisa",
    "Nicaro-Levisa"];

cubanCityValidator = Validators.choice(cubanCities, "you have to choose a city");
Aggressors  = new Mongo.Collection('aggressors');
Aggressors.initEasySearch(['name', 'lastName', 'locations']);
Aggressor   = Astro.Class({
    name        : 'Aggressor',
    collection  : Aggressors,
    fields      : {
        locations: {
            type: 'array',
            optional: true,
            nested: 'string'
        },
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
            nested: 'string',
            default: function (){
                return [];
            }
        }
    },
    validators: {
        location    : Validators.every(cubanCityValidator)
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