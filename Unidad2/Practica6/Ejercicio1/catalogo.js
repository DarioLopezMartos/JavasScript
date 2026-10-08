class Libro {

    constructor(titulo, autor, paginas) {

        if (titulo.trim() === "") {
            throw new Error("El título no puede estar vacío.");
        }

        if (autor.trim() === "") {
            throw new Error("El autor no puede estar vacío.");
        }

        if (!Number.isInteger(paginas) || paginas <= 0) {
            throw new Error("El número de páginas debe ser un entero mayor que cero.");
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

    constructor() {
        this.libros = [];
    }

    agregarLibro(libro) {

        let existente = this.libros.find(elemento => elemento.titulo === libro.titulo);

        if (existente !== undefined) {
            return "Ya existe un libro con ese título.";
        }

        this.libros.push(libro);
        return "Libro añadido correctamente.";
    }

    consultarLibro(titulo) {

        let libro = this.libros.find(elemento => elemento.titulo === titulo);

        if (libro === undefined) {
            return null;
        }

        return libro;
    }

    eliminarLibro(titulo) {

        let posicion = this.libros.findIndex(elemento => elemento.titulo === titulo);

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