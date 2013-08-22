var Contact = Backbone.Model.extend({
  defaults: {
    firstName: "",
    lastName:  "",
    email:     "",
    phone:     ""
  },

  initialize: function() {
  },

  validate: function(attributes) {
    if (attributes.firstName.length == 0) {
      return "first name must be provided.";
    }
  },

  fullName: function() {
    return [this.get('firstName'), this.get('lastName')].join(' ');
  },

  matches: function(expr) {
    if (expr === null) return true;

    var hasMatch = _.some(this.asMatchable(), function(field) {
      return field.match(expr) !== null;
    });

    if (hasMatch) return true;

    return false;
  },

  asMatchable: function() {
    var matchable = [
      this.get('firstName'),
      this.get('lastName'),
      this.get('email'),
      this.get('phone'),
    ];

    return matchable;
  }
});
