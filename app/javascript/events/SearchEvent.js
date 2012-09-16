(function() {
  function SearchEvent(searchTerm) {
    this.searchTerm = searchTerm;
  }

  SearchEvent.prototype.searchTerm = "";

  SearchEvent.toString = function() {
    return "SearchEvent";
  };

  RT.events.SearchEvent = SearchEvent;
}());