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
			var link = tURL+tc;
			saveCourier(cName, tc, link); 
			jQuery(this).attr("href", tURL+tc);
		}		
	});
	// save details
	function saveCourier(cName, tc, link){
		var CourierDetailsP = Parse.Object.extend("CourierDetailsP");
		var courierDetailP = new CourierDetailsP();
		var user = Parse.User.current();
		courierDetailP.set("c_company" , cName);
		courierDetailP.set("t_code" , tc);
		courierDetailP.set("link" , link);
		courierDetailP.set("user" , user);
		courierDetailP.setACL(new Parse.ACL(Parse.User.current()));
		courierDetailP.save(null, {
		success: function(data1){
			console.log(data1);
 			getC();
		},
		error: function(data1, error){
			console.log("error");
		}
		})
	}
	
function getC(){
	var CourierDetailsP = Parse.Object.extend("CourierDetailsP");
	var query = new Parse.Query(CourierDetailsP);
	query.descending('createdAt');
	var user = Parse.User.current();
	query.equalTo("user", user);
	query.limit(25);
	query.find({
		success: function(results){
			$("#trackingTitle").text("Your Tracking history");
			$("#cList").html("");
			//var template = Handlebars.compile($("#single-story-template").html());
			$(results).each(function(index, val) {
				 /* iterate through array or object */
				 var s = val.toJSON();
				 $("#cList").append("<li class='list-group-item'><a href="+s.link+" target='_blank' > Track <strong>"+s.c_company+"</strong> with tracking No. "+s.t_code+"</a></li>");

			});
		},
		error: function(error){
			console.log(error.message);
		}
	}) 


}

	var currentUser = Parse.User.current();
	if (currentUser) {
	    // do stuff with the user
	    getC();
	    $("#sign-in, .signup").hide();
	    $("#logout-container").show();

	} else {
	    // show the signup or login page
	    $("#sign-in, .signup").show();
	    $("#logout-container").hide();
	}
	$("#login").click(function() {
		/* Act on the event */
		var l_un = $("#l-email").val();
		var l_pw = $("#l-pw").val();
		console.log(l_un);
		console.log(l_pw);
		Parse.User.logIn(l_un, l_pw, {
		  success: function(user) {
		    // Do stuff after successful login.
		    getC();
		    $("#logout-container").show();
		    $("#sign-in, .signup").hide();
		  },
		  error: function(user, error) {
 			console.log(error.message);		  }
		});
	});
	$("#sign-up").click(function() {
		/* Act on the event */
		var r_un = $("#r-email").val();
		var r_pw = $("#r-pw").val();
		console.log(r_un);
		console.log(r_pw);
		var user = new Parse.User();
			user.set("username", r_un);
			user.set("password", r_pw);
			user.set("email", r_un);

 
		user.signUp(null, {
		  success: function(user) {
		    // Hooray! Let them use the app now.
		     getC();
		     $("#logout-container").show();
		    $("#sign-in, .signup").hide();
		  },
		  error: function(user, error) {
		    // Show the error message somewhere and let the user try again.
		    alert("Error: "  + error.message);
		  }
		});
	});

	$("#logOut").click(function() {
		Parse.User.logOut();
		$("#trackingTitle").text("To view your tracking history Sign In");
		$("#cList").html("");
		 $("#sign-in, .signup").show();
		 $("#logout-container").hide();
	});
	Parse.Config.get().then(function(config) {
	  console.log("Yay! Config was fetched from the server.");
	   
	  var welcomeMessage = config.get("welcome_message");
	  console.log("Welcome Message = " + welcomeMessage);
	$("#welcome_message").text(welcomeMessage);
	  welcome_message
	}, function(error) {
	  console.log("Failed to fetch. Using Cached Config.");
	 
	  var config = Parse.Config.current();
	  var welcomeMessage = config.get("welcome_message");
	  if (welcomeMessage === undefined) {
	    welcomeMessage = "Welcome!";
	  }
	  console.log("Welcome Message = " + welcomeMessage);
	});

});
