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
// ----------------------Display all News Name ---------------------------------

const displayNews = async () => {
    const data = await loadCategory()
    // console.log(data.data.news_category)
    const newsNames = data.data.news_category;
    // console.log(newsNames)

    const menuItems = document.getElementById('categories-items');
    newsNames.forEach(news => {
        // console.log(catagory)
        const li = document.createElement('li')
        li.innerHTML = `
        <a onclick = "displayCategory('${news.category_id}','${news.category_name}')">${news.category_name}</a>
        `;
        menuItems.appendChild(li);

    });
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

// --------------------------- Load Card details

const cardNewsDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`
    const res = await fetch(url);
    const data = await res.json();
    return data
}

// ----------------------Display All News ---------------------------------------

const displayCategory = async (id, name) => {

    toggleSpiner(true)
    const data = await loadCatagoryDetails(id);
    // let isCategories = data.status
    // console.log(isCategories)
    const categories = data.data;
    const availableCategories = document.getElementById('categories');
    const noCategories = document.getElementById('no-categoris');

    if (categories.length === 0) {
        // console.log(categories.length)
        noCategories.classList.remove('hidden')
        noCategories.innerHTML = `
        <p class="text-lg text-black font-semibold">No Item found</p>
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
        // ------------------------------ all Card section--------------------------
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
                                    <h2 class="font-medium">${author.name}</h2>
                                    <h2>${author.published_date}</h2>
                                </div>
                            </div>
                            <div class="flex items-center font-medium gap-2">
                                <i class="fa-regular fa-eye text-lg"></i>
                                <h3 class="text-lg">${total_view}</h3>
                            </div>
                            <a onclick = "displayCardDetails('${_id}')"  href="#my-modal-2"><i class="fa-solid fa-arrow-right text-2xl text-blue-800">
                            </i></a>

                        </div>
                    </div>
                </div>  `;
        allCategory.appendChild(div)

    });


}
// -----------------------Modal Section -----------------------------
const displayCardDetails = async (id) => {
    // toggleSpiner(true)
    const data = await cardNewsDetails(id);
    const info = data.data[0]
    console.log(data)
    const { title, details, image_url, author, total_view } = info;
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
                <h2 class="font-medium">${author.name}</h2>
                <h2>${author.published_date}</h2>
            </div>

            </div>
            <div class="flex items-center font-medium gap-2 text-black">
                <i class="fa-regular fa-eye text-lg"></i>
                <h3 class="text-lg">${total_view}</h3>
            </div>
            <a href="#" class="bg-slate-600 text-white py-2 px-3 rounded-lg">close</a>
    </div>

    `;
    // toggleSpiner(false)

}


const toggleSpiner = isLoding => {
    // console.log(isLoding);
    const loaderSection = document.getElementById('loder');
    if (isLoding) {
        loaderSection.classList.remove('hidden');
    } else {
        loaderSection.classList.add('hidden');
    }
}
// -----------------------Blog open-----------------------
// const blogButton = document.getElementById('blog-open')
// blogButton.innerHTML = `

// `

// displayCategory()


displayNews();

