window.TrellinoApp.Views.CardsNew = Backbone.View.extend({

  template: JST["cards/new"],
  
  className: "cards card-tile",
  
  id: "new-card-form",
  
  events: {
    "submit form": "submit"
  },
  
  initialize: function (options) {
    this.list = options.list;
  },
  
  render: function () {
    var renderedContent = this.template({ list: this.list });
    this.$el.html(renderedContent);

    return this;
  },
    
  submit: function(event) {
    var view = this;
    event.preventDefault();

    var params = $(event.currentTarget).serializeJSON()["card"];
    var newCard = new TrellinoApp.Models.Card(params);

    newCard.save({}, {
      success: function () {
        view.list.cards().add(newCard);
        view.$el.remove();
      }
    });
  }

});

