//const path= 'http://192.168.10.134:8000/'
//const path= 'http://cses.nexttechnosolutions.com/'
const path= 'http://192.168.10.163:8001/'
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

//core register modal
function coreRegisterPopup(){
	$('.close').trigger('click');
	coreRegisterClear();
	$('#core_register_modal').modal({backdrop: 'static', keyboard: false})  
	$('#core_register_modal').modal('show');
}

//core send function here
function coreRegister(){
	let core_status = coreRegisterValidation();
	if(core_status){ 
		let email = $('#email').val();
		let email_status = emailServerValidation(email);
		if(email_status){
		$('.errorTxt1').html("");	
		let name = $('#name').val() || '';
		let email = $('#email').val() || '';
		let company = $('#company').val() || '';
		let mobile = $('#mobile').val() || '';
		let form_data = { 'name':name,'email':email,'mobile':mobile,'company':company };
		let query_details = {'data':[form_data]}
		console.log(form_data)
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/core_register/',
		async : false,
		data: JSON.stringify(query_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				lobiboxStatus("success","Registered Successfully.  Login Credentials Has Been Sent To Your Email.");	
			}else if(data['data'] == 'NTE-04'){
				lobiboxStatus("info","Registration For This Email ID Already Done.");
			}else{
				lobiboxStatus("error","Registered Failed.");
			}
			$('#core_register_modal').modal('hide');
			coreRegisterClear();
		});
		}else{
			$('.errorTxt1').html("Email is Invaild. Enter Valid Email Id");		
		}
	}
}

//query clear function here
function coreRegisterClear(){
	$('.errormessage').html('');
	message_check_status = false
	$('#core_register')[0].reset();
	let code = getMobileCode() || '+91';
        $('#mobile').val(code);
}

