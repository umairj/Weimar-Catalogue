var isMobile = navigator.userAgent.indexOf('Windows') < 0 && navigator.userAgent.indexOf('OS X') < 0;
console.log("isMobile=" + isMobile);

var jqmReady = $.Deferred();
var pgReady = $.Deferred();

// jqm ready
$(document).bind("pageinit", jqmReady.resolve);

// pg ready
if (isMobile) {
  	document.addEventListener("deviceready", onDeviceReady, false);
} else {
	pgReady.resolve();
}

function onDeviceReady() {
  	console.log("device ready");
	pgReady.resolve();
}

// all ready :)
$.when(jqmReady, pgReady).then(function () {
	console.log("all ready :)");
	onAppStart();
});


