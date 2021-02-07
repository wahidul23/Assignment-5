
const listOfFood = document.getElementById('food-item');

const warning = document.getElementById('warning');

const foodsDetails = document.getElementById('food-details')


document.getElementById("search-button").addEventListener('click', function () {
    const foodName = document.getElementById('input-items').value
    listOfFood.innerHTML = ''
    foodsDetails.innerHTML = ''
    if (foodName === '') {
        warning.style.display = 'block';
    } else {
        getInputValue(foodName)
        warning.style.display = 'none';
    }

    document.getElementById('input-items').value = ""
})


const getInputValue = (foodName) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            displayMenu(data.meals)
        })
}


const displayMenu = foods => {
    console.log(foods);

    if (foods != null) {
        const foodItems = listOfFood
        foods.map(foods => {
            console.log(foods.strMeal);
            console.log(foods.strMealThumb);
            const foodDiv = document.createElement('div')
            foodDiv.className = "foods"
            const foodInfo = `
                <div onclick="displayDetails('${foods.idMeal}')">
                <img src="${foods.strMealThumb}">
                <h3>${foods.strMeal}</h3> 
               </div>
              
            `
            foodDiv.innerHTML = foodInfo
            foodItems.appendChild(foodDiv)
        })
    } else {
        warning.style.display = 'block';
        warning.innerText = 'Please Enter Valid Food Name'
        warning.style.color = 'red'
        warning.style.backgroundColor = 'gray'
        warning.style.padding = '20px'
        warning.style.color = 'red'
        warning.style.fontSize = 'bold'

    }
}

const displayDetails = idMeals => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeals}`;
    console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => {
            renderFoodInfo(data.meals[0]);
        });
};

const renderFoodInfo = food => {
    const foodItemsDiv = foodsDetails

    foodItemsDiv.innerHTML = `
   
    <img src="${food.strMealThumb}" alt="">
    <h2>${food.strMeal}</h2>
    
    <h3 >Ingredients</h3>
    <ul class="mb-0">
        <li> </i> ${food.strIngredient1}</li>
        <li> </i> ${food.strIngredient2}</li>
        <li> </i> ${food.strIngredient3}</li>
        <li> </i> ${food.strIngredient4}</li>
        <li> </i> ${food.strIngredient5}</li>
        <li> </i> ${food.strIngredient6}</li>
        <li> </i> ${food.strIngredient7}</li>
        <li> </i> ${food.strIngredient8}</li>
        <li> </i> ${food.strIngredient9}</li>
        <li> </i> ${food.strIngredient10}</li>
    </ul>
   `

};

