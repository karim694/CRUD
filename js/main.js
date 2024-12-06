let productNameInput = document.getElementById("productName");
let productPriceInput = document.getElementById("productPrice");
let productCategoryInput = document.getElementById("productCategory");
let productDescriptionInput = document.getElementById("productDescription");
let productImageInput = document.getElementById('productImage');
let searchInput = document.getElementById('searchInput')
let btnAdd = document.getElementById('btnAdd');
let btnUpdate =document.getElementById('btnUpdate');
let currentIndex=0;
let productList =[];
if(JSON.parse(localStorage.getItem('productContainer')) !==null){
   productList= JSON.parse(localStorage.getItem('productContainer'));
    displayData();
}

function addProduct(){
    if(validationName()&&validationPrice()&&validationCategory()&&validationDescription()&&validationImage()){
        let product ={
            name:productNameInput.value.trim(),
            price:productPriceInput.value,
            category:productCategoryInput.value.trim(),
            description:productDescriptionInput.value.trim(),
            image:productImageInput.files[0]?`images/${productImageInput.files[0]?.name}`:`images/p-1.jpg`
        }
        productList.push(product);
        localStorage.setItem('productContainer',JSON.stringify(productList))
        displayData();
        clearForm();
    }
    
   

}
document.getElementById('btnAdd').addEventListener('click', function(){
    addProduct();
})

function displayData(){
    let blackBox="";
    for (let i = 0; i < productList.length; i++) {
      blackBox += createCols(i);
        
    }
    document.getElementById('rowData').innerHTML= blackBox;
}
function searchData(){
    let term = searchInput.value;
    let blackBox="";
    for (let i = 0; i < productList.length; i++) {
        if(productList[i].name.toLowerCase().includes(term.toLowerCase())){
            blackBox += createCols(i);
        }
      
        
    }
    document.getElementById('rowData').innerHTML= blackBox;
}
function createCols(i){
    let regex = new RegExp(searchInput.value , 'gi')
    return ` <div class="col-md-3"  >
        <div class="card h-100 " >
            <img src="${productList[i].image}" style="height: 200px;" class=" card-img-top" alt="">
            <div class="card-body">
             <span class="btn btn-primary btn-sm">${i +1} </span>
             <h3 class="h5">Product Name: ${productList[i].name.replace(regex,(match)=>`<span class="bg-info">${match}</span>`)}</h3>
             <p>Price: ${productList[i].price}</p>
            <p>Category: ${productList[i].category}</p>
            <p>Description: ${productList[i].description}</p>
            </div>
            <div class="card-footer text-center ">
                <button  onclick="deleteItem(${i})"  class=" btn btn-outline-danger me-5 "><i class="fa-solid fa-trash"></i></button>
                <button onclick="setUpdateInfo(${i})"  class="btn btn-outline-success "><i class="fa-solid fa-pen-to-square"></i></button>
            </div> 
          </div>
      </div>`
}
function setUpdateInfo(index){
    productNameInput.value =productList[index].name;
    productPriceInput.value=productList[index].price;
    productCategoryInput.value=productList[index].category;
    productDescriptionInput.value=productList[index].description;
    btnAdd.classList.add('d-none');
    btnUpdate.classList.remove('d-none');

currentIndex=index;

}
function updateProduct(){
    let product ={
        name:productNameInput.value,
        price:productPriceInput.value,
        category:productCategoryInput.value,
        description:productDescriptionInput.value,
        image:productImageInput.files[0]?`images/${productImageInput.files[0]?.name}`:`images/p-1.jpg`
    }
    productList.splice(currentIndex,1,product);
    localStorage.setItem('productContainer',JSON.stringify(productList));
    btnAdd.classList.remove('d-none');
    btnUpdate.classList.add('d-none');
    displayData();
    clearForm();

}

function clearForm(){
    productNameInput.value=null;
    productCategoryInput.value=null;
    productDescriptionInput.value=null;
    productImageInput.value=null;
    productPriceInput.value=null;
    productNameInput.classList.remove('is-valid');
    productPriceInput.classList.remove('is-valid');
productCategoryInput.classList.remove('is-valid');
productDescriptionInput.classList.remove('is-valid');
productImageInput.classList.remove('is-valid')


}
function deleteItem(index){
    productList.splice(index , 1 );
    localStorage.setItem('productContainer',JSON.stringify(productList))
    displayData();
}
function validationName(){
    let regex = /^[A-Za-z][A-Za-z0-9_ ]{3,29}$/
    let text = productNameInput.value;
    var msgName = document.getElementById("msgName");

    if(regex.test(text)){
        productNameInput.classList.add('is-valid');
        productNameInput.classList.remove('is-invalid')
        msgName.classList.add('d-none');
        return true
    }else{
        productNameInput.classList.add('is-invalid')
        productNameInput.classList.remove('is-valid')
        msgName.classList.remove('d-none');
        return false
    }
}
function validationPrice(){
    let regex = /^(6[0-9]{3}|[1-5][0-9]{4}|60000)$/

    let term = productPriceInput.value;
    let msgPrice=document.getElementById('msgPrice');
    if(regex.test(term)){
        productPriceInput.classList.add('is-valid');
        productPriceInput.classList.remove('is-invalid')
        msgPrice.classList.add('d-none');

        return true
    }
    else{
        productPriceInput.classList.add('is-invalid')
        productPriceInput.classList.remove('is-valid')
        msgPrice.classList.remove('d-none');
 
        return false
    }

}
function validationCategory(){
    let regex = /^(Mobile|TV|Screens|Electronic)$/

    let text = productCategoryInput.value;
    let msgCat = document.getElementById('msgCategory');
    if(regex.test(text)){
        productCategoryInput.classList.add('is-valid');
        productCategoryInput.classList.remove('is-invalid')
        msgCat.classList.add('d-none');
        return true
    }
    else{
        
        productCategoryInput.classList.add('is-invalid')
        productCategoryInput.classList.remove('is-valid');
        msgCat.classList.remove('d-none');
        return false
    }

}
function validationDescription(){
    let regex = /^.{0,250}$/
let text = productDescriptionInput.value;
let msgDescrip = document.getElementById('msgDescription')
if(regex.test(text)){
    productDescriptionInput.classList.add('is-valid');
    productDescriptionInput.classList.remove('is-invalid')
    msgDescrip.classList.add('d-none');

    return true
}
else{
    productDescriptionInput.classList.remove('is-valid');
    productDescriptionInput.classList.add('is-invalid')
    msgDescrip.classList.remove('d-none');

    return false
}
}
function validationImage(){
    let regex = /^.{1,}\.(jpg|png|avif|jpeg|svg)$/
let text = productImageInput.value;
if(regex.test(text)){
    productImageInput.classList.add('is-valid');
    productImageInput.classList.remove('is-invalid')
    return true
}
else{
    productImageInput.classList.remove('is-valid');
    productImageInput.classList.add('is-invalid')
    return false
}
}