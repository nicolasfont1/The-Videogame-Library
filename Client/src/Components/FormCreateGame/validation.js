const onlySpaces = /^\s*$/;
const firstCharacterIsSpace = /^\s/;
const twoOrMoreSpaces = / {2,}/;
const rareCharacters = /["$%\/=¿¡*^\[\]{}]/;

const isURL = /^(?!(?:https?|ftp):\/\/)[^\s/$.?#].[^\s]*$/i;
const isImageURL = /\.(?!jpeg|jpg|gif|png|bmp)[^.]+$/i;

const threeOrMoreDecimals = /^\d+\.\d{3,}$/;

const validation = (inputs) => {
   let errors = {};


   // --------------------------------- NAME INPUT ------------------------------------
   if (onlySpaces.test(inputs.name)) {
      errors.name = "This field can't be empty."
   }

   if (firstCharacterIsSpace.test(inputs.name)) {
      errors.name = "The first character can't be a empty space."
   }

   if (twoOrMoreSpaces.test(inputs.name)) {
      errors.name = "This field can't contain two or more consecutive spaces."
   }

   if (rareCharacters.test(inputs.name)) {
      errors.name = "Invalid characters."
   }

   if(inputs.name.length < 3){
      errors.name = "The name must have more than 3 characters."
   }


   // -------------------------------------- IMAGE INPUT ----------------------------------------
   if (onlySpaces.test(inputs.image)) {
      errors.image = "This field can't be empty."
   }

   if (inputs.image.length === 1) {
      errors.image = "This field requires an URL."
   }

   if (isURL.test(inputs.image)) {
      errors.image = "This field requires an URL."
   }

   if (isImageURL.test(inputs.image)) {
      errors.image = "The URL must contain a valid image."
   }


   // ---------------------------------- DESCRIPTION TEXTAREA ------------------------------------
   if (onlySpaces.test(inputs.description)) {
      errors.description = "This field can't be empty."
   }

   if (firstCharacterIsSpace.test(inputs.description)) {
      errors.description = "The first character can't be a empty space."
   }

   if (twoOrMoreSpaces.test(inputs.description)) {
      errors.description = "This field can't contain two or more consecutive spaces."
   }

   if (inputs.description.length >= 1 && inputs.description.length < 10) {
      errors.description = "The description is too short."
   }


   // ---------------------------------- PLATFORMS INPUT ------------------------------------
   if (inputs.platforms.length === 0) {
      errors.platforms = "Choose at least one platform."
   }


   // ---------------------------------- RELEASEDATE INPUT ------------------------------------
   if (inputs.releaseDate == "") {
      errors.releaseDate = "Change the default value."
   }


   // ---------------------------------- RATING INPUT ------------------------------------
   if (Number(inputs.rating) < 0 || Number(inputs.rating) > 5) {
      errors.rating = "Rating must be between 0 and 5."
   }

   if (threeOrMoreDecimals.test(inputs.rating)) {
      errors.rating = "Rating number can't have 3 or more decimals."
   }

   if (inputs.rating == "") {
      errors.rating = "Change the default value."
   }


   // ---------------------------------- GENRES INPUT ------------------------------------
   if (inputs.genres.length === 0) {
      errors.genres = "Choose at least one genre."
   }

   return errors;
};

export default validation;