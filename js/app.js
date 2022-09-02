const loadCategory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url)
    const data = await res.json()
    return data;
}

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
        <a onclick = displayCategory('${news.category_id}')>${news.category_name}</a>
        `;
        menuItems.appendChild(li);

    });
}
// https://openapi.programming-hero.com/api/news/category/{category_id}

const loadCatagoryDetails = async (id) => {
    // const id = parseInt(category_id);
    // console.log(id)
    const url = (`https://openapi.programming-hero.com/api/news/category/${id}`)
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    return data;
}
const displayCategory = async (id) => {
    const data = await loadCatagoryDetails(id);
    const categories = data.data
    // console.log(categories)
    let count = 0;
    const allCategory = document.getElementById('all-category');

    categories.forEach(category => {
        // Counter Section Start
        count++
        const countCategory = document.getElementById('total-category');
        countCategory.innerText = count;
        // Counter secton End

        const { title, details, total_view, thumbnail_url, author } = category;

        // console.log(category)
        const div = document.createElement('div');
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
                            <div class="flex gap-2">
                                <i class="fa-solid fa-star-half-stroke"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                                <i class="fa-regular fa-star"></i>
                            </div>
                            <button><i class="fa-solid fa-arrow-right text-2xl text-blue-800"></i></button>

                        </div>
                    </div>
                </div>  `;
        // <a><i class="fa-solid fa-arrow-right text-2xl text-blue-800"></i></a>
        allCategory.appendChild(div)
    });


}
displayCategory()


displayNews();