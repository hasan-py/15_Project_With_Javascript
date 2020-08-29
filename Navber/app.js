let toggleOpen = document.querySelector('#toggleOpen');
let toggleClose = document.querySelector('#toggleClose');
let navLink = document.querySelector('#navLink');

toggleOpen.addEventListener('click', function(e) {
	navLink.classList.remove("hidden")
	toggleOpen.classList.add("hidden")
	toggleClose.classList.remove("hidden")
});

toggleClose.addEventListener('click', function(e) {
	navLink.classList.add("hidden")
	toggleOpen.classList.remove("hidden")
	toggleClose.classList.add("hidden")
});