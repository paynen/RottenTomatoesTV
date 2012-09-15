(function() {

  "use strict";

  /**
   * A view to manage entering a search term
   */
  function SearchView() {
    this._initialiseDom();
  }

  /**
   * The id of the input
   * 
   * @type {String}
   */
  SearchView.prototype._INPUT_ID = "searchInput";

  /**
   * The input element
   * 
   * @type {jQuery}
   */
  SearchView.prototype._jInput = null;

  /**
   * Initialise the dom for this view
   */
  SearchView.prototype._initialiseDom = function() {
    this._jInput = $("#" + this._INPUT_ID);
    new IMEShell(this._INPUT_ID, this._imeShellReady.bind(this), "en");
  };

  /**
   * Handle the input being ready
   * 
   * @param {IME} The input method editor
   */
  SearchView.prototype._imeShellReady = function(ime) {
    var inputOffset = this._jInput.offset();
    ime.setKeySetFunc("qwerty");
    ime.setQWERTYPos(inputOffset.top + this._jInput.height(), inputOffset.left);
    ime.setEnterFunc(this._performSearch.bind(this));

    this._initialiseEvents();
  };

  /**
   * Initialise the events for this view
   */
  SearchView.prototype._initialiseEvents = function() {
    $("#keyHandler").bind("keydown", this._handleKeyDown.bind(this));
  };

  /**
   * Handle a key being pressed
   */
  SearchView.prototype._handleKeyDown = function(event) {
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

  /**
   * Perform a search
   * 
   * @param {String} searchTerm The term to search for
   */
  SearchView.prototype._performSearch = function(searchTerm) {
    alert("Searching for: " + searchTerm);
    $("#keyHandler").focus();
  };

  RT.SearchView = SearchView;

}());