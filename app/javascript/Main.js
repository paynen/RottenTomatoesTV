(function() {

  "use strict";

  var widgetApi = new Common.API.Widget();

  var searchUrl = "http://api.rottentomatoes.com/api/public/v1.0/movies.json?page_limit=5&apikey=$api_key&q=$search_term";
  var model = new RT.SearchModel(searchUrl.replace("$api_key", RT.API_KEY));
  new RT.SearchView();
  new RT.SearchResultsView(model);
  new RT.SearchController(model);
  // new RT.MovieController(model, new RT.MovieView());
  $("#keyHandler").focus();
  widgetApi.sendReadyEvent();

}());