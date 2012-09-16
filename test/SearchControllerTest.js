TestCase("Search Controller", {
  "test ajax request is made on search event" : function() {
    RT.GlobalEvents.emit(RT.events.SearchEvent, new RT.events.SearchEvent("foo"));
    assertEquals("One request should be made", 1, requests.length);
  },

  setUp : function() {
    requests = [];
    controller = new RT.SearchController(new RT.SearchModel("url?q=$search_term"));
    fakeXhr = sinon.useFakeXMLHttpRequest();
    fakeXhr.onCreate = (function(requests, xhr) {
      requests.push(xhr);
    }).bind(this, requests);
  },

  tearDown : function() {
    fakeXhr.restore();
    RT.GlobalEvents.off(RT.events.SearchEvent);
  }
});

var controller;
var requests;
var fakeXhr;