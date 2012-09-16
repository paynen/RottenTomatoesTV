TestCase("Search Model", {
  "test getting the url" : function() {
    var model = new RT.SearchModel("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=foo&q=$search_term");
    assertEquals("http://api.rottentomatoes.com/api/public/v1.0/movies.json?apikey=foo&q=bar", model.getUrl("bar"));
  },

  "test data changed event emitted on set data" : function() {
    var model = new RT.SearchModel("movies.json?apikey=foo&q=$search_term");
    var stub = sinon.stub();
    model.on(RT.GlobalEvents.DATA_CHANGED, stub);
    assertFalse(stub.called);
    model.setData({});
    assertTrue(stub.calledOnce);
  }
});