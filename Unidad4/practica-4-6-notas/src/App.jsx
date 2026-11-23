
import Cabecera from "./components/Cabecera";
import Resumen from "./components/Resumen";
import ListaNotas from "./components/ListaNotas";
import Pie from "./components/Pie";
import { notas } from "./data/notas";

function App() {
  return (
    <>
      <Cabecera titulo="Mis notas" />

      {notas.length === 0 ? (
        <p>No tienes notas</p>
      ) : (
        <>
          <Resumen notas={notas} />
          <ListaNotas notas={notas} />
        </>
      )}

      <Pie />
    </>
  );
}

export default App;
