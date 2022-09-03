const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data;

    } catch (error) {
        console.log(error);
    }
}

// -------------------------Load Categories Details--------------------- 

const loadCatagoryDetails = async (id) => {
    const url = (`https://openapi.programming-hero.com/api/news/category/${id}`)
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

// --------------------------- Load Card details ----------------------------------

const cardNewsDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data
    } catch (error) {
        console.log(error)
    }
}


// ----------------------Display all News Name ---------------------------------

const displayNews = async () => {
    const data = await loadCategory()
    const newsNames = data.data.news_category;

    const menuItems = document.getElementById('categories-items');
    newsNames.forEach(news => {

        const li = document.createElement('li')
        li.innerHTML = `
        <a onclick = "displayCategory('${news.category_id}','${news.category_name}')">${news.category_name}</a>
        `;
        menuItems.appendChild(li);

    });
}

// ----------------------Display All News ---------------------------------------

const displayCategory = async (id, name) => {
    toggleSpiner(true)
    const questionField = document.getElementById('question-section');
    questionField.innerHTML = '';
    const data = await loadCatagoryDetails(id);

    const categories = data.data;

    const availableCategories = document.getElementById('categories');
    const noCategories = document.getElementById('no-categoris');

    categories.sort((a, b) => {
        return b.total_view - a.total_view;
    });

    if (categories.length === 0) {

        noCategories.classList.remove('hidden')
        noCategories.innerHTML = `
             <p class="text-lg text-black font-semibold"> <span id="total-category">No Items found for: 
                <span class="text-xl text-blue-700 font-bold">${name}</span>
                Category
             </p>
        `;
        availableCategories.classList.add('hidden')

        toggleSpiner(false)

    } else {
        noCategories.classList.add('hidden')
        availableCategories.classList.remove('hidden')
        availableCategories.innerHTML = `
            <p class="text-lg text-black font-semibold"> <span id="total-category">${categories.length} Items found for: 
                <span class="text-xl text-blue-700 font-bold">${name}</span>
                Category
            </p>
        `;
        toggleSpiner(false)

    }
    const allCategory = document.getElementById('all-category');
    allCategory.innerHTML = '';
    categories.forEach(category => {
        const { title, details, total_view, thumbnail_url, author, _id } = category;

        const div = document.createElement('div');

        // ------------------------------ Single Card section--------------------------
        div.innerHTML = `
                <div class="card card-side bg-white shadow-xl p-2 md:h-72">
                    <img class="rounded-lg "
                        src="${thumbnail_url}">
                    <div class="card-body text-black">
                        <h2 class="card-title ">${title}</h2>
                        <p>${details.length > 250 ? details.slice(0, 250) + '...' : details}</p>
                        <div class="card-actions justify-between items-center">
                            <div class="flex gap-2">
                                <label tabindex="0" class="btn btn-ghost btn-circle avatar flex">
                                    <div class="w-10 rounded-full">
                                        <img src="${author.img}" />
                                    </div>
                                </label>
                                <div>
                                    <h2 class="font-medium">${author.name ? author.name : "Unknown"}</h2>
                                    <h2>${author.published_date ? author.published_date : 'No Date Found'}</h2>
                                </div>
                            </div>
                            <div class="flex items-center font-medium gap-2">
                                <i class="fa-regular fa-eye text-lg"></i>
                                <h3 class="text-lg">${total_view ? total_view : 'No Views'}</h3>
                                
                            </div>
                            <a onclick = "displayCardDetails('${_id}')"  href="#my-modal-2"><i class="fa-solid fa-arrow-right text-2xl text-blue-800">
                            </i>
                            </a>
                        </div>
                    </div>
                </div>  `;
        allCategory.appendChild(div)

    });
}
// -----------------------Modal Section -----------------------------
const displayCardDetails = async (id) => {

    const data = await cardNewsDetails(id);
    const categories = data.data[0]
    console.log(categories);

    const { title, details, image_url, author, total_view } = categories;
    const newsDetails = document.getElementById('modal-body');
    newsDetails.innerHTML = `

    <img src="${image_url}" alt="">
    <h3 class="font-bold text-lg text-black">${title}</h3>
    <p class="py-4 text-black">${details.length > 100 ? details.slice(0, 100) + '...' : details}</p>
    <div class="card-actions justify-between items-center gap-2">
        <div class=" flex items-center gap-2">
            <label tabindex="0" class="btn btn-ghost btn-circle avatar flex">
                <div class="w-10 rounded-full">
                    <img src="${author.img}" />
                </div>
            </label>
            <div class="text-black">
                <h2 class="font-medium">${author.name ? author.name : 'Unknown'}</h2>
                <h2>${author.published_date ? author.published_date : 'No Date Found'}</h2>
            </div>

        </div>
            <div class="flex items-center font-medium gap-2 text-black">
                <i class="fa-regular fa-eye text-lg"></i>
                <h3 class="text-lg">${total_view ? total_view : 'No Views'}</h3>
            </div>
            <a href="#" class="bg-slate-600 text-white py-2 px-3 rounded-lg">close</a>
    </div>
    `;

}

