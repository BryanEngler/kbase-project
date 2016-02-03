// ==UserScript==
// @name        LESA KBase Script V1.5
// @namespace   LESA KBase v1.5
// @description kbase v1.5
// @include     https://www.liferay.com/web/*/support?*
// @author      Sam Ziember & Steven Smith
// @version     1
// @grant       none
// ==/UserScript==

var collapsedOnStart = true;
var collapsed = collapsedOnStart;
var hidden = false;

window.addEventListener('load', function() {
	var jq = document.createElement('script');
	jq.src = "//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.1/jquery.min.js";
	document.querySelector('head').appendChild(jq);

	jq.onload = proceed;
}, false);

function proceed() {
	getServerInfo();
	addLinksToArrays();
	getLinks();
	floatMenu.id = "floatMenu";
	hideButton.id = "hideButton";

	for (var i = 0; i < 7; i++) {
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
				for (var j = -1; j < relatedIssuesLinks.length; j++) {
					a = document.createElement('a');
					//a.href = '';
					a.text = "Coming soon...";
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);

					//addLinksForFeedback(relatedIssuesLinks[j].link);
				}

				break;

			case 1:
				for (var j = 0; j < troubleshootingLinks.length; j++) {
					a = document.createElement('a');
					a.href = troubleshootingLinks[j].link;
					a.text = troubleshootingLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);

					addLinksForFeedback(troubleshootingLinks[j].link);
				}
				break;

			case 2:
				for (var j = 0; j < installationLinks.length; j++) {
					a = document.createElement('a');
					a.href = installationLinks[j].link;
					a.text = installationLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);

					addLinksForFeedback(installationLinks[j].link)
				}
				break;

			case 3:
				for (var j = 0; j < supportPolicyLinks.length; j++) {
					a = document.createElement('a');
					a.href = supportPolicyLinks[j].link;
					a.text = supportPolicyLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);

					addLinksForFeedback(supportPolicyLinks[j].link);
				}
				break;

			case 4:
				for (var j = 0; j < supportForumsLinks.length; j++) {
					a = document.createElement('a');
					a.href = supportForumsLinks[j].link;
					a.text = supportForumsLinks[j].name;
					a.target = '_blank';
					li = document.createElement('li');
					li.appendChild(a);
					subMenu[i].appendChild(li);

					addLinksForFeedback(supportForumsLinks[j]);
				}
				break;

			case 5:
			{
				a = document.createElement('a');
				a.href = "https://in.liferay.com/web/support/wiki/-/wiki/Main+Global/Service+Level+Response+and+Resolution+Times"
				a.text = "SLA";
				a.target = '_blank';
				li = document.createElement('li');
				li.appendChild(a);
				subMenu[i].appendChild(li);
			}
				break;

			case 6:
				var feedbackURLYes = createFeedbackURL("Yes");
				var feedbackURLNo = createFeedbackURL("No");
				var d = document.createElement('div');
				var s = document.createElement('span');
				s.innerText = " - or - ";

				a = document.createElement('a');
				a.href = feedbackURLYes;
				a.text = "Yes";
				a.target = '_blank';

				var b = document.createElement('a');
				b.href = feedbackURLNo;
				b.text = "No";
				b.target = '_blank';

				d.appendChild(a);
				d.appendChild(s);
				d.appendChild(b);
				subMenu[i].appendChild(d);

				break;
		}

		outerDiv[i].appendChild(menuItem[i]);
		outerDiv[i].appendChild(subMenu[i]);
	}

	var listDiv = document.createElement('div');

	listDiv.className = "menuList";

	for (i = 0; i < 7; i++) {
		listDiv.appendChild(outerDiv[i]);
	}

	var h3 = document.createElement('h3');

	h3.className = 'menuHeader';
	h3.innerHTML = "Quick Links";

	floatMenu.appendChild(h3);

	floatMenu.appendChild(listDiv);

	hideButton.innerHTML = "<img src='http://www.iconsdb.com/icons/preview/royal-blue/minus-xxl.png' style='width:20px;height:20px;'>";
	hideButton.onclick = showOrHideMenu;

	document.body.appendChild(hideButton);

	document.body.appendChild(floatMenu);

	/*jshint multistr: true */
	var css = "#floatMenu {\
			position:fixed;\
			top:15%;\
			right:0px;\
			width:200px;\
			background-color:#FFF;\
			margin:0;\
			padding:0;\
			font-size:15px;\
			border-left:1px solid #ddd;\
			border-right:1px solid #ddd;\
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
		if(collapsedOnStart){
			jQuery('.menuList').hide();
			floatMenu.className = "";//"rotate";
		}
		jQuery('.menuItem').click(function() {
			$menuItem = jQuery(this);
			$subMenu = $menuItem.next();
			$subMenu.slideToggle(500);
		});
	});

	jQuery(function() {
		jQuery('.menuHeader').click(function() {
			jQuery('.subMenu').hide();
			jQuery('.menuList').slideToggle(500);
			collapsed = collapsed ^ true;

			if (collapsed) {
				floatMenu.className = "";//"rotate";
			} else {
				floatMenu.className = "";
			}
		});
	});

	function getServerInfo(serverInfo, typeNode) {
		AUI().use('aui-base', 'node',
			function(A) {
				function serverType(serverInfo) {
					var version = '';
					var serverTypeNode = typeNode;
					serverTypeNode.each(
						function() {
							var innerHTML = this.get('textContent');
							if (innerHTML.toUpperCase().indexOf(serverInfo) > -1) {
								version = innerHTML;
							}
						}
					);

					if (version) {
						var begin = version.toUpperCase().indexOf(serverInfo) + serverInfo.length;
						var end = version.indexOf('  ', begin);

						version = version.substring(begin, end);
						return version.toString().trim();
					}

					return serverType;
				}
				var typeNode = A.all(".content-column-content");
				dataArray[dataArray.length] = serverType(lrVersionText, typeNode);
				dataArray[dataArray.length] = serverType(opSystemText, typeNode);
				dataArray[dataArray.length] = serverType(applicationServerText, typeNode);
				dataArray[dataArray.length] = serverType(dataBaseText, typeNode);
				dataArray[dataArray.length] = serverType(browserText, typeNode);
				dataArray[dataArray.length] = serverType(javaText, typeNode);
				typeNode = A.all(".callout-content");
				dataArray[dataArray.length] = serverType(componentText, typeNode);
				dataArray[dataArray.length] = getCustomerId();
			}
		);
	}

	function getCustomerId() {
		var customerId = document.getElementsByTagName("title")[0].innerHTML;

		var tempVar = customerId.split("[");
		customerId = tempVar[1].split("]");

		return customerId[0];
	}

	function addLinksForFeedback(linkContent) {

		feedbackLinkContent[feedbackLinkContent.length] = linkContent;
	}

	function createFeedbackURL(answer) {

		var customerId = dataArray[7];

		var baseGoogleFormURL = "https://docs.google.com/a/liferay.com/forms/d/143TgPw3RGU67t17OO195pb7lhnAVW6o909CWSTKKCso/viewform?";

		var completeFormURL = baseGoogleFormURL + "entry.321334840=" + customerId;

		completeFormURL = completeFormURL + "&entry.1983029939=" + answer +"&" ;

		completeFormURL = completeFormURL + "&entry.1550379905=";

		for (var a = 0; a < feedbackLinkContent.length; a++) {
			completeFormURL = completeFormURL + feedbackLinkContent[a] + " , "
		}

		return completeFormURL;
	}

	function showOrHideMenu() {
		if (hidden) {
			document.getElementById("floatMenu").style.width = "200px";
			hideButton.innerHTML = "<img src='http://www.iconsdb.com/icons/preview/royal-blue/minus-xxl.png' style='width:20px;height:20px;'>";
			hidden = false;
		}
		else {
			document.getElementById("floatMenu").style.width = "0px";
			hideButton.innerHTML = "<img src='https://cdn3.iconfinder.com/data/icons/musthave/256/Add.png' style='width:20px;height:20px;'>";
			hidden = true;
		}
	}

	function getLinks() {
		var appServer = dataArray[2].split(" ")[0],
			browser = dataArray[4].split(" ")[0],
			component = dataArray[6],
			db = dataArray[3].split(" ")[0],
			java = dataArray[5].split(" ")[0],
			os = dataArray[1].split(" ")[0];

		for (var i = 0; i < arrayOfMaps.length; i++) {
			var map = arrayOfMaps[i];
			var install = [];
			var supportPolicy = [];
			var troubleShoot = [];
			var supportForums = [];

			switch (i) {
				case 0:
					if (appServer in map) {
						if (map[appServer][0] !== null) {
							if (appServer == 'Websphere') {
								if (dataArray[2].indexOf('8.5')) {
									install.link = map[appServer][0][0];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								} else {
									install.link = map[appServer][0][1];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								}
							} else if (appServer == 'Weblogic') {
								if (dataArray[2].indexOf('12')) {
									install.link = map[appServer][0][0];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								} else {
									install.link = map[appServer][0][1];
									install.name = dataArray[2];
									installationLinks[installationLinks.length] = install;
								}
							} else {
								install.link = map[appServer][0];
								install.name = dataArray[2];
								installationLinks[installationLinks.length] = install;
							}
						}
						if (map[appServer][1] !== null) {
							supportPolicy.link = map[appServer][1];
							supportPolicy.name = dataArray[2];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[appServer][2] !== null) {
							troubleShoot.link = map[appServer][2];
							troubleShoot.name = dataArray[2];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 1:
					if (browser in map) {
						if (map[browser][0] !== null) {
							supportPolicy.link = map[browser][0];
							supportPolicy.name = dataArray[4];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[browser][1] !== null) {
							troubleShoot.link = map[browser][1];
							troubleShoot.name = dataArray[4];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 2:
					if (component in map) {
						if (map[component][0] !== null) {
							install.link = map[component][0];
							install.name = dataArray[6];
							installationLinks[installationLinks.length] = install;
						}
						if (map[component][1] !== null) {
							supportPolicy.link = map[component][1];
							supportPolicy.name = dataArray[6];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[component][2] !== null) {
							troubleShoot.link = map[component][2];
							troubleShoot.name = dataArray[6];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
						if(map[component][3] !== null) {
							supportForums.link = map[component][3];
							supportForums.name = dataArray[6];
							supportForums.noLink = false;
							supportForumsLinks[supportForumsLinks.length] = supportForums;
						} else {
							supportForums.link = 'https://in.liferay.com/web/support/forums/-/message_boards/category/922867';
							supportForums.name = 'Support Forums';
							supportForumsLinks[supportForumsLinks.length] = supportForums;
						}
					}
					break;
				case 3:
					if (db in map) {
						if (map[db][0] !== null) {
							supportPolicy.link = map[db][0];
							supportPolicy.name = dataArray[3];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[db][1] !== null) {
							troubleShoot.link = map[db][1];
							troubleShoot.name = dataArray[3];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 4:
					if (java in map) {
						if (map[java][0] !== null) {
							supportPolicy.link = map[java][0];
							supportPolicy.name = dataArray[5];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[java][1] !== null) {
							troubleShoot.link = map[java][1];
							troubleShoot.name = dataArray[5];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 5:
					if (os in map) {
						if (map[os][0] !== null) {
							supportPolicy.link = map[os][0];
							supportPolicy.name = dataArray[1];
							supportPolicyLinks[supportPolicyLinks.length] = supportPolicy;
						}
						if (map[os][1] !== null) {
							troubleShoot.link = map[os][1];
							troubleShoot.name = dataArray[1];
							troubleshootingLinks[troubleshootingLinks.length] = troubleShoot;
						}
					}
					break;
				case 6:
					//getRelatedIssuesLinks

					break;
			}
		}
	}
}

function addLinksToArrays() {
	appServerMap['Websphere'] = [['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-websphere-8-5', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-websphere-8-0'], 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31534', null];
	appServerMap['Tomcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-tomcat-7', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31522', null];
	appServerMap['Weblogic'] = [['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-oracle-weblogic-12c-12-1-2-and-h', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-oracle-weblogic-10-3', 'https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-weblogic-10'], null, null];
	appServerMap['JBoss'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-jboss-7-1', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31960', null];
	appServerMap['Tcat'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-mulesoft-tcat', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32064', null];
	appServerMap['Glassfish'] = ['https://dev.liferay.com/discover/deployment/-/knowledge_base/6-2/installing-liferay-on-glassfish-4', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31320', null];
	appServerMap['Resin'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/installing-liferay-on-resin-4', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31988', null];
	appServerMap['tcServer'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/13554', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32076', null];

	browserMap['Firefox'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32010', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Chrome'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31732', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Internet'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31762', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];
	browserMap['Safari'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32039', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/28327'];

	componentMap['Account Administration'] = [null, null, "https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/integrating-liferay-users-into-your-enterprise#ldap", null];
	componentMap['Activation Key'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616", null,"https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36675767","https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36675767",null];
	componentMap['Authentication'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/40556658", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40359", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14567", "https://in.liferay.com/web/support/forums/-/message_boards/category/4697603"];
	componentMap['Calendar'] = ["https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/managing-events-and-calendar-resources-with-liferays-c", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40324", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15145", "https://in.liferay.com/web/support/forums/-/message_boards/category/5951214"];
	componentMap['Clustering'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/14264973", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14666", "https://in.liferay.com/web/support/forums/-/message_boards/category/16979473"];
	componentMap['Collaboration Suite'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/collaboration-suite', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40284", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15089", "https://in.liferay.com/web/support/forums/-/message_boards/category/5951214"];
	componentMap['Developer Studio'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27061762", null, null, 'https://in.liferay.com/web/support/forums/-/message_boards/category/4697596'];
	componentMap['Document Library'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/document-management', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/38992", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30483903", "https://in.liferay.com/web/support/forums/-/message_boards/category/4534050"];
	componentMap['LAR/Staging'] = ["https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/43449", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14694", "https://in.liferay.com/web/support/forums/-/message_boards/category/5953181"];
	componentMap['License'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616', null, 'https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/36675767', null];
	componentMap['License/Account Setup'] = ['https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/36709616', null, 'https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/36675767', null];
	componentMap['Liferay API'] = ["https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/14262850", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15200", "https://in.liferay.com/web/support/forums/-/message_boards/category/5950852"];
	componentMap['Liferay Faces'] = ['https://www.liferay.com/community/liferay-projects/liferay-faces/documentation', null, "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27733288", "https://in.liferay.com/web/support/forums/-/message_boards/category/5951363"];
	componentMap['Liferay Mobile SDK'] = ['https://dev.liferay.com/develop/tutorials/-/knowledge_base/6-2/mobile', null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/15277", null];
	componentMap['Liferay Sync'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/administering-liferay-sync', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40300", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/27528001", "https://in.liferay.com/web/support/forums/-/message_boards/category/5952429"];
	componentMap['Patch Management'] = ['https://www.liferay.com/group/customer/products/portal/patching', null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14769", null];
	componentMap['Portal Administration'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30717691", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/18554", "https://in.liferay.com/web/support/forums/-/message_boards/category/4772239"];
	componentMap['Portal Deployment'] = ['https://dev.liferay.com/discover/deployment', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31470", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485351", "https://in.liferay.com/web/support/forums/-/message_boards/category/4533678"];
	componentMap['Search/Indexing'] = ["https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/14324221", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40308", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485451", "https://in.liferay.com/web/support/forums/-/message_boards/category/5953181"];
	componentMap['Security'] = ["https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/40556658", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/25821", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14727", "https://in.liferay.com/web/support/forums/-/message_boards/category/5950866"];
	componentMap['UI'] = [null, null, "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/43697018", "https://in.liferay.com/web/support/forums/-/message_boards/category/5952679"];
	componentMap['Upgrade'] = ["https://www.liferay.com/group/customer/kbase/-/knowledge_base/article/27740277", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/14762", "https://in.liferay.com/web/support/forums/-/message_boards/category/17065113"];
	componentMap['Web Content Management'] = ['https://dev.liferay.com/discover/portal/-/knowledge_base/6-2/web-content-management', "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/40292", "https://www.liferay.com/group/customer/knowledge/kb/-/knowledge_base/article/30485750", 'https://in.liferay.com/web/support/forums/-/message_boards/category/4697774'];
	componentMap['Workflows/Forms'] = ["https://dev.liferay.com/discover/portal/-/knowledge_base/6-1/kaleo-forms-defining-business-processes", null, "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/18545", "https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/22105"];

	databaseMap['Oracle'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31478', null];
	databaseMap['MySQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31470', null];
	databaseMap['DB2'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31688', null];
	databaseMap['PostgreSQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31644', null];
	databaseMap['Sybase'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31656', null];
	databaseMap['SQL'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31668', null];


	javaMap['IBM JDK'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31918', 'https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/24963'];
	javaMap['Oracle JRockit'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31996', null];
	javaMap['Java'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31968', null];
	javaMap['Sun JDK'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31945', null];

	lrVersionMap['6.2'] = ['https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.2+EE+Compatibility+Matrix.pdf/3b3fd878-c954-4acc-bd5f-19fb7eb78210'];
	lrVersionMap['6.1'] = ['https://www.liferay.com/documents/14/21598941/Liferay+Portal+6.1+EE+Compatibility+Matrix.pdf/fb724548-0d8d-408f-ad01-5acd862c038a'];
	lrVersionMap['6.0'] = ['https://www.liferay.com/documents/3133562/8435741/Compatibility+Matrix+v6.0.pdf/b58f3e64-30d8-400a-aba3-71c16e439fc9?'];
	lrVersionMap['5.2'] = ['https://www.liferay.com/documents/3133562/8435737/Compatibility+Matrix+v5.2.pdf/4a81c299-132c-488d-b10e-b7546891a1d2?'];
	lrVersionMap['5.1'] = ['https://www.liferay.com/documents/3133562/8435733/Support+Matrix+v5.1.pdf/91f9a892-6b3b-4ab2-abdc-14ceb1aceb1f'];

	osMap['Mac'] = [null, null];
	osMap['Windows'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32055', null];
	osMap['Red'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31911', null];
	osMap['AIX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31895', null];
	osMap['Debian'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31812', null];
	osMap['openSUSE'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31840', null];
	osMap['Ubuntu'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32047', null];
	osMap['CentOS'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31902', null];
	osMap['Solaris'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31980', null];
	osMap['Oracle'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31847', null];
	osMap['Other'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32112', null];
	osMap['HP-UX'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/31820', null];
	osMap['General'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32318', null];
	osMap['Linux'] = ['https://support-kb.liferay.com/web/knowledge/knowledge-base/-/knowledge_base/article/32318', null];
}

var appServerMap = new Map(),
	browserMap = new Map(),
	componentMap = new Map(),
	databaseMap = new Map(),
	javaMap = new Map(),
	lrVersionMap = new Map(),
	osMap = new Map(),
	relatedIssuesMap = new Map();

var arrayOfMaps = [appServerMap, browserMap, componentMap, databaseMap, javaMap, osMap, relatedIssuesMap];

var supportPolicyLinks = [],
	installationLinks = [],
	troubleshootingLinks = [],
	supportForumsLinks = [],
	relatedIssuesLinks = [],
	feedbackLinkContent = [];

var applicationServerText = "APPLICATION SERVER: ";
var componentText = "COMPONENT: ";
var dataBaseText = "DATABASE: ";
var lrVersionText = "LIFERAY VERSION: ";
var opSystemText = "OPERATING SYSTEM:  ";
var browserText = "PRIMARY BROWSER:  ";
var javaText = "JAVA VIRTUAL MACHINE: ";

var dataArray = [];

var floatMenu = document.createElement('div');
var hideButton = document.createElement('div');

var outerDiv = [];
var menuItem = [];
var subMenu = [];
var categoryNames = [
	"Related Issues",
	"Troubleshooting",
	"How to (Install)",
	"Support Policies",
	"Product Support Forums",
	"Service Level Agreement",
	"Was this tool helpful?"
];
