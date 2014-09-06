function loadBloomberg() {
  $(function() {
    for (var i = 0; i < stocks.length; i++) {
      $('p').highlight(stocks[i].name, {
        className: 'bloomberg'
      });
      $('p').highlight(stocks[i].symbol, {
        className: 'bloomberg'
      });
    }

    $('.bloomberg').each(function() {
      var $this = $(this);
      var company = $this.html();
      $this.qtip({
        content: company
      });
    });
  });
}
loadBloomberg();
