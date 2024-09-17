const path= 'http://mynext.nexttechnosolutions.com/'
const image_path = 'http://mynext.nexttechnosolutions.com/media/user_profile/'
const flags_path = 'http://mynext.nexttechnosolutions.com/media/flags/png/'
const headers_content = {
	'Content-Type':'application/json',
    }
var cat_id = 0;
var hca_data = {};
var country_code = 'IN';
let mobile_val = {
    "US":/^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
    "UK":/^(07[\d]{8,12}|447[\d]{7,11})$/,
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
let zip_val = {
    "US": /^\d{5}([\-]?\d{4})?$/,
    "UK": /^(GIR|[A-Z]\d[A-Z\d]??|[A-Z]{2}\d[A-Z\d]??)[ ]??(\d[A-Z]{2})$/,
    "AU": /^(0[289][0-9]{2})|([1345689][0-9]{3})|(2[0-8][0-9]{2})|(290[0-9])|(291[0-4])|(7[0-4][0-9]{2})|(7[8-9][0-9]{2})$/,
    "BE": /^[1-9]{1}[0-9]{3}$/,
    "SD": /^\d{4}$/,
    "IN": /^\d{6}$/,
    "PG": /^\d{3}$/,
    "SI": /^\d{4}$/
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

//get dropdown details
function getDropDown(){
	let gender_url = path+'api/v1/ta/gender/'
	getDropDownServer(gender_url,'gender','Gender');
	let country_url = path+'api/v1/ta/country/'
	getDropDownServer(country_url,'country','Country');
}

//dropdown change country
$("#state").change(function () {
	if($("#state").val() !=0){
		$("#state-error").html("");   	
	}
    });

//dropdown change country
$("#country").change(function () {
    $("#country-error").html("");
        let country_id = this.value;
       	let state_url = path+'api/v1/ta/country/'+country_id+'/'
	getDropDownServer(state_url,'state','State');
    });

//get dropdown in server
function getDropDownServer(given_url,id,name){
	$.ajax({
		url: given_url,
		headers : headers_content,
		method: 'GET',
		dataType: 'json',
		success: function(result){
		let data = result['data'];
		optionAppend = '<option value="0">--Select '+name+'--</option>'
		for(let i=0; i<data.length; i++){
			if(id == 'country'){
				optionAppend += '<option id="'+data[i].img+'" value='+data[i].id+'>'+data[i].name+'</option>'
			}else{
				optionAppend += '<option value='+data[i].id+'>'+data[i].name+'</option>'	
			}
		}
		$('#'+id).html(optionAppend);
		if(id == 'country'){
			$("#"+id).select2(
			{ templateResult: formatState }
			);
		}else if(id == 'state'){
			$("#"+id).select2(
			{  }
			);
		}
	},
	error: function (data) {
		 $('#'+id).html('Data Service Unavailable. Try Again Later.');
	}
	});
}

//image append
function formatState (state) {
	if (!state.id || state.id == '0' ) { return state.text; }
	var $state = $(
	'<span ><img sytle="display: inline-block;" src="'+flags_path+state.element.id.toLowerCase() + '" /> ' + state.text + '</span>'
	);
	return $state;
}

//get all job category
function getJobCategory(){
	let url = path+'api/v1/ta/job_category/';
	let data = { 'status':'category' };
	getServer(url,'job_details_cat',data);
}

//get all job details
function jobDetailsFetch(category_id,title){
	$('#dynamic_job_title').html(title);
	$('#category_div,#job_search,#job_details_all,#job_details_title').show();
	$('#job_details_cat,#job_details_cat_title,#job_category_search').hide();
	cat_id = category_id;
	let url = path+'api/v1/ta/job_openings/'+cat_id+'/';
	let data = { 'status':'job_details' };
	getServer(url,'job_details_all',data); 
}

//cat div click
function categoryDivClick(){
	$('#job_details_cat_title,#job_details_cat,#job_category_search').show();
	$('#category_div,#job_search,#job_details_all,#job_details_title').hide();
}

//get latest job details
function getLatestJob(){
	let url = path+'api/v1/ta/latest_job_openings/'
	let data = { 'status':'job_details' };
	getServer(url,'job_details_latest',data);
}

//get hcms details
function getHCADetails(){
	let url = path+'api/v1/ta/hca_details/'
	let data = { 'status':'hca_details' };
	getServer(url,'hca_details',data);
}

//get job details fitler details
$('#job_name').keyup(function (e) {
	let filter_name = $(this).val() || '';
	let url = filter_name == '' ? path+'api/v1/ta/job_openings/'+cat_id+'/' : path+'api/v1/ta/job_openings/'+cat_id+'/'+filter_name+'/';
	let data = { 'status':'job_details' };
	getServer(url,'job_details_all',data);
	$('#job_search').show();
});

//get job category details fitler details
$('#job_category_name').keyup(function (e) {
	let filter_name = $(this).val() || '';
	let url = filter_name == '' ? path+'api/v1/ta/job_category/':  path+'api/v1/ta/job_category/'+filter_name+'/';
	let data = { 'status':'category' };
	getServer(url,'job_details_cat',data);
//$('#job_search').show();
});
 

//get job in server call
function getServer(given_url,tbl_id,status_data){
	$.ajax({
		url: given_url,
		headers : headers_content,
		method: 'GET',
		dataType: 'json',
		success: function(result){ 
		let data = result['data'];
		if(status_data['status'] == 'category'){
			dataFormCategory(data,tbl_id);//cat data form
		}else if(status_data['status'] == 'hca_details'){
			dataFormHCADetails(data,tbl_id);//hca data form
		}else{
			dataFormJobDetails(data,tbl_id);//job data form
		}
	},
	error: function (data) {
		 $('#'+tbl_id).html('<div class="col-sm-12"><p class="not_found">Data Service Unavailable. Try Again Later.</div>');
		 $('#no_data_found_latest').html('<div class="col-sm-12"><p class="not_found">Data Service Unavailable. Try Again Later..</p></div>');	
	}
	});
}

//category data form in div
function dataFormCategory(data,tbl_id){
//	alert(JSON.stringify(data))
	let len_data = data.length;
		if(len_data > 0){
		let job_cat_content = ''
		for(let i=0; i<data.length; i++){
			let img = 'dev/images/category/'+data[i].image+'.png';
			let job_count = data[i].job_count == 0 ? 'No Job' :  data[i].job_count == 1 ? '1 Job' : data[i].job_count  +' Jobs';
			job_cat_content += 
				'<div class="col-md-3 col-sm-12 pos-apply-box" data-wow-delay="1s" onclick="jobDetailsFetch('+data[i].id+',\''+data[i].name+'\')">'
				+'<div class="position-open-box hvr-icon-pop">'
				+'<img src="'+img+'" class="hvr-icon cat-hvr-icon">'
				+'<h5><b>'+data[i].name+'</b></h5>'
				+'<span class="job_count">'+job_count+'</span>'
				+'</div>'
				+'</div>'
		}
		$('#'+tbl_id).html(job_cat_content);
	}else{
		//lobiboxStatus('error','No data in category');
	$('#'+tbl_id).html('<div class="col-sm-12"><p class="not_found">No Category Found.</p></div>');
	}
}

//job data form in div
function dataFormJobDetails(data,tbl_id){
	$('#no_data_found_latest').html('');
	let len_data = data.length;
	if(len_data > 0){
		let job_content = ''
		for(let i=0; i<data.length; i++){
			let img = 'dev/images/jobs/'+data[i].logo_type_id+'.png';
			if(tbl_id == 'job_details_latest'){
			   let count = 250;
			   let stars = (data[i].job_short_description).slice(0, count) + ((data[i].job_description).length > count ? '<span class="latest_job_dots" title="Need Extra Information" onclick="jobApplyDescription('+data[i].id+',\''+data[i].job_cat_id+'\')"> ...<span>' : '');
			   job_content += 
				'<div class="item">'
				+'<div class="media">'
				+'<div class="media-left media-top"> <img data-wow-delay="0s" src="'+img+'" class="wow zoomIn media-object" style="max-width: 60px;"> </div>'
				+'<div class="media-body">'
				+'<h5 class="media-heading">'+data[i].title+'</h5>'
				+'<div>'+stars+'</div>'
				+'<div>Skills: '+data[i].key_skills+'</div>'
				+'<div>Post Date: '+data[i].date_opened+'</div>'
				+'<div>'+data[i].work_experience+'</div>'
				+'<a class="apply-txt pos-apply-btn btn btn-success btn-eql-wid btn-animate" onclick="jobApplyDescription('+data[i].id+',\''+data[i].job_cat_id+'\')" >Apply now</a>'
				+'</div>'
				+'</div>'
				+'</div>'		
			}else{
			   job_content += 
				'<div class="col-md-4 col-sm-12 pos-apply-box" data-wow-delay="1s">'
				+'<div class="position-open-box hvr-icon-pop">'
				+'<img src="'+img+'" class="hvr-icon job-details-icons">'
				+'<h5><b>'+data[i].title+'</b></h5>'
				+'<span>'+data[i].key_skills+'</span>'
				+'<a class="pos-apply-btn btn btn-warning btn-eql-wid btn-animate" onclick="jobApplyDescription('+data[i].id+',\''+data[i].job_cat_id+'\')">Apply</a>'
				+'</div>'
				+'</div>'
			}
		}
		$('#'+tbl_id).html(job_content);
		if(tbl_id == 'job_details_latest'){
				owlSlider('job_details_latest');
		}else{
			$('#number_of_jobs').html(len_data);
		}
				
	}
	else{
		
		if(tbl_id != 'job_details_latest'){
			$('#'+tbl_id).html('<div class="col-sm-12"><p class="not_found">No Jobs Found.</p></div>');
			$('#number_of_jobs').html(len_data);
		}else{
			$('#no_data_found_latest').html('<div class="col-sm-12"><p class="not_found">No Jobs Found.</p></div>');	
		}
	}
}

//put hca details
function dataFormHCADetails(data,tbl_id){
	let len_data = data.length;
	if(len_data > 0){
		hca_data = data
		let hca_content = ''
		for(let i=0; i<data.length; i++){
			hca_content += 
				'<li onclick="hcaDetails(\''+data[i].name+'\',\''+i+'\')"><a href="#">'+data[i].name+'</a></li>';	
		}
		$('#'+tbl_id).html(hca_content);
	}else{
		$('#'+tbl_id).html('<div class="col-sm-12"><p class="not_found">No Data Found.</p></div>');
	}
}

//hca pop up here
function hcaDetails(title,index){
	let content = hca_data[index].details
	$('#hca_title').html(title);
	$('#hca_contents').html(content);
	$('#hca_div_details').modal('show');
}

//get expertise function here
function getMeetExpertise(){
	let given_url = path+'api/v1/ta/meet_expertise/';
	let id = 'meet_our_expertise';
	$.ajax({
		url: given_url,
		headers : headers_content,
		method: 'GET',
		dataType: 'json',
		success: function(result){
		let data = result['data'];
		formMeetExpertise(data,id);//data form
	},
	error: function (data) {
		 $('.expert-div').html('<div class="col-sm-12"><p class="not_found">Data Service Unavailable. Try Again Later.</p></div>');	
	}
	});
}

//get meet expertise function here
function formMeetExpertise(data,id){
	let data_len = data.length;
	let meet_expertise = ''
	if(data_len){
	let count = 0;
	meet_expertise += '<div class="row">'
	for( let i=0; i<data_len; i++){
		count += 1 ; 
		meet_expertise += '<div class="col-md-6">'
			      +'<img class="meet_expertise"  src="'+image_path+data[i].profile+'" />'
				+'<div>'
				 +'<p title="Name" class="meet_name">'+data[i].name+'</p>'
				 +'<p title="Joined Year" class="meet_year"> Since '+data[i].jd+'</span></p>'
				 +'<p title="Role" class="meet_role">'+data[i].role+'</span></p>'
			      +'</div>'
			   +'</div>';
		if(count == 2){
			count = 0;
			if((i+1) != data_len){
				meet_expertise += '</div><div class="row">'
			}else{
				meet_expertise += '</div>'			
			}
		}
	}
	}else{
		meet_expertise += '<div class="col-sm-12"><p class="not_found">No Jobs Found.</p></div>'
	}
	$('#'+id).html(meet_expertise);
	owlSlider(id);
}

//owl slider function here
function owlSlider(id){
	 var owl = $('#'+id);
           owl.owlCarousel({
             items: 1,
             loop: true,
             margin: 10,
             autoplay: true,
             autoplayTimeout: 5000,
             autoplayHoverPause: true
           });
           $('.play').on('click', function() {
             owl.trigger('play.owl.autoplay', [1000])
           })
           $('.stop').on('click', function() {
             owl.trigger('stop.owl.autoplay')
           })
}

//job apply description
function jobApplyDescription(getJobId,getCatId){
	jobConformClear();
	let url = path+'api/v1/ta/job_openings/'+getCatId+'/'+getJobId+'/'
	let status = getSelectDetails(url);
}

//job apply description details get
function getSelectDetails(given_url){
	$.ajax({
		url: given_url, 
		headers : headers_content,
		method: 'GET',
		dataType: 'json',
		success: function(result){
		let data = result['data'];
		if(data.length > 0) {
		$('#job_select_title').html(data[0].title);
		$('#job_apply_title').html('<b>'+data[0].title+'</b> (Basic Information)');//job apply popup
		$('#job_apply_title').attr('data',data[0].id);//append id apply header
		let job_modal_data = `
			<div class="col-sm-12">
				<p class="job_modal_p"><span class="span_title"> Division Name :</span><span class="span_val"><b> `+data[0].division+`</b></span></p>
				<p class="job_modal_p"><span class="span_title"> Job Name :</span><span class="span_val"><b> `+data[0].title+`</b></span></p>
				<p class="job_modal_p"><span class="span_title"> Job Location :</span><span class="span_val"><b> `+data[0].job_location+`</b></span></p>
				<p class="job_modal_p"><span class="span_title"> Job Type :</span><span class="span_val"><b> `+data[0].job_type+`</b></span></p>
				<p class="job_modal_p"><span class="span_title"> Number of Position :</span><span class="span_val"><b> `+data[0].nop+`</b></span></p>
				<p class="job_modal_p"><span class="span_title"> Shift :</span><span class="span_val"><b> `+data[0].shift_type+`</b></span></p>
				<p class="job_modal_p"><span class="span_title"> Job Role Name :</span><span class="span_val"><b> `+data[0].team+`</b></span></p>
				<p class="job_modal_p"><span class="span_title"> Experience :</span><span class="span_val"><b> `+data[0].work_experience+`</b></span></p>
				<p class="job_modal_p" id="per_annum_salary"></p>
				<p class="job_modal_p"><span class="span_title"> Recruiter Name :</span><span class="span_val"><b> `+data[0].recruiter+`</b></span></p>
				<p class="job_modal_p"><span class="span_title"> Opened Date :</span><span class="span_val"><b> `+data[0].date_opened+`</b></span></p>
				<p class="job_modal_p"><span class="span_title"> Closing Date :</span><span class="span_val"><b> `+data[0].target_date+`</b></span></p>
				<hr>	
				<p class="job_modal_p"><span class="span_title"> Job Short Description :</span><span class="span_val"><b> `+data[0].job_short_description+`</b></span></p>			
				<p class="job_modal_p"><span class="span_title"> Job Details Description :</span><span class="span_val"><b> `+data[0].job_description+`</b></span></p>
				<hr>				
				<p class="job_modal_p"><span class="span_title"> Skill Details :</span><span class="span_val"><b> `+data[0].key_skills+`</b></span></p>
			</div>
			<div class="col-sm-12" style="padding: 15px;">
				<button type="button" class="btn btn-success btn-eql-wid btn-animate" id=`+data[0].id+` onclick="jobApply(this)" data-dismiss="modal">Apply</button>
				<button type="button" class="btn btn-danger btn-eql-wid btn-animate" data-dismiss="modal">Close</button>
			</div>
		` || 'No data Found.';
		$('#job_select_description').html(job_modal_data); 
		if(data[0].salary != ''){
			$('#per_annum_salary').html('<span class="span_title"> Salary :</span><span class="span_val"><b> '+data[0].salary+'</b></span>');
		}
		$('#job_description_modal').modal('show');//after append details then show
		}else{
			lobiboxStatus("info","Selected Job Details Not Found")		
		}
	},
	error: function (data) {
		 $('#job_select_description').html('Data Service Unavailable. Try Again Later.');
	}
	});
}

//job apply functionality tab
function jobApply(getId){
	let code = getMobileCode() || '+91';
        $('#mobile').val(code);
	let country_id = $('#country').val();
	let state_url = path+'api/v1/ta/country/'+country_id+'/'
	getDropDownServer(state_url,'state','State');//job conform country changes load
	let id = $(getId).attr('id');
	$('#job_apply_modal').modal('show');
}

//job apply function
function jobConformApply(){
	let job_apply_status = job_apply_form_validation();
	if(job_apply_status){
		let email = $('#email').val();
		$('.errorTxt3').html("");	
		let email_status = emailServerValidation(email);
		if(email_status){
		let fname = $('#fname').val() || '';
		let lname = $('#lname').val() || '';
		let email = $('#email').val() || '';
		let dateofbirth = $('#dob').val();
		let dob = dateofbirth.split('-')[2]+'-'+dateofbirth.split('-')[1]+'-'+dateofbirth.split('-')[0];
		let gender = $('#gender').val() || '';
		let mobile = $('#mobile').val() || '';
		let country = $('#country').val() || '';
		let state = $('#state').val() || '';
		let address = $('#address').val() || '';
		let location = $('#location').val() || '';
		let pin = $('#pin').val() || '';
		let job_id = $('#job_apply_title').attr('data');
		let job_apply_details = {'data':[{
						fname:fname,
						lname:lname,
						email:email,
						dob:dob,
						gender:gender,
						mobile:mobile,
						country:country,
						state:state,
						address:address,
						pin:pin,
						location:location,
						job_id:job_id,
						}],
					'file_upload_data' : [doc_data],
					}
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/job_openings/',
		async : false,
		data: JSON.stringify(job_apply_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				lobiboxStatus("success","Job Applied Successfully..");		
			}else if(data['data'] == 'NTE-02'){
				lobiboxStatus("success","Job Applied Successfully and Profile Updated..");		
			}else{
				lobiboxStatus("error","Job Applied Failed.Invalid Data..");		
			}
			$('#job_apply_modal').modal('hide');//login success popup closed
		});
		}else{
			$('.errorTxt3').html("Email is Invaild. Enter Valid Email Id");	
		}
	}else{
		console.log("Job Apply Validation Error");	
	}
}

