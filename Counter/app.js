let btns = document.querySelectorAll('button');
let value = document.querySelector('#value');

let count = 0;
btns.forEach(function(btn) {
	btn.addEventListener('click', function(e) {
		let classes = btn.classList
		if(classes.contains("increase")){
			count++;
		}else if(classes.contains("decrease")){
			count--;
		}else if(classes.contains("reset")){
			count=0;
		}
		if(count === 0){
			value.style.color = "#2d3748"
		}else if(count > 0){
			value.style.color = "#2f855a"
		}else if(count < 0){
			value.style.color = "#c53030"
		}
		value.textContent = count;
	}); 
});