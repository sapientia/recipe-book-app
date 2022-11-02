<template>
  <div class="submit-form">

  <!----- Message ------>
    <div class="alert alert-warning" role="alert" v-if="message">
      {{message}}
    </div>
  
  <!----- Form ------>
    <div v-if="!submitted">
      <div class="form-group">
          <label for="title">Title</label>
          <input
            type="text"
            class="form-control"
            id="title"
            required
            v-model="recipe.title"
            name="title"
          />
      </div>


      <div class="form-group" v-for="key in count" :key="key">
          <label for="description">Ingredient {{key}}</label>
          <input
            type="text"
            class="form-control"
            :id="key"
            required
            v-model="recipe.ingredients[key]"
            name="Ingredient"
          />
      </div>


      <div class="form-group" >
        <a href="#" @click="addIngredient">+ Add more ingredients</a><br><br>
        <a href="#" @click="removeIngredient">- Remove ingredients</a>
      </div>
      <br>


      <div class="form-group">
          <label for="description">Description</label>
          <textarea
            width="500"
            height="250"
            class="form-control"
            id="description"
            required
            v-model="recipe.description"
            name="description"
          />
      </div>

      <button @click="validate" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
        <div class="alert alert-success" role="alert">
            Recipe saved!
        </div>
        <button tag="button" class="m-3 btn btn-sm btn-dark" @click="addMore">
              Add more
        </button>
     
       <router-link to="/">See all recipes</router-link>
    </div>
  </div>
</template>

<script>
import BookRecipeDataService from "../services/BookRecipeDataService";

export default {
  name: "add-recipe",
  data() {
    return {
      count:1,
      recipe: {
        title: "",
        description: "",
        slug:"",
        ingredients:{}
      },
      submitted: false,
      message:''
    };
  },
  methods: {

    //Regex function to generate "friendly" slug
    addMore(){
      this.$router.push({ name: 'add' } );

      this.recipe.title = ''
      this.recipe.slug = ''
      this.recipe.ingredients = {}
      this.recipe.description = ''

      this.submitted = false;
    },

    //Regex function to generate "friendly" slug
    createSlug(str){
        return str.toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    },

    //Counter function for textbox add more
    addIngredient(){
        this.count++;
    },

    //Counter function for textbox remove
    removeIngredient(){
        this.count--;
    },

    //Regex function to generate "friendly" slug
    validate(){
        console.log(this.recipe.title!=='');
            if(this.recipe.title ==''  || this.recipe.ingredients=='' || this.recipe.description =='' ){
                this.message = "All fields are required"
            }else {
                this.saveRecipe()
            }
    },

    saveRecipe() {
        this.message = ''
        var convertSlug = this.createSlug(this.recipe.title)
        var data = {
            title: this.recipe.title,
            slug:convertSlug,
            ingredients: this.recipe.ingredients,
            description: this.recipe.description,
        };

      BookRecipeDataService.create(data)
        .then(() => {
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
