(function() {

  "use strict";

  /**
   * A view to manage entering a search term
   */
  function SearchResultsView(model) {
    this._model = model;
    this._initialiseEvents();
  }

  /**
   * @type {RT.SearchModel}
   */
  SearchResultsView.prototype._model = null;

  /**
   * Initialise the events for this view
   */
  SearchResultsView.prototype._initialiseEvents = function() {
    this._model.on(RT.GlobalEvents.DATA_CHANGED, this._render.bind(this));
  };

  /**
   * Update the view
   */
  SearchResultsView.prototype._render = function() {
    var result;
    var jItems = $("<ul></ul>");

    for ( var i = 0, l = this._model.data.length; i < l; i++) {
      result = this._model.data[i];
      jItems.append($("<li></li>").text(result.title));
    }
    $(".results").append(jItems);
  };

  /**
   * Handle a key being pressed
   */
  SearchResultsView.prototype._handleKeyDown = function(event) {
    var key = event.keyCode;
    var tvKey = new Common.API.TVKeyValue();

    switch (key) {
      case tvKey.KEY_UP:
      case tvKey.KEY_DOWN:
      case tvKey.KEY_LEFT:
      case tvKey.KEY_RIGHT:
      case tvKey.KEY_RED:
      case tvKey.KEY_ENTER:
        this._jInput.focus();
    }
  };

  RT.SearchResultsView = SearchResultsView;

}());
