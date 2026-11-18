import Cabecera from "./components/Cabecera";
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
        <ListaNotas notas={notas} />
      )}

      <Pie />
    </>
  );
}

export default App;