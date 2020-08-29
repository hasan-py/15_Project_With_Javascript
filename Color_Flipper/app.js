let colorList = ["Crimson","lightgreen","skyblue"]
let btn = document.querySelector('#btn');
let colorName = document.querySelector('#colorName');

btn.addEventListener('click', (e)=> {
	let number = getRandomNumber()
	colorName.innerText = (colorList[number]).toUpperCase()
	document.body.style.backgroundColor = colorList[number]
});

const getRandomNumber = ()=>{
	return Math.floor(Math.random()*colorList.length)
}