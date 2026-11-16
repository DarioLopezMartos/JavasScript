
import ArticuloCompra from "./ArticuloCompra";

function ListaCompra({ articulos }) {

    if (articulos.length === 0) {
        return <p>La lista de la compra está vacía</p>;
    }

    const articulosOrdenados = [...articulos].sort(
        (a, b) => a.comprado - b.comprado
    );

    const pendientes = articulos.filter((articulo) => articulo.comprado === false).length;

    return (
        <>
            <p>
                {pendientes === 0
                    ? "Ya lo tienes todo"
                    : pendientes === 1
                        ? "Te falta 1 producto"
                        : `Te faltan ${pendientes} productos`}
            </p>

            {articulosOrdenados.map((articulo) => (
                <ArticuloCompra
                    key={articulo.id}
                    articulo={articulo}
                />
            ))}
        </>
    );
}

export default ListaCompra;
