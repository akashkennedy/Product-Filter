const data = [
    {
        id: 1,
        name: "Fossil Analog Black Dial Men's Watch-FS5384",
        img: "https://m.media-amazon.com/images/I/81yIS3D+UJL._AC_UL320_.jpg",
        price: 10,
        cat: "Dress",
    },
    {
        id: 2,
        name: "Fossil Grant Analog Blue Dial Men's Watch-FS5151",
        img: "https://m.media-amazon.com/images/I/81Q7WuKlezL._AC_UL320_.jpg",
        price: 40,
        cat: "Dress",
    },
    {
        id: 3,
        name: "Analog Off-White Dial Men's Watch - FS5402",
        img: "https://m.media-amazon.com/images/I/91s2kllONHL._AC_UL320_.jpg",
        price: 56,
        cat: "Sport",
    },
    {
        id: 4,
        name: "Rye Analog Rose Gold Dial Women's Watch-BQ3691",
        img: "https://m.media-amazon.com/images/I/81w3gMM9vaS._AC_UL320_.jpg",
        price: 76,
        cat: "Sport",
    },
    {
        id: 5,
        name: "Analog Off-White Dial Men's Watch-FS5378",
        img: "https://m.media-amazon.com/images/I/81OBHqiaoIL._AC_UL320_.jpg",
        price: 99,
        cat: "Dress",
    },
    {
        id: 6,
        name: "Analog Off-White Dial Men's Watch-FS5380",
        img: "https://m.media-amazon.com/images/I/51yzPFdVFLL._AC_UL320_.jpg",
        price: 199,
        cat: "Luxury",
    },
    {
        id: 7,
        name: "Analog Black Dial Men's Watch-FS5381",
        img: "https://m.media-amazon.com/images/I/81ReWrZehTL._AC_UL320_.jpg",
        price: 12,
        cat: "Sport",
    },
];

const productsContainer = document.querySelector(".products");
const searchInput = document.querySelector(".search");
const categoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");


const displayProducts = (filteredProducts) => {
    productsContainer.innerHTML = filteredProducts.map((product) => `
    <div class="product">
    <img src=${product.img}>
    <span class="name">${product.name}</span>
    <span class="priceText">$${product.price}</span>
    </div>
    `
    ).join("");
};

displayProducts(data);

searchInput.addEventListener("keyup", (e) => {
    const value = e.target.value.toLowerCase();

    if(value){
        displayProducts(data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1))
    }else{
        displayProducts(data)
    }
});

const setCategories = () => {
    const allCats  = data.map(item => item.cat)
    const categories = ["All",...allCats.filter((item, i) => {
        return allCats.indexOf(item) === i
    })]

    categoriesContainer.innerHTML = categories.map(cat => `
    <span class="cat">${cat}</span>
    `).join("");

    categoriesContainer.addEventListener("click", (e)=>{
        const selectedCat = e.target.textContent;

        selectedCat === "All" ? displayProducts(data) : displayProducts(data.filter((item) => item.cat === selectedCat));
    })
}

const setPrices = () =>{
    const priceList = data.map(item => item.price);
    const minPrice = Math.min(...priceList);
    const maxPrice = Math.max(...priceList);

    priceRange.min = minPrice;
    priceRange.max = maxPrice;
    priceRange.value = maxPrice;
    priceValue.textContent = "$" + maxPrice;
    
    priceRange.addEventListener("input", (e) => {
        priceValue.textContent = "$" + e.target.value;
        displayProducts(data.filter((item) => item.price
            <= e.target.value));
    });
};



setCategories();
setPrices();