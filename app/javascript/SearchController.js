(function() {
  function SearchController(model) {
    this._model = model;
    this._initialiseEvents();
  }

  SearchController.prototype._model = null;

  SearchController.prototype._initialiseEvents = function() {
    RT.GlobalEvents.on(RT.events.SearchEvent, this._handleSearch.bind(this));
  };

  SearchController.prototype._handleSearch = function(event) {
    $.ajax({
      url : this._model.getUrl(event.searchTerm),
      success : this._handleSearchResults,
      context : this,
      dataType : "json"
    });
  };

  SearchController.prototype._handleSearchResults = function(results) {
    this._model.setData(results);
  };

  RT.SearchController = SearchController;
}());