import firebase from "../firebase";

const db = firebase.ref("/recipes");



class BookRecipeDataService {

  //Return reference db
  getAll() {
    return db;
  }

  findRecipe({title}){
   return  firebase.ref(`/recipes/${title}`)
  }

 //Get the recipe Object and then save the entire on the db
  create(recipe) {
    return db.push(recipe);
  }

 //Retrieve the recipe Object based on the key id then save it again  on the db
  update(key, value) {
    return db.child(key).update(value);
  }

  //Retrieve the recipe Object based on the key id then delete it from the db
  delete(key) {
    return db.child(key).remove();
  }

   //Remove all the database childs
  deleteAll() {
    return db.remove();
  }
}

export default new BookRecipeDataService();
