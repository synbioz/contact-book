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