var message_check_status = false
//jquery register captcha validation
$('#message_check_status').change(function() {
	message_check_status = $(this).prop('checked')
	if(message_check_status){$('.errorTxt4').html('');}
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
$('#core_register').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	name: {
	   required: true,
	   lettersonlys: true,
	},
	email: {
	   required: true,
	   email: true,
	},
	mobile: {
	   required: true,
	   mobile_no: true,
	},
	company: {
	   required: true,
	},
   },
   //For custom messages
   messages: {
		name: {
		   required: "Enter Your Name",
		   lettersonlys: "Enter Valid Name",
		},
		email: {
		   required: "Enter Your Email",
		   email: "Enter Valid Email",
		},
		mobile: {
		   required: "Enter Your Mobile Number",
		   mobile_no: "Enter Valid Mobile Number",
		},
		company: {
            	   required: "Enter Your Company Name",
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
function coreRegisterValidation(){
	$('.errorTxt4').html('');
	if(message_check_status){
	return $('#core_register').valid();
	}else{
	$('.errorTxt4').html("Drag the Slider to Register");
	$('#core_register').valid();
	}
}

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

//login pop up
function coreLoginPopup(){
	let login_data = localStorage.getItem('login_details');
	let login_status = localStorage.getItem('login_status');
	let login_id = localStorage.getItem('login_id');
	if(login_status != null && login_status != 'null'){
		let get_data = JSON.parse(login_data);
		if(get_data.length > 0){
			let dashboard = dashboardDetails(get_data);
			$('#core_dashboard_modal').modal({backdrop: 'static', keyboard: false})  
			$('#core_dashboard_modal').modal('show');	
		}else{
			question_status = 0;
			$('input:checkbox').removeAttr('checked');
			$('#core_dfc_modal').modal({backdrop: 'static', keyboard: false})  
			$('#core_dfc_modal').modal('show');
		}
	}else{
		$('.close').trigger('click');
		coreLoginCheckClear();
		$('#core_login_modal').modal({backdrop: 'static', keyboard: false})  
		$('#core_login_modal').modal('show');
	}
	
}

let question1 = ['Disagree','Not sure','Agree']
let question2 = ['It drives some of our initiatives, but is inconsistently and irregularly applied','It drives and informs most of our initiatives, and provides a regular touchstone for focus','It drives all of our initiatives and we continuously adjust based on changing demands']
let question3 = ['Our objectives are narrowly targeted in a limited number of specific areas such as the digital workplace and improving operations',' Our objectives include re-thinking and re-designing our business processes as well as several coordinated initiatives related to the digital customer experience','Our objectives encompass re-thinking and re-designing our business models and processes and we are pursuing a mastery of the digital customer experience']
let question4 = ['Our leadership makes digital transformation a key consideration, but digital initiatives are still loosely-coordinated and aligned with one another','Our leadership makes digital transformation a necessity, and we pursue digital initiatives in a well-coordinated manner','Our leadership makes digital transformation a necessity, enforces behaviors and keeps programs chartered and aligned with the external perspective in mind']
let question5 = ['Entirely','Just Getting Started','Not at all']
let question6 = ['Disagree','Not Sure','Agree']
let question7 = ['Less than 50%','Between 50-75%','Over 75%']
let question8 = ['Yes - we can integrate data and appropriate "back office" business processes for a more advanced customer service and workforce experience','Yes - we can integrate information from multiple sources for a more personalized view for site visitors','No - we do not at this time integrate our business process and data into our customer or employee digital experience']
let question9 = ['We have limited digital skills distributed across various tactical areas','We have moderate digital skills located in some strategic areas or initiatives','We have strong digital skills embedded in all strategic areas and programs']
let question10 = ['Yes - we currently include appropriate external offers on our customer digital properties using APIs','No - not at this time, but we would like to learn more about this topic','No - we have no current plans to use APIs for external offers']
let question11 = ['We occasionally use SMAC (social, mobile, analytics and cloud) technologies for our digital business application','We routinely use SMAC technologies as well as occasionally using next-generation enablers (such as the IoT and intelligent automation) for our digital business applications','We routinely use SMAC technologies as well as a strategic set of next-generation enablers (such as the IoT and intelligent automation) for our digital business applications']
let question12 = ['Less than 50%','Between 50-75%','Over 75%']
//dashboard details
function dashboardDetails(get_data){
	let name = get_data[0]['name'];
	let login_data_level1 = get_data[0]['level1'];
	let login_data_level2 = get_data[0]['level2'];
	let login_data_level3 = get_data[0]['level3'];
	let login_data_level4 = get_data[0]['level4'];
	let login_data_level1_per = get_data[0]['level1_per'];
	let login_data_level2_per = get_data[0]['level2_per'];
	let login_data_level3_per = get_data[0]['level3_per'];
	let login_data_level4_per = get_data[0]['level4_per'];
	let login_data_overall_per = get_data[0]['overall_per'];
	$('#login_data_level1_per').html(login_data_level1_per+'%');
	$('#login_data_level2_per').html(login_data_level2_per+'%');
	$('#login_data_level3_per').html(login_data_level3_per+'%');
	$('#login_data_level4_per').html(login_data_level4_per+'%');
	$('#login_data_overall_per').html(login_data_overall_per+'%');	
	let dfcd_q1 = login_data_level1['question1'] || '';
	let dfcd_q2 = login_data_level1['question2'] || '';
	let dfcd_q3 = login_data_level1['question3'] || '';
	let ls_q1 = login_data_level2['question4'] || '';
	let ls_q2 = login_data_level2['question5'] || '';
	let ls_q3 = login_data_level2['question6'] || '';
	let ed_q1 = login_data_level3['question7'] || '';
	let ed_q2 = login_data_level3['question8'] || '';
	let ed_q3 = login_data_level3['question9'] || '';
	let ce_q1 = login_data_level4['question10'] || '';
	let ce_q2 = login_data_level4['question11'] || '';
	let ce_q3 = login_data_level4['question12'] || '';
	$('#login_name').html('User : '+name);
	$('#questiond1').html('Answered : <b class="core_answer">'+question1[dfcd_q1-1]+'</b>');
	$('#questiond2').html('Answered : <b class="core_answer">'+question2[dfcd_q2-1]+'</b>');
	$('#questiond3').html('Answered : <b class="core_answer">'+question3[dfcd_q3-1]+'</b>');
	$('#questiond4').html('Answered : <b class="core_answer">'+question4[ls_q1-1]+'</b>');
	$('#questiond5').html('Answered : <b class="core_answer">'+question5[ls_q2-1]+'</b>');
	$('#questiond6').html('Answered : <b class="core_answer">'+question6[ls_q3-1]+'</b>');
	$('#questiond7').html('Answered : <b class="core_answer">'+question7[ed_q1-1]+'</b>');
	$('#questiond8').html('Answered : <b class="core_answer">'+question8[ed_q2-1]+'</b>');
	$('#questiond9').html('Answered : <b class="core_answer">'+question9[ed_q3-1]+'</b>');
	$('#questiond10').html('Answered : <b class="core_answer">'+question10[ce_q1-1]+'</b>');
	$('#questiond11').html('Answered : <b class="core_answer">'+question11[ce_q2-1]+'</b>');
	$('#questiond12').html('Answered : <b class="core_answer">'+question12[ce_q3-1]+'</b>');
}

var login_check_status = false
//jquery login captcha validation
$('#login_check_status').change(function() {
	login_check_status = $(this).prop('checked')
	if(login_check_status){$('.errorTxt103').html('');}
    })

//login clear function here
function coreLoginCheckClear(){
	$('.errormessage').html('');
	login_check_status = false
	$('#core_login')[0].reset();
}

//login form validation
$('#core_login').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	lemail: {
	   required: true,
	   email: true,
	},
	lpwd: {
		   required: true,
		   minlength: 8
	   },
   },
   //For custom messages
   messages: {
		lemail: {
		   required: "Enter Your User Name (Email)",
		   email: "Enter Valid User Name (Email)",
		},
 		lpwd: {
		   required: "Enter Your Password",
		   minlength: "Password Must Have At Least 8 Characters And Maximum Of 15 Characters",
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
function coreLoginValidation(){
	$('.errorTxt103').html('');
	if(login_check_status){
	return $('#core_login').valid();
	}else{
	$('.errorTxt103').html("Drag the Slider to Login");
	$('#core_login').valid();
	return false
	}
}

//login function here
function coreLoginCheck(){
	let core_status = coreLoginValidation();
	if(core_status){ 
		let lemail = $('#lemail').val() || '';
		let lpwd = $('#lpwd').val() || '';
		let form_data = { 'lemail':lemail,'lpwd':lpwd};
		let query_details = {'data':[form_data]}
		console.log(form_data)
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/core_login/',
		async : false,
		data: JSON.stringify(query_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				$('#core_login_modal').modal('hide');
				let dashboard = data.dashboard_details;
				let login_id = data.login_details;
				localStorage.setItem('login_details', JSON.stringify(dashboard));
				localStorage.setItem('login_status', 'true');
				localStorage.setItem('login_id', login_id[0]['id']);
				lobiboxStatus("success","Logged In Successfully");
				console.log("==============dashboard==========",dashboard)
				$('input:checkbox').removeAttr('checked');
				if(dashboard.length > 0){
					dashboardDetails(dashboard);
					$('#core_dashboard_modal').modal({backdrop: 'static', keyboard: false})  
					$('#core_dashboard_modal').modal('show');
				}else{
					$('#core_dfc_modal').modal({backdrop: 'static', keyboard: false})  
					$('#core_dfc_modal').modal('show');
				}
			}else{
				lobiboxStatus("error","Logged In Failed. Try to Register.");
			}
			coreLoginCheckClear();
		});
	}
}

var question_status = 0
//level 2 function here
function coreLevel2(){
	question_status = 1
	let status = levelValidaiton(['question1','question2','question3'],['errorTxt201','errorTxt202','errorTxt203'],'level1');
	if(status){
	question_status = 0
	$('#core_ls_modal').modal({backdrop: 'static', keyboard: false})  
	$('#core_ls_modal').modal('show');
	}
}

//level 3 function here
function coreLevel3(){    
	question_status = 1
	let status = levelValidaiton(['question4','question5','question6'],['errorTxt204','errorTxt205','errorTxt206'],'level2')
	if(status){
	question_status = 0
	$('#core_ed_modal').modal({backdrop: 'static', keyboard: false})  
	$('#core_ed_modal').modal('show');
	}
}

//level 4 function here
function coreLevel4(){
	question_status = 1
	let status = levelValidaiton(['question7','question8','question9'],['errorTxt207','errorTxt208','errorTxt209'],'level3')
	if(status){
	question_status = 0
	$('#core_cs_modal').modal({backdrop: 'static', keyboard: false})  
	$('#core_cs_modal').modal('show');
	}
}

//level back 1 function here
function coreLevelBack1(){
	question_status = 0
	$('#core_dfc_modal').modal({backdrop: 'static', keyboard: false})  
	$('#core_ls_modal').modal('hide');
	$('#core_dfc_modal').modal('show');
}

//level back 2 function here
function coreLevelBack2(){
	question_status = 0
	$('#core_ls_modal').modal({backdrop: 'static', keyboard: false})  
	$('#core_ed_modal').modal('hide');
	$('#core_ls_modal').modal('show');
}

//level back 3 function here
function coreLevelBack3(){
	question_status = 0
	$('#core_ed_modal').modal({backdrop: 'static', keyboard: false})  
	$('#core_cs_modal').modal('hide');
	$('#core_ed_modal').modal('show');
}

//completed test data function here
function coreCompleted(){
	question_status = 1
	let status = levelValidaiton(['question10','question11','question12'],['errorTxt210','errorTxt211','errorTxt212'],'level4')
	let login_id = localStorage.getItem('login_id');
	if(status && login_id != null){
		question_status = 0
		let datas = {}
		datas['level1'] = [level1]
		datas['level2'] = [level2]
		datas['level3'] = [level3]
		datas['level4'] = [level4]
		datas['cus_id'] = login_id
		let answer_details = {'data':[datas]}
		console.log(login_id,"------------------datas----------------",answer_details)
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/core_test/',
		async : false,
		data: JSON.stringify(answer_details),
		}).done( function(json_data) { 
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				lobiboxStatus("success","Test Completed Successfully. Try to Login Again.");
			}else if(data['data'] == 'NTE-02'){
				lobiboxStatus("info","Test Already Completed. Try to Login Again.");
			}else{
				lobiboxStatus("error","Logged In Failed. Try to Retest Again.");
			}
		});
		$('#core_cs_modal').modal('hide');
		testCompleteLogout();
	}
}

