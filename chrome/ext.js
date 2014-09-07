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
  api(URL + "list.json", null, function(data) {
    stocks = data;
    loadBloomberg();
  })
});


/*
@end: api stuff
*/


function sanitize(name) {
  if (name[name.length - 2] === ' ') {
    name = name.substring(0, name.length - 2);
  }
  if (name[name.length - 1] === '.' || name.lastIndexOf('Co') === name.length - 2 || name.lastIndexOf('Corp') === name.length - 4 || name.lastIndexOf('Inc') === name.length - 3) {
    name = name.substring(0, name.lastIndexOf(' '));
  }
  return name;
}

var myStocks = {};

function loadBloomberg() {

  $(document).mousemove(updateBoxes);
  var names = [];
  for (var i = 0; i < stocks.length; i++) {
    var name = sanitize(stocks[i].name);
    myStocks[name] = stocks[i];
    names.push(name);
  }
  $('p').highlight(names, {
    caseSensitive: true,
    className: 'bloomberg'
  });

  var counter = 0;
  $('.bloomberg').each(function() {
    counter++;
    var $this = $(this);
    var stock = myStocks[$this.text()];
    if (!stock.detailedOnce) {
      $this.html('<strong>' + $this.html() + '</strong>').append(' (NYSE: ' + stock.symbol + ')');
      stock.detailedOnce = true;
    }
    this.stock = stock;
    this.counter = counter;


    $this.hover(popshow);

    var abc = this;

    api(URL + stock.symbol + ".json", null, function(data) {
      var overviewContent = $('<div class="popover-content"><div class="graph" id="graph'+abc.counter+'"></div></div>');

      var volume = formatNumber(data.values.VOLUME_AVG_30D);
      var open = formatNumber(data.values.PX_OPEN);
      var high = formatNumber(data.values.PX_HIGH);
      var low = formatNumber(data.values.PX_LOW);
      var yhigh = formatNumber(data.values.HIGH_52WEEK);
      var ylow = formatNumber(data.values.LOW_52WEEK);
      var close = formatNumber(data.values.PX_CLOSE);
      var mktCap = formatNumber(data.values.CUR_MKT_CAP);
      var peRatio = formatNumber(data.values.PE_RATIO);
      var divYield = formatNumber(data.values.DIVIDEND_YIELD);
      var netChange = formatNumber(data.values.CHG_NET_1D);
      var percentChange = formatNumber(data.values.CHG_PCT_1D);
      var eps = formatNumber(data.values.TRAIL_12M_EPS);

      var divdata = $('<div></div>');
      divdata.append([
        '<table class="table table-bordered">',
        '<tr><td><b>Open:</b> ' + open +'</td>',
        '<td><b>Close:</b> ' + close +'</td></tr>',
        '<tr><td><b>Range:</b> ' + low +' - ' + high+'</td>',
        '<td><b>52 Week:</b> ' + ylow +' - ' + yhigh+'</tr>',
        '</td></tr></table>'
      ].join(''));
      overviewContent.append(divdata);

      var livewviewContent = $('<div class="popover-content"><div class="graph" id="live'+abc.counter+'"></div></div>');
      var divdata2 = $('<div></div>');
      divdata2.append([
        '<table class="table table-bordered">',
        '<tr><td><b>Volume:</b> ' + volume +'</td>',
        '<td><b>Market Cap:</b> ' + mktCap +'</td></tr>',
        '<tr><td><b>P/E Ratio:</b> ' + peRatio+'</td>',
        '<td><b>EPS:</b> ' + eps+'</tr>',
        '</td></tr></table>'
      ].join(''));
      livewviewContent.append(divdata2);

      $this.popover({
        animation: true,
        content: livewviewContent.html(),
        html: true,
        placement: "bottom",
        trigger: "none",
        title: '<div class="btn-group"><button type="button" class="btn btn-default">Overview</button>'+
        '<button type="button" class="btn btn-default">Live View</button><button type="button" class="btn btn-default" class="rift-view">Rift View</button></div>' 
      });

      abc.titleHtml =         '<b>'+stock.symbol + ' '+close +'</b>' + 
        '<span style="color:'+(netChange > 0 ? 'green"> +':'red"> ')+ netChange + ' ('+percentChange+'%)</span>';

      var gdata = [];
      var g = data.graph;
      for (var i = 0; i < g.length; i++)
        gdata.push([g[i].date - 1000*60*60*4, g[i].value]);
      abc.gdata = gdata;

    });
  });

  $('.rift-view').click(function() {
    chrome.tabs.create({url: 'rift.html'});
  });
}

function popshow() {
  $this = $(this);
  $this.unbind('mouseenter mouseleave');
  $this.popover('show');

  $('#graph'+this.counter).highcharts('StockChart', {

    rangeSelector: {
      enabled: false
    },

    title: {
      text: this.titleHtml
    },

    series: [{
      name: this.stock.symbol,
      data: this.gdata,
      type: 'spline',
      tooltip: {
        valueDecimals: 2
      }
    }],
    scrollbar: { enabled: false },
    exporting:{
      enabled: false
    },
    navigator:{
      enabled: false
    }
  });

}

var percent = 0.1;

function updateBoxes(ev) {
  $(".popover").each(function(k, b) {
    b = $(b)
    var ow = b.outerWidth();
    var oh = b.outerHeight() + 20;
    var off = b.offset();
    var top = off.top - oh * percent;
    var left = off.left - ow * percent;
    ow *= 1 + percent * 2;
    oh *= 1 + percent * 2;
    //console.log((ev.pageX < left)+ " " +( ev.pageY < top )+ " " +( ev.pageX > left+ow )+ " " +( ev.pageY > top + oh));
    if (ev.pageX < left || ev.pageY < top || ev.pageX > left + ow || ev.pageY > top + oh) {
      $('.bloomberg').popover('hide');
      $('.bloomberg').unbind('mouseenter mouseleave');
      $('.bloomberg').hover(popshow);
    }
  });
}

//pls use this, thank you
function formatNumber(x){
  x = parseFloat(x);
  if( x > 1e9) return numberWithCommas((x / 1e9).toFixed(2)) + "B";
  if( x > 1e6) return numberWithCommas((x / 1e6).toFixed(2)) + "M";
  return numberWithCommas(x.toFixed(2))
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
