const path= 'http://mynext.nexttechnosolutions.com/'
const headers_content = {
	'Content-Type':'application/json',
    }
var country_code = 'IN';
let mobile_val = {
    "US":/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
    "AU":/^(?:\+?61|0)4(?:[01]\d{3}|(?:2[1-9]|3[0-57-9]|4[7-9]|5[0-15-9]|6[679]|7[3-8]|8[1478]|9[07-9])\d{2}|(?:20[2-9]|444|52[0-6]|68[3-9]|70[0-7]|79[01]|820|890|91[0-4])\d|(?:200[0-3]|201[01]|8984))\d{4}$/,
    "SD":/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/,
    "SI":/^(?:0|94|\+94)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|912)(0|2|3|4|5|7|9)|7(0|1|2|5|6|7|8)\d)\d{6}$/,
    "BE":/^((\+|00)32\s?|0)(\d\s?\d{3}|\d{2}\s?\d{2})(\s?\d{2}){2}$/,
    "IN":/^(\+91-|\+91|0)?\d{10}$/
}

let mobile_code = {
    "US":'1',
    "AU":'43',
    "SD":'+94',
    "SI":'+94',
    "BE":'32',
    "PG":'675',
    "IN":'+91'
}

//get mobile code
function getMobileCode(){
	return mobile_code['country_code']
}

//country code using validation
 jQuery(document).ready(function($) {
$.getScript('http://www.geoplugin.net/javascript.gp', function() 
	{
	var country = geoplugin_countryName();
	var code = geoplugin_countryCode();
	country_code = code;
	});
});

//lobibox status
function lobiboxStatus(type,msg_content){
    if(type == "primary"){
         Lobibox.notify('primary', {

			position: 'top right',
			msg: msg_content
		});
    }else if(type == "success"){
         Lobibox.notify('success', {

			position: 'top right',
			msg: msg_content
		});
    }else if(type == "info"){
         Lobibox.notify('info', {

			position: 'top right',
			msg: msg_content
		});
    }else if(type == "warning"){
         Lobibox.notify('warning', {

			position: 'top right',
			msg: msg_content
		});
    }else if(type == "error"){
         Lobibox.notify('error', {

			position: 'top right',
			msg: msg_content
		});
    }
   
}

//query send function here
function querySend(){
	let query_status = queryValidation();
	if(query_status){
		let email = $('#qemail').val();
		let email_status = emailServerValidation(email);
		if(email_status){
		$('.errorTxt1').html("");	
		let name = $('#name').val() || '';
		let email = $('#qemail').val() || '';
		let message = $('#comments').val() || '';
		let feed_mobile = $('#feed_mobile').val() || '';
		let feed_type = 4;
		let feed_role = 8;
		let rating = 5
		let form_data = { 'feed_name':name,'feedback_email':email,'feed_mobile':feed_mobile,'feed_comments':message,'feed_type':feed_type,'feed_role':feed_role,'rating':rating };
		let query_details = {'data':[form_data],'type':'REACH'}
		console.log(form_data)
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/feedback/',
		async : false,
		data: JSON.stringify(query_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				lobiboxStatus("success","Message Sent Successfully.");	
			}else if(data['data'] == 'NTE-04'){
				lobiboxStatus("info","Message Already Sent..");
			}else{
				lobiboxStatus("error","Message Sent Failed..");
			}
			$('.sbt-btn').trigger('click');
			queryClear()
		});
		}else{
			$('.errorTxt1').html("Email is Invaild. Enter Valid Email Id");		
		}
	}
}

//query clear function here
function queryClear(){
	message_check_status = false
	$('#query_send')[0].reset();
	$('.errormessage').html('');
	let code = getMobileCode() || '+91';
        $('#feed_mobile').val(code);
}

var message_check_status = false
//jquery candidate captcha validation
$('#message_check_status').change(function() {
	message_check_status = $(this).prop('checked')
	if(message_check_status){$('.errorTxt1014').html('');}
    })

//email validation
$.validator.addMethod("email", function(value, element) {
var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
if( !emailReg.test( value ) ) {
    return false;
} else {
    return true;
}
});

//mobile validation
$.validator.addMethod('mobile_no', function (value, element) {
    return this.optional(element) || mobile_val[country_code].test(value);
}, "Please enter a valid phone number");


//query form validation
$('#query_send').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	name: {
	   required: true,
	   lettersonlys: true,
	},
	qemail: {
	   required: true,
	   email: true,
	},
	feed_mobile: {
	   required: true,
	   mobile_no: true,
	},
	comments: {
	   required: true,
	},
   },
   //For custom messages
   messages: {
		name: {
		   required: "Enter Name",
		   lettersonlys: "Enter Valid Name",
		},
		qemail: {
		   required: "Enter Email",
		   email: "Enter Valid Email",
		},
		feed_mobile: {
		   required: "Enter Mobile Number",
		   mobile_no: "Enter Valid Mobile Number",
		},
		comments: {
            	   required: "Enter Message",
        	},
 	
   },
   errorElement: 'div',
   errorPlacement: function(error, element) {
       var placement = $(element).data('error');
       if (placement) {
           $(placement).append(error)
       } else {
           error.insertAfter(element);
       }
   },
   ignore: []
});

//job apply form validation here
function queryValidation(){
	$('.errorTxt1014').html('');
	if(message_check_status){
	return $('#query_send').valid();
	}else{
	$('.errorTxt1014').html("Drag the Slider to Submit");
	$('#query_send').valid();
	}
}

// popup close function

$(".popup_close").click(function () {
         $('.contact-form-sec-inner').removeClass('mystyle');
});

//letter validation
$.validator.addMethod("lettersonlys", function(value, element) {
  return this.optional(element) || /^[a-zA-Z ]*$/.test(value);
}, "");

//email validation for server side
function emailServerValidation(email){
		let email_data = JSON.stringify({'data':[{'email':email}]});
		let status = false;
    		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/email_validation/',
		async : false,
		data: email_data,
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				status = true
			}else{
				status = false		
			}
		});
		return status
}
