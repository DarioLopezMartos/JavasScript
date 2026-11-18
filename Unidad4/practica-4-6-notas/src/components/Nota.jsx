import Card from "./Card";

const COLORES = {
    alta: "red",
    media: "orange",
    baja: "green",
};

const formatearFecha = (fecha) => fecha.toLocaleDateString("es-ES", { dateStyle: "full" });

const Nota = ({ nota }) => {
    const tieneEtiquetas = nota.etiquetas && nota.etiquetas.length > 0;

    return (
        <Card colorBorde={COLORES[nota.prioridad]} atenuada={nota.completada}>
            <h3 style={{ textDecoration: nota.completada ? "line-through" : "none" }}>
                {nota.titulo}
            </h3>

            {nota.descripcion ? (
                <p>{nota.descripcion}</p>
            ) : (
                <p style={{ color: "gray" }}>Sin descripción</p>
            )}

            <p>{nota.completada ? "Completada" : "Pendiente"}</p>
            <p>{formatearFecha(nota.fecha)}</p>

            {nota.prioridad === "alta" && <strong>Prioridad alta</strong>}

            {tieneEtiquetas && (
                <>
                    <p>Etiquetas:</p>
                    {nota.etiquetas.map((etiqueta) => (
                        <span
                            key={etiqueta}
                            style={{ border: "1px solid #999", padding: "2px 6px", marginRight: 6 }}
                        >
                            {etiqueta}
                        </span>
                    ))}
                </>
            )}
        </Card>
    );
};

export default Nota;