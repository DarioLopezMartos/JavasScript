import Rating from "./components/Rating";

function App() {

    return (
        <>
            <p>Película: <Rating valor={3.5} /></p>

            <p>Restaurante: <Rating valor={4} max={10} /></p>
        </>
    );
}

export default App;