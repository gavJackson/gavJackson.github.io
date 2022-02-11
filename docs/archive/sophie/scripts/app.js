///////////////////////////////////////////////////////////
//
// mobile menu
//
///////////////////////////////////////////////////////////

function toggleMobileMenu(){
	if ( document.getElementById("navMenu").classList.contains('open') ){
		document.getElementById('navMenu').classList.remove('open');
		document.getElementById('mobileBlackOut').classList.remove('open');

	}
	else{
		document.getElementById('navMenu').classList.add('open');
		document.getElementById('mobileBlackOut').classList.add('open');

	}
}


function hideMobileMenu(){
	if ( document.getElementById("navMenu").classList.contains('open') ){
		document.getElementById('navMenu').classList.remove('open');
		document.getElementById('mobileBlackOut').classList.remove('open');
	}
}



///////////////////////////////////////////////////////////
//
// hash routing
//
///////////////////////////////////////////////////////////

// A hash to store our routes:
var routes = {};

function route (path, templateId, controller) {
	routes[path] = {templateId: templateId, controller: controller};
}

var lastTemplate = null;
function router () {

	// clear last route
	if(lastTemplate){
		document.getElementById(lastTemplate).style.display = 'none';
	}

	// Current route url (getting rid of '#' in hash as well):
	var url = location.hash.slice(1) || '/';
	var route = routes[url];
	if (route && route.controller) {
		document.getElementById(route.templateId).style.display = 'block';
		lastTemplate = route.templateId;
		route.controller();
		hideMobileMenu();

		gtag('config', 'UA-110453957-1', {
			'page_title': route.templateId,
			'page_location': location.pathname+location.search+location.hash,
			'page_path': url
		});
	}
	else{
		window.location.hash = '/home';
	}
}
// Listen on hash change:
window.addEventListener('hashchange', router);
// Listen on page load:
window.addEventListener('load', router);

var lastNav =  null;
function selectNav(id){
	if(lastNav){
		document.getElementById(lastNav).classList.remove('selected');
	}

	document.getElementById(id).classList.add('selected');
	lastNav = id;
}


///////////////////////////////
// initialisation
///////////////////////////////

function getContentTop(){
	if(window.innerWidth >= 600){
		return 602;

	}
	else{
		return 403;
	}
}

(function(){
	route('/home', 'homeContent', function () {
			selectNav('homeNav');
			window.scrollTo(0, 0);
		}
	);

	route('/author', 'authorContent', function () {
			selectNav('authorNav');
			window.scrollTo(0, getContentTop());
		}
	);

	route('/sample', 'sampleContent', function () {
			selectNav('sampleNav');
			window.scrollTo(0, getContentTop());
		}
	);

	route('/reviews', 'reviewsContent', function () {
			selectNav('reviewsNav');
			window.scrollTo(0, getContentTop());
		}
	);

	route('/contact', 'contactContent', function () {
			selectNav('contactNav');
			window.scrollTo(0, getContentTop());
		}
	);

	route('/buy', 'buyContent', function () {
			selectNav('buyNav');
			window.scrollTo(0, getContentTop());
		}
	);

	route('/drabbles', 'drabblesContent', function () {
			selectNav('drabblesNav');
			window.scrollTo(0, getContentTop());
		}
	);


	if(window.location.hash == ''){
		window.location.hash = '/home';
		router();
	}

	// For desktops only, we want to load the non-blurred main in a way that
	// doesn't slow down the site being usable
	window.onload = function(){
		if(window.innerWidth >= 1000){
			var img = new Image();
			img.addEventListener("load", function(event) {
				console.log("All resources finished loading!");
				document.body.className += ' ' + 'loaded';
			});

			img.src = 'assets/images/background-large.jpg';
		}
		else{
			// just in case we increase in screen size
			document.body.className += ' ' + 'loaded';
		}
	};
})();
