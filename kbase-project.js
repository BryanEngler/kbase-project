var hidden = true;
var collapsed = false;
var isLESA1;

//window.addEventListener('load', function() {
	var jq = document.createElement('script');
	jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";

	var gapisrc = document.createElement('script');
	gapisrc.src = "https://apis.google.com/js/client.js";

	document.querySelector('head').appendChild(jq).appendChild(gapisrc);

	if (document.getElementsByClassName("lesa-nav").length == 0) {
		isLESA1 = true;
	}
	else {
		isLESA1 = false;
	}
	
	when_external_loaded (function () {
		if (isLESA1 == true){
    		getEnvironmentInfoLESA1();
    	}
    	else {
    		getEnvironmentInfoLESA2();
    	}
    	
    	checkAuth(); 
	});
//}, false);

function when_external_loaded (callback) {
	if (typeof gapi === 'undefined' || typeof jq === 'undefined') {
		setTimeout (function () {when_external_loaded (callback);}, 300);
	} 
	else {  
		callback (); 
	}
}

function addLinksToPage() {
	floatMenu.id = "floatMenu";
	hideButton.id = "hideButton";

	for (var i = 0; i < categoryNames.length; i++) {
		outerDiv[i] = document.createElement('div');

		menuItem[i] = document.createElement('div');
		menuItem[i].className = 'menuItem';
		menuItem[i].innerHTML = categoryNames[i];

		subMenu[i] = document.createElement('div');
		subMenu[i].className = 'subMenu';

		var a;
		var li;
		switch (i) {
			case 0:
				addItems(troubleshootingLinks);
				outerDiv[i].appendChild(menuItem[i]);
				outerDiv[i].appendChild(subMenu[i]);
				break;
			case 1:
				addItems(howToLinks);
				outerDiv[i].appendChild(menuItem[i]);
				outerDiv[i].appendChild(subMenu[i]);
				break;
			case 2:
				addItems(supportPoliciesLinks);
				outerDiv[i].appendChild(menuItem[i]);
				outerDiv[i].appendChild(subMenu[i]);
				break;
			case 3:
				addItems(supportForumsLinks);
				outerDiv[i].appendChild(menuItem[i]);
				outerDiv[i].appendChild(subMenu[i]);
				break;
			case 4:
				addItems(slaLinks);
				a = document.createElement('a');
				a.href = slaLinks[0].link;
				a.text = slaLinks[0].name;
				if (a.text.length > maxChars) {
					a.title = slaLinks[0].title;
				}
				a.target = '_blank';
				menuItem[i].className = 'slaLink';
				menuItem[i].innerHTML = '';
				menuItem[i].appendChild(a);
				outerDiv[i].appendChild(menuItem[i]);
				addLinksForFeedback(slaLinks[0].link)
				break;
			case 5:
				var feedbackURL = createFeedbackURL("Yes");
				var d = document.createElement('div');
				a = document.createElement('a');
				a.href = feedbackURL;
				a.text = "Was this tool helpful?";
				a.target = '_blank';

				d.appendChild(a);
				menuItem[i].innerHTML = '';
				menuItem[i].className = 'feedBackLink';
				menuItem[i].appendChild(d);
				outerDiv[i].appendChild(menuItem[i]);
				break;
		}
	}

	var listDiv = document.createElement('div');

	listDiv.className = "menuList";

	for (i = 0; i < categoryNames.length; i++) {
		listDiv.appendChild(outerDiv[i]);
	}

	var h3 = document.createElement('h3');

	h3.className = 'menuHeader';
	h3.innerHTML = "Quick Links";

	floatMenu.appendChild(h3);

	floatMenu.appendChild(listDiv);

	hideButton.innerHTML = plus;
	hideButton.onclick = showOrHideMenu;

	document.body.appendChild(hideButton);
	document.body.appendChild(floatMenu);

	/*jshint multistr: true */
	var css = "#floatMenu {\
			position:fixed;\
			top:15%;\
			right:0px;\
			width:0px;\
			background-color:#FFF;\
			margin:0;\
			padding:0;\
			font-size:15px;\
			border-left:1px solid #ddd;\
			border-right:1px solid #ddd;\
			z-index: 999;\
		}\
		#floatMenu h3 {\
			color:black;\
			font-weight:bold;\
			padding:3px;\
			margin:0;\
			background-color:#FFF;\
			border-bottom:1px solid #ddd;\
			border-top:1px solid #ddd;\
			font-size:18px;\
		}\
		#floatMenu div {\
			margin:0;\
			padding:0;\
			list-style:none;\
		}\
		#hideButton {\
			position:fixed;\
			top:12%;\
			right:0px;\
			width:40px;\
			margin:0;\
			padding:0;\
			z-index: 999;\
		}\
		.menuItem {\
			background-color:#FFF;\
			border-bottom:1px solid #ddd;\
			border-top:1px solid #ddd;\
			font-size:14px;\
			font-weight:bold;\
			padding-left:10px;\
		}\
		.subMenu {\
			border-bottom:1px solid #ddd;\
		}\
		#floatMenu ul div a {\
			text-decoration:none;\
		}\
		.qlAnchor {\
			width: 200px;\
			display: block;\
			white-space: nowrap;\
			text-overflow: ellipsis;\
			overflow: hidden;\
		}\
		.slaLink {\
			font-weight: bold;\
			border-top: 1px solid #ddd;\
		}\
		.feedBackLink {\
			font-weight: bold;\
			border-bottom: 1px solid #ddd;\
		}";

	var head = document.head;
	var style = document.createElement('style');

	style.type = 'text/css';
	if (style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		style.appendChild(document.createTextNode(css));
	}

	head.appendChild(style);

	jQuery(function() {
		jQuery('.menuItem').click(function() {
			$menuItem = jQuery(this);
			$subMenu = $menuItem.next();
			$subMenu.slideToggle(500);
		});
	});

	jQuery(function() {
		jQuery('.menuHeader').click(function () {
			if (collapsed) {
				jQuery('.subMenu').show();
				collapsed =  false;
			} else {
				jQuery('.subMenu').hide();
				collapsed = true;
			}
		});
	});

	function addLinksForFeedback(linkContent) {
		feedbackLinkContent[feedbackLinkContent.length] = linkContent;
	}

	function createFeedbackURL(answer) {
		var customerId = environmentInfo[_CUSTOMER_ID];

		var baseGoogleFormURL = "https://docs.google.com/a/liferay.com/forms/d/143TgPw3RGU67t17OO195pb7lhnAVW6o909CWSTKKCso/viewform";

		var completeFormURL = baseGoogleFormURL + "?entry.321334840=" + customerId;

		completeFormURL = completeFormURL + "&entry.1550379905=";

		for (var a = 0; a < feedbackLinkContent.length; a++) {
			completeFormURL = completeFormURL + feedbackLinkContent[a] + " , "
		}

		return completeFormURL;
	}

	function showOrHideMenu() {
		if (hidden) {
			document.getElementById("floatMenu").style.width = "200px";
			hideButton.innerHTML = minus;
			hidden = false;
		}
		else {
			document.getElementById("floatMenu").style.width = "0px";
			hideButton.innerHTML = plus;
			hidden = true;
		}
	}

	function addItems(arrayOfLinks){
		for (var j = 0; j < arrayOfLinks.length; j++) {
			a = document.createElement('a');
			a.className = 'qlAnchor';
			a.href = arrayOfLinks[j].link;
			a.text = arrayOfLinks[j].name;
			
			if (a.text.length > maxChars) {
				a.title = arrayOfLinks[j].name;
			}
			
			a.target = '_blank';
			li = document.createElement('li');
			li.appendChild(a);
			subMenu[i].appendChild(li);

			addLinksForFeedback(arrayOfLinks[j].link)
		}
	}
}

