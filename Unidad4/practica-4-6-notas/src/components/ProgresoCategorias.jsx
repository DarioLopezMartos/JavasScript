const ProgresoCategorias = ({ notas }) => {

    const categorias = [...new Set(notas.map((nota) => nota.categoria))];

    return (
        <section>
            <h2>Progreso por categoría</h2>

            {categorias.map((categoria) => {

                const notasCategoria = notas.filter(
                    (nota) => nota.categoria === categoria
                );

                const completadas = notasCategoria.filter(
                    (nota) => nota.completada
                ).length;

                const porcentaje = Math.round(
                    (completadas / notasCategoria.length) * 100
                );
                //La categoría identifica de forma única cada grupo
                return (
                    <div key={categoria}>
                        <p>{categoria}: {porcentaje}%</p>

                        <div style={{
                            backgroundColor: "#ddd",
                            width: "100%",
                            height: "12px"
                        }}>
                            <div style={{
                                backgroundColor: "green",
                                width: `${porcentaje}%`,
                                height: "12px"
                            }}></div>
                        </div>
                    </div>
                );
            })}
        </section>
    );
};

export default ProgresoCategorias;
