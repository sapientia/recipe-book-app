<template>
<div class="container">

<!----- Navegation ------>
  <div class="row">
      <router-link tag="button" class="m-3 btn btn-sm btn-dark" to="/">
        Go back
      </router-link>
  </div>


<!----- Message ------>
<div class="row" v-if="onDelete">
  <div class="col-12">
      <div class="alert alert-success" role="alert">
         {{message}}
    </div>
  </div>

  <div class="col-12">
      <router-link to="/" tag="button"  class="m-3 btn btn-sm btn-light">See all recipes</router-link>
  </div>
</div>


<!----- Form ------>
  <div class="edit-form" v-else>
      <h4>Recipes</h4>
      <form>
        <div class="form-group">
              <label for="title">Title</label>
              <input
                type="text"
                class="form-control"
                id="title"
                v-model="filterRecipe.title"
              />
        </div>
        <div class="form-group" v-for='(i,key) in filterRecipe.ingredients' :key="key" >
              <div v-if="key >= 1">
                <label for="Ingredient">Ingredient {{key }}</label>
                <input
                type="text"
                class="form-control"
                :id="key"
                required
                v-model="filterRecipe.ingredients[key ]"
                name="Ingredient"
              />
              </div>
      </div>

      <div class="form-group">
            <label for="description">Description</label>
            <textarea
              type="text"
              class="form-control"
              id="description"
              v-model="filterRecipe.description"
            />
      </div>
    </form>

<!----- Buttons ------>
    <button type="submit" class="m-3 btn btn-sm btn-dark" @click="updateRecipe">
      Update
    </button>

    <button class="m-3 btn btn-sm btn-light" @click="deleteRecipe">
      Delete
    </button>

  </div>
</div>
</template>
<script>
import BookRecipeDataService from "../services/BookRecipeDataService";

export default {
   name: "recipe",
  data() {
    return {
      message:'',
      onDelete:false
    }
  },
  methods:{
    // Update 
      updateRecipe() {
          const data = {
            title: this.filterRecipe.title,
            ingredients: this.filterRecipe.ingredients,
            description: this.filterRecipe.description,
          };

          BookRecipeDataService.update(this.filterRecipe.key, data)
            .then(() => {
              localStorage.setItem('recipes', JSON.stringify(this.recipes) );
              this.message = "Recipe updated!";
              this.onDelete = true;
            })
            .catch((e) => {
              console.log(e);
            });
    },

    // Delete 
      deleteRecipe() {
        BookRecipeDataService.delete(this.filterRecipe.key)
        .then(() => {
          this.onDelete = true;
          this.message = "Recipe deleted!"
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
computed:{
    recipes(){
        var retrieveRecipeObject =localStorage.getItem('recipes');
        return JSON.parse(retrieveRecipeObject)
    },
    filterRecipe(){
        return this.recipes.filter( (a) => a.slug == this.$route.params.id)[0]
    }
},
}
</script>
