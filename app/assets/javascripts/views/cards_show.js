window.TrellinoApp.Views.CardsShow = Backbone.View.extend({
  attributes: function () {
    return {
      "data-id": this.model.get('id')
    };
  },
  
  template: JST["cards/card_tile"],

  className: 'cards card-tile',
  
  events: {
    "click .delete-x-link": "delete"
  },
  
  initialize: function (options) {
    this.$el.attr('id', 'card-' + this.model.id);
  },
  
  render: function () {
    var renderedContent = this.template({
      card: this.model
    });
  
    this.$el.html(renderedContent);
    
    return this;
  },
  
  delete: function () {
    this.model.destroy();
  }
  
  
});