//core test complete logout
function testCompleteLogout(){
	$('.close').trigger('click');
	$('#core_dashboard_modal').modal('hide');
	dashboard = [];
	localStorage.setItem('login_details', null);
	localStorage.setItem('login_status', null);
	localStorage.setItem('login_id', null);
}

//core logout function here
function coreLogout(){
	$('.close').trigger('click');
	$('#core_dashboard_modal').modal('hide');
	dashboard = [];
	localStorage.setItem('login_details', null);
	localStorage.setItem('login_status', null);
	localStorage.setItem('login_id', null);
	lobiboxStatus("success","Logged Out Successfully");	
}

// the selector will match all input controls of type :checkbox
// and attach a click event handler 
$("input:checkbox").on('click', function() {
  // in the handler, 'this' refers to the box clicked on
  var $box = $(this);
  if ($box.is(":checked")) {
    // the name of the box is retrieved using the .attr() method
    // as it is assumed and expected to be immutable
    var group = "input:checkbox[name='" + $box.attr("name") + "']";
    console.log("-----------------",group);
    // the checked state of the group/box on the other hand will change
    // and the current value is retrieved using .prop() method
    $(group).prop("checked", false);
    var selectval = $box.prop("checked", true);
  } else {
    $box.prop("checked", false);
  }
});

