///////////////////////////////////////////////////////////
//
// Service Worker
//
///////////////////////////////////////////////////////////

// Check that service workers are supported
if ('serviceWorker' in navigator) {
	// Use the window load event to keep the page load performant
	window.addEventListener('load', () => {
		// TODO activate when ready
		//navigator.serviceWorker.register('/service-worker.js');
	});
}

///////////////////////////////////////////////////////////
//
// Utility functions
//
///////////////////////////////////////////////////////////

function toggleFlag(payload){
	if(payload.type === 'add'){
		document.querySelector('html').classList.add(payload.flag);
	}
	else{
		document.querySelector('html').classList.remove(payload.flag);
	}
}

///////////////////////////////////////////////////////////
//
// UI handlers
//
///////////////////////////////////////////////////////////

function showImage(newHash){
	toggleFlag({type: 'add', flag: 'showing-scroller'});

	window.setTimeout(() => {
		window.location.hash = newHash;
	}, 1);
}

function showMenu(){
	document.querySelector('html').classList.add('showing-menu');
}

function hideMenu(){
	document.querySelector('html').classList.remove('showing-menu');
}

function showHomeText(message){
	document.getElementById('scrollText').style.display = 'none';
	document.getElementById('homeText').innerText = message;
	document.getElementById('homeText').style.display = 'block';
}

function hideHomeText(){
	document.getElementById('scrollText').style.display = 'block';
	document.getElementById('homeText').style.display = 'none';
}
///////////////////////////////////////////////////////////
//
// animation via intersection observers
//
///////////////////////////////////////////////////////////


window.onload = () => {
	document.querySelector('html').classList.add('loaded');

	const home = document.querySelectorAll('section.home')[0];
	const observer = new IntersectionObserver(elements =>{
		if(!elements[0].isIntersecting){
			document.querySelector('html').classList.add('scrolled-past-home');
		}
		else{
			document.querySelector('html').classList.remove('scrolled-past-home');
		}
	});

	observer.observe(home);

	const animatedList = document.querySelectorAll('.animated');
	const animatedObserver = new IntersectionObserver(entries =>{
		entries.forEach(entry => {
			// Add 'active' class if observation target is inside viewport
			if (entry.isIntersecting) {
				const delay = entry.target.getAttribute('data-delay') || 1;
				window.setTimeout((entry) => {
					entry.target.style.animationName = entry.target.getAttribute('data-animation');
					entry.target.style.visibility = 'visible';
				}, delay, entry);
			}
		});
	});

	animatedList.forEach((el) => {
		el.setAttribute('data-animation', el.style.animationName);
		el.style.visibility = 'hidden';
		el.style.animationName = 'unset';
		animatedObserver.observe(el);
	});

	///////////////////////////////
	// now load the hero video
	///////////////////////////////

	const video = document.getElementById('heroVideo');
	const source = document.createElement('source');

	source.setAttribute('src', '/video/world.mp4');
	source.setAttribute('type', 'video/mp4');

	video.appendChild(source);
	video.play();

}