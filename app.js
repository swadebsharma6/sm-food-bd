const loadAllMeals = (inputText) =>{
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputText}`;
    fetch(url)
    .then(res => res.json())
    .then(data =>displayAllMeals(data.meals))
}


const displayAllMeals = (meals) =>{
    // console.log(meals);
    const mealContainer = document.getElementById('meal-container');
    mealContainer.innerHTML = '';
    meals.forEach(meal => {
        const {strMealThumb, strMeal, idMeal } =meal;
        // console.log(meal);
        const mealDiv = document.createElement('div');
        mealDiv.innerHTML = `
        <div class="card w-96 bg-base-100 shadow-xl">
        <figure class="px-10 pt-10">
          <img src="${strMealThumb}" alt="Shoes" class= "h-60 w-full rounded-xl" />
        </figure>
        <div class="card-body items-center text-center">
          <p class="card-title">${strMeal.slice(0, 15)}</p>
          
          <div class="card-actions">
            <label for="my-modal" onclick ="loadMealDetails(${idMeal})"  class="btn btn-primary">Details</label>
          </div>
        </div>
      </div>
        `;
    mealContainer.appendChild(mealDiv);
        
    });
}


const loadMealDetails =(idMeal) =>{
    const url =`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
    fetch(url)
    .then(res =>res.json())
    .then(data =>displayMealDetails(data.meals[0]))
    
}

const displayMealDetails = (meal) =>{
        console.log(meal);
        const {strCategory, strMealThumb, strTags} = meal;
    const modalContainer = document.getElementById('modal-body') ;
    modalContainer.innerHTML = `
        <div>
        <img src="${strMealThumb}" alt="" />
        </div>
        <h3>${strCategory}</h3>
        <p>${strTags}</p>
    ` ;  
    
}

const searchMeals =() =>{
    const searchText = document.getElementById('search-field') ;
    const searchValue = searchText.value ;
    // console.log(searchText);
    loadAllMeals(searchValue);

    searchText.value = ' ';
}





loadAllMeals('fish');