//job apply function
function jobConformClear(){
	candidate_check_status = false
	$('.errormessage').html('');
	$('#candidate_basic_inform')[0].reset();
	$('#country').val('0').trigger('change');
	let code = getMobileCode() || '+91';
        $('#mobile').val(code);
}

//login 
function login(){
	loginBack();
	jobLoginClear();
	let login_data = localStorage.getItem('job_login_details');
	let login_status = localStorage.getItem('job_login_status');
	console.log(login_status,"================--------------------========================",login_data);
	if(login_status != null && login_status != 'null'){
		$('#job_login_modal').modal('hide');
		console.log("---login---",login_data)
		$('#login_success_modal').modal({backdrop: 'static', keyboard: false})  
		$('#login_success_modal').modal('show');
		$('#job_login_modal').hide();
		let get_data = JSON.parse(login_data);
		loginSuccess(get_data);
	}else{
		$('#job_login_modal').show();
	}
	$('#job_feedback_modal').hide();
        $('#job_login_modal').addClass('open-popup-div-sec');
}

//login Check function
function jobLoginCheck(){
	let login_status = login_form_validation();
	if(login_status){
		let email = $('#login_email1').val() || '';
		let mobile = $('#login_mobile').val() || '';
		let job_apply_details = {'data':[{
						email:email,
						mobile:mobile,
						}]
					}
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/login/',
		async : false,
		data: JSON.stringify(job_apply_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			console.log("---login datas---",data)
			if(data['status'] == 'NTE-11'){
				localStorage.setItem('job_login_details', JSON.stringify(data));
				localStorage.setItem('job_login_status', 'true');
				$('#job_login_modal').hide();	
				loginSuccess(data);
				lobiboxStatus("success","Logged In Successfully..");	
			}else if(data['status'] == 'NTE-12'){
				lobiboxStatus("error","Logged In Failed. Please Check User Name or Password");		
			}
		});
	}else{
		console.log("Login Validation Error");	
	}
}

