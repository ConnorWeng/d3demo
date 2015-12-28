var pageWidth = 800;
var pageHeight = 600;
var prevCx = 12;
var prevCy = 12;
var path = [{x1: prevCx, y1: prevCy, x2: prevCx, y2: prevCy}];
var svg = d3.select('#container')
		.append('svg')
		.attr('width', pageWidth)
		.attr('height', pageHeight);
var mouse = svg.append('circle')
		.attr('r', '6')
        .attr('cx', prevCx)
		.attr('cy', prevCy);

var render = function() {
	var cx = Math.random() * 400;
	var cy = Math.random() * 400;
	mouse.attr('cx', cx)
		.attr('cy', cy)
	    .transition()
	    .attr('r', '10')
	    .transition()
	    .attr('r', '6');
	path.push({x1: prevCx, y1: prevCy, x2: cx, y2: cy});
	svg.selectAll('line')
		.data(path)
		.enter()
		.append('line')
	    .attr('x1', function(d) { return d.x1; })
		.attr('y1', function(d) { return d.y1; })
		.attr('x2', function(d) { return d.x2; })
	    .attr('y2', function(d) { return d.y2; })
		.style('stroke', 'rgb(255,0,0)')
		.style('stroke-width', '2');
	prevCx = cx;
	prevCy = cy;
};

var timer = setInterval(render, 400);
setTimeout(function() {clearInterval(timer);}, 10000);
