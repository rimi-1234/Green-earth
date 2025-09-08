const categoryContainer = document.getElementById('js-catgory-container');
const plantContainer = document.getElementById('js-plant-container');
const shopCart = document.querySelectorAll('.js-shop-cart');
let showCart = [];
const removeActive = () => {

    const catButton = document.querySelectorAll(".catButton");
    //   console.log(lessonButtons);
    catButton.forEach((btn) => btn.classList.remove("active"));
};
function toggleModal(show) {

    
    const modal = document.getElementById('cartModal');

    
    if (show) {
        modal.classList.remove('hidden');
        modal.classList.add('flex'); // make it flexbox centered
    } else {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
}

const loadAllCategory = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then((res) => res.json())
        .then((json) => {

            displayCategory(json.categories)
        });
};
const loadAllPlants = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((json) => {


            displayAllPlants(json.plants);
        });

};
const loadAllPlantsClick = () => {
    fetch("https://openapi.programming-hero.com/api/plants")
        .then((res) => res.json())
        .then((json) => {

            removeActive();
            const allCatagorybtn = document.getElementById('js-all-catagorybtn');
            allCatagorybtn.classList.add("active");
            displayAllPlants(json.plants);
        });

};
const loadCategory = (id) => {
    const url = `https://openapi.programming-hero.com/api/category/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((json) => {

            removeActive();
            const clickBtn = document.getElementById(`cat-btn-${id}`);
            clickBtn.classList.add("active");

            displayAllPlants(json.plants);
        });
};
function getelement(ID) {
    const element = document.getElementById(ID);
    return element;
}
function hideValidAlert() {
    const alertDiv = document.getElementById("custom-valid-alert");
    alertDiv.classList.add("hidden"); // Hide alert
}

function showvalidAlert() {
    // console.log(document.getElementById("custom-valid-alert"));

    const alertDiv = document.getElementById("custom-valid-alert");
    alertDiv.classList.remove("hidden"); // Show alert
}
const alertDiv = document.getElementById("custom-valid-alert");
alertDiv.classList.add("hidden"); // Hide alert
const disPlayPlant = (plant) => {
    const detailsBox = document.getElementById("details-container");
    detailsBox.innerHTML = `
    <div class="card bg-base-100 ">
                        <h2  class="card-title text-[14px]">${plant.name}</h2>
                         <img class="w-full h-70 rounded-[18px] py-3" src=${plant.image}
                                alt="Shoes" />
                   
                        <div class=" text-start px-1 ">
                            <h2  class="card-title text-[14px] ">Category: <span class="text-gray-700 font-normal">${plant.category}</span></h2>
                            <p class="font-bold  text-[12px] py-2">Price:৳ <span class="text-gray-700 font-normal">৳${plant.price}</span></p>
                            <p class="font-bold  text-[12px]  ">Price: <span class="text-gray-700 font-normal">${plant.description}</span></p>
                      
                    
                            
                        </div>
                    </div>
    
    
    `;
    document.getElementById('plant_modal').showModal();


}
plantContainer.addEventListener("click", function (e) {
    // console.log(e.target.className.includes("cartBtn"));
    if (e.target.className.includes("cartBtn")) {
        handleShopcarts(e);
        const treeName = e.target.parentNode.children[0].innerText;
        getelement('js-valid-text').innerText = `${treeName} has been added to the cart`;
        showvalidAlert();


    }


})
let totalPrice = 0
let qnt=0;
const handleShopcarts = (e) => {
    const treeName = e.target.parentNode.children[0].innerText;

    const treePrice = e.target.parentNode.children[2].children[1].children[0].innerText;
    const uniqueTreeId = e.target.parentNode.children[0].id;
    const count=document.getElementById("js-shopCart-count").innerText;

    qnt=Number(count)+1;
    document.getElementById("js-shopCart-count").innerText=qnt;
    totalPrice = totalPrice + Number(treePrice);

    const newTotalPrice = document.querySelectorAll(".js-total-price");
    newTotalPrice.forEach(ele=>{
        ele.innerText=totalPrice;
        
    })
    
     



    showCart.push({
        treeName: treeName,
        treePrice: treePrice,
    });


    showCartDetail(showCart);

};

const showCartDetail = (showCart) => {
   

    shopCart.forEach(ele=>{

            ele.innerHTML = '';
            showCart.forEach(showCart => {
                ele.innerHTML += `
                          <div class="bg-[#dcfce7]  p-4 rounded-lg mb-4">
                                <div class="flex justify-between items-center">
                                    <div>
                       
                                         <h1 class="text-[14px] font-semibold">${showCart.treeName}</h1>
                                            <p class=" text-gray-500 text-[14px] font-medium ">৳ <span id="js-inicialPrice">${showCart.treePrice}</span>X
                                                     <span id="js-qnt">1</span>
                                            </p>
                                     </div>
                                           <i class="fa-solid fa-xmark text-red-700"></i>
                                 </div>
                            </div>                        
                
                            `
        
        
        
        
        
            });
    })
    










}

// "id": 1,
// "image": "https://i.ibb.co.com/cSQdg7tf/mango-min.jpg",
// "name": "Mango Tree",
// "description": "A fast-growing tropical tree that produces delicious, juicy mangoes during summer. Its dense green canopy offers shade, while its sweet fruits are rich in vitamins and minerals.",
// "category": "Fruit Tree",
// "price": 500
const displayAllPlants = (plants) => {
    plantContainer.innerHTML = '';



    plants.forEach((plant) => {
        plantContainer.innerHTML += `     <div class="card bg-base-100 shadow-sm ">
                        <figure class="p-3">
                            <img class="w-96 h-64 md:h-40 rounded-md" src=${plant.image}
                                alt="plantimages" />
                        </figure>
                        <div class=" text-start px-3 ">
                            
                            <h2 id="${plant.id}" onclick=" loadPlant(${plant.id})"  class="card-title text-[14px] cursor-pointer">${plant.name}</h2>
                            <p class="font-light  text-[12px] py-3 pb-4 md:h-[111px]">${plant.description}</p>
                             <div class=" flex justify-between pb-3 ">
                                <button class="  btn btn-sm bg-[#dcfce7] text-[#15803D] rounded-[999px]  border-none">${plant.category}</button>
                                <p class=" text-[14px] ">৳  <span>${plant.price}</span></p>

                             </div>
                             <button class="btn cartBtn rounded-[999px]  border-none w-full mt-0 mb-3 hover:bg-[#27d564e1] bg-[#15803D]  text-white">Add to Cart</button>
                        </div>
                    </div>
               `

    });

}

const loadPlant = (id) => {
    const url = `https://openapi.programming-hero.com/api/plant/${id}`
    fetch(url)
        .then((res) => res.json())
        .then((json) => {


            disPlayPlant(json.plants);
        });

}
// "id": 6,
// "category_name": "Evergreen Tree",
// "small_description": "Trees that remain green throughout the year."
const displayCategory = (categories) => {
    //   categoryContainer.innerHTML='';
    categories.forEach((cat) => {
        categoryContainer.innerHTML += ` 
        
                        <button id="cat-btn-${cat.id}"
                        onclick="loadCategory(${cat.id})" class="btn flex justify-center md:justify-start pl-2 bg-[#dcfce7] border-none w-full mb-1 hover:bg-[#27d564cd] hover:text-white catButton">${cat.category_name}</button>`

    });

};

loadAllCategory();
loadAllPlants();