//login success
function loginSuccess(get_data){
	interviewTrackingDetails1(get_data['interview_details']);
	interviewTrackingDetails2(get_data['interview_date_details']);
	interviewTrackingDetails3(get_data['interview_tracking_details']);
	interviewTrackingDetails4(get_data['interview_refer_offer_details']);
	interviewTrackingDetails5(get_data['interview_offer_details']);
	interviewTrackingDetails6(get_data['interview_offer_details']);
	$('#img_'+active_id).next().addClass('reach_us-btn wow fadeIn infinite animated'); //active final state
}

var candidate_id, job_id, active_id = 0;

//tracking description
function candidateTrackingDesc(){
	$('#login_success_modal').addClass('modalDeactive');
	$('#candidate_tracking_desc_modal').modal({backdrop: 'static', keyboard: false})  
	$('#candidate_tracking_desc_modal').modal('show');
}

//candidate close modal
function candidateTrackingDescClose(){
	$('#login_success_modal').removeClass('modalDeactive');
}

//tracking details1
function interviewTrackingDetails1(tracking_data){
	active_id = 1;
	$('#img_1').attr('src','images/Candid_stage_1_selected.png').next().addClass('jt_img_active');
	candidate_id = tracking_data[0]['id'];
	job_id = tracking_data[0]['job_opening_id'];
	let name = tracking_data[0]['name'] || '' ;
	let job_name = tracking_data[0]['job_title'] || '' ;
	let job_short_desc = tracking_data[0]['job_short_desc'] || '' ;
	let job_desc = tracking_data[0]['job_desc'] || '' ;
	let job_applied_date = tracking_data[0]['applied_date'] || '' ;
	$('#jt_name').html(name);
	$('#jt_jname,#candidate_tracking_desc_title,#jtbn_name').html(job_name);
	$('#jt_jadate').html(job_applied_date);
	$('#jt_apply_date_status').html(job_applied_date);
	$('.jt_jdname').html(job_short_desc);
	$('#candidate_tracking_desc').html(job_desc);
}
//tracking details2
function interviewTrackingDetails2(tracking_data){
	if(tracking_data.length != 0){
		active_id = 2;
		let date = tracking_data[0]['interview_date'] || '' ;
		$('.jt_idate').html(date);
		$('#jt_apply_status').addClass('jt_active');
		$('#img_2').attr('src','images/Candid_stage_2_selected.png').next().addClass('jt_img_active');
	}
	else{
		$('#jt_profile_shortlisted').html( '<span class="negative_result">Yet to be Done</span>');
	}
}
//tracking details3
function interviewTrackingDetails3(tracking_data){
	console.log("----------tracking_data data-----------",tracking_data);
	let tracking_len = tracking_data.length;
	let stage_success_data = '';	
	if(tracking_len > 0){
		active_id = 3;
		for(let i=0; i< tracking_len;i++){
				stage_success_data += `<label class="rounds_txt">`+tracking_data[i].interview_type+`</label>
                               <span class="positive_result">`+tracking_data[i].interview_status+`</span>`
		}
		$('#stage_success_data').html(stage_success_data);
		$('#img_3').attr('src','images/Candid_stage_3_selected.png').next().addClass('jt_img_active');
		$('#profile_status').hide();
	}else{
		$('#stage_success_data').html('<span class="negative_result">Yet to be Done</span>');
	}
	$('#login_success_modal').modal('show');
}

