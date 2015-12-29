var keycodes = {
  '8': 'BackSpace',
  '9': 'Tab',
  '12': 'Clear',
  '13': 'Enter',
  '16': 'Shift',
  '17': 'Control',
  '18': 'Alt',
  '20': 'Cape Lock',
  '65': 'A',
  '66': 'B',
  '67': 'C',
  '68': 'D',
  '69': 'E',
  '70': 'F',
  '71': 'G',
  '72': 'H',
  '73': 'I',
  '74': 'J',
  '75': 'K',
  '76': 'L',
  '77': 'M',
  '78': 'N',
  '79': 'O',
  '80': 'P',
  '81': 'Q',
  '82': 'R',
  '83': 'S',
  '84': 'T',
  '85': 'U',
  '86': 'V',
  '87': 'W',
  '88': 'X',
  '89': 'Y',
  '90': 'Z',
  '48': '0',
  '49': '1',
  '50': '2',
  '51': '3',
  '52': '4',
  '53': '5',
  '54': '6',
  '55': '7',
  '56': '8',
  '57': '9'
};
var page = {"e":"pageload","t":236,"viewport":[1207,794],"screen":[1680,1010],"pos":[206,150],"b":"Microsoft Internet Explorer","bv":"Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.1; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Tablet PC 2.0; .NET CLR 1.1.4322; .NET4.0C; .NET4.0E)"};
var pageWidth = page['screen'][0];
var pageHeight = page['screen'][1];
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
    .attr('cy', data[frameNo].y)
    .style('display', function () {
      return data[frameNo].e !== 'keyup';
    })
    .transition()
    .attr('r', function() {
      if (data[frameNo].e === 'click') {
        return '12';
      } else {
        return '4';
      }
    })
    .transition()
    .attr('r', 4);

  if (frameNo > 0) {
    var prevPoint = data[frameNo-1];
    var nowPoint = data[frameNo];
    linesData.push({x1: prevPoint.x, y1: prevPoint.y, x2: nowPoint.x, y2: nowPoint.y});
    lines.data(linesData)
      .enter()
      .append('line')
      .style('stroke', 'rgb(200,200,200)')
      .style("stroke-width", "1")
      .attr('x1', function(d, i) {return d.x1;})
      .attr('y1', function(d, i) {return d.y1;})
      .attr('x2', function(d, i) {return d.x2;})
      .attr('y2', function(d, i) {return d.y2;});
  }

  if (data[frameNo].e === 'click') {
    svg.append('text')
      .attr('x', data[frameNo].x)
      .attr('y', data[frameNo].y)
      .text(data[frameNo].srcElement);
  }

  if (data[frameNo].e === 'keyup') {
    svg.append('text')
      .attr('x', data[frameNo-1].x)
      .attr('y', data[frameNo-1].y)
      .text(data[frameNo].srcElement + ':' + keycodes[data[frameNo].keyCode]);
  }

  frameNo++;
};

var timer = setInterval(render, 300);
