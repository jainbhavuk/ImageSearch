const myKey = "y-4J5utYMU4WT8VlQB9-54P_JVL6pZ0t7DFbKFg9bzU";

//Global Variable Declaration
let inputImage = document.getElementById("inputImage");
let imageName = "";
let totalPages = "";
let downloadLabel = document.getElementById("downloadLabel");

//Adding Event Listener To Search Box
inputImage.addEventListener("keydown", (key) => {
  if (key.key == "Enter") {
    imageName = inputImage.value;
    document.getElementById("grid").innerHTML = "";
    getImages();
  }
});

//GetImages Function
function getImages() {
  document.getElementById("grid").innerHTML = "";
  imageName = inputImage.value;

  //Fetching API
  axios
    .get(
      `https://api.unsplash.com/search/photos?client_id=${myKey}&\page=1&query=${imageName}`
    )
    .then((res) => {
      console.log(res);
      totalPages = res.data.total_pages;

      loadImagesToUI(res.data.results, totalPages);
      labelDisappear();
    });
}

//For Next Pages Functionality
function getNewImages(pageNo) {
  axios
    .get(
      `https://api.unsplash.com/search/photos?client_id=${myKey}&\page=${pageNo}&query=${imageName}`
    )
    .then((res) => {
      console.log(res);

      loadImagesToUI(res.data.results);
    });
}

//Getting New Images Function
const loadImagesToUI = (results) => {
  for (let i = 0; i < results.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.className = "img";
    newDiv.style.backgroundImage = "url(" + results[i].urls.regular + ")";
    newDiv.addEventListener("click", () => {
      window.open(results[i].links.download, "_blank");
    });
    console.log(newDiv);
    document.getElementById("grid").appendChild(newDiv);
  }
  document.getElementById("nextPageBtn").style.display = "block";
};

//Displaying Next Page Button Function
let pno = 2;
function newPage() {
  document.getElementById("nextPageBtn").style.display = "none";
  getNewImages(pno);
  pno++;
}

//Image Download Label Disappear Function
function labelDisappear() {
  downloadLabel.innerHTML = "Click On Image To Download";
  downloadLabel.style.display = "inline-block";
  setTimeout(() => {
    downloadLabel.style.display = "none";
  }, 4000);
}
