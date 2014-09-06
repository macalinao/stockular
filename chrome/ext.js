function loadBloomberg() {
  $(function() {
    for (var i = 0; i < stocks.length; i++) {
      $('p').highlight(stocks[i].name.substring(0, stocks[i].name.indexOf(' ')), {
	caseSensitive: true,
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
