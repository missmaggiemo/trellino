window.TrellinoApp.Views.BoardsTile = Backbone.View.extend({
  
  template: JST["boards/board_tile"],
  
  className: "boards col-md-3",
  
  events: {
    'click .delete-x a': 'deleteBoard',
    'dblclick #board-tile': "editTile"
  },

  initialize: function (options) {
    this.$el.attr('id', "board-" + this.model.id);
    this.listenTo(this.model, "change", this.render);
  },
  
  editTile: function () {
    
    var view = this;
    
    var newView = JST['boards/edit']({board: view.model});
    
    view.$el.find('#board-tile').replaceWith(newView);
    
    $('form').on('submit', function(event){
      event.preventDefault();
      var params = $(event.currentTarget).serializeJSON()["board"];
      view.model.save(params);
    });
    
    return this;
  },
  
  deleteBoard: function () {
    this.model.destroy();
  },
  
  render: function () {
    var renderedContent = this.template({ board: this.model });
    
    this.$el.html(renderedContent);

    return this;
  }

  
});

window.TrellinoApp.Views.BoardsIndex = Backbone.TileView.extend({
  
  tileSubviewClass: TrellinoApp.Views.BoardsTile,
  
  newTilePlaceholderTemplate: JST['boards/new_board_placeholder'],
  
  template: JST["boards/index"],
  
  events: _.extend({
    "click .col-md-3#new-board-tile": "boardsNew"
  }, Backbone.TileView.prototype.events),
  
  boardsNew: function (event) {
    event.preventDefault();
    var newView = new TrellinoApp.Views.BoardsNew();
    this.$el.find('#new-board-tile').replaceWith(newView.render().$el);
    return this;
  },
  
  sortableBoards: function () {
    this.$el.find('#tile-container').sortable({
      tolerance: 'pointer',
      revert: 'invalid',
      placeholder: 'col-md-3 sort-placeholder',
      forceHelperSize: true,
      update: function(event, ui) {
        var data = $(this).sortable('serialize');
        $.ajax({
          data: data,
          type: 'POST',
          url: '/boards/update_order',
          success: function () {
            console.log('Boards sorted.');
          }
        });
      }
    });
  },
  
  render: function () {
    var renderedContent = this.template({ boards: this.collection });
    this.$el.html(renderedContent);
    
    this.renderSubviews();
    this.$el.find('#tile-container').prepend(this.newTilePlaceholderTemplate());
    
    this.sortableBoards();
   
    return this;
  }
  
});