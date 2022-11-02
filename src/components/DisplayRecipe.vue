<template>
  <div class="row">
    <div class="col-lg-12">
        <br><br>
      <h4> List Recipes</h4>
      <br>
      <ul class="list-group">
        
        <li
          class="list-group-item"
          v-for="(recipe, index) in recipes"
          :key="index"
          @click="displayDetail(recipe)"
        >
       
        <h5> {{ recipe.title }}</h5>
        <p class="mb-1">{{recipe.description.slice(0,50)}}...</p> 
        <small> See details </small> 
    
        </li>
        
      </ul>
        <router-link tag="button" class="m-3 btn btn-sm btn-dark" to="/add">
        Add recipe
      </router-link>
      <button class="m-3 btn btn-sm btn-light" @click="removeAllRecipes">
        Delete All
      </button>

    </div>
  </div>
</template>

<script>
import BookRecipeDataService from "../services/BookRecipeDataService";

export default {
  name: "tutorials-list",
  data() {
    return {
      recipes: [],
    };
  },
  methods: {
  //Save database value on an array recipes
    onDataChange(items) {
      let _recipes = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _recipes.push({
          key: key,
          title: data.title,
          slug: data.slug,
           ingredients: data.ingredients,
          description: data.description,
        });
      });

      this.recipes = _recipes;
      localStorage.setItem('recipes', JSON.stringify(this.recipes) );
    },

  //Display view recipe
    displayDetail(recipe){
        this.$router.push({ name: 'detailRecipe' ,  params:  { id: recipe.slug } } )
    },

  //Delete all database values
    removeAllRecipes() {
        BookRecipeDataService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },



  mounted() {
    //On mounted make a database "snapshot" and call the function onDataChange to save the values in an array
    BookRecipeDataService.getAll().on("value", this.onDataChange);
  },
  beforeUnmount() {
    BookRecipeDataService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
.list-group-item:hover{
  cursor:pointer;
  background: #f5f5f5;
}
</style>
