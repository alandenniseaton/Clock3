/* 
    Document   : timer.js
    Created on : 06/06/2017, 10:01:00
    Author     : Alan Dennis Eaton <alan.dennis.eaton@gmail.com>
*/

'use strict';

//============================================================
//	Timer :: Module
//
//	minimum 1 second resolution
//
//============================================================


util.Timer = (function (){


//------------------------------------------------------------
// imports

var global       = util.global;
var nothing      = util.nothing;
var ifNumber     = util.ifNumber;
var ifFunction   = util.ifFunction;
var ifObject     = util.ifObject;
var ifDefined    = util.ifDefined;
var isDefined    = util.isDefined;

var setTimeout   = global.setTimeout;
var clearTimeout = global.clearTimeout;


//------------------------------------------------------------
//	Timer :: Class

class Timer {
	constructor(action, period, context) {	
		this.action  = ifFunction(action, nothing);
		this.context = ifObject(context, {});
		
		this.setPeriod(period);

		this.setFrom();
		
		// the last activation
		this.last = {
			index: -1
		};
		
		this.repeating = false;
		this.stopped = true;
	}

	static restart(timer) {
		var now    = Date.now();
		var from   = timer.from;
		var period = timer.period;
		var index;
		var time;
		
		index = Math.floor((now-from)/period) + 1;
		
		if (index <= timer.last.index) {
			// might happen!
			// depends on the accuracy of browser timeouts
			// and whether modified by code
			// and whether this is the initial reset.
			index = timer.last.index + 1;
		}
		
		time = from + index*period;

		timer.next = {
			index: index,
			time: time
		};
		
		timer.timeoutId = setTimeout (
			function() { Timer.step(timer); },
			time - now
		);
		timer.stopped = false;
	}
	
	static step(timer) {
		timer.index = timer.next.index;
		timer.current = timer.next;
		delete timer.next;
		
		timer.action.call(timer.context, timer);
		
		timer.last = timer.current;
		delete timer.current;
		
		if (timer.repeating) {
			if (!timer.stopped) { Timer.restart(timer); }
		} else {
			timer.stopped = true;
		}
	}

	
	setFrom(from) {
		var d = new Date(from).getTime();
		
		this.from = (d || d === 0)? d: Date.now();
		
		return this;
	}

	getFrom() {
		return this.from;
	}
	
	setPeriod(period) {
		// minimum 1 second period
		this.period = Math.max(ifNumber(period, 0), 1000);
		
		return this;
	}
	
	getPeriod() {
		return this.period;
	}
	
	start(from) {
		if (this.stopped) {
			// make sure this.from is set
			this.setFrom(ifDefined(from, this.from));
			
			Timer.restart(this);
		}
		
		return this;
	}
	
	stop() {
		if (!this.stopped) {
			clearTimeout(this.timeoutId);
			delete this.timeoutId;
			delete this.next;
			this.stopped = true;
		}
		
		return this;
	}
	
	repeat(repeating) {
		this.repeating = (arguments.length === 0) || !!repeating;
		
		return this;
	}
	
	isRepeating() {
		return this.repeating;
	}
	
	getContext() {
		return this.context;
	}
	
	getIndex() {
		return this.index || 0;
	}
	
	getTime() {
		return this.getFrom() + this.getIndex()*this.getPeriod();
	}
	
	getDate() {
		return new Date(this.getTime());
	}
	
}


//------------------------------------------------------------
Timer.SECOND = 1000; // *Timer.MILLISECOND
Timer.MINUTE = 60*Timer.SECOND;
Timer.HOUR   = 60*Timer.MINUTE;
Timer.DAY    = 24*Timer.HOUR;
Timer.WEEK   = 7*Timer.DAY;
Timer.YEAR   = 365*Timer.DAY;


//------------------------------------------------------------
return Timer;


//------------------------------------------------------------
}());
