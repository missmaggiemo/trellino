window.TrellinoApp = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    console.log('Hello from Trellino!');
    
    new TrellinoApp.Routers.AppRouter();
    
    Backbone.history.start();
  }
};


Backbone.CompositeView = Backbone.View.extend({
  addSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    selectorSubviews.push(subview);

    var $selectorEl = this.$(selector);
    $selectorEl.append(subview.$el);
  },

  remove: function () {
    Backbone.View.prototype.remove.call(this);

    // remove all subviews as well
    _(this.subviews()).each(function (selectorSubviews, selector) {
      _(selectorSubviews).each(function (subview){
        subview.remove();
      });
    });
  },

  removeSubview: function (selector, subview) {
    var selectorSubviews =
      this.subviews()[selector] || (this.subviews()[selector] = []);

    var subviewIndex = selectorSubviews.indexOf(subview);
    selectorSubviews.splice(subviewIndex, 1);
    subview.remove();
  },

  renderSubviews: function () {
    var view = this;
    
    _(this.subviews()).each(function (selectorSubviews, selector) {
      var $selectorEl = view.$(selector);
      $selectorEl.empty();

      _(selectorSubviews).each(function (subview) {
        $selectorEl.append(subview.render().$el);
        subview.delegateEvents();
      });
    });
  },

  subviews: function () {
    if (!this._subviews) {
      this._subviews = {};
    }

    return this._subviews;
  }
});

Backbone.TileView = Backbone.CompositeView.extend({
  tileSubviewClass: null,

  newTilePlaceholderTemplate: null,

  initialize: function () {

    this.listenTo(this.collection, "add", this.addTileSubview);
    this.listenTo(this.collection, "remove", this.removeTileSubview);
    this.collection.each(this.addTileSubview.bind(this));
  },

  addTileSubview: function (model) {
    var tileSubview = new this.tileSubviewClass({
      model: model
    });

    this.addSubview("#tile-container", tileSubview);
    tileSubview.render();
    this.render();
  },
  
  removeTileSubview: function (model) {
    var tileSubview =
      _(this.subviews()["#tile-container"]).find(function (subview) {
        return subview.model === model;
      });

    this.removeSubview("#tile-container", tileSubview);
    this.render();
  }

});

