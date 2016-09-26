/*------------------------------ */
/*--------- Server Code ---------*/
/*------------------------------ */

var express = require('express');
var port = 3000;

var app = express();
app.use(express.static('public'));

app.get('/items', function(request, response) {
    response.json(storage.items);
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


var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  }
  edit: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  }
  remove: function(name) {
    var item = {name: name, id: this.setId};
    this.items.splice(item);
    this.setId += 1;
    return item;
  }
};
// Factory Function
var createStorage = function() {
  // Object where data will be stored for adding, editing, deleting.
  var storage = Object.create(Storage);
  // Always want to start with empty array.
  storage.items = [];
  storage.setId = 1;
  return storage;
};

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');
