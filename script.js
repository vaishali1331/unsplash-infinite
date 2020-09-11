const imageContainer = document.getElementById('image-container');
const loader=document.getElementById('loader');

let ready=false;
let imagesloaded=0;
let total=0;
let photosArray=[];
//Unsplash API
let count=5;
const apiKey='WlsHah84BnQ5TdjdOTTo1YER5QBOKviQT3hu-sQgfJw';
let apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function newApi1(){
document.getElementById("all").addEventListener("click",apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`);
}
function newApi2(){
  document.getElementById("coll1").addEventListener("click",apiUrl=`https://api.unsplash.com/collections/3694365/photos/?client_id=${apiKey}&count=${count}`);
}
function newApi3(){
  document.getElementById("coll2").addEventListener("click",apiUrl=`https://api.unsplash.com/collections/3150958/photos/?client_id=${apiKey}&count=${count}`);
}

//check if all images were loaded
function imageLoaded(){
  imagesloaded++;
  if(imagesloaded === total){
    ready=true;
    loader.hidden=true;
    count=30;
    apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
  }
}
//helper function to set attributes on dom elements
function setAttributes(element, attributes){
  for(const key in attributes){
    element.setAttribute(key, attributes[key]);
  }
}

//create elements for links and photos, add to dom
function displayPhotos(){
  imagesloaded=0;
  total=photosArray.length;
  //run function for each element of photosarray
  photosArray.forEach((photo)=>{
    //create <a> to link to unsplash
    const item=document.createElement('a');
    setAttributes(item, {
      href:photo.links.html,
      target:'_blank',
    });
    //create <img> for photo
    const img=document.createElement('img');
    setAttributes(img, {
      src:photo.urls.regular,
      alt:photo.alt_description,
      title:photo.alt_description,
    });
    //event listener, check when each is finished loading
    img.addEventListener('load',imageLoaded);
    // put <img> inside <a> and then put both inside imagecontainer
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
//get photos from unsplash api
async function getPhotos(){
  try{
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  }catch(error){
    // catch error here
  }
}

//check to see if scrolling near bottom of page to load mpre photos
window.addEventListener('scroll',() =>{
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
    ready=false;
    getPhotos();
  }
});
//onload
getPhotos();