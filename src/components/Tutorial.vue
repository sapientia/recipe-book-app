<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Recipe</h4>
    <br>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>


    </form>

    <button class="badge badge-danger mr-2" @click="deleteRecipe">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateRecipe">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>No recipes found...</p>
  </div>
</template>

<script>
import BookRecipeDataService from "../services/BookRecipeDataService";

export default {
  name: "tutorial",
  props: ["tutorial"],
  data() {
    return {
      currentTutorial: null,
      message: "",
    };
  },
  watch: {
    tutorial: function(tutorial) {
      this.currentTutorial = { ...tutorial };
      this.message = "";
    },
  },
  methods: {

    updateRecipe() {
      const data = {
        title: this.currentTutorial.title,
        description: this.currentTutorial.description,
      };

      BookRecipeDataService.update(this.currentTutorial.key, data)
        .then(() => {
          this.message = "The tutorial was updated successfully!";
        })
        .catch((e) => {
          console.log(e);
        });
    },

    deleteRecipe() {
      BookRecipeDataService.delete(this.currentTutorial.key)
        .then(() => {
          this.$emit("refreshList");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.message = "";
    this.currentTutorial = { ...this.tutorial }
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
