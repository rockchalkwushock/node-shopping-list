/*------------------------------ */
/*--------- Server Code ---------*/
/*------------------------------ */

var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var port = 3000;

var app = express();
app.use(express.static('public'));

// GET Request
app.get('/items', function(request, response) {
    response.json(storage.items);
});

// POST Request
app.post('/items', jsonParser, function(request, response) {
    if (!request.body) {
      return response.sendStatus(400);
    } else {
      var item = storage.add(request.body.name);
      response.status(201).json(item);
    }
});

// DELETE Request
app.delete('/items/:id', jsonParser, function(request, response) {
  // Finish after meeting....
});

app.listen(port, function(err, response) {
    if(err) {
	console.log('server error');
} else {
	console.log('server running on port: ' + port + '.');
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
  var item = {name: name, id: this.id}; // Set item equal to the current name and id.
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
