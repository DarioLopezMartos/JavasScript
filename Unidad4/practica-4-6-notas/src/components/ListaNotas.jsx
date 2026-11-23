import Nota from "./Nota";

const ListaNotas = ({ notas, soloPendientes = false }) => {

    const filtradas = soloPendientes
        ? notas.filter((nota) => !nota.completada)
        : notas;

    const categorias = [...new Set(filtradas.map((nota) => nota.categoria))];

    return (
        <section>
            {categorias.map((categoria) => {
                
                const ordenadas = filtradas
                    .filter((nota) => nota.categoria === categoria)
                    .sort((a, b) => a.fecha - b.fecha);

                return (
                    <div key={categoria}>
                        {/* La categoría identifica de forma única cada grupo. */}
                        <h3>{categoria}</h3>

                        {ordenadas.map((nota) => (
            
                            <Nota key={nota.id} nota={nota} />
                        ))}
                    </div>
                );
            })}
        </section>
    );
};

export default ListaNotas;
