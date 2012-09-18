(function() {

  "use strict";
  
  var MIN_HUE = 8;
  var MAX_HUE = 100;

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
    var jResult;
    var score;
    var scoreColor;
    var jItems = $("<ul></ul>");

    for ( var i = 0, l = this._model.data.length; i < l; i++) {
      result = this._model.data[i];
      score = this._getScore(result.ratings);
      scoreColor = this._getScoreColor(score);
      jResult = $('<li><a></a><span class="rating"></span></li>').find("a").text(result.title).end()
                                                                 .find(".rating").text(score).css("color", scoreColor).end();
      jItems.append(jResult);
    }
    $(".searchResults").empty().append(jItems);
  };

  /**
   * Handle a key being pressed
   */
  SearchResultsView.prototype._handleKeyDown = function(event) {
    var key = event.keyCode;
    var tvKey = new Common.API.TVKeyValue();

    switch (key) {
      case tvKey.KEY_RED:
        this._jInput.focus();
    }
  };

  /**
   * Get a normalised score for the rating, prefering the critics score if available
   * @param {Object} ratings The ratings
   * @returns {Number} The score for this movie
   */
  SearchResultsView.prototype._getScore = function(ratings) {
    var criticRating = ratings.critics_score;
    return criticRating > 0 ? criticRating : ratings.audience_score;
  };
  
  /**
   * Get the hsl color for a given score value with higher scores being green and lower score being red
   * @param {Number} score The score
   * @returns {String} The color string e.g. hsl(140, 77%, 38%)
   */
  SearchResultsView.prototype._getScoreColor = function(score) {
    var hue = score / 100 * MAX_HUE + MIN_HUE;
    return "hsl(" + hue + ", 77%, 38%)";
  };

  RT.SearchResultsView = SearchResultsView;

}());