function getCustomerId() {
	var customerId = document.getElementsByTagName("title")[0].innerHTML;

	var tempVar = customerId.split("[");
	customerId = tempVar[1].split("]");

	return customerId[0];
}

function getEnvironmentInfoLESA1(fieldLabel, divNode) {
	AUI().use('aui-base', 'node',
		function(A) {
			function getFieldValue(fieldLabel) {
				var field = '';
				var selectedNode = divNode;

				selectedNode.each(
					function() {
						var innerHTML = this.get('textContent');
						
						if (innerHTML.toUpperCase().indexOf(fieldLabel) > -1) {
							field = innerHTML;
						}
					}
				);

				if (field) {
					var begin = field.toUpperCase().indexOf(fieldLabel) + fieldLabel.length;
					var end = field.indexOf('  ', begin);

					field = field.substring(begin, end);

					return field.toString().trim();
				}

				return getFieldValue;
			}

			var divNode = A.all(".content-column-content");

			environmentInfo[_VERSION] = getFieldValue(_VERSION_LABEL, divNode);
			environmentInfo[_OS] = getFieldValue(_OS_LABEL, divNode);
			environmentInfo[_APP_SERVER] = getFieldValue(_APP_SERVER_LABEL, divNode);
			environmentInfo[_DATABASE] = getFieldValue(_DATABASE_LABEL, divNode);
			environmentInfo[_BROWSER] = getFieldValue(_BROWSER_LABEL, divNode);
			environmentInfo[_JVM] = getFieldValue(_JVM_LABEL, divNode);

			divNode = A.all(".callout-content");
			
			environmentInfo[_COMPONENT] = getFieldValue(_COMPONENT_LABEL, divNode);
			environmentInfo[_CUSTOMER_ID] = getCustomerId();
		}
	);
}

