jQuery(document).ready(function(){
jQuery("#trackingButton").click(function(){
//	alert("I am click");
	var tc = jQuery("#trackingCode").val();
	var urlA = "http://www.aramex.com/track_results_multiple.aspx?ShipmentNumber=4681009756";
	jQuery(this).attr("href", "http://track.delhivery.com/p/"+tc);
	//var qs = "questions";
	//window.location.replace();
});
});

