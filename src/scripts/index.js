//<!-- Enter your JS code here -->
{
  document.documentElement.setAttribute('data-theme','dark');
}


const apikey="4de49088ebcf4adfafcf169b9157d1c4";
var article=document.getElementById("news-articles");

//function to have formatted news in form of json//

function getNews(news)
{
  let output="";
  let totalresult="";
  console.log(news)
  console.log(news.totalResults)
  if(news.totalResults>0){
      news.articles.forEach(element => {
          output+=
          `
          <section>
              <br>
          <div class ="card">
          <li class ="article">
              <br>
          <div class="img_area">
          <img src ="${element.urlToImage}" class="article-img" alt="${element.title}"></img>
          </div>
          <h2 class="article_title">${element.title}</h2>
          <br>
          <p class="article-description">${element.description || "description not available"}</p>
          <br>
          <span class ="article-author">-${element.author ? element.author:"Anon"}</span><br>
          <a href =${element.url} class = "article-link style="color:blue";></a>
          </li>
          </div>
          </section>
          
          `
          ;
      });
          article.innerHTML=output;
      }
      else
      {
             article.innerHTML='<p class="not-found> no article was found based on serach><p>';

      }
          
     
  };


  //async function wth await
async function loading(searchValueWord=""){

  article_area.innerHTML='<li class="load">News are loading</li>'

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
