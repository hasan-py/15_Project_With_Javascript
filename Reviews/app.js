// Review List
const reviewList = [
	{
		id:1,
		author:"Jhon Doe",
		"job":"Ux Designer",
		"avatar":"https://source.unsplash.com/6anudmpILw4",
		"bio":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quas repellat tenetur a obcaecati cum ut, suscipit. Deserunt eligendi natus impedit architecto ea, veniam ex saepe dignissimos distinctio fugit modi."
	},
	{
		id:2,
		author:"Alex Costa",
		"job":"Web Developer",
		"avatar":"https://source.unsplash.com/RhIXw1Ua-NI",
		"bio":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quas repellat tenetur a obcaecati cum ut, suscipit. Deserunt eligendi natus impedit architecto ea, veniam ex saepe dignissimos distinctio fugit modi."
	},
	{
		id:3,
		author:"Jeren Sage",
		"job":"Cloud Engineer",
		"avatar":"https://source.unsplash.com/_5_CBVCLBsY",
		"bio":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad quas repellat tenetur a obcaecati cum ut, suscipit. Deserunt eligendi natus impedit architecto ea, veniam ex saepe dignissimos distinctio fugit modi."
	}

]


// Get all element
let author = document.querySelector('#author');
let avatar = document.querySelector('#avatar');
let job = document.querySelector('#job');
let bio = document.querySelector('#bio');


// Get all button
let preBtn = document.querySelector('#preBtn');
let nextBtn = document.querySelector('#nextBtn');
let surpriseBtn = document.querySelector('#surpriseBtn');


// Load initial Item
let currentItem = 0;

window.addEventListener("DOMContentLoaded", function () {
	getReview(currentItem)
});

const getReview = function(index){
	let review = reviewList[index]
	avatar.src = review.avatar
	author.textContent = review.author
	job.textContent = review.job
	bio.textContent = review.bio
}

// Next Button
nextBtn.addEventListener('click', function(e) {
	currentItem++;
	if(currentItem>reviewList.length-1){
		currentItem = 0;
	}
	getReview(currentItem)
});

// Prev Button
preBtn.addEventListener('click', function(e) {
	currentItem--;
	if(currentItem<0){
		currentItem = reviewList.length-1;
	}
	getReview(currentItem)
});

// Surprise Button
surpriseBtn.addEventListener('click', function(e) {
	let randomNumber = Math.floor(Math.random()*reviewList.length)
	getReview(randomNumber)
});