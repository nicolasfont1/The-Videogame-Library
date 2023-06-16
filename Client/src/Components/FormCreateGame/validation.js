const onlySpaces = /^\s*$/;
const firstCharacterIsSpace = /^\s/;
const twoOrMoreSpaces = / {2,}/;
const rareCharacters = /["$%\/=¿¡*^\[\]{}]/;

const isURL = /^(?!(?:https?|ftp):\/\/)[^\s/$.?#].[^\s]*$/i;
const isImageURL = /\.(?!jpeg|jpg|gif|png|bmp)[^.]+$/i;

const threeOrMoreDecimals = /^\d+\.\d{3,}$/;

const validation = (inputs) => {
    let errors = {};


    // --------------------------------- VIDEOGAMENAME INPUT ------------------------------------
    if (onlySpaces.test(inputs.videogameName)) {
        errors.videogameName = "This field can't be empty."
    }

    if (firstCharacterIsSpace.test(inputs.videogameName)) {
        errors.videogameName = "The first character can't be a empty space."
    }

    if (twoOrMoreSpaces.test(inputs.videogameName)) {
        errors.videogameName = "This field can't contain two or more consecutive spaces."
    }

    if (rareCharacters.test(inputs.videogameName)) {
        errors.videogameName = "Invalid characters."
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

    if (inputs.description.length > 1 && inputs.description.length < 10) {
        errors.description = "The description is too short."
    }


    // ---------------------------------- PLATFORMS INPUT ------------------------------------
    if(inputs.platforms.length === 0){
        errors.platforms = "Choose at least one platform."
    }


    // ---------------------------------- RELEASEDATE INPUT ------------------------------------
    if(inputs.releaseDate == "2024-01-01"){
        errors.releaseDate = "Change the default value."
    }


    // ---------------------------------- RATING INPUT ------------------------------------
    if(Number(inputs.rating) < 1 || Number(inputs.rating) > 5){
        errors.rating = "Rating must be between 1 and 5."
    }

    if(threeOrMoreDecimals.test(inputs.rating)){
        errors.rating = "Rating number can't have 3 or more decimals."
    }


    // ---------------------------------- GENRES INPUT ------------------------------------
    if(inputs.genres.length === 0){
        errors.genres = "Choose at least one genre."
    }

    return errors;
};

export default validation;

// Tengo que crear los campos:
// name (input) chequear que no contenga caracteres raros ej: "", $, %, /, =, ¿?, *, ^, [], {}.
// image (input) chequear que sea una URL.
// description (textArea)
// platforms (input type="checkbox") https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox
// releaseDate (input type="date") https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/date
// rating (input type="number") https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number
// genres (input type="checkbox") https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/checkbox

// const [gameData, setGameData] = useState({
//     videogameName: "",
//     image: "",
//     description: "",
//     platforms: [],
//     releaseDate: "2024-01-01",
//     rating: "1",
//     genres: []
// })