//tracking details4 - interview refer offer details
function interviewTrackingDetails4(tracking_data){
	let refer_data = '';
	if(tracking_data.length == 0){
		refer_data = '<span class="negative_result">Yet to be Done</span>';
	}else{
		active_id = 4;
		refer_data = '<span class="negative_result">Done</span>';
		$('#img_4').attr('src','images/Candid_stage_4_selected.png').next().addClass('jt_img_active');
	}
	$('#jt_refer_check').html(refer_data );
}

//tracking details5 - interview offer details
function interviewTrackingDetails5(tracking_data){
	let offer_data = '';
	if(tracking_data.length == 0){
		offer_data = '<span class="negative_result">Yet to be Done</span>';
	}else{
		active_id = 5;
		offer_data = '<span class="negative_result">Done</span>';
		$('#img_6').attr('src','images/Candid_stage_6_selected.png').next().addClass('jt_img_active');
	}
	$('#jt_offer_check').html(offer_data );
}

//tracking details6 - interview pre offer details
function interviewTrackingDetails6(tracking_data){
	let pre_data = '';
	if(tracking_data.length == 0){
		pre_data = '<span class="negative_result">Yet to be Done</span>';
	}else{
		active_id = 6;
		pre_data = '<span class="negative_result">Done</span>';
		$('#img_5').attr('src','images/Candid_stage_5_selected.png').next().addClass('jt_img_active');
	}
	$('#jt_pre_join_check').html(pre_data );
}

