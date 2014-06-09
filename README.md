d3 Selection Prototypes
=======================

###Prototypes for d3.js Selections

An easy way to create linear/radial gradients and well as true drop shadows. Also include a better way of getting/creating "refs" tags.

###How to use it:
include d3-selection-prototypes.js after including d3.js, but before your d3 javascript.

###Exapmles

**Shadow**
```js
var width = 600;
var height = 300;
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

svg.append('circle')
	.attr("cx", width / 2)
	.attr("cy", height / 2)
	.attr("r", 100)
	.style("fill", "#0303e2")
	.shadow({
		blur: 3,
		opacity: .7,
		color: "#e203d5",
		offset: {
			x: 5,
			y: 5						
		},
	});
```

**Linear Gradient**
```js
var width = 600;
var height = 300;
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

svg.append('rect')
	.attr('width', width)
	.attr('height', height)
	.gradient('linear', {
		x1: '10%',
		y1: '10%',
		x2: '90%',
		y2: '90%',
		class: 'test-class',
		stop: [
			{
				"stop-color": '#e20327',
				offset: '20%'
			},
			{
				"stop-color": '#030de2',
				offset: '45%'
			},
			{
				"stop-color": '#03e2d0',
				offset: '85%',
				"stop-opacity": .2
			}
		]
	});
```

**Radial Gradient**
```js
var width = 600;
var height = 300;
var svg = d3.select("body").append("svg")
	.attr("width", width)
	.attr("height", height);

svg.append('rect')
	.attr('width', width)
	.attr('height', height)
	.gradient('radial', {
		cx: .5,
		cy: .5,
		fx: .5,
		fy: .5,
		r: .5,
		class: 'radial-gradient',
		stop: [
			{
				"stop-color": '#e20327',
				"stop-opacity": .1,
				offset: 0				
			},
			{
				"stop-color": '#a003e2',
				"stop-opacity": 1,
				offset: 0.6499				
			},
			{
				"stop-color": '#030de2',
				"stop-opacity": .75,
				offset: 0.8838				
			},
			{
				"stop-color": '#03e2d0',
				"stop-opacity": .4,
				offset: 1				
			}
		]
	});
```

[**@nick11703**](https://github.com/nick11703/)
