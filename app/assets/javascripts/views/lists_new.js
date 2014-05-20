window.TrellinoApp.Views.ListsNew = Backbone.View.extend({

  template: JST["lists/new"],
  
  className: "col-md-3",
  
  id: "new-list-form",
  
  events: {
    "submit form": "submit"
  },
  
  initialize: function (options) {
    this.board = options.board;
  },
  
  render: function () {
    var renderedContent = this.template({ board: this.board });
    this.$el.html(renderedContent);

    return this;
  },
    
  submit: function(event) {
    var view = this;
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["list"];
    var newList = new TrellinoApp.Models.List(params);

    newList.save({}, {
      success: function () {
        view.board.lists().add(newList);
        view.$el.remove();
      }
    });
  }

});

