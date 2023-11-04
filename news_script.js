const requestOptions = {
  method: "GET",
  redirect: "follow",
};

const newsGrid = document.getElementById("news-grid");

// Function to truncate text
function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

fetch(
  "https://greencodetitans-api.azurewebsites.net/get_cached_news/",
  requestOptions
)
  .then((response) => response.json()) // Parse the JSON response
  .then((data) => {
    data.forEach((article) => {
      // Create a news article element
      const articleElement = document.createElement("div");
      articleElement.classList.add("news-article");

      // Create and set the title
      const titleElement = document.createElement("h3");
      titleElement.classList.add("news-title");
      titleElement.textContent = article.title;

      // Create and set the truncated content
      const contentElement = document.createElement("p");
      contentElement.classList.add("news-content");
      const truncatedContent = truncateText(article.content, 400);
      contentElement.textContent = truncatedContent;

      // Create and set the source
      const sourceElement = document.createElement("p");
      sourceElement.classList.add("news-source");
      sourceElement.textContent = `Source: ${article.source}`;

      // Create and set the URL
      const urlElement = document.createElement("a");
      urlElement.classList.add("news-url");
      urlElement.href = article.url;
      urlElement.target = "_blank";
      urlElement.textContent = "Read More";

      // Append elements to the article
      articleElement.appendChild(titleElement);
      articleElement.appendChild(contentElement);
      articleElement.appendChild(sourceElement);
      articleElement.appendChild(urlElement);

      // Append the article to the news grid
      newsGrid.appendChild(articleElement);
    });
  })
  .catch((error) => console.error("Error", error));



  //my code
  //-- News api call
const API_KEY = "499d03534f224e8890dcd1f95376001c"
const url = "https://newsapi.org/v2/everything?q="



async function fetchData(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`)
    const data = await res.json()
    return data
}
fetchData("Climate").then(data => renderMain(data.articles))

//menu btn
let mobilemenu = document.querySelector(".mobile")
let menuBtn = document.querySelector(".menuBtn")
let menuBtnDisplay = true;

menuBtn.addEventListener("click",()=>{
    mobilemenu.classList.toggle("hidden")
})


//render news 
function renderMain(arr){
    let mainHTML = ''
    for(let i = 0 ; i < arr.length ;i++){
        if(arr[i].urlToImage){
        mainHTML += ` <div class="card">
                        <a href=${arr[i].url}>
                        <img src=${arr[i].urlToImage} lazy="loading" />
                        <h4>${arr[i].title}</h4>
                        <div class="publishbyDate">
                            <p>${arr[i].source.name}</p>
                            <span>•</span>
                            <p>${new Date(arr[i].publishedAt).toLocaleDateString()}</p>
                        </div>
                        <div class="desc">
                           ${arr[i].description}
                        </div>
                        </a>
                     </div>
        `
        }
    }

    document.querySelector("main").innerHTML = mainHTML
}


const searchBtn = document.getElementById("searchForm")
const searchBtnMobile = document.getElementById("searchFormMobile")
const searchInputMobile = document.getElementById("searchInputMobile") 
const searchInput = document.getElementById("searchInput")

searchBtn.addEventListener("submit",async(e)=>{
    e.preventDefault()
    console.log(searchInput.value)

    const data = await fetchData(searchInput.value)
    renderMain(data.articles)

})
searchBtnMobile.addEventListener("submit",async(e)=>{
    e.preventDefault()
    const data = await fetchData(searchInputMobile.value)
    renderMain(data.articles)
})


async function Search(query){
    const data = await fetchData(query)
    renderMain(data.articles)
}


//--

let mobileMenu = document.querySelector(".mobile");

// Function to toggle the visibility of the mobile menu
function toggleMobileMenu() {
  mobileMenu.classList.toggle("hidden");
}

// Add a click event listener to the mobile menu button to toggle the visibility of the mobile menu
document.querySelector(".mobile-menu-button").addEventListener("click", toggleMobileMenu);

// Function to close the mobile menu if the user clicks outside of the menu
document.addEventListener("click", function(event) {
  if (event.target !== mobilemenu && !mobileMenu.contains(event.target)) {
    mobileMenu.classList.add("hidden");
  }
});

