window.TrellinoApp.Views.BoardsNew = Backbone.View.extend({

  template: JST["boards/new"],
  
  className: "col-md-3",
  
  id: "new-board-form",
  
  events: {
    "submit form": "submit"
  },
  
  render: function () {
    var renderedContent = this.template();
    this.$el.html(renderedContent);

    return this;
  },
  
  submit: function(event) {
    event.preventDefault();
    var that = this;
    var params = $(event.currentTarget).serializeJSON()["board"];
    var newBoard = new TrellinoApp.Models.Board(params);
    newBoard.save({}, {
      success: function () {
        TrellinoApp.Collections.boards.add(newBoard);
        Backbone.history.navigate("", { trigger: true });
        that.$el.remove();
      }
    });
  }
  

});