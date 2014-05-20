window.TrellinoApp.Collections.Boards = Backbone.Collection.extend({
  url: "/boards",

  model: TrellinoApp.Models.Board,

  getOrFetch: function(id) {
    var model;
    
    var boards = this;
    
    if (model = this.get(id)) {
      model.fetch();
      return model;
    } else {
      model = new TrellinoApp.Models.Board({ id: id });
      model.fetch({
        success: function () { boards.add(model) }
      });
      return model;
    }
  } 
  
});

window.TrellinoApp.Collections.boards = new window.TrellinoApp.Collections.Boards();

