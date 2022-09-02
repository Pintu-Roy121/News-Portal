const loadCatagory = async () => {
    const url = 'https://openapi.programming-hero.com/api/news/categories'
    const res = await fetch(url)
    const data = await res.json()
    return data;
}

const showCatagory = async () => {
    const data = await loadCatagory()
    // console.log(data.data.news_category)
    const categories = data.data.news_category;
    // console.log(categories)

    const menuItems = document.getElementById('categories-items');
    categories.forEach(catagory => {
        // console.log(catagory)
        const li = document.createElement('li')
        li.innerHTML = `
        <a>${catagory.category_name}</a>
        `;
        menuItems.appendChild(li);

    });

}

showCatagory();