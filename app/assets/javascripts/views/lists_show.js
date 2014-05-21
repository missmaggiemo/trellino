window.TrellinoApp.Views.ListsShow = Backbone.CompositeView.extend({
  attributes: function () {
    return {
      "data-id": this.model.get('id')
    };
  },
  
  template: JST["lists/list_tile"],

  className: "lists col-md-3",
    
  initialize: function (options) {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model.cards(), "add", this.addCard);
    this.listenTo(this.model.cards(), "remove", this.removeCard);

    this.model.cards().each(this.addCard.bind(this));
    this.$el.attr('id', 'list-' + this.model.id);
  },
  
  events: {
    "click .delete-x a": "delete",
    "click #new-card-tile": "cardsNew",
    "dblclick #list-tile": "editTile"  
  },
  
  editTile: function () {
    
    var view = this;
    
    var newView = JST['lists/edit']({list: view.model});
    
    view.$el.find('#list-tile').replaceWith(newView);
    
    $('form').on('submit', function(event){
      event.preventDefault();
      var params = $(event.currentTarget).serializeJSON()["list"];
      view.model.save(params);
    });
    
    return this;
  },
  
  cardsNew: function (event) {
    event.preventDefault();
    var newView = new TrellinoApp.Views.CardsNew({ list: this.model });
    
    this.$el.find('#new-card-tile').replaceWith(newView.render().$el);
    return this;
  },
  
  addCard: function (card) {
    var cardsShowView = new TrellinoApp.Views.CardsShow({
      model: card
    });
    
    this.addSubview("#card-container", cardsShowView);
    cardsShowView.render();
    this.$el.find("#card-container").append(JST['cards/new_card_placeholder']({ list: this.model }));
  },
  
  removeCard: function (card) {
    var cardsShowView =
      _(this.subviews()["#card-container"]).find(function (subview) {
        return subview.model == card;
      });
  
    this.removeSubview("#card-container", cardsShowView);
  },
  
  sortableCards: function () {
    var view = this;

    this.$el.find('#card-container').sortable({
      tolerance: 'pointer',
      revert: 'invalid',
      placeholder: 'card-tile sort-placeholder',
      forceHelperSize: true,
      update: function(event, ui) {
        var data = $(this).sortable('serialize') + '&list_id=' + view.model.id;
        $.ajax({
          data: data,
          type: 'POST',
          url: '/cards/update_order',
          success: function () {
            console.log('Cards sorted.');
          }
        });
      }
    });
  },
  
  render: function () {
    var renderedContent = this.template({
      list: this.model
    });
    this.$el.html(renderedContent);
    this.renderSubviews();
    this.$el.find("#card-container").append(JST['cards/new_card_placeholder']({ list: this.model }));

    this.sortableCards();
    

    return this;
  },

  delete: function () {
    this.model.destroy();
  }
    
});
