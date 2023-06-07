const fruitForm = document.querySelector("#inputSection form");
const fruitList = document.querySelector("#fruitList ul");
const fruitCalories = document.querySelector("#fruitCalories");

const apikey = "37050476-c92ab61e9e1150558414fbcbd";

let totalCalories = 0;

const addFruit = async (data) => {

    //add fruit list item + calories
    const listItem = document.createElement("li");
    listItem.textContent = `${data.name} of Genus ${data.genus}`;
    totalCalories += data.nutritions.calories;
    fruitCalories.textContent = `Total calories: ${totalCalories}`;

    //add image
    let imageData = await fetchFruitImage(data.name);
    const imageItem = document.createElement("img");
    imageItem.src = imageData;
    listItem.appendChild(imageItem);

    fruitList.appendChild(listItem);

    //remove fruit list item + calories + image
    listItem.addEventListener("click", () => {
        listItem.remove();
        totalCalories -= data.nutritions.calories;

        if (totalCalories > 0) {
            fruitCalories.textContent = `Total calories: ${totalCalories}`;
        } else {

            fruitCalories.textContent = "";
        }

    })
}


const fetchFruitData = async (e) => {

    e.preventDefault();

    try {
        let fruit = e.target.fruitInput.value;
        const resp = await fetch(`https://amalsfruitapi.onrender.com/fruits/${fruit}`);
        if (resp.ok) {
            const fruitData = await resp.json();
            addFruit(fruitData);
            e.target.fruitInput.value = "";

        } else {
            throw `ERROR: status code = ${resp.status}`;
        }
    } catch (err) {
        console.log(err);
    }
}


const fetchFruitImage = async (fruitName) => {

    try {
        const resp = await fetch(`https://pixabay.com/api/?key=${apikey}&q=${fruitName}&image_type=photo`);
        if (resp.ok) {
            const fruitImageData = await resp.json();
            return fruitImageData.hits[0].previewURL;
        } else {
            throw `ERROR: status code = ${resp.status}`;
        }
    } catch (err) {
        console.log(err);
    }
}


fruitForm.addEventListener("submit", fetchFruitData);





