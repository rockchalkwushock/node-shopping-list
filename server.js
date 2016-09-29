/*------------------------------ */
/*--------- Server Code ---------*/
/*------------------------------ */

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var app = express();
// Code from HEROKU Documentation.
// This code will allow the app to run on HEROKU or on a port of my specification.
app.set('port', (process.env.PORT || 3000));
// Loosk for static files contained in the public directory.
app.use(express.static('public'));

/* ######################### */
/* ########## GET ########## */
/* ######################### */

// Listens for '/items'.
// Will return a JSON Object.
app.get('/items', function(request, response) {
    response.json(storage.items);
});

/* ######################### */
/* ########## POST ######### */
/* ######################### */

// Adds an 'item' to items[].
app.post('/items', jsonParser, function(request, response) {
    if (!request.body || !('name' in request.body)) {
        return response.sendStatus(400);
    } else {
        var item = storage.add(request.body.name);
        response.status(201).json(item);
    }
});

/* ############################ */
/* ########## DELETE ########## */
/* ############################ */

// Deletes an item by id using address 'items/id'
app.delete('/items/:id', jsonParser, function(request, response) {
    var id = request.params.id;
    var deletedItem = storage.delete(id);
    if (deletedItem) {
        response.status(200).json(deletedItem);
    } else {
        return response.sendStatus(400);
    }
});

/* ######################### */
/* ########## PUT ########## */
/* ######################### */

// Updates the data of the object or adds to items[] if not present
// using address 'items/id/name'.
app.put('/items/:id', jsonParser, function(request, response) {
    var id = parseInt(request.params.id);
    console.log(id);
    var name = request.body.name;
    console.log(request.body.name);
    console.log(storage);
    var updatedItem = storage.put(name, id);
    console.log(storage);
    if (updatedItem) {
        response.status(200).json(updatedItem);
    } else {
        return response.sendStatus(400);
    }
});

// LISTENER
app.listen(app.get('port'), function(err, response) {
    if (err) {
        console.log('server error');
    } else {
        console.log('Node app is running on port', app.get('port'));
    }
});

/*------------------------------ */
/*-----------App Code----------- */
/*------------------------------ */

// Constructor Function
var Storage = function() {
    // ShoppingList items will go here.
    this.items = [];
    // Will assign ID to each item for GET, PUT, EDIT, DELETE.
    this.id = 0;
};

// Add( ) will add items to this.items[].
//  Each item will have a name & ID.
//  Will increment this.id by +1 every iteration.
Storage.prototype.add = function(name) {
    var item = {
        name: name,
        id: this.id
    }; // Set item equal to the current name and id.
    this.items.push(item); // Push the item to the items[].
    this.id += 1; // Change id value.
    return item;
};

// Delete( ) will remove items from this.items[] via their ID value using `.splice( )`
Storage.prototype.delete = function(id) {
    if (!this.items[id]) {
        alert('Item not in array');
    } else {
        return this.items.splice(id, 1); // remove the specific ID from the array.
    }
};

// Edit( ) will modify an item present in the array.
//  If item does not exist in the array, it will add the item calling `add( )`.
Storage.prototype.edit = function(id, name) {
    if (this.items[id]) {
        this.items[id].name = name; // Change name of item pertaining to specific ID.
    } else {
        storage.add(name); // Item not found in array, create  using `add()`.
    }
};

var storage = new Storage(); // create a new instance of `Storage( )`.

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

/*------------------------------ */
/*----------- Exports -----------*/
/*------------------------------ */

exports.app = app;
exports.storage = storage;
