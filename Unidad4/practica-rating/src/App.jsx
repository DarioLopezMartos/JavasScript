import Rating from "./components/Rating";
import ListaCompra from "./components/ListaCompra";
import FichaLibro from "./components/FichaLibro";

const compra = [
  { id: 1, nombre: "Leche", cantidad: 2, unidad: "l", comprado: true, imprescindible: true },
  { id: 2, nombre: "Huevos", cantidad: 12, unidad: "uds.", comprado: false, imprescindible: true },
  { id: 3, nombre: "Tomates", cantidad: 1, unidad: "kg", comprado: false, imprescindible: false },
  { id: 4, nombre: "Pan", cantidad: 1, unidad: "barra", comprado: true, imprescindible: false },
];

export function App() {

  return (
    <>
      <h1>5.3 Peliculas</h1>
      <p>Película: <Rating valor={3.5} /></p>
      <p>Restaurante: <Rating valor={4} max={10} /></p>
      <h1>5.4 Lista de la compra</h1>
      <ListaCompra articulos={compra} />
      <p>Prueba vacío</p>
      <ListaCompra articulos={[]} />
      <h1>5.5 Ficha libro</h1>
      <FichaLibro
        libro={{
          titulo: "Viaje al centro del código",
          subtitulo: "Una aventura con JavaScript",
          autores: ["Ana Ruiz", "Pablo Gil"],
          paginas: 245,
          sinopsis: "Dos programadores recorren por dentro una aplicación web.",
          portada: "https://placehold.co/60x90?text=Libro",
          premiado: true,
          generos: ["Divulgación", "Informática"],
        }}
      />
      <FichaLibro libro={{ titulo: "Cuaderno de bitácora", sinopsis: "" }} />
    </>
  );
}

export default App;