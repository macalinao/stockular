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

      api(URL + stock.symbol + ".json", null, function(data) {
        var popoverContent = $('<div class="popover-content"></div>');
        
        var volume = data.values.VOLUME_AVG_30D;
        var open = data.values.PX_OPEN;
        var high = data.values.PX_HIGH;
        var low = data.values.PX_LOW;
        var close = data.values.PX_CLOSE;
        var mktCap = (data.values.CUR_MKT_CAP / 1000000).toFixed(2) + ' million';
        var peRatio = data.values.PE_RATIO;
        var divYield = data.values.DIVIDEND_YIELD;

        var leftData = $('<div class="col"><ul></ul></div>');
        leftData.append([
          '<table>',
          '<tr><td>Volume</td><td>' + volume,
          '<tr><td>Open</td><td>' + open,
          '<tr><td>High</td><td>' + high,
          '<tr><td>Low</td><td>' + low,
          '<tr><td>Close</td><td>' + close,
          '<tr><td>Market cap</td><td>' + mktCap,
          '<tr><td>P/E Ratio</td><td>' + peRatio,
          '<tr><td>Dividend Yield</td><td>' + divYield 
          '</table>'
          ].join(''));
        popoverContent.append(leftData);

        var rightData = $('<div class="col"><ul></ul></div>');
        rightData.append('<li><strong>Market cap:</strong> $' + (data.values.CUR_MKT_CAP / 1000000).toFixed(2) + ' million</li>');
        rightData.append('<li><strong>P/E Ratio:</strong> ' + data.values.PE_RATIO + '</li>');

        $this.popover({
          animation: true,
          content: popoverContent.html(),
          html: true,
          placement: "top",
          trigger: "hover",
          title: "bitch pls"
        });

        $this.hover(function() {
          $(this).popover('show');
          $(this).unbind('mouseenter mouseleave');
        });
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
