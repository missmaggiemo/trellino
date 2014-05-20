window.TrellinoApp.Collections.ListCards = Backbone.Collection.extend({
  
  model: TrellinoApp.Models.Card,
  
  url: function () {
    return this.list.url() + "/cards";
  },
    
  initialize: function (models, options) {
    this.list = options.list;
  }
  
});