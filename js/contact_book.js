var ContactBook = Backbone.Collection.extend({
  model: Contact,

  localStorage: new Backbone.LocalStorage('contact-book'),

  comparator: function(model) {
    return model.get('firstName');
  },

  filtered: function(expr) {
    return this.filter(function(contact) {
      if (contact.matches(expr)) return true;
    });
  },
});
