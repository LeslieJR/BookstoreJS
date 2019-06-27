const Vueapp = new Vue ({
  el: '#pageContent',
  data: {
    books : []
  },
  created(){
    this.getData();
  },
  methods: {
    getData(){

      fetch("https://api.myjson.com/bins/1h3vb3").then(function(response) {
        if (response.ok){
          return response.json();
        }
        throw new Error(response.status);
      }).then(function (json){
        Vueapp.books = json.books;
        
        }).catch(function(error){
          console.log("Request failed:" + error.message);
          });
    }
  },
  computed: {
    
  }
}) 




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