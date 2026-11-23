import Nota from "./Nota";

const NotaDestacada = ({ notas }) => {

    const pendientes = notas.filter(
        (nota) => !nota.completada && nota.prioridad === "alta"
    );

    pendientes.sort((a, b) => a.fecha - b.fecha);

    const destacada = pendientes[0];

    if (!destacada) {
        return null;
    }

    return (
        <section>
            <h2>Nota destacada</h2>
            <Nota nota={destacada} />
        </section>
    );
};

export default NotaDestacada;
