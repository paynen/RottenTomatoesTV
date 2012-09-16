(function() {
  function SearchModel(url) {
    this._url = url;
    smokesignals.convert(this);
  }

  /**
   * @see http://developer.rottentomatoes.com/docs/read/json/v10/Movies_Search
   */
  SearchModel.prototype.data = null;

  /**
   * @type {String}
   */
  SearchModel.prototype._url = null;

  /**
   * Get the search url for the given search term
   * 
   * @return {String}
   */
  SearchModel.prototype.getUrl = function(searchTerm) {
    return this._url.replace("$search_term", searchTerm);
  };

  /**
   * Set the search results
   * 
   * @param {Object} results
   */
  SearchModel.prototype.setData = function(results) {
    this.data = results ? results.movies : null;
    this.emit(RT.GlobalEvents.DATA_CHANGED);
  };

  RT.SearchModel = SearchModel;
}());