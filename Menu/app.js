const menuList = [
	{
		id:1,
		title:"Egg with Toast",
		category:"breakfast",
		price:"$8.00",
		image:"https://source.unsplash.com/FFqNATH27EM",
		des:"Lorem ipsum dolor itaque esse, ipsum dolor sit amet consectetur adipisicing elit. Quo assumenda molestiae itaque esse,libero illum!"
	},
	{
		id:2,
		title:"Chiken Curry",
		category:"lunch",
		price:"$20.00",
		image:"https://source.unsplash.com/Uck7TR7XYFo",
		des:"Lorem ipsum dolor sit ameaque esnsectetur adipisinda molestiae itaque esse,libero illum!"
	},
	{
		id:3,
		title:"The Salad tomato",
		category:"dinner",
		price:"$16.80",
		image:"https://source.unsplash.com/oT7_v-I0hHg",
		des:"Lorem ipsum dolor sit ametdipisicing elit.da molestiae dolor sit amet consectetur adipisicing elit. Quo assumenda molestiae itaque esse,libero illum!"
	},
	{
		id:4,
		title:"Buttermilk pancake",
		category:"breakfast",
		price:"$6.80",
		image:"https://source.unsplash.com/DtRMWqjdQLM",
		des:"Lorem ipsum dolor sit ametdipisicing elit.da molestiae dolor sit amet consectetur adipisicing elit. Quo assumenda molestiae itaque esse,libero illum!"
	},
	{
		id:5,
		title:"Godzila milkshake",
		category:"breakfast",
		price:"$10.00",
		image:"https://source.unsplash.com/4rzWyYTdvrA",
		des:"Lorem ipsum dolor sit ametdipisicing elit.da molestiae dolor sit amet consectetur adipisicing elit. Quo assumenda molestiae itaque esse,libero illum!"
	},
	{
		id:5,
		title:"Meal attack",
		category:"lunch",
		price:"$20.00",
		image:"https://source.unsplash.com/bpPTlXWTOvg",
		des:"Lorem ipsum dolor sit ametdipisicing elit.da molestiae dolor sit amet consectetur adipisicing elit. Quo assumenda molestiae itaque esse,libero illum!"
	},
	{
		id:5,
		title:"Bacon overflow",
		category:"dinner",
		price:"$15.00",
		image:"https://source.unsplash.com/R18ecx07b3c",
		des:"Lorem ipsum dolor sit ametdipisicing elit.da molestiae dolor sit amet consectetur adipisicing elit. Quo assumenda molestiae itaque esse,libero illum!"
	}

]

let menuSection = document.querySelector('#menuSection');
let categoryBtns = document.querySelectorAll('.categoryBtn');

// When Loaded window
window.addEventListener('DOMContentLoaded', function(e) {
	displayItemMenu(menuList)
});

// Filter data
categoryBtns.forEach(function(btn) {
	btn.addEventListener('click', function(e) {
		// Remove All btn color which is active
		categoryBtns.forEach(function(b) {
			b.classList.remove("bg-yellow-600")
			b.classList.add("text-yellow-600");
			b.classList.remove("text-white");
		});
		let category = btn.dataset.cat
		let filterMenu = menuList.filter(item=>{
			if(item.category === category){
				return item
			}
		})
		// When Click all
		if(btn.dataset.cat === "all"){
			displayItemMenu(menuList);
		}else{
			displayItemMenu(filterMenu);
		}
		// Change the boutton to active
		btn.classList.add("bg-yellow-600");
		btn.classList.remove("text-yellow-600");
		btn.classList.add("text-white");
	});
});

// Render Function
function displayItemMenu(menuList){
	let displayItem = menuList.map(item=>{
		return `
			<div class="col-span-1 mb-4 md:mx-4 lg:flex">
				<img class="h-48 w-full object-cover object-center border-4 border-yellow-700 rounded-lg mb-2 lg:w-48" src="${item.image}" alt="${item.title}">
				<div class="lg:flex lg:flex-col lg:ml-6">
					<div class="flex items-center justify-between">
						<div class="text-xl font-semibold tracking-widest text-gray-800">${item.title}</div>
						<div class="text-yellow-700 font-semibold ">${item.price}</div>
					</div>
					<hr class="border-gray-400 my-1">
					<div class="text-gray-600 mt-3">
						${item.des.substring(0,72)}
					</div>
				</div>
			</div>
		`
	})
	displayItem = displayItem.join("");
	menuSection.innerHTML = displayItem;
}