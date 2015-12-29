var page = {"e":"pageload","t":236,"viewport":[1207,794],"screen":[1680,1010],"pos":[206,150],"b":"Microsoft Internet Explorer","bv":"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Tablet PC 2.0; .NET CLR 1.1.4322; .NET4.0C; .NET4.0E)"};
var pageWidth = page['viewport'][0];
var pageHeight = page['viewport'][1];
var frameNo = 0;
var svg = d3.select('#container')
      .append('svg')
      .attr('width', pageWidth)
      .attr('height', pageHeight);
var mouse = svg.append('circle')
      .attr('r', '4');
var lines = svg.selectAll('line');
var linesData = [];

var render = function() {
  mouse.attr('cx', data[frameNo].x)
    .attr('cy', data[frameNo].y);

  if (frameNo > 0) {
    var prevPoint = data[frameNo-1];
    var nowPoint = data[frameNo];
    linesData.push({x1: prevPoint.x, y1: prevPoint.y, x2: nowPoint.x, y2: nowPoint.y});
    lines.data(linesData)
      .enter()
      .append('line')
      .style('stroke', 'rgb(255,0,0)')
      .style("stroke-width", "2")
      .attr('x1', function(d, i) {return d.x1;})
      .attr('y1', function(d, i) {return d.y1;})
      .attr('x2', function(d, i) {return d.x2;})
      .attr('y2', function(d, i) {return d.y2;});
  }

  frameNo++;
};

var timer = setInterval(render, 400);
