var app = app || {};

app.ItemView = Backbone.View.extend({
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

