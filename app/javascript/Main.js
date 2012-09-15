(function() {

  "use strict";

  var widgetApi = new Common.API.Widget();
  new RT.SearchView();

  // var searchUrl =
  // "http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=[your_api_key]&q{searchTerm}",
  // model = new RT.SearchModel();
  // new RT.SearchController(model, new RT.SearchView());
  // new RT.MovieController(model, new RT.MovieView());
  $("#keyHandler").focus();
  widgetApi.sendReadyEvent();

}());