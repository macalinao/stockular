/* 
   @start: api stuff
   @author: Andrew Liu
   */

var URL = "http://cywoods.wynd07.com/work/";

function api(url, data, callb) {
  $.ajax({
    type: 'GET',
    url: url,
    async: true,
    cache: false,
    dataType: 'json',
    data: (data != "" && data != null ? data : ""),
    success: function(data, textStatus, jqXHR) {
      if (typeof data === "undefined" || data == null) {
        callb(null);
        alert("Request failed");
        return;
      }
      callb(data);
    }
  });
}

var stocks = [];

$(document).ready(function() {
  //api tests
  api(URL + "AAPL.json", null, function(data) {
    console.log(data);
  });
  api(URL + "list.json", null, function(data) {
    console.log(data);
    stocks = data;
    loadBloomberg();
  })
});


/*
   @end: api stuff
   */


function loadBloomberg() {
  var myStocks = {};
  $(function() {
    var names = [];
    for (var i = 0; i < stocks.length; i++) {
      var name = stocks[i].name;
      if (name[name.length - 2] === ' ') {
        name = name.substring(0, name.length - 2);
      }
      if (name[name.length - 1] === '.' || name.lastIndexOf('Co') === name.length - 2 || name.lastIndexOf('Corp') === name.length - 4 || name.lastIndexOf('Inc') === name.length - 3) {
        name = stocks[i].name.substring(0, stocks[i].name.lastIndexOf(' '));
      }
      myStocks[name] = stocks[i];
      names.push(name);
    }
    $('p').highlight(names, {
      caseSensitive: true,
      className: 'bloomberg'
    });

    $('.bloomberg').each(function() {
      var $this = $(this);
      var stock = myStocks[$this.html()];
      if (!stock.detailedOnce) {
        $this.html('<strong>' + $this.html() + '</strong>').append(' (NYSE: ' + stock.symbol + ')');
        stock.detailedOnce = true;
      }

      var popover = $this.popover({
        animation: true,
        content: 'placeholder',
        html: true,
        placement: "top",
        trigger: "hover",
        title: "bitch pls"
      });

      $this.hover(function() {
        $(this).popover('show');
        $(this).unbind('mouseenter mouseleave');
      });

      api(URL + stock.symbol + ".json", null, function(data) {
        console.log(data);
        var leftData = $('<div class="col"></div>');
        leftData.append('<strong>Market cap:</strong> $' + (data.values.CUR_MKT_CAP / 1000000).toFixed(2) + ' million');
        leftData.append('<strong>P/E Ratio:</strong> ' + data.values.PE_RATIO);
        console.log(popover);
        popover.html(leftData.html());
      });

    });
    $(document).mousemove(updateBoxes);
  });
}

var percent = 0.2;

function updateBoxes(ev) {
  $(".popover").each(function(k, b) {
    b = $(b)
    var ow = b.outerWidth();
    var oh = b.outerHeight() + 30;
    var off = b.offset();
    var top = off.top - oh * percent;
    var left = off.left - ow * percent;
    ow *= 1 + percent * 2;
    oh *= 1 + percent * 2;
    //console.log((ev.pageX < left)+ " " +( ev.pageY < top )+ " " +( ev.pageX > left+ow )+ " " +( ev.pageY > top + oh));
    if (ev.pageX < left || ev.pageY < top || ev.pageX > left + ow || ev.pageY > top + oh) {
      $('.bloomberg').popover('hide');
      $('.bloomberg').unbind('mouseenter mouseleave');
      $('.bloomberg').hover(function() {
        $(this).popover('show');
        $(this).unbind('mouseenter mouseleave');
      });
    }
  });
}

var aapl = null;

function fake(data) {
  console.log(data)
  // Create the chart
  $('#chart-aapl').highcharts('StockChart', {
    rangeSelector: {
      selected: 1,
      inputEnabled: $('#chart-aapl').width() > 480
    },
    title: {
      text: 'AAPL Stock Price'
    },
    series: [{
      name: 'AAPL',
      data: data,
      tooltip: {
        valueDecimals: 2
      }
    }]
  });
}
