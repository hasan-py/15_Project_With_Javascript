let colorList = [1,2,3,4,5,6,7,8,9,0,"A","B","C","D","E","F"]
let btn = document.querySelector('#btn');
let colorName = document.querySelector('#colorName');

btn.addEventListener('click', (e)=> {
	let hex = "#"
	for(let i=0; i<6; i++){
		hex = hex+colorList[getRandomNumber()]
	}
	document.body.style.backgroundColor = hex
	colorName.innerText = hex
});

const getRandomNumber = ()=>{
	return Math.floor(Math.random()*colorList.length)
}