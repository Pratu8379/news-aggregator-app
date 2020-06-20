//<!-- Enter your JS code here -->
{
  document.documentElement.setAttribute('data-theme','dark');
}


const apikey="4de49088ebcf4adfafcf169b9157d1c4";
var article_field=document.getElementById("news-articles");

//function to have formatted news in form of json//

function getNews(news)
{
  let output="";
  //let totalresult="";
  console.log(news)import "../styles/index.scss";

//<start> code to search for news
var inputTxt = document.getElementById("search");
inputTxt.addEventListener("keypress", searchValue);
function searchValue(e) {
  var searchText = document.getElementById("search").value;

  if (e.which == 13) {
    if (searchText != "") {
      var searchUrl = `everything?q=${searchText}`;
      beforeLoad();
      fetchNews(searchUrl);
    } else {
      beforeLoad();
      fetchNews("top-headlines?country=in"); //by default it fetch news related to india
    }
  }
}
//<end>

//function to toggle
document.getElementById("toggler").addEventListener("click", toogleColor);
function toogleColor() {
  var bodyColor = document.body;
  bodyColor.classList.toggle("dark-mode");

  var btnText = document.getElementById("toggler");
  if (btnText.innerHTML === "Dark Mode") {
    btnText.innerHTML = "Light Mode";
  } else {
    btnText.innerHTML = "Dark Mode";
  }
}

// function to fetch news list
async function fetchNews(searchUrl) {
  const res = await fetch(
    `https://newsapi.org/v2/${searchUrl}&apiKey=4de49088ebcf4adfafcf169b9157d1c4`
  );
  const data = await res.json();

  if (data.totalResults > 0) {
    var output = "";
    output += '<ul id="news-articles">';
    //array to fetch elements
    data.articles.forEach((i) => {
      output += `<li class="article">
                            <img src=${i.urlToImage} alt=${i.source.name} style="width:100%;margin-top:5px;" class="article-img">
                            
                                <h2 class="article-title"><b>${i.title}</b></h2> 
                                <p class="article-description">${i.description}</p> 
                                <span class="article-author">`;
      if (i.author != null) {
        output += `- ${i.author}</span>`;
      } else {
        output += `-N.A</span>`;
      }

      output += `<br> <a href=${i.url} class="article-link" target='_blank'><em>Read More At: ${i.source.name}</em></a>
            
                    </li>`;
    });
    output += "</ul>";

    document.getElementById("news-section").innerHTML = output;
  } else if (data.totalResults === 0) {
    var invalidData = document.getElementById("news-section");
    invalidData.innerHTML =
      "<h3>No article was found based on the search.</h3>";
    invalidData.style.color = "red";
    invalidData.classList.add("not-found");
  }
}
fetchNews("top-headlines?country=in"); //by default it fetch news related to india

//Take to top functionality

var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

document.getElementById("myBtn").addEventListener("click", topFunction);
// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

  //console.log(news.totalResults)
  if(news.totalResults>0){
      news.articles.forEach(element => {
          output+=
          `<section class="container">
          <li class="article"><a class="article-link" href="${element.url}" target="_blank">
          <div class="img_area">
          <img src="${element.urlToImage}" class="article-img" alt="${element.title}"></img>
          </div>
          <h2 class="article-title">${element.title}</h2>
          <br>
          <p class="article-description">${element.description || "description not available"}</p>
          <br>
          <span class="article-author">-${element.author ? element.author:"Anon"}</span><br>
         </a>
          </li>
          </section>
          
          `
          ;
      });
      article_field.innerHTML=output;
      }
      else
      {
        article_field.innerHTML='<li class="not-found">no article was found based on search</li>';

      }
          
     
  };


  //async function wth await
async function loading(searchValueWord=""){

  article_field.innerHTML='<p class="load">loading.....</p>'

  if(searchValueWord!="")
  {
      url=`http://newsapi.org/v2/everything?q=${searchValueWord}=At&apikey=${apikey}`;
  }
  else{
      url=`https://newsapi.org/v2/top-headlines?country=in&apiKey=${apikey}`;
  }
  //api call//
  const response=await fetch(url);
  const result=await response.json();
  getNews(result);
}

//text value is get from searchbar and pass to retrive function//
async function searchValue(event)
{
  if(event.which === 13||event.keycode===13||event.key === "Enter")
  {
      console.log(event);
      console.log(event.which);
      console.log(event.key);
      console.log(event.keycode);

      loading(event.target.value);
      console.log(event.target.value);
  }
}

//attached event listener //

function start(){
console.log("start function called in onload")
document.getElementById("search").addEventListener("keypress",searchValue);
loading();
}
