let data;


window.onload = fetch("https://api.myjson.com/bins/1h3vb3", 
    {method:"GET"}).then(function(response) {
        if (response.ok){
          return response.json();
        }
        throw new Error(response.status);
      }).then(function (json){
        data = json.books;
        
        displayImages(data);
         
        }).catch(function(error){
          console.log("Request failed:" + error.message);
          });
        

function displayImages(data){
  
    var divParent = document.getElementById('images'); // The parent <div>.
        // divParent.innerHTML = '';

        // Loop through data 
        for (i = 0; i < data.length; i++) {

          
            let div1 = document.createElement('div');
            div1.setAttribute("class","flip-card");
           

            let div2 = document.createElement('div');
            div2.setAttribute("class","flip-card-inner");

            let div3 = document.createElement('div');
            div3.setAttribute("class","flip-card-front")
    
            let img = document.createElement('img');   
            img.src = data[i].portada;             
            img.width = 300;
            img.height = 467;

            let div4 = document.createElement('div');
            div4.setAttribute("class","flip-card-back");
            let title = document.createElement('p');
            title.innerText = data[i].titulo;
            let description = document.createElement('p');
            description.innerText = data[i].descripcion;
            let link = document.createElement('a');
            link.href = data[i].detalle;
            link.setAttribute("data-fancybox","gallery");
            let buttonMore = document.createElement('button');
            buttonMore.innerText = 'More Info';
            link.appendChild(buttonMore);
            
            div1.appendChild(div2);
            div2.appendChild(div3);
            div3.appendChild(img);
            div2.appendChild(div4);
            div4.appendChild(title);
            div4.appendChild(description);
            div4.appendChild(link);
            
            // Add the child DIV to parent DIV.
            divParent.appendChild(div1);
        }
         
}


const searchBar = document.forms['search-books'].querySelector('input');
searchBar.addEventListener('keyup',function(e){
  const term = e.target.value.toLowerCase();
  // const divBook= document.getElementsByClassName('flip-card')
  const bookBack = document.getElementsByClassName('flip-card-back');
  
  Array.from(bookBack).forEach(function(book){
    const desc = book.innerText;

    if(desc.toLowerCase().indexOf(term)!= -1){
      book.parentNode.parentNode.style.display = 'block';
    }else{
      book.parentNode.parentNode.style.display ='none';
      const images = document.getElementById('images');
      images.innerText ='No match found';
      
    }
  })
})