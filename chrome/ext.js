function loadBloomberg() {
  var myStocks = {};
  $(function() {
    for (var i = 0; i < stocks.length; i++) {
      var name = stocks[i].name;
      if (name[name.length - 2] === ' ') {
        name = name.substring(0, name.length - 2);
      }
      if (name[name.length - 1] === '.' 
        || name.lastIndexOf('Co') === name.length - 2
        || name.lastIndexOf('Corp') === name.length - 4
        || name.lastIndexOf('Inc') === name.length - 3) {
        name = stocks[i].name.substring(0, stocks[i].name.lastIndexOf(' '));
      }
      myStocks[name] = stocks[i];
      $('p').highlight(name, {
        caseSensitive: true,
        className: 'bloomberg'
      });
    }

    $('.bloomberg').each(function() {
      var $this = $(this);
      var stock = myStocks[$this.html()];
      $this.qtip({
        content: '<h3>' + stock.name + '</h3> (NYSE: ' + stock.symbol + ')'
                   + '<hr />'
                   + '<div id="chart-' + stock.symbol.toLowerCase() + '"></div>'
                   + '<hr />'
                   + '<small>Powered by Bloomberg</small>'
      });
    });
  });
}
loadBloomberg();
