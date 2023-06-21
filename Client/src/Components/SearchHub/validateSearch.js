const onlySpaces = /^\s*$/;
const firstCharacterIsSpace = /^\s/;
const rareCharacters = /["$%\/=¿¡*^\[\]{}]/;

const validateSearch = (gameName) => {
   if(gameName == "") return ""
   
   if(onlySpaces.test(gameName)) return ""

   if(firstCharacterIsSpace.test(gameName)) return ""

   if(rareCharacters.test(gameName)) return ""

   return gameName
};

export default validateSearch;