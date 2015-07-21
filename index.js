var timeout = require('interaction-timeout');
var EventBox = require('event-box');

var NOP = function() {};
var DEFAULT_EVENTS = ['mousedown', 'touchstart'];
var DEFAULT_DELAY = 30000;

module.exports = attractor;

function attractor(opts) {
	var state 			= 'off',
		events 			= new EventBox(),
		activate 		= opts.activate,
		deactivate 		= opts.deactivate,
		bindUiEvents 	= opts.events || DEFAULT_EVENTS,
		timer 			= timeout(_activate, opts.delay || DEFAULT_DELAY);
	
	bindUiEvents.forEach(function(e) {
		document.body.addEventListener(e, _deactivate, true);	
	});

	function _activate(firstTime) {
		if (state !== 'off') return;
		state = 'off->on';
		events.emit('willActivate');
		activate(!!firstTime).then(function() {
			state = 'on';
			events.emit('didActivate');
		});
	}

	function _deactivate() {
		if (state !== 'on') return;
		state = 'on->off';
		events.emit('willDeactivate');
		deactivate().then(function() {
			state = 'off';
			events.emit('didDeactivate');
			timer.start();
		});
	}

	events.start = function() {
		_activate(true);
	}

	return events;
}