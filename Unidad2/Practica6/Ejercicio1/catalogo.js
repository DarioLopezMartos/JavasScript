class Libro {

    constructor(titulo, autor, paginas) {

        if (titulo.trim() === "") {
            throw new Error("El título no puede estar vacío.");
        }

        if (autor.trim() === "") {
            throw new Error("El autor no puede estar vacío.");
        }

        if (!Number.isInteger(paginas) || paginas <= 0) {
            throw new Error("Las páginas deben ser un entero mayor que cero.");
        }

        this.titulo = titulo;
        this.autor = autor;
        this.paginas = paginas;
    }

    describir() {
        return "Título: " + this.titulo +
            "<br>Autor: " + this.autor +
            "<br>Páginas: " + this.paginas;
    }

    esExtenso() {
        if (this.paginas >= 300) {
            return "Este libro es extenso.";
        } else {
            return "Este libro no es extenso.";
        }
    }
}


class Catalogo {

    constructor(...libros) {
        this.libros = [];

        libros.forEach(libro => {
            this.agregarLibro(libro);
        });
    }

    agregarLibro(libro) {

        let existente = this.libros.find(elemento =>
            elemento.titulo === libro.titulo
        );

        if (existente !== undefined) {
            return "Ya existe un libro con ese título.";
        }

        this.libros.push(libro);
        return "Libro añadido correctamente.";
    }

    consultarLibro(titulo) {

        let libro = this.libros.find(elemento =>
            elemento.titulo === titulo
        );

        if (libro === undefined) {
            return null;
        }

        return libro;
    }

    eliminarLibro(titulo) {

        let posicion = this.libros.findIndex(elemento =>
            elemento.titulo === titulo
        );

        if (posicion === -1) {
            return "No existe ningún libro con ese título.";
        }

        this.libros.splice(posicion, 1);
        return "Libro eliminado correctamente.";
    }

    listarLibros() {

        let texto = "";

        if (this.libros.length === 0) {
            return "El catálogo está vacío.";
        }

        this.libros.forEach(libro => {
            texto += libro.describir() + "<br>";
            texto += libro.esExtenso() + "<br><br>";
        });

        return texto;
    }
}

// Obtener el elemento donde se mostrarán los resultados
let resultado = document.getElementById("resultado");


// Crear tres libros
const libro1 = new Libro("El Hobbit", "J.R.R. Tolkien", 299);
const libro2 = new Libro("Dune", "Frank Herbert", 300);
const libro3 = new Libro("1984", "George Orwell", 328);


// Crear el catálogo con los tres libros
const catalogo = new Catalogo(libro1, libro2, libro3);


// Mostrar el catálogo inicial
resultado.innerHTML += "<h2>Catálogo inicial</h2>";
resultado.innerHTML += catalogo.listarLibros();


// Comprobar si un libro es extenso
resultado.innerHTML += "<h2>Comprobar extensión</h2>";

resultado.innerHTML += "El Hobbit (299 páginas): ";
resultado.innerHTML += libro1.esExtenso() + "<br>";

resultado.innerHTML += "Dune (300 páginas): ";
resultado.innerHTML += libro2.esExtenso() + "<br>";


// Añadir un libro después de crear el catálogo
resultado.innerHTML += "<h2>Añadir libro</h2>";

const libro4 = new Libro("Fundación", "Isaac Asimov", 250);

resultado.innerHTML += catalogo.agregarLibro(libro4) + "<br>";


// Consultar un libro existente
resultado.innerHTML += "<h2>Consultar libro</h2>";

let libroEncontrado = catalogo.consultarLibro("Dune");

if (libroEncontrado !== null) {
    resultado.innerHTML += libroEncontrado.describir() + "<br><br>";
}


// Consultar un libro que no existe
let libroNoEncontrado = catalogo.consultarLibro("Harry Potter");

if (libroNoEncontrado === null) {
    resultado.innerHTML += "Harry Potter no existe en el catálogo.<br>";
}


// Intentar añadir un título duplicado
resultado.innerHTML += "<h2>Comprobar duplicados</h2>";

const libroDuplicado = new Libro("Dune", "Otro autor", 500);

resultado.innerHTML += catalogo.agregarLibro(libroDuplicado) + "<br>";


// Eliminar un libro existente
resultado.innerHTML += "<h2>Eliminar libro</h2>";

resultado.innerHTML += catalogo.eliminarLibro("Dune") + "<br>";


// Intentar eliminar un libro que no existe
resultado.innerHTML += catalogo.eliminarLibro("Harry Potter") + "<br>";


// Mostrar el catálogo después de los cambios
resultado.innerHTML += "<h2>Catálogo después de los cambios</h2>";
resultado.innerHTML += catalogo.listarLibros();


// Modificar el título de un libro
resultado.innerHTML += "<h2>Modificar un libro</h2>";

libro1.titulo = "El Hobbit (edición nueva)";

resultado.innerHTML += "<strong>Libro modificado:</strong><br>";
resultado.innerHTML += libro1.describir() + "<br><br>";

resultado.innerHTML += "<strong>Otro libro:</strong><br>";
resultado.innerHTML += libro3.describir() + "<br><br>";


// Probar datos inválidos
resultado.innerHTML += "<h2>Probar datos inválidos</h2>";

try {
    new Libro("", "Tolkien", 300);
} catch (error) {
    resultado.innerHTML += error.message + "<br>";
}

try {
    new Libro("El Hobbit", "", 300);
} catch (error) {
    resultado.innerHTML += error.message + "<br>";
}

try {
    new Libro("El Hobbit", "Tolkien", 0);
} catch (error) {
    resultado.innerHTML += error.message + "<br>";
}

try {
    new Libro("El Hobbit", "Tolkien", 300.5);
} catch (error) {
    resultado.innerHTML += error.message + "<br>";
}