// --------------------Spinner section ---------------------------------------

const toggleSpiner = isLoding => {
    const loaderSection = document.getElementById('loder');
    if (isLoding) {
        loaderSection.classList.remove('hidden');
    } else {
        loaderSection.classList.add('hidden');
    }
}

// ----------------------------Blog section---------------------------------

document.getElementById('blog-btn').addEventListener('click', function () {

    const availableCategories = document.getElementById('categories');
    availableCategories.innerHTML = '';
    const noCategories = document.getElementById('no-categoris');
    noCategories.innerHTML = '';
    const allCategory = document.getElementById('all-category');
    allCategory.innerHTML = '';
    const questionField = document.getElementById('question-section');
    questionField.innerHTML = `
    <div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <div class="collapse-title text-xl font-medium">
        <h3>What's the difference between var, let and const?</h3>
    </div>
    <div class="collapse-content">
        <p>The scope of a Var variable is functional scope. The scope of a let variable is block
            scope. The scope of a const variable is block scope.<br>
            Var can be updated and re-declared into the scope. let can be updated but cannot be
            re-declared into the scope. const cannot be updated or re-declared into the scope. <br>
            var can be declared without initialization. let can be declared without initialization.
            const cannot be declared without initialization.
        </p>
    </div>
</div>
<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-6">
    <div class="collapse-title text-xl font-medium">
        <h3>Difference between arrow function and regular function in javascript?</h3>
    </div>
    <div class="collapse-content">
        <p>Regular functions created using function declarations or expressions are constructible
            and callable. Since regular functions are constructible, they can be called using the
            new keyword. However, the arrow functions are only callable and not constructible, i.e
            arrow functions can never be used as constructor functions.
        </p>
    </div>
</div>
<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box">
    <div class="collapse-title text-xl font-medium">
        <h3>Why use template literals in javascript?</h3>
    </div>
    <div class="collapse-content">
        <p>template literals is an ES6 feature that allows you to create strings in JavaScript.
            Although backticks are mostly used for HTML or code embedding purposes, they also act
            similar to single and double quotes. Besides, using backticks makes it easier for string
            operations.
        </p>
    </div>
</div>
<div tabindex="0" class="collapse collapse-arrow border border-base-300 bg-base-100 rounded-box my-6">
    <div class="collapse-title text-xl font-medium">
        <h3>Difference among foreach filter find and map javascript</h3>
    </div>
    <div class="collapse-content">
        <p>The main difference between map and forEach is that the map method returns a new array by applying the callback function on each element of an array, <br>
        while the forEach method doesn't return anything. You can use the forEach method to mutate the source array, but this isn't really the way it's meant to be used.<br>
        The find() method is used to find all the descendant elements of the selected element. It finds the element in the DOM tree by traversing through the root to leaf. <br>
        The filter() method is used to filters all the elements and returns the element that matches and the element that do not match are removed.
        </p>
    </div>
</div>
    
    `
})

// ------------------- Display all news categories----------------------------
displayNews();

