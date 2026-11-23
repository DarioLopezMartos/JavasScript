import Cabecera from "./components/Cabecera";
import Resumen from "./components/Resumen";
import NotaDestacada from "./components/NotaDestacada";
import ListaNotas from "./components/ListaNotas";
import Pie from "./components/Pie";
import { notas } from "./data/notas";
import ProgresoCategorias from "./components/ProgresoCategorias";

function App() {
  return (
    <>
      <Cabecera titulo="Mis notas" />

      {notas.length === 0 ? (
        <p>No tienes notas</p>
      ) : (
        <>
          <Resumen notas={notas} />

          <ProgresoCategorias notas={notas} />

          <NotaDestacada notas={notas} />

          <h2>Pendientes</h2>
          <ListaNotas notas={notas} soloPendientes />

          <h2>Todas las notas</h2>
          <ListaNotas notas={notas} soloPendientes />
        </>
      )}

      <Pie />
    </>
  );
}

export default App;
