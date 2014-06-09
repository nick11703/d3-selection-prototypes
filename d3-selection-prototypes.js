(function(_d3){
	if(_d3 === null) {console.log('d3 not loaded');return;}
	
	/* d3.js defs tag
	 * http://www.w3.org/TR/SVG2/struct.html#Head
	 * 
	 * Check if a "defs" tag is the first child of the parent.
	 * If it is, return it. If it isn't, create it and return it.
	 * 
	 */
	_d3.selection.prototype.defs = function(){
		// Add definition	tag if not first child of parent
		return this.node().parentNode.children[0].tagName === "defs" ? 
			_d3.select(this.node().parentNode.children[0]) : 
			_d3.select(this.node().parentNode).insert("defs", ":first-child");
	}
	
	/* d3.js Gradients, Radial || Linear
	 * http://www.w3.org/TR/SVG11/pservers.html#Gradients
	 * 
	 * @param type string ( "linear" || "radial" )
	 * @parma opt Object 
	 * 
	 */
	_d3.selection.prototype.gradient = function(type, opt){
		type = type === "linear" ? "linear" : "radial";
		opt = opt || {};
		opt.id = opt.id || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
			// Thanks to broofa, Stack Overflow http://stackoverflow.com/a/2117523/1187917
		});
		// Add gradient tag
		var gradient = this.defs().append(type+"Gradient");
		// Add stops
		gradient.selectAll("stop").data(opt.stop || []).enter().append("stop").call(function(){
			this.each(function(d, i){
				// Add stop attributes
				_d3.select(this).attr(d);
			});
		});
		// Delete stops from opt and add fill attribute
		if(opt.hasOwnProperty("stop") && delete opt.stop)
			this.attr("fill", "url(#"+opt.id+")");
		// Add the rest of the options as attributes
		gradient.attr(opt);
		
		return this;
	}
	
	/* d3.js shadow
	 * http://www.w3.org/TR/SVG2/struct.html#Head
	 * 
	 * Adds a custom shadow.
	 * 
	 * opt = {
	 *    id: (string),
	 *    color: (string) color hex/rgb
	 *    offset = {
	 *       x: (int) relative x offset 
	 *       y: (int)
	 *    }
	 *    opacity: (float) values between 0 - 1
	 *    blur: (int) standard deviation for feGaussianBlur
	 * 
	 */
	_d3.selection.prototype.shadow = function(opt){
		opt = opt || {};
		opt.id = opt.id || 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
			return v.toString(16);
			// Thanks to broofa, Stack Overflow http://stackoverflow.com/a/2117523/1187917
		});
		opt.offset = opt.offset || {};
		opt.filter = opt.filter || {};
		opt.opacity = opt.opacity || .6;
		opt.color = _d3.rgb(opt.color || "#999999");
		
		this.attr("filter", "url(#"+opt.id+")");
		
		if(document.getElementById(opt.id)){
			return this;
		}
		
		var filter = this.defs().append("filter");
			filter.attr("id", opt.id)
				.attr("filterUnits", "objectBoundingBox")
				.attr("x", opt.filter.x || -0.5)
				.attr("y", opt.filter.y || -0.5)
				.attr("width", opt.filter.width || 2)
				.attr("height", opt.filter.height || 2);	
				
		var feGaussianBlur = filter.append("feGaussianBlur");
			feGaussianBlur.attr("in", "SourceAlpha")
				.attr("stdDeviation", opt.blur || 2);	
		
		var feOffset = filter.append("feOffset")
			feOffset.attr("dx", opt.offset.x || -4)
				.attr("dy", opt.offset.y || 1)
				.attr("result", "offsetblur");
		
		var feFlood = filter.append("feFlood")
			feFlood.attr("flood-color", opt.color.toString());
		
		var feComposite = filter.append("feComposite");
			feComposite.attr("in2", "offsetblur")
				.attr("operator", "in")
				.attr("result", "shadow");
		
		var feColorMatrix = filter.append("feColorMatrix");
			feColorMatrix.attr("type", "matrix")
				.attr("in", "shadow")
				.attr("values", "1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 "+opt.opacity+" 0"); // apply opacity
				
		var feMerge = filter.append("feMerge");
			feMerge.append("feMergeNode");
			
		var feMergeNode = feMerge.append("feMergeNode")
			feMergeNode.attr("in", "SourceGraphic");
			
		return this;
	}
})(d3 = typeof d3 !== 'undefined' ? d3 : null);