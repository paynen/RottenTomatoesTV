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
   * The Input Method Editor for this view
   * 
   * @see http://www.samsungdforum.com/Guide/View/Developer_Documentation/Samsung_SmartTV_Developer_Documentation_3.5/JavaScript/Input_Control/Using_IME_(Input_Method_Editor)
   * @type {IMEShell}
   */
  SearchView.prototype._ime = null;

  /**
   * Initialise the dom for this view
   */
  SearchView.prototype._initialiseDom = function() {
    this._jInput = $("#" + this._INPUT_ID);
    this._ime = new IMEShell(this._INPUT_ID, this._imeShellReady.bind(this), "en");
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
      case tvKey.KEY_RED:
        this._ime.setString("");
        this._jInput.focus();
    }
  };

  /**
   * Perform a search
   * 
   * @param {String} searchTerm The term to search for
   */
  SearchView.prototype._performSearch = function(searchTerm) {
    RT.GlobalEvents.emit(RT.events.SearchEvent, new RT.events.SearchEvent(searchTerm));
    $("#keyHandler").focus();
  };

  RT.SearchView = SearchView;

}());