//login clear
function jobLoginClear(){
	$('#job_login').show();
	$('.errormessage,#job_login_candiate_div1,#job_login_candiate_div2,#job_login_candiate_div3').html('');
        $('#tracking_details,#job_login_candiate_div1,#job_login_candiate_div2,#job_login_candiate_div3').hide();
	$('#candidate_login_inform')[0].reset();
	tc_lcheck_status = false;
}

//logout function here
function candidateLogOut(){
	localStorage.setItem('job_login_details', null);
	localStorage.setItem('job_login_status', null);	
	jobLoginClear();
	$('#login_success_modal').modal('hide');
	lobiboxStatus("success","Logged Out Successfully..");
}

//meet our experts function here
function meetextperts(){
        $('#job_login_modal,#job_feedback_modal').hide();
}

//jquery Team validation
jQuery.validator.addMethod('valueNotEquals', function (value) {
  return (value != '0');
}, "");

//file size validation
jQuery.validator.addMethod(
    "filesize",
    function (value, element) {
        if (this.optional(element) || ! element.files || ! element.files[0]) {
            return true;
        } else {
            return element.files[0].size <= 1024 * 1024 * 2;
        }
    },
    'The File Size Can Not Exceed 2MB.'
);

$('#candidate_login_inform').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	   login_email1:
	   {
		   required: true,
		   email: true,
	   },	
	   login_mobile: {
		   required: true,
		   minlength: 8
	   },
   },
   //For custom messages
   messages: {
	   login_email1:
	   {
		   required: "Enter User Name (Email)",
		   email: "Enter Valid User Name (Email)",
	   },
	   login_mobile: {
		   required: "Enter Password",
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

//login form validations here
function login_form_validation(){	
	$('.errorTxt51').html('');
	if(tc_lcheck_status){
	return $('#candidate_login_inform').valid();
	}else{
	$('.errorTxt51').html("Drag the Slider to Login");
	$('#candidate_login_inform').valid();
	}
}

$('#candidate_basic_inform').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	fname: {
	   required: true,
           lettersonlys: true,
	},
	email: {
	   required: true,
	   email: true,
	},
	gender: {
	  valueNotEquals: true,
	},
	country: {
	  valueNotEquals: true,
	},
	lname: {
	   required: true,
	   lettersonlys: true,
	},
	dob: {
	   required: true,
        ageCheck: true
	},
	mobile: {
	   required: true,
	   mobile_no: true,
	},
	state: {
	  valueNotEquals: true,
	},
	address: {
	   required: true,
	},
	location: {
	   required: true,
	   lettersonlys: true,
	},
	pin: {
	   required: true,
	   zip_code: true,
	},
	upload_file: {
	   required:true,
	   extension: "docx|doc|pdf",
	   filesize: true    //max size 200 mb
	},
   },
   //For custom messages
   messages: {
		fname: {
		   required: "Enter First Name",
		   lettersonlys: "Enter Valid First Name",
		},
		email: {
		   required: "Enter Email",
		   email: "Enter Valid Email",
		},
		gender: {
		   valueNotEquals: "Select Vaild Gender"  	
		},
		country: {
		   valueNotEquals: "Select Vaild Country"  	
		},
		lname: {
		   required: "Enter Last Name",
		   lettersonlys: "Enter Valid Last Name",
		},
		dob: {
		   required: "Select DOB",
            ageCheck: "Minimum Age is 18 Years and Maximum 60 Years Old"
		},
		mobile: {
		   required: "Enter Mobile Number",
		   mobile_no: "Enter Valid Mobile Number",
		},
		state: {
		   valueNotEquals: "Select Vaild State"  	
		},
		address: {
		   required: "Enter Address",
		},
		location: {
		   required: "Enter Location",
	           lettersonlys: "Enter Valid Location",
		},
		pin: {
		   required: "Enter Pin",
		   zip_code: "Enter Valid Pin",
		},
		upload_file: {
		   required:"Please Upload File.",
	    	   extension:"Please Upload .pdf,.docx,.doc File Of Notice.",
		   filesize:"The File Size Can Not Exceed 2MB",
		}
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


var candidate_check_status = false
//jquery candidate captcha validation
$('#app_check_status').change(function() {
	candidate_check_status = $(this).prop('checked')
	if(candidate_check_status){$('.errorTxt1014').html('');}
    })

//job apply form validation here
function job_apply_form_validation(){
	$('.errorTxt1014').html('');
	if(candidate_check_status){
	return $('#candidate_basic_inform').valid();
	}else{
	$('.errorTxt1014').html("Drag the Slider to Apply");
	$('#candidate_basic_inform').valid();
	}
}

var doc_data = {}
//upload file datas
function encodeDoctoBase64(element){
	if(element){
		if($('input[type=file][id$="'+element.id+'"]').val().replace(/C:\\fakepath\\/i, '')){
					doc_data = {}
					doc_data['img_name'] = $('input[type=file][id$="'+element.id+'"]').val().replace(/C:\\fakepath\\/i, '')
					doc_data['folder_name'] = 'Interview'
					var file = element.files[0];
					var reader = new FileReader();
					reader.onloadend = function() {
						var img_str = reader.result
						doc_data['img_str'] = img_str.split(',')[1]
						doc_data['format'] = $('input[type=file][id$="'+element.id+'"]').val().replace(/C:\\fakepath\\/i, '').split('.')[1];
					}
					reader.readAsDataURL(file);
				}
		}
    
    if (file.name){
			$('#upload_file-error').html('');

		}
    
	else{
		lobiboxStatus("error","File upload error.");
	}
}

//feedback modal form
function feedback(){ 
    let code = getMobileCode() || '+91';
        $('#feed_mobile').val(code);
    $('#job_login_modal').hide();
	$('#job_feedback_modal').show();
    $('#job_feedback_modal').addClass('open-popup-div-sec');
}

$(".popup_close").click(function () {
     $('#job_login_modal,#job_feedback_modal').hide();
    $('#job_login_modal,#job_feedback_modal').removeClass('open-popup-div-sec');
});


//get form datas
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}
//feedback form apply
function jobFeedbackConformApply(){
	let feed_status = job_feedback_form_validation();
	if(feed_status){
		let email = $('#feedback_email').val();
		$('.errorTxt15').html("");	
		let email_status = emailServerValidation(email);
		if(email_status){
		let form_data = getFormData($('#jtfeedback_basic_informs'));
		let feedback_details = {'data':[form_data],'type':'JOB'}
		console.log(form_data)
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/feedback/',
		async : false,
		data: JSON.stringify(feedback_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				lobiboxStatus("success","Feedback Sent Successfully..");	
			}else if(data['data'] == 'NTE-04'){
				lobiboxStatus("info","Feedback Already Sent..");		
			}else{
				lobiboxStatus("error","Feedback Sent Failed..");		
			}
			jobFeedbackConformClear();	
			meetextperts();
		});
		}else{
			$('.errorTxt15').html("Email is Invaild. Enter Valid Email Id");	
		}
	}else{
		console.log('form validation error')	
	}
}

