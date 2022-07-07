// write your code here
let URL = "http://localhost:3000/"
let ramenMenu = document.getElementById("ramen-menu")
let ratingDisp = document.getElementById("rating-display")
let commentDisp = document.getElementById("comment-display")
let newRamenForm = document.getElementById("new-ramen")
//append images to id "ramen-menu", or create?


function renderRamen(dish) {
let ramenImg = document.createElement("img")
ramenImg.src = dish.image
ramenImg.addEventListener("click", () => (showRamen(dish)))
ramenMenu.append(ramenImg)
}

function showRamen(dish) {
    let ramenDetailImg = document.querySelector(".detail-image")
    let ramenName = document.querySelector(".name")
    let ramenRest = document.querySelector(".restaurant")
    ramenDetailImg.src = dish.image
    ramenName.textContent = dish.name
    ramenRest.textContent = dish.restaurant
    ratingDisp.textContent = dish.rating
    commentDisp.textContent = dish.comment
}

function addRamen(e){
    e.preventDefault()
    let newRamen = {
        name: newRamenForm["new-name"].value,
        restaurant: newRamenForm["new-restaurant"].value,
        image: newRamenForm["new-image"].value,
        rating: newRamenForm["new-rating"].value,
        comment: newRamenForm["new-comment"].value,
    }
    renderRamen(newRamen)
    postRamen(newRamen)
    newRamenForm.reset()
}

function postRamen(newRamen){
fetch(URL+"ramens", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(newRamen)
})
.then(r => r.json())
.then(ramen => console.log (ramen))
}


function app(){
    fetch(URL+"ramens")
    .then(r => r.json())
    .then(ramenArr => {
        ramenArr.forEach((dish) => {
            renderRamen(dish)
         showRamen(ramenArr[0])
    }) 
})
newRamenForm.addEventListener("submit", addRamen)
}

app()