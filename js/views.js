var ContactListView = Backbone.View.extend({
  el: $("#contact-list"),

  initialize: function(collection) {
    this.collection = collection;

    this.listenTo(this.collection, 'add',              this.addOne);
    this.listenTo(this.collection, 'change:firstName', this.refresh);
    this.listenTo(this.collection, 'reset',            this.addAll);

    this.collection.fetch({reset: true});
  },

  refresh: function() {
    this.collection.sort();
    this.$el.html("");
    this.addAll();
  },

  addOne: function(contact) {
    var item = new ItemView({model: contact});
    this.listenTo(item, 'select', this.selectContact);

    this.$el.append(item.render().el);
  },

  addAll: function() {
    this.collection.each(function(contact) {
      if (contact.matches(this.filterExpr)) {
        this.addOne(contact);
      }
    }, this);
  },

  selectContact: function(contact) {
    this.trigger('select', contact);
  },

  filter: function(text) {
    if (text.length != 0) {
      this.filterExpr = new RegExp(text, "i");
    } else {
      this.filterExpr = null;
    }
    this.refresh();
  },

  filterExpr: null,
});

var ItemView = Backbone.View.extend({
  events: {
    "click": "select"
  },

  tagName: "li",

  initialize: function() {
    this.listenTo(this.model, 'change',  this.render);
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function() {
    this.$el.html(this.model.fullName());

    return this;
  },

  select: function() {
    this.trigger("select", this.model);
  },
});


var ContactView = Backbone.View.extend({
  tagName: 'div',

  className: 'contact',

  template: Handlebars.compile($('#contact-template').html()),

  events: {
    "click .remove-contact": "destroy",
    "keyup input": "update",
  },

  initialize: function() {
    this.listenTo(this.model, 'destroy', this.remove);
  },

  render: function(arg, args) {
    this.$el.html(this.template(this.model.toJSON()));

    return this;
  },

  update: function(ev) {
    var elem      = $(ev.target),
        attribute = elem.attr('class').replace('contact-', ''),
        update    = {};

    update[attribute] = elem.val();

    this.model.save(update);
  },

  destroy: function() {
    this.model.destroy();
  }
});


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
