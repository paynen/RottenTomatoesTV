(function() {
  function SearchView() {
    this._initialiseDom();
  }

  SearchView.prototype._INPUT_ID = "searchInput";
  
  SearchView.prototype._initialiseDom = function() {
    new IMEShell(this._INPUT_ID, this._imeReady.bind(this), "en");
  };
  
  SearchView.prototype._imeReady = function() {
    document.getElementById(this._INPUT_ID).focus();  
    alert("READY");
  };

  RT.SearchView = SearchView;

}());