level1 = {'question1':0,'question2':0,'question3':0}
level2 = {'question4':0,'question5':0,'question6':0}
level3 = {'question7':0,'question8':0,'question9':0}
level4 = {'question10':0,'question11':0,'question12':0}

//level validaitons function here
function levelValidaiton(questions,ids,level){
	if(level == 'level1'){
		let question1 = level1[questions[0]] == 0 ? $('.'+ids[0]).html('Select Any Option') : $('.'+ids[0]).html('');
		let question2 = level1[questions[1]] == 0 ? $('.'+ids[1]).html('Select Any Option') : $('.'+ids[1]).html('');
		let question3 = level1[questions[2]] == 0 ? $('.'+ids[2]).html('Select Any Option') : $('.'+ids[2]).html('');
		return level1[questions[0]] != 0 && level1[questions[1]] != 0 && level1[questions[2]] != 0 ? true : false
	}else if(level == 'level2'){
		let question1 = level2[questions[0]] == 0 ? $('.'+ids[0]).html('Select Any Option') : $('.'+ids[0]).html('');
		let question2 = level2[questions[1]] == 0 ? $('.'+ids[1]).html('Select Any Option') : $('.'+ids[1]).html('');
		let question3 = level2[questions[2]] == 0 ? $('.'+ids[2]).html('Select Any Option') : $('.'+ids[2]).html('');
		return level2[questions[0]] != 0 && level2[questions[1]] != 0 && level2[questions[2]] != 0 ? true : false
	}else if(level == 'level3'){
		let question1 = level3[questions[0]] == 0 ? $('.'+ids[0]).html('Select Any Option') : $('.'+ids[0]).html('');
		let question2 = level3[questions[1]] == 0 ? $('.'+ids[1]).html('Select Any Option') : $('.'+ids[1]).html('');
		let question3 = level3[questions[2]] == 0 ? $('.'+ids[2]).html('Select Any Option') : $('.'+ids[2]).html('');
		return level3[questions[0]] != 0 && level3[questions[1]] != 0 && level3[questions[2]] != 0 ? true : false
	}else if(level == 'level4'){
		let question1 = level4[questions[0]] == 0 ? $('.'+ids[0]).html('Select Any Option') : $('.'+ids[0]).html('');
		let question2 = level4[questions[1]] == 0 ? $('.'+ids[1]).html('Select Any Option') : $('.'+ids[1]).html('');
		let question3 = level4[questions[2]] == 0 ? $('.'+ids[2]).html('Select Any Option') : $('.'+ids[2]).html('');
		return level4[questions[0]] != 0 && level4[questions[1]] != 0 && level4[questions[2]] != 0 ? true : false
	}
}
//level1
$('#question1').change(function() {
  var values = 0.00;
  {
    level1['question1'] = 0
    $('#question1 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level1['question1'] = values
      // }
    });
    console.log( parseFloat(values),level1);
    if(question_status != 0){
    $('.errorTxt201').html('');
    }
    //levelValidaiton(['question1','question2','question3'],['errorTxt201','errorTxt202','errorTxt203'],'level1')
  }
});
$('#question2').change(function() {
  var values = 0.00;
  {
    level1['question2'] = 0
    $('#question2 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level1['question2'] = values
      // }
    });
    console.log( parseFloat(values),level1);
    if(question_status != 0){
    $('.errorTxt202').html('');
    }
    //levelValidaiton(['question1','question2','question3'],['errorTxt201','errorTxt202','errorTxt203'],'level1')
  }
});
$('#question3').change(function() {
  var values = 0.00;
  {
    level1['question3'] = 0
    $('#question3 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level1['question3'] = values
      // }
    });
    console.log( parseFloat(values),level1);
    if(question_status != 0){
    $('.errorTxt203').html('');
    }
    //levelValidaiton(['question1','question2','question3'],['errorTxt201','errorTxt202','errorTxt203'],'level1')
  }
});
//level2
$('#question4').change(function() {
  var values = 0.00;
  {
    level2['question4'] = 0
    $('#question4 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level2['question4'] = values
      // }
    });
    console.log( parseFloat(values),level2);
    if(question_status != 0){
    $('.errorTxt204').html('');
    }
    //levelValidaiton(['question4','question5','question6'],['errorTxt204','errorTxt205','errorTxt206'],'level2')
  }
});
$('#question5').change(function() {
  var values = 0.00;
  {
    level2['question5'] = 0
    $('#question5 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level2['question5'] = values
      // }
    });
    console.log( parseFloat(values),level2);
    if(question_status != 0){
    $('.errorTxt205').html('');
    }
    //levelValidaiton(['question4','question5','question6'],['errorTxt204','errorTxt205','errorTxt206'],'level2')
  }
});
$('#question6').change(function() {
  var values = 0.00;
  {
    level2['question6'] = 0
    $('#question6 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level2['question6'] = values
      // }
    });
    if(question_status != 0){
    $('.errorTxt206').html('');
    }
    console.log( parseFloat(values),level2);
    //levelValidaiton(['question4','question5','question6'],['errorTxt204','errorTxt205','errorTxt206'],'level2')
  }
});
//level3
$('#question7').change(function() {
  var values = 0.00;
  {
    level3['question7'] = 0
    $('#question7 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level3['question7'] = values
      // }
    });
    console.log( parseFloat(values),level1);
    if(question_status != 0){
    $('.errorTxt207').html('');
    }
    //levelValidaiton(['question7','question8','question9'],['errorTxt207','errorTxt208','errorTxt209'],'level3')
  }
});
$('#question8').change(function() {
  var values = 0.00;
  {
    level3['question8'] = 0
    $('#question8 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level3['question8'] = values
      // }
    });
    if(question_status != 0){
    $('.errorTxt208').html('');
    }
    console.log( parseFloat(values),level1);
    //levelValidaiton(['question7','question8','question9'],['errorTxt207','errorTxt208','errorTxt209'],'level3')
  }
});
$('#question9').change(function() {
  var values = 0.00;
  {
    level3['question9'] = 0
    $('#question9 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level3['question9'] = values
      // }
    });
    console.log( parseFloat(values),level1);
    if(question_status != 0){
    $('.errorTxt209').html('');
    }
    //levelValidaiton(['question7','question8','question9'],['errorTxt207','errorTxt208','errorTxt209'],'level3')
  }
});
//level4
$('#question10').change(function() {
  var values = 0.00;
  {
    level4['question10'] = 0
    $('#question10 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level4['question10'] = values
      // }
    });
    console.log( parseFloat(values),level1);
    if(question_status != 0){
    $('.errorTxt210').html('');
    }
    //levelValidaiton(['question10','question11','question12'],['errorTxt210','errorTxt211','errorTxt212'],'level4')
  }
});
$('#question11').change(function() {
  var values = 0.00;
  {
    level4['question11'] = 0
    $('#question11 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level4['question11'] = values
      // }
    });
    console.log( parseFloat(values),level1);
    if(question_status != 0){
    $('.errorTxt211').html('');
    }
    //levelValidaiton(['question10','question11','question12'],['errorTxt210','errorTxt211','errorTxt212'],'level4')
  }
});
$('#question12').change(function() {
  var values = 0.00;
  {
    level4['question12'] = 0
    $('#question12 :checked').each(function() {
      //if(values.indexOf($(this).val()) === -1){
      values=values+parseFloat(($(this).val()));
      level4['question12'] = values
      // }
    });
    console.log( parseFloat(values),level1);
    if(question_status != 0){
    $('.errorTxt212').html('');
    }
    //levelValidaiton(['question10','question11','question12'],['errorTxt210','errorTxt211','errorTxt212'],'level4')
  }
});


