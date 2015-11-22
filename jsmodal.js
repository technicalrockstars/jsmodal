(function(){
	function Modal(options) {
		var that = this;
		this.options = options;
		var elem = document.createElement('div');
		var overlap = window.document.createElement("div");
		overlap.classList.add('jsmodal__screen');
		this.overlap = overlap;
		this.elem = elem;
		this.elem.classList.add('jsmodal');

		var header = document.createElement('div');
		var body = document.createElement('div');
		var footer = document.createElement('div');
		var buttons = document.createElement('div');
		var okButton = document.createElement('button');
		var cancelButton = document.createElement('button');

		header.classList.add('jsmodal__header');
		body.classList.add('jsmodal__body');
		footer.classList.add('jsmodal__footer');
		header.textContent = this.options || 'Untitled Modal';
		cancelButton.textContent = 'Cancel';
		okButton.textContent = 'OK';
		cancelButton.classList.add('jsmodal__btn');
		okButton.classList.add('jsmodal__btn');
		okButton.classList.add('jsmodal__btn--positive');
		buttons.classList.add('jsmodal__btnList');

		this.body = body;
		buttons.appendChild(cancelButton);
		buttons.appendChild(okButton);
		footer.appendChild(buttons);
		this.elem.appendChild(header);
		this.elem.appendChild(this.body);
		this.elem.appendChild(footer);

		window.document.body.appendChild(this.elem);

		cancelButton.addEventListener('click', function() {
			that.close();
		});
		okButton.addEventListener('click', function() {
			that.okClicked();
			that.close();
		});
	}

	Modal.prototype.setBody = function(body) {
		this.body.appendChild(body);
	}
	
	Modal.prototype.ok = function(cb) {
		this.okClicked = cb;
	}

	Modal.prototype.open = function(_option) {
		var option = _option || {};
		var self = this;
		this.elem.style.display = 'block';
		window.document.body.appendChild(this.overlap);

		for(var i=0;i < this.elem.childNodes.length;i++) {
			if(this.elem.childNodes[i].className == "close") {
				this.elem.childNodes[i].onclick = function() {
					self.close();
					return false;
				}
			}
		}
		this.overlap.onmousedown = function(e) {
			if(!check(e.target)) {
				self.close();
				return false;
			}
			function check(t, index) {
				if(!t) return false;
				if(index > 5) return false;
				if(t.className == "jsmodal") {
					return true;
				}else{
					return check(t.parentNode, index++);
				}
			}
			return true;
		}

	}

	Modal.prototype.close = function() {
		this.elem.style.display = 'none';
		if(this.overlap.remove) this.overlap.remove();
		else window.document.body.removeChild(this.overlap);
	}
	if(typeof exports === 'undefined') {
		window.JSModal = Modal;
	}else{
		module.exports = Modal;
	}
}());