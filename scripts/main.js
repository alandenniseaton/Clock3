/* 
    Document   : main.js
    Created on : 29/10/2012, 4:59:16 AM
	Modified on: 24/11/2014, 
	Modified on: 06/06/2017 (major changes)
    Author     : Alan Dennis Eaton <alan.dennis.eaton@gmail.com>
*/

'use strict';

//-----------------------------------------------------------------
page.main = function(){

	//---------------------------------------------------------
	var global = util.global;
	var doc = util.document;
	

	//---------------------------------------------------------
	var Timer = util.Timer;


	//---------------------------------------------------------
	var clockDay = doc.getElementById('clockDay');
	var clockTime = doc.getElementById('clockTime');
	var clockDate = doc.getElementById('clockDate');

	
	//---------------------------------------------------------
	var dayName = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	
	var oldWidth=0;
	
	var factor1 = 2.0;
	var factor2 = 3.0;

	var pad = function(x) {
		var s = x.toString();
		
		if (s.length < 2) {
			s = '0' + s;
		}
		return s;
	};
	
	var formatTime = function(date) {
		var hours = pad(date.getHours());
		var minutes = pad(date.getMinutes());
		var seconds = pad(date.getSeconds());
		
		return hours + ':' + minutes + ':' + seconds;
	};
	
	var formatDay = function(date) {
		var day = dayName[date.getDay()];
		
		return day;
	};
	
	var formatDate = function(date) {
		var year = date.getFullYear().toString();
		var month = pad(date.getMonth()+1);
		var day = pad(date.getDate());
		
		return year + '-' + month + '-' + day;
	};
		
	var tick = function(timer) {
		var width = global.innerWidth;
		
		var date = new Date();
		var fday = formatDay(date);
		var ftime = formatTime(date);
		var fdate = formatDate(date);
		var size;
		
		if (width != oldWidth) {
			oldWidth = width;
			size = String(Math.floor(factor1*width/ftime.length));
			clockDay.style.fontSize = size/factor2 + 'px';
			clockTime.style.fontSize = size + 'px';
			clockDate.style.fontSize = size/factor2 + 'px';
		}
		
		if (clockDay.innerText != fday) {
			clockDay.innerText = fday;
		}

		clockTime.innerText = ftime;

		if (clockDate.innerText != fdate) {
			clockDate.innerText = fdate;
		}
	};
	
	
	//---------------------------------------------------------
	var view = doc.getElementById('view');

	var fullscreenEnabled = function() {
		return doc.webkitFullscreenEnabled;
	};
	
	var isFullscreen = function() {
		if (!fullscreenEnabled()) return false;
		
		return doc.webkitIsFullScreen;
	};
	
	var requestFullscreen = function() {
		console.log('requesting fullscreen mode');
		
		if (!fullscreenEnabled()) return;
		
		if (isFullscreen()) return;
		
		view.webkitRequestFullscreen();
	};
	
	var exitFullscreen = function() {
		console.log('exiting fullscreen mode');
		
		if (!fullscreenEnabled()) return;
		
		if (!isFullscreen()) return;
		
		doc.webkitExitFullscreen();
	};
	
	var toggleFullscreen = function() {
		if (isFullscreen()) {
			exitFullscreen();
		}
		else {
			requestFullscreen();
		}
	};
	
	
	page.fullscreenEnabled = fullscreenEnabled();
	

	//---------------------------------------------------------
	window.addEventListener('click', toggleFullscreen);
	
	page.timer = new Timer(tick, Timer.SECOND).repeat().start(0);
};

