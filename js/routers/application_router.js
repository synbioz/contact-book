var app = app || {};

app.ApplicationRouter = Backbone.Router.extend({
  routes: {
    "contacts/:id":             "showContact",
    "contacts/search/:pattern": "filterContact",
  },

  showContact: function(id) {
    var contact = app.Contacts.get(id);

    app.MainView.showContact(contact);
  },

  filterContact: function(pattern) {
    app.MainView.contactList.filter(pattern);
  }
});
