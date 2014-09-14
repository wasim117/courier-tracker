Parse.initialize("xXP8jjjtCMF7vWj5OXFgCqSTcjwL7KCEpsKkGCn3", "9Zhd08mzCcWCP4vPpvXtTZ47KRBpDncgqNVWrnpw");
jQuery(document).ready(function(){
	// button class change
	jQuery("label.btn").click(function(){
		jQuery('label').removeClass('btn-primary').addClass('btn-info');
		jQuery(this).addClass('btn-primary').removeClass('btn-info');
	});
	var tURL ="";
	jQuery("#trackingButton").click(function(e){
		var tc = jQuery("#trackingCode").val();
		var cName = jQuery("input[name=company]:checked").attr("value");
		saveCourier(cName, tc);
		switch (cName)
		{
		case 'aramex':
		  tURL="http://www.aramex.com/track_results_multiple.aspx?ShipmentNumber=";
		  break;
		case 'delhivery':
		  tURL="http://track.delhivery.com/p/";
		  break;
		case 'bluedart':
		  tURL="http://www.bluedart.com/servlet/RoutingServlet?handler=tnt&awb=awb&action=awbquery&numbers=";
		  break;
		case 'dtdc':
		  tURL="http://www.dtdc.in/dtdcTrack/Tracking/consignInfo.asp?action=track&sec=tr&GES=N&Ttype=cnno&strCnno=";
		  break;
		case 'gati':
		  tURL="http://www.gati.com/single_dkt_track_int.jsp?dktNo=";
		  break;  
		}
		if(tc == "" || cName == undefined)
			{
				alert('Please Select Courier company and enter tracking code');
				e.preventDefault();
			}
		else{ 
			jQuery(this).attr("href", tURL+tc);
		}		
	});
	// save details
	function saveCourier(cName, tc){
	var CourierDetails = Parse.Object.extend("CourierDetails");
	var courierDetail = new CourierDetails();

	courierDetail.set("c_company" , cName);
	courierDetail.set("t_code" , tc);

	courierDetail.save(null, {
		success: function(data1){
			console.log(data1);
		},
		error: function(data1, error){
			console.log("error");
		}
		})
	}
	

});