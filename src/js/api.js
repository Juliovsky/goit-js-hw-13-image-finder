const baseUrl = "https://pixabay.com/api/";
let quantityPerPage = 12;
let myKey = '16022582-a19fdcc5907c59857509aea92';
 
export const downloadImg = (query, pageNumb) =>{
    return fetch(`${baseUrl}?image_type=photo&orientation=horizontal&q=${query}&page=${pageNumb}&per_page=${quantityPerPage}&key=${myKey}`)
    .then(res=>res.json())
    .then(data=>data)
    .catch(error=>console.error("ERROR",error));
};