var query_check_status = false
//jquery fCaptcha1 validation
$('#qfcheck_status').change(function() {
	query_check_status = $(this).prop('checked')
	if(query_check_status){$('.errorTxt21').html('');}
    })

//job apply form validation here
function job_feedback_form_validation(){
	$('.errorTxt21').html('');
	if(query_check_status){
	return $('#jtfeedback_basic_informs').valid();
	}else{
	$('.errorTxt21').html("Drag the Slider to Submit");
	$('#jtfeedback_basic_informs').valid();
	}
}
//feedback form clear
function jobFeedbackConformClear(){
	query_check_status = false
	$('.errormessage').html('');
	$('#jtfeedback_basic_informs')[0].reset();
	let code = getMobileCode() || '+91';
        $('#feed_mobile').val(code);
}
//check box validation
jQuery.validator.addMethod("rating", function(value, elem, param) {
   return $(".rating:checkbox:checked").length > 0;
},"You must select at least one!");
//feedback form validation
$('#jtfeedback_basic_informs').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	feed_name: {
	   required: true,
	   lettersonlys: true,
	},
	feedback_email: {
	   required: true,
	   email: true,
	},
	feed_mobile: {
	   required: true,
	   mobile_no: true,
	},
	feed_type: {
	  valueNotEquals: true,
	},
	feed_role: {
	  valueNotEquals: true,
	},
	feed_comments: {
	   required: true,
	},
	rating: {
	   required: true,
	},
   },
   //For custom messages
   messages: {
		feed_name: {
		   required: "Enter Your Name",
		   lettersonlys: "Enter Valid Name",
		},
		feedback_email: {
		   required: "Enter Your Email",
		   email: "Enter Valid Email",
		},
		feed_mobile: {
		   required: "Enter a Valid Mobile Number",
		   mobile_no: "Enter Valid Mobile Number",
		},
		feed_type: {
		   valueNotEquals: "Select the Feedback Type"  	
		},
		feed_role: {
		   valueNotEquals: "Select the Feedback Role"  	
		},
		feed_comments: {
		   required: "Enter Your Queries",
		},
		rating: {
            	   required: "Please Select An Option",
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
$('.input-group.date').datepicker({format: "dd-mm-yyyy"}); 

//ready function here
$( document ).ready(function() {
	//onload function here 
	getDropDown();//getdropdown
	getJobCategory();//all job
	getLatestJob();//latest job
	getMeetExpertise();//meet our expertise
	getHCADetails();//hca details
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

//forgot password 
function forgotPassword(){
	jobLoginClear();
	$('#tracking_details').hide();
	$('#job_login').hide();
	$('#job_forgot_password').show();
}

//back forgot password
function loginBack(){
	jobForgotPasswordClear();
	$('#job_login').show();
	$('#job_forgot_password').hide();
}

//forgot password save function here
function jobForgotPasswordUpdate(){
	$('.login_email-error').html('');
	let forgot_password_status = forgot_login_form_validation();
	if(forgot_password_status){
		let form_data = getFormData($('#candidate_forgot_password_inform'));
		form_data['login_email'] = $('#login_email').val();
		let feedback_details = {'data':[form_data]}
		console.log(form_data)
		$.ajax({
		type  : 'PUT',
		url   : path+'api/v1/ta/candidate_password_reset/',
		async : false,
		data: JSON.stringify(feedback_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-02'){
				lobiboxStatus("success","Your Password has been Reset Successfully.");	
				jobForgotPasswordClear();
				$('.candidate_login').trigger('click');	
			}else{
				lobiboxStatus("error","Your Password has been Reset Failed. Check your OTP.");		
			}
		});
	}
}

//forgot password reset function here
function jobForgotPasswordClear(){
	$('.errormessage').html('');
	$('#candidate_forgot_password_inform')[0].reset();
	tc_lfcheck_status = false;
	$('#job_forgot_password_otp,#login_email').prop('disabled',false);
}

//re enter password validation
jQuery.validator.addMethod('re_password', function (value) {
  return $('#login_mobile1').val() == $('#login_mobile2').val() ? true : false;
}, "");

//forgot login change
$('#candidate_forgot_password_inform').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	   login_email:
	   {
		   required: true,
		   email: true,
	   },	
	   otp:{
		   required: true,
	   },
	   login_mobile1: {
		   required: true,
		   minlength: 8
	   },
	   login_mobile2: {
		   required: true,
		   re_password: true,
	   },
   },
   //For custom messages
   messages: {
	   login_email:
	   {
		   required: "Enter Your Email",
		   email: "Enter Valid Email",
	   },
	   login_mobile1: {
		   required: "Enter New Password.",
		   minlength: "Password Must Have At Least 8 Characters And Maximum Of 15 Characters",
       	   },
	   otp:{
		   required: "Enter the OTP Mailed",
	   },
	   login_mobile2: {
	 	   required: "Re-Enter New Password",
		   re_password : "Re-Enter Password is Mismatch to New Password",
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
	return $('#candidate_forgot_password_inform').valid();
	}else{
	$('.errorTxt74').html("Drag the Slider to Save");
	$('#candidate_forgot_password_inform').valid();
	}
}

//job track feedback form apply
function jobTrackFeedback(){
	let feed_status = job_track_feedback_form_validation();
	if(feed_status){
		let form_data = getFormData($('#job_tracking_basic_inform'));
		form_data['candidate_id'] = candidate_id;
		form_data['job_id'] = job_id;
		let feedback_details = {'data':[form_data]}
		console.log(form_data)
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/job_tracking_feedback/',
		async : false,
		data: JSON.stringify(feedback_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				lobiboxStatus("success","Feedback Sent Successfully..");	
				jobTrackFeedbackConformClear();	
			}else if(data['data'] == 'NTE-04'){
				lobiboxStatus("info","Feedback Already Sent..");
				jobTrackFeedbackConformClear();
			}else{
				lobiboxStatus("error","Feedback Sent Failed..");	
			}
			candidateTrackingFeedBackClose();
		});
	}else{
		console.log('form validation error')	
	}
}
//job apply form validation here
function job_track_feedback_form_validation(){
	$('.errorTxt603').html('');
	if(tc_check_status){
	return $('#job_tracking_basic_inform').valid();
	}else{
	$('.errorTxt603').html("Drag the Slider to Send");
	$('#job_tracking_basic_inform').valid();
	}
}
//feedback form clear
function jobTrackFeedbackConformClear(){
	$('.error').html('');
	$('.errorTxt603').html('');
	tc_check_status = false;
	$('#job_tracking_basic_inform')[0].reset();
}

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

//zip code validation
$.validator.addMethod('zip_code', function (value, element) {
    return this.optional(element) || zip_val[country_code].test(value);
}, "Please enter a valid phone number");

//check box validation
jQuery.validator.addMethod("ratings", function(value, elem, param) {
   return $(".job_ratings:checkbox:checked").length > 0;
},"You must select at least one!");
//feedback form validation
$('#job_tracking_basic_inform').submit(function(e) {
    e.preventDefault();    
}).validate({
   rules: {
	comments: {
	   required: true,
	},
	job_ratings: {
	   required: true,
	},
   },
   //For custom messages
   messages: {
		comments: {
		   required: "Enter your queries",
		},
		job_ratings: {
            	   required: "Please select an option",
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

var tc_check_status = false
//jquery fCaptcha1 validation
$('#tc_status_check').change(function() {
	tc_check_status = $(this).prop('checked')
	if(tc_lfcheck_status){$('.errorTxt603').html('');}
    })
var tc_lcheck_status = false
//jquery fCaptcha1 validation
$('#tc_lcheck_status ').change(function() {
	tc_lcheck_status = $(this).prop('checked')
	if(tc_lcheck_status){$('.errorTxt51').html('');}
    })
var tc_lfcheck_status = false
//jquery fCaptcha1 validation
$('#tc_lfcheck_status').change(function() {
	tc_lfcheck_status = $(this).prop('checked');
	if(tc_lfcheck_status){$('.errorTxt74').html('');}
    })
//candidate tracking feedback 
function candidateTrackingFeedBack(){
	jobTrackFeedbackConformClear();
	$('#login_success_modal').addClass('modalDeactive');
	$('#candidate_tracking_feedback_modal').modal({backdrop: 'static', keyboard: false})  
	$('#candidate_tracking_feedback_modal').modal('show');
}
//candidate tracking feedback close
function candidateTrackingFeedBackClose(){
	$('#login_success_modal').removeClass('modalDeactive');
	$('#candidate_tracking_feedback_modal').modal('hide');
}
//forgot password otp send
function jobForgotPasswordOTP(){
	$('.login_email-error').html('');
	let email = $('#login_email').val();
	let status = isEmail(email);
	if(status && email != ''){
		form_data = {}
		form_data['email_id'] = email;
		let email_details = {'data':[form_data]}
		$.ajax({
		type  : 'POST',
		url   : path+'api/v1/ta/job_candidate_otp/',
		async : false,
		data: JSON.stringify(email_details),
		}).done( function(json_data) {
			let data = JSON.parse(json_data);
			if(data['data'] == 'NTE-01'){
				$('#job_forgot_password_otp,#login_email').prop('disabled',true);
				lobiboxStatus("success","OTP Sent Successfully..");	
			}else{
				$('#job_forgot_password_otp,#login_email').prop('disabled',false);
				lobiboxStatus("error","OTP Sent Failed. Check Email ID");	
			}
			candidateTrackingFeedBackClose();
		});
	}else{
		$('.login_email-error').html('Enter Valid Email');	
		$('#job_forgot_password_otp,#login_email').prop('disabled',false);
	}
}

//email validation
function isEmail(email) {
    var regex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    return regex.test(email);
}

//dob validation
const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)
$.validator.addMethod("ageCheck", function(value, element, min) {
    var dob = value.split('-')[2]+'-'+value.split('-')[1]+'-'+value.split('-')[0];
    var age = getAge(dob) 
    return age >= 18 && age <= 60 ? true :false;
}, "");
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
