const myKey = "y-4J5utYMU4WT8VlQB9-54P_JVL6pZ0t7DFbKFg9bzU";
let inputImage = document.getElementById('inputImage');
let imageName="";

inputImage.addEventListener('keydown',(key)=>{
     if(key.key == 'Enter')
     {
         imageName = inputImage.value;
        
         getImages();
     }
})

function getImages()
{
 axios.get(`https://api.unsplash.com/search/photos?client_id=${myKey}&\page=1&query=${imageName}`).then((res)=>{
     console.log(res);
     loadImagesToUI(res.data.results);
     })
}

const loadImagesToUI = (results)=>{
    for(let i=0; i<results.length; i++)
    {
        let newDiv = document.createElement('div');
        newDiv.className="img";
        newDiv.style.backgroundImage="url(" + results[i].urls.regular +")"
        console.log(newDiv);
        document.getElementById('grid').appendChild(newDiv);
    }
}