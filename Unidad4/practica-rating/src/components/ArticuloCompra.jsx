
function ArticuloCompra({ articulo }) {

    return (
        <p style={{ color: articulo.comprado ? "gray" : "black" }}>
            {articulo.nombre} ({articulo.cantidad} {articulo.unidad})

            {articulo.comprado && " — en el carro"}

            {!articulo.comprado && articulo.imprescindible && (
                <strong> ¡No olvidar!</strong>
            )}
        </p>
    );
}

export default ArticuloCompra;
