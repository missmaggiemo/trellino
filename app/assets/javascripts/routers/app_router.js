window.TrellinoApp.Routers.AppRouter = Backbone.Router.extend({

  routes: {
    "": "boardsIndex",
    "boards/:id": "boardsShow"
  },
  
  boardsIndex: function () {
    
    var boards = TrellinoApp.Collections.boards;
    var indexView = new TrellinoApp.Views.BoardsIndex({
      collection: boards
    });
    
    TrellinoApp.Collections.boards.fetch();
    this._swapView(indexView);
  },
  
  boardsShow: function (id) {
    var board = TrellinoApp.Collections.boards.getOrFetch(id);

    var showView = new TrellinoApp.Views.BoardsShow({
      model: board
    });
    
    this._swapView(showView);
  },
    
  _swapView: function (view) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.currentView = view;

    $("#body").html(view.render().$el);
  }
  
});
