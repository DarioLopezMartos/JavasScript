import Nota from "./Nota";

const ListaNotas = ({ notas }) => {
    const ordenadas = notas.toSorted((a, b) => a.fecha - b.fecha);

    return (
        <section>
            {ordenadas.map((nota) => (
                <Nota key={nota.id} nota={nota} />
            ))}
        </section>
    );
};

export default ListaNotas;