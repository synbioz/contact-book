var AppView = Backbone.View.extend({
  el: $("#contact-book"),

  events: {
    "click #new-contact": "newContact",
    "keyup #filter-contacts": "filterContacts",
  },

  initialize: function(collection) {
    this.collection  = collection;
    this.contactList = new ContactListView(collection);

    this.listenTo(this.contactList, 'select', this.selectContact);
  },

  newContact: function() {
    this.collection.create({firstName: 'Unnamed'})
    this.selectContact(this.collection.last());
  },

  selectContact: function(contact) {
    this.currentContact = contact;
    this.showContact(contact);
  },

  showContact: function(contact) {
    var view = new ContactView({model: contact});
    this.$("#contact-details").html(view.render().el);

    var input = view.$(".contact-firstName").get(0);
    input.focus();
    input.select();
  },

  filterContacts: function(ev) {
    var elem = $(ev.currentTarget);

    this.contactList.filter(elem.val());
  }
});
