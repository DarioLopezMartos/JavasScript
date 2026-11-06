// Importar los componentes
import Cabecera from "./components/Cabecera";
import Tarjeta from "./components/Tarjeta";
import Etiqueta from "./components/Etiqueta";
import Pie from "./components/Pie";

function App() {
    return (
        <>
            <Cabecera nombre="Darío" curso="Desarrollo de Aplicaciones Multiplataforma" />

            <Tarjeta
                titulo="Sobre mí"
                texto="Soy estudiante de Desarrollo de Aplicaciones Multiplataforma."
            />

            <Tarjeta
                titulo="Mis aficiones"
                texto="Me gustan los videojuegos, la tecnología y la programación."
            />

            <Tarjeta
                titulo="Qué espero aprender en el módulo"
                texto="Quiero aprender a desarrollar aplicaciones utilizando React."
            />

            <div>
                <Etiqueta texto="HTML" color="#e34c26" />
                <Etiqueta texto="CSS" color="#264de4" />
                <Etiqueta texto="JavaScript" color="#d6b600" />
                <Etiqueta texto="React" color="#61dafb" />
            </div>

            <Pie autor="Darío" anio={2026} />
        </>
    );
}

export default App;