function getEnvironmentInfoLESA2() {
	AUI().use('aui-base', 'node',
		function(A) {
			function serverDetails(typeNode) {
				var childNodes = typeNode.children;

				for (var i = 0; i < childNodes.length; i++) {
					var divNode = childNodes[i];
					var txtUpSpan = divNode.childNodes[1].innerHTML;
					var txtSbSpan = divNode.childNodes[3].innerHTML;

					if (txtUpSpan == "LR:") {
						environmentInfo[_VERSION] = txtSbSpan;
					} 
					else if (txtUpSpan == "OS:") {
						environmentInfo[_OS] = txtSbSpan;
					} 
					else if (txtUpSpan == "AS:") {
						environmentInfo[_APP_SERVER] = txtSbSpan;
					} 
					else if (txtUpSpan == "DB:") {
						environmentInfo[_DATABASE] = txtSbSpan;
					} 
					else if (txtUpSpan == "JVM:") {
						environmentInfo[_JVM] = txtSbSpan;
					}
					else if (txtUpSpan == "BR:") {
						environmentInfo[_BROWSER] = txtSbSpan;
					}
				}

				var spanNode = divNode.childNodes[3];

				return spanNode.innerHTML;
			}

			function filterComponent(path) {
				var indexOfImagesDirectory = path.indexOf("images/");
				var indexOfextension = path.indexOf(".png");
				var componentKey = path.substring(indexOfImagesDirectory + 7, indexOfextension);
				
				var component = lesa2ComponentMap[componentKey];

				return component;
			}

			var nodeList = A.all(".sub-section.last");
			var typeNode = nodeList._nodes[0];
			serverDetails(typeNode);
			nodeList = A.all(".ticket-img");
			typeNode = nodeList._nodes[0];
			var componentPath = typeNode.attributes[2].nodeValue;
			environmentInfo[_COMPONENT] = filterComponent(componentPath);
			environmentInfo[_CUSTOMER_ID] = getCustomerId();
		}
	);
}

function checkAuth() {
	gapi.auth.authorize(
	{
		'client_id': CLIENT_ID,
		'scope': SCOPES.join(' '),
		'immediate': true
	}, handleAuthResult);
}
	