//forgot password
function coreForgotPasswordPopup(){
	$('.close').trigger('click');
	coreForgotPasswordClear();
	$('#core_forgot_password_modal').modal({backdrop: 'static', keyboard: false}) 
	$('#core_forgot_password_modal').modal('show');
}

//forgot password
function coreForgotPasswordClear(){
	$('.errormessage').html('');
	$('#core_forgot_password_inform')[0].reset();
	tc_lfcheck_status = false;
	$('#job_forgot_password_otp,#femail').prop('disabled',false);
}

//re enter password validation
jQuery.validator.addMethod('re_password', function (value) {
  return $('#fpwd1').val() == $('#fpwd2').val() ? true : false;
}, "");

var tc_lfcheck_status = false
//forgot slider validation
$('#tc_lfcheck_status').change(function() {
	tc_lfcheck_status = $(this).prop('checked');
	if(tc_lfcheck_status){$('.errorTxt74').html('');}
    })

//forgot login change
$('#core_forgot_password_inform').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	   femail:
	   {
		   required: true,
		   email: true,
	   },	
	   fotp:{
		   required: true,
	   },
	   fpwd1: {
		   required: true,
		   minlength: 8
	   },
	   fpwd2: {
		   required: true,
		   re_password: true,
	   },
   },
   //For custom messages
   messages: {
	   femail:
	   {
		   required: "Enter Your Email",
		   email: "Enter Valid Email",
	   },
	   fpwd1: {
		   required: "Enter Your New Password.",
		   minlength: "Password Must Have At Least 8 Characters And Maximum Of 15 Characters",
       	   },
	   fotp:{
		   required: "Enter the OTP Mailed",
	   },
	   fpwd2: {
	 	   required: "Re-Enter Your New Password",
		   re_password : "Re-Enter Your New Password Is Mismatch To New Password",
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

//forgot login form validations here
function forgot_login_form_validation(){	
	$('.errorTxt74').html('');
	if(tc_lfcheck_status){
	return $('#core_forgot_password_inform').valid();
	}else{
	$('.errorTxt74').html("Drag the Slider to Save");
	$('#core_forgot_password_inform').valid();
	}
}


//forgot password save function here
function coreForgotPasswordUpdate(){
	$('.errorTxt71').html('');
	let forgot_password_status = forgot_login_form_validation();
	if(forgot_password_status){
		let form_data = getFormData($('#core_forgot_password_inform'));
		form_data['femail'] = $('#femail').val();
		let forgot_details = {'data':[form_data]}
		console.log(form_data)
		$.ajax({
		type  : 'PUT',
		url   : path+'api/v1/ta/core_password_reset/',
		async : false,
		data: JSON.stringify(forgot_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-02'){
				lobiboxStatus("success","Your Password has been Reset Successfully.");	
				coreForgotPasswordClear();
				coreLoginPopup();
			}else{
				lobiboxStatus("error","Your Password has been Reset Failed. Check your OTP.");		
			}
		});
	}
}

//forgot password otp send
function coreForgotPasswordOTP(){
	$('.errorTxt71').html('');
	let email = $('#femail').val();
	let status = isEmail(email);
	if(status && email != ''){
		form_data = {}
		form_data['email_id'] = email;
		let email_details = {'data':[form_data]}
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/core_otp/',
		async : false,
		data: JSON.stringify(email_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				$('#core_forgot_password_otp,#femail').prop('disabled',true);
				lobiboxStatus("success","OTP Sent Successfully. Check Your Mail.");	
			}else{
				$('#core_forgot_password_otp,#femail').prop('disabled',false);
				lobiboxStatus("error","OTP Sent Failed. Check Email ID");	
			}
		});
	}else{
		$('.errorTxt71').html('Enter Valid Email');	
		$('#core_forgot_password_otp,#femail').prop('disabled',false);
	}
}

//email validation
function isEmail(email) {
    $('.errorTxt71').html('');
    var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return regex.test(email);
}

//get form datas
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
