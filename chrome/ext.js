function loadBloomberg() {
  var names = {};
  $(function() {
    for (var i = 0; i < stocks.length; i++) {
      if (stocks[i].name[stocks[i].name.length - 1] !== '.') {
        var name = stocks[i].name.substring(0, stocks[i].name.lastIndexOf(' '));
      } else {
        var name = stocks[i].name;
      }
      names[name] = stocks[i].name;
      $('p').highlight(name {
        caseSensitive: true,
        className: 'bloomberg'
      });
    }

    $('.bloomberg').each(function() {
      var $this = $(this);
      var company = names[$this.html()];
      $this.qtip({
        content: '<h3>' + company + '</h3>'
      });
    });
  });
}
loadBloomberg();
