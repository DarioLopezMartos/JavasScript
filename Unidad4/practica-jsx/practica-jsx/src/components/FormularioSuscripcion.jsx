function FormularioSuscripcion() {
    // Función que muestra un mensaje al pulsar el botón
    function avisar() {
        alert("¡Gracias por suscribirte!");
    }

    return (
        <>
            <form className="suscripcion">
                <h2 className="suscripcion-titulo">Suscríbete al boletín</h2>

                <label htmlFor="email">Correo electrónico</label>
                <input
                    type="email"
                    id="email"
                    tabIndex="1"
                    placeholder="tu@correo.com"
                />

                <br />

                <label htmlFor="nombre">Nombre</label>
                <input
                    type="text"
                    id="nombre"
                    defaultValue="Anónimo"
                />

                <label>
                    <input type="checkbox" defaultChecked />
                    Acepto la política de privacidad
                </label>

                <img
                    src="https://placehold.co/120x40?text=Logo"
                    alt="Logo del boletín"
                />

                <button
                    type="button"
                    onClick={avisar}
                    style={{
                        backgroundColor: "#282c34",
                        color: "white",
                        padding: "8px 16px"
                    }}
                >
                    Enviar
                </button>
            </form>
        </>
    );
}

export default FormularioSuscripcion;