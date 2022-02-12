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
// Utility functions / UI Handlers
//
///////////////////////////////////////////////////////////

window.mojo = {
	toggleFlag: (payload) =>{
		if(payload.type === 'add'){
			document.querySelector('html').classList.add(payload.flag);
		}
		else{
			document.querySelector('html').classList.remove(payload.flag);
		}
	},

	showImage: (newHash) =>{
		window.mojo.toggleFlag({type: 'add', flag: 'showing-scroller'});

		window.setTimeout(() => {
			window.location.hash = newHash;

			window.setTimeout(() => {
				window.location.hash = 'What';
			}, 1);
		}, 1);
	},

	showMenu: () => {
		document.querySelector('html').classList.add('showing-menu');
	},

	hideMenu: () => {
		document.querySelector('html').classList.remove('showing-menu');
	},

	showHomeText: (message) => {
		document.getElementById('scrollText').style.display = 'none';
		document.getElementById('homeText').innerText = message;
		document.getElementById('homeText').style.display = 'block';
	},

	hideHomeText: () => {
		document.getElementById('scrollText').style.display = 'block';
		document.getElementById('homeText').style.display = 'none';
	}
};

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
				window.setTimeout((el) => {
					el.target.style.animationName = el.target.getAttribute('data-animation');
					el.target.style.visibility = 'visible';
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
	// detect scroll direction
	///////////////////////////////

	let oldValue = 0;
	let newValue = 0;
	let videoResumeTimer;
	window.addEventListener('scroll', () => {
		newValue = window.pageYOffset;
		if (oldValue < newValue) {
			window.mojo.toggleFlag({type: 'add', flag: 'hide-header'});

		} else if (oldValue > newValue) {
			window.mojo.toggleFlag({type: 'remove', flag: 'hide-header'});

		}

		video.pause();
		window.clearTimeout(videoResumeTimer);
		videoResumeTimer = window.setTimeout(()=>{
			video.play();
		}, 500)

		oldValue = newValue;
	});

	///////////////////////////////
	// now load the hero video
	///////////////////////////////

	const video = document.getElementById('heroVideo');
	window.setTimeout(() => {

		const sourceMP4 = document.createElement('source');
		sourceMP4.setAttribute('src', '/video/world.mp4');
		sourceMP4.setAttribute('type', 'video/mp4');
		video.appendChild(sourceMP4);

		const sourceWebM = document.createElement('source');
		sourceWebM.setAttribute('src', '/video/world.webm');
		sourceWebM.setAttribute('type', 'video/webm');
		video.appendChild(sourceWebM);

		video.play();
	}, 100);
}