function handleAuthResult(authResult) {
	if (authResult && !authResult.error) {
		callScriptFunction();
	}
}
	
function callScriptFunction() {
	var scriptId = "MbHSVdQlFcfulpL8J3JgzSeewchXXmC_b";

	var request = {
		'function': 'getContent'
	};

	var op = gapi.client.request({
		'root': 'https://script.googleapis.com',
		'path': 'v1/scripts/' + scriptId + ':run',
		'method': 'POST',
		'body': request
	});

	op.execute(function(resp) {
		if (resp.error && resp.error.status) {
			console.log('Error calling API:');
			console.log(JSON.stringify(resp, null, 2));
		}
		else if (resp.error) {
			var error = resp.error.details[0];
			console.log('Script error message: ' + error.errorMessage);

			if (error.scriptStackTraceElements) {
				console.log('Script error stacktrace:');

				for (var i = 0; i < error.scriptStackTraceElements.length; i++) {
					var trace = error.scriptStackTraceElements[i];
					console.log('\t' + trace.function + ':' + trace.lineNumber);
				}
			}
		}
		else {
			var spreadsheetData = resp.response.result;

			buildLinkArrays(spreadsheetData);
			addLinksToPage();
		}
	});
}

function buildLinkArrays(spreadsheetData) {
	var links = Object.keys(spreadsheetData).map(function (key) {
		return spreadsheetData[key];
	});

	if (Object.keys(links).length == 0) {
		console.log('No results');
	} 
	else {	        
		Object.keys(links).forEach(function(id){
			var linkType = links[id][1];
			var linkField = links[id][2];
			var linkName = links[id][3];
			var linkURL = links[id][4];
			
			var linkFieldCategory = linkField.substring(0, linkField.indexOf("|")).trim();
			var linkFieldValue = linkField.substring(linkField.indexOf("|") + 1, linkField.length).trim();

			if (linkFieldCategory == "Application Server" && getFieldValue(environmentInfo[_APP_SERVER]) == linkFieldValue) {
					addLinkToArray(linkType, linkName, linkURL);
			}
			else if (linkFieldCategory == "Browser" && getFieldValue(environmentInfo[_BROWSER]) == linkFieldValue) {
					addLinkToArray(linkType, linkName, linkURL);
			}
			else if (linkFieldCategory == "Component" && environmentInfo[_COMPONENT] == linkFieldValue) { //dont need to get field value
					addLinkToArray(linkType, linkName, linkURL);
			}
			else if (linkFieldCategory == "Database" && getFieldValue(environmentInfo[_DATABASE]) == linkFieldValue) {
					addLinkToArray(linkType, linkName, linkURL);
			}
			else if (linkFieldCategory == "Java" && getFieldValue(environmentInfo[_JVM]) == linkFieldValue) {
					addLinkToArray(linkType, linkName, linkURL);
			}
			else if (linkFieldCategory == "Operating System" && getFieldValue(environmentInfo[_OS]) == linkFieldValue) {
					addLinkToArray(linkType, linkName, linkURL);
			}
			else if (linkFieldCategory == "Version" && environmentInfo[_VERSION].split(" ")[0] == linkFieldValue) { //just split
					addLinkToArray(linkType, linkName, linkURL);
			}
			else if (linkType == "SLA") {
				addLinkToArray(linkType, linkName, linkURL);
			}  
		});
	}
}

function getFieldValue(environmentInfo) {
	var parts = environmentInfo.split(" ");

	var value = "";

	for (var i = 0; i < parts.length; i++) {
		var part = parts[i];

		if (!part.startsWith(0) && 
			!part.startsWith(1) && 
			!part.startsWith(2) && 
			!part.startsWith(3) && 
			!part.startsWith(4) && 
			!part.startsWith(5) && 
			!part.startsWith(6) && 
			!part.startsWith(7) && 
			!part.startsWith(8) && 
			!part.startsWith(9) && 
			!part.startsWith("XP")) {

			value += part + " ";
		}
		else {
			return value.trim();
		}
	}

	return value.trim();
}

