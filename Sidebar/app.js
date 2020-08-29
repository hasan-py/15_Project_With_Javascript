let menuBar = document.querySelector('#menuBar');
let sidebar = document.querySelector('#sidebar');
let content = document.querySelector('#content');

menuBar.addEventListener('click', function(e) {
	if(!sidebar.classList.contains("hidden")){
		sidebar.classList.add("hidden")
		content.classList.remove("md:w-4/5")
		content.classList.add("w-full")
	}else{
		sidebar.classList.remove("hidden")
		content.classList.remove("w-full")
		content.classList.add("md:w-4/5")
	}
});