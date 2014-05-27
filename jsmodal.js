(function() {
	window.jsmodal = function(id) {
		var elem = document.getElementById(id);
		return {
			open : function(_option) {
				var option = _option || {};
				var self = this;
				elem.style.display = 'block';
				var left = window.document.body.clientWidth / 2 - 300;
				var top = window.document.body.clientHeight / 2;
				elem.style.left = (option.left ? option.left : left) + 'px';
				elem.style.top = (option.top ? option.top : top) + 'px';
				for(var i=0;i < elem.childNodes.length;i++) {
					if(elem.childNodes[i].className == "close") {
						console.log(elem.childNodes[i].className);
						elem.childNodes[i].onclick = function() {
							self.close();
						}
					}
				}
			},
			close : function() {
				elem.style.display = 'none';
			}
		}
	}
}())