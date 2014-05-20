window.TrellinoApp.Models.List = Backbone.Model.extend({
  urlRoot: "/lists",
  
  toJSON: function () {
    var json = Backbone.Model.prototype.toJSON.call(this);

    delete json.id;
    delete json.created_at;
    delete json.updated_at;

    return json;
  },
  
  
  cards: function () {
    // lets you not fetch the collection every time
    if (!this._cards) {
      // underscore means private variable
      this._cards = new TrellinoApp.Collections.ListCards([], {
        list: this
      });
    }

    return this._cards;
  },
  
  parse: function (jsonResp) {
    if (jsonResp.cards) {
      this.cards().set(jsonResp.cards);
      // sets cards from response as part of json response, not an attribute
      delete jsonResp.cards;
    }

    return jsonResp;
  }
  
});