

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
      $(this).qtip();
    });
  });
}
loadBloomberg();
