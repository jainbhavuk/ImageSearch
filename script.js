const myKey = "y-4J5utYMU4WT8VlQB9-54P_JVL6pZ0t7DFbKFg9bzU";
let inputImage = document.getElementById('inputImage');
let imageName="";
let totalPages="";
inputImage.addEventListener('keydown',(key)=>{
     if(key.key == 'Enter')
     {
         imageName = inputImage.value;
        
         getImages();
     }
})

function getImages()
{
    imageName = inputImage.value;
 axios.get(`https://api.unsplash.com/search/photos?client_id=${myKey}&\page=1&query=${imageName}`).then((res)=>{
     console.log(res);
     totalPages = res.data.total_pages;
     loadImagesToUI(res.data.results, totalPages);
     })
}
function getNewImages(pageNo)
{
 axios.get(`https://api.unsplash.com/search/photos?client_id=${myKey}&\page=${pageNo}&query=${imageName}`).then((res)=>{
     console.log(res);
     
     loadImagesToUI(res.data.results);
     })
}
const loadImagesToUI = (results)=>{

    for(let i=0; i<results.length; i++)
    {
        let newDiv = document.createElement('div');
        newDiv.className="img";
        newDiv.style.backgroundImage="url(" + results[i].urls.regular +")";
        newDiv.addEventListener('click',()=>{
            window.open(results[i].links.download, "_blank");
        })
        console.log(newDiv);
        document.getElementById('grid').appendChild(newDiv);
    }
    document.getElementById('nextPageBtn').style.display="block";
}
let pno=2;
function newPage(){
    document.getElementById('nextPageBtn').style.display="none";
getNewImages(pno);
pno++;
}