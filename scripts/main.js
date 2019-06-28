Vue.component('div-book', {
  props: ['item'],
  template: `<div class="flip-card"><div class="flip-card-inner"><div class="flip-card-front"><img v-bind:src="item.portada" alt="item.titulo" class="book-image" ></div><div class="flip-card-back"><h1>{{item.titulo}}</h1><p>{{item.descripcion}}</p><a v-bind:href="item.detalle" data-fancybox="gallery"><button type="button"class="btn btn-outline-light">More Info</button></a></div></div></div>`
})

const Vueapp = new Vue ({
  el: '#pageContent',
  data: {
    books : [],
    inputSearch : "",
    checkedLanguage: []
  },
  created(){  
      fetch("https://api.myjson.com/bins/1h3vb3").then(function(response) {
        if (response.ok){
          return response.json();
        }
        throw new Error(response.status);
      }).then(function (json){
        Vueapp.books = json.books;
        
        }).catch(function(error){
          console.log("Request failed:" + error.message);
          })
    },
  computed: {
   
    filteredBooks() {
      return this.books.filter(book => {
        let filterBySearch =  book.titulo.toLowerCase().includes(this.inputSearch.toLowerCase()) || book.descripcion.toLowerCase().includes(this.inputSearch.toLowerCase());

        let filterByLanguage =this.checkedLanguage.includes(book.idioma.toUpperCase()) || this.checkedLanguage.length == 0;
          return filterBySearch && filterByLanguage;
    })
  }
}
})
  
