import style from "../scss/main.scss";
//import svg from "../images/SVG/book.svg";
//import sprite from "../images/SVG/sprite.svg"
import {myFunc} from "./test.js";

// Sets the resources for the projects (images nad SVG)
function requireAll(r) { r.keys().forEach(r); } 
requireAll(require.context('../images/SVG/', true, /\.svg$/));
requireAll(require.context('../images/', true,  /\.(png|jpeg|jpg)$/));


console.log("hello World");
//alert("Hello there");

let a = "my stuff";
myFunc();


/*{
    "presets": [
        "env"
    ]
}
*/
