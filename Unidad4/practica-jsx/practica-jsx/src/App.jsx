import FormularioSuscripcion from "./components/FormularioSuscripcion";
import Tarjeta from "./components/Tarjeta";
import FichaPelicula from "./components/FichaPelicula";

function App() {

    const pelicula1 = {
        titulo: "Interestelar",
        director: "Christopher Nolan",
        anio: 2014,
        duracion: 169,
        precio: 12.50,
        stock: 5,
        valoracion: 5,
        cartel: "https://placehold.co/200x300"
    };

    const pelicula2 = {
        titulo: "Origen",
        director: "Christopher Nolan",
        anio: 2010,
        duracion: 148,
        precio: 10,
        stock: 0,
        valoracion: 4,
        cartel: "https://placehold.co/200x300"
    };

    return (
        <>
            <h1>Práctica JSX</h1>

            <FormularioSuscripcion />

            <Tarjeta />

            <FichaPelicula pelicula={pelicula1} />

            <FichaPelicula pelicula={pelicula2} />
        </>
    );
}

export default App;