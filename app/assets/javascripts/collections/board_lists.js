window.TrellinoApp.Collections.BoardLists = Backbone.Collection.extend({

  model: TrellinoApp.Models.List,
  
  url: function () {
    return this.board.url() + "/lists";
  },
    
  initialize: function (models, options) {
    this.board = options.board;
  }
});
