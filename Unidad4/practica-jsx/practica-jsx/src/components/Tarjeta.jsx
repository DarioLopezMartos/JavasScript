function Tarjeta() {
    const usuario = {
        nombre: "Lucía",
        edad: 17,
        web: "https://www.mozilla.org"
    };

    return (
        <>
            {/* Los fragmentos permiten agrupar elementos sin crear etiquetas adicionales en el DOM. */}
            <h2>Perfil de usuario</h2>

            {/* En JSX se utiliza className en lugar de class. */}
            <div className="tarjeta">

                {/* Los comentarios en JSX se escriben entre llaves y con la sintaxis de comentario de JavaScript. */}
                <p>Datos: {usuario.nombre}, {usuario.edad} años</p>

                {/* Para sumar números no debemos convertirlos en cadenas de texto. */}
                <p>Edad dentro de 5 años: {usuario.edad + 5}</p>

                {/* Las expresiones JavaScript en atributos se escriben entre llaves, sin comillas. */}
                <a href={usuario.web}>Mi web</a>

                {/* Las etiquetas sin contenido deben cerrarse con />. */}
                <img src="https://placehold.co/80" alt="Avatar" />

                {/* El operador ternario permite realizar condiciones dentro de JSX. */}
                {usuario.edad >= 18 ? "Mayor de edad" : "Menor de edad"}
            </div>
        </>
    );
}

export default Tarjeta;