function addLinkToArray(linkType, linkName, linkURL) {
	var link = [];
	link.link = linkURL;
	link.name = linkName;

	if (linkType == "Troubleshooting") {
		troubleshootingLinks[troubleshootingLinks.length] = link;
	}
	else if (linkType == "How To") {
		howToLinks[howToLinks.length] = link;
	}
	else if (linkType == "Support Policies") {
		supportPoliciesLinks[supportPoliciesLinks.length] = link;
	}
	else if (linkType == "Forums") {
		supportForumsLinks[supportForumsLinks.length] = link;
	}
	else if (linkType == "SLA") {
		slaLinks[slaLinks.length] = link;
	}
}

var troubleshootingLinks = [],
	howToLinks = [],
	supportPoliciesLinks = [],
	supportForumsLinks = [],
	slaLinks = [],
	feedbackLinkContent = [];

var CLIENT_ID = '731283778825-bg34j8714me62po5hd72e6fdgs8ma8u2.apps.googleusercontent.com';

var SCOPES = ['https://www.googleapis.com/auth/drive'];	

var _APP_SERVER_LABEL = "APPLICATION SERVER: ";
var _COMPONENT_LABEL = "COMPONENT: ";
var _DATABASE_LABEL = "DATABASE: ";
var _VERSION_LABEL = "LIFERAY VERSION: ";
var _OS_LABEL = "OPERATING SYSTEM:  ";
var _BROWSER_LABEL = "PRIMARY BROWSER:  ";
var _JVM_LABEL = "JAVA VIRTUAL MACHINE: ";

var _APP_SERVER = "as";
var _COMPONENT = "comp";
var _DATABASE = "db";
var _VERSION = "ver";
var _OS = "os";
var _BROWSER = "br";
var _JVM = "jvm";
var _CUSTOMER_ID = "cid";

var plus = "<img src='https://raw.githubusercontent.com/SamZiemer/kbase-project/master/images/Add.png' style='width:20px;height:20px;'>";
var minus = "<img src='https://raw.githubusercontent.com/SamZiemer/kbase-project/master/images/minus-xxl.png' style='width:20px;height:20px;'>";

var maxChars = 28;

var environmentInfo = [];

var floatMenu = document.createElement('div');
var hideButton = document.createElement('div');

var outerDiv = [];
var menuItem = [];
var subMenu = [];
var categoryNames = [
	"Troubleshooting",
	"How To",
	"Support Policies",
	"Product Support Forums",
	"Service Level Agreement",
	"Was this tool helpful?"
];

var lesa2ComponentMap = {
	"component_account_administration" : "Account Administration",
	"component_activation_key" : "Activation Key",
	"component_authentication" : "Authentication",
	"component_calendar" : "Calendar",
	"component_clustering" : "Clustering",
	"component_collaboration_suite" : "Collaboration Suite",
	"component_custom_development" : "Custom Development",
	"component_developer_studio" : "Developer Studio",
	"component_document_library" : "Document Library",
	"component_lar_staging" : "LAR/Staging",
	"component_license" : "License/Account Setup",
	"component_license_account_setup" : "License/Account Setup",
	"component_liferay_api" : "Liferay API",
	"component_liferay_connected_services" : "Liferay Connected Services",
	"component_liferay_faces" : "Liferay Faces",
	"component_liferay_mobile_sdk" : "Liferay Mobile SDK",
	"component_liferay_sync" : "Liferay Sync",
	"component_other" : "Other",
	"component_patch_management" : "Patch Management",
	"component_portal_administration" : "Portal Administration",
	"component_portal_deployment" : "Portal Deployment",
	"component_search_indexing" : "Search/Indexing",
	"component_security" : "Security",
	"component_social_office" : "Social Office",
	"component_ui" : "UI",
	"component_upgrade" : "Upgrade",
	"component_web_content_management" : "Web Content Management",
	"component_workflows_forms" : "Workflows/Forms"
};
