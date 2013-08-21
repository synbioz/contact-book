var ContactBook = Backbone.Collection.extend({
  model: Contact,

  localStorage: new Backbone.LocalStorage('contact-book'),

  comparator: function(model) {
    return model.get('firstName');
  }
});
