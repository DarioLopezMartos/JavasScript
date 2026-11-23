
import Card from "./Card";

const Resumen = ({ notas }) => {
    const total = notas.length;
    const completadas = notas.filter((nota) => nota.completada).length;
    const pendientes = total - completadas;

    return (
        <Card>
            <h2>Resumen</h2>
            <p>Total de notas: {total}</p>
            <p>Completadas: {completadas}</p>
            <p>Pendientes: {pendientes}</p>
        </Card>
    );
};

export default Resumen;
