var css = '.btn{position: relative;overflow: hidden;display: inline-block;cursor: pointer;padding: 6px 12px;font-size: 14px;border-radius: 4px;touch-action: manipulation;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;}ripples ripple{pointer-events: none;top: 0;right: 0;bottom: 0;left: 0;overflow: hidden;position: absolute;display: block;background: currentColor;border-radius: 100%;opacity: 0.1;-webkit-transition-duration: 0.6s;transition-duration: 0.6s;-webkit-transition-property: opacity, -webkit-transform;transition-property: opacity, transform;-webkit-transform: scale(0);-ms-transform: scale(0);transform: scale(0);}',head = document.head || document.getElementsByTagName('head')[0],style = document.createElement('style');

style.type = 'text/css';
if (style.styleSheet){
  style.styleSheet.cssText = css;
}else{
  style.appendChild(document.createTextNode(css));
}
head.appendChild(style);

function RButton(el) {
    var _this = this;
    _this.el = el;
    _this.ripples = {};
    _this.rippleCount = 0;
    _this.rippleWrapper = _this.el.querySelector('ripples');
}
RButton.prototype.mouseDown = function (e) {
    var _this = this;
    var height = e.target.clientHeight;
    var width = e.target.clientWidth;
    var size = Math.max(height, width);
    var offset = {
        x: e.offsetX || e.layerX,
        y: e.offsetY || e.layerY
    };
    var sX = Math.abs(size / 2 - offset.x) * 2;
    var sY = Math.abs(size / 2 - offset.y) * 2;
    size += Math.max(sX, sY);
    var id = ++_this.rippleCount;
    _this.ripples[id] = _this.makeRipple(offset, size, id);
    _this.rippleWrapper.appendChild(_this.ripples[id]);
    _this.el.classList.toggle('selected');
};
RButton.prototype.makeRipple = function (offset, size, id) {
    var _this = this;
    var ripple = document.createElement('ripple');
    
    ripple.style.left = offset.x + 'px';
    ripple.style.top = offset.y + 'px';
    ripple.style.height = size + 'px';
    ripple.style.width = size + 'px';
    ripple.style.margin = size / -2 + 'px';
    function release() {
        ripple.style.transform = 'scale(1.11)';
        ripple.addEventListener('transitionend', function () {
            ripple.style.opacity = '0';
            this.addEventListener('transitionend', function () {
                _this.ripples[id].remove();
            });
        });
    }
    setTimeout(function () {
        ripple.style.transform = 'scale(1.1)';
        _this.el.addEventListener('mouseup', release);
        _this.el.addEventListener('mouseleave', release);
    }, 0);
    return ripple;
};
var Buttons = document.querySelectorAll('.btn');
var forEach = [].forEach;
forEach.call(Buttons, function (el, i) {
    Buttons[i].innerHTML+="<ripples></ripples>";
    var Button = new RButton(el);
    function mouseDown(e) {
        Button.mouseDown(e);
    }
    el.addEventListener('mousedown', mouseDown);
});

// Jquery
(function($){
	/* trigger when page is ready */
	$(document).ready(function (){
	  
		  //Tabs functionality
		  //Firstly hide all content divs
		  $('#generic-tabs div').hide();
		  //Then show the first content div
		  $('#generic-tabs div:first').show();
		  //Add active class to the first tab link
		  $('#generic-tabs ul#tabs li:first').addClass('active');
		  //Functionality when a tab is clicked
		  $('#generic-tabs ul#tabs li a').click(function(){
			//Firstly remove the current active class
			  $('#generic-tabs ul#tabs li').removeClass('active');
			  //Apply active class to the parent(li) of the link tag
			  $(this).parent().addClass('active');
			  //Set currentTab to this link
			  var currentTab = $(this).attr('href');
			  //Hide away all tabs
			  $('#generic-tabs div').hide();            
			  //show the current tab
			  $(currentTab).show();
			  //Stop default link action from happening
			  return false;
		  }); 
	});
  })(window.jQuery);