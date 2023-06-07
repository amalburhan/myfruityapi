const fruitForm = document.querySelector("#inputSection form");
console.log(fruitForm);
const fruitNutrition = document.querySelector("#nutritionSection p");
let cal = 0;
const fruitList = document.querySelector("#fruitSection ul");
const fruitImage = document.querySelector(".fruitImage ul");

const addFruit = (fruit) => {
    const li = document.createElement('li');
    li.textContent = `${fruit.name} of Genus ${fruit.genus}`;
    fruitList.appendChild(li);
    cal += fruit.nutritions.calories;

    fruitNutrition.textContent = `Total calories: ${cal}`;

    li.addEventListener("click", () => {
        li.remove();
        cal -= fruit.nutritions.calories;

        fruitNutrition.textContent = `Total calories: ${cal}`;
    }, { once: true });

    fetchFruitImage(fruit);

};

const addFruitImage = (fruit) => {
    const img = document.createElement('img');
    img.src = fruit.hits[0].previewURL;
    fruitList.appendChild(img);
}




const fetchFruitData = async (fruit) => {
    try {
        const resp = await fetch(`https://amalsfruitapi.onrender.com/fruits/${fruit}`
        );
        if (resp.ok) {
            const data = await resp.json();
            addFruit(data);
        } else {
            throw "Error: status code = " + resp.status;
        }

    } catch (err) {

        console.log(err);

    }
}

const fetchFruitImage = async (fruit) => {
    try {
        const resp = await fetch(`https://pixabay.com/api/?key=37050476-c92ab61e9e1150558414fbcbd&q=${fruit.name}&image_type=photo`);
        if (resp.ok) {
            const data = await resp.json()
            addFruitImage(data)
        } else {
            throw "Error: http status code = " + resp.status
        }
    } catch (err) {
        console.log(err)
    }
}



const extractFruit = (e) => {
    e.preventDefault(); // action does not clear
    fetchFruitData(e.target.fruitInput.value);
    // clear text box
    e.target.fruitInput.value = "";
};

fruitForm.addEventListener("submit", extractFruit);

