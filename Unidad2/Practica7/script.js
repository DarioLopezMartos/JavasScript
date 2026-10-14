let textoCafe = `{
    "title":"Latte",
    "description":"As the most popular coffee drink out there, the latte is made with a shot of espresso and steamed milk, with just a touch of foam. It can be ordered plain or flavored with everything from vanilla to pumpkin spice.",
    "ingredients":["Espresso","Steamed milk"],
    "image":"https://images.unsplash.com/photo-1561882468-9110e03e0f78?auto=format&fit=crop&q=60&w=800&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGxhdHRlfGVufDB8fDB8fHww",
    "id":2
    }`;


let cafe = JSON.parse(textoCafe);

console.log(cafe);
console.log(cafe.id);
console.log(cafe.title);
console.log(cafe.description);
console.log(cafe.ingredients);
console.log(cafe.image);

let fichaCafe = {
    id: cafe.id,
    nombre: cafe.title,
    ingredientes: cafe.ingredients,
    imagen: cafe.image
};

console.log(fichaCafe);

document.body.innerHTML += "<h2>" + fichaCafe.nombre + "</h2>";
document.body.innerHTML += "<img src='" + fichaCafe.imagen + "' style='max-height: 300px;'>";

let fichaSinImagen = {
    id: fichaCafe.id,
    nombre: fichaCafe.nombre,
    ingredientes: fichaCafe.ingredientes
};

let textoJSON = JSON.stringify(fichaSinImagen, null, 2);

console.log(textoJSON);

document.body.innerHTML += "<h2>Ficha en formato JSON</h2>";
document.body.innerHTML += "<pre>" + textoJSON + "</pre>";

let nuevaFicha = JSON.parse(textoJSON);

console.log(nuevaFicha);
console.log(nuevaFicha.imagen);

