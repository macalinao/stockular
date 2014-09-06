function loadBloomberg() {
  var names = {};
  $(function() {
    for (var i = 0; i < stocks.length; i++) {
      var name = stocks[i].name;
      if (name[name.length - 1] === '.' 
        || name.lastIndexOf('Co') === name.length - 2
        || name.lastIndexOf('Corp') === name.length - 4
        || name.lastIndexOf('Inc') === name.length - 3) {
        name = stocks[i].name.substring(0, stocks[i].name.lastIndexOf(' '));
      }
      names[name] = stocks[i].name;
      $('p').highlight(name, {
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
