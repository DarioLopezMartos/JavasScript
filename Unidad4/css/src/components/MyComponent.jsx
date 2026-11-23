const MyComponent = () =>{

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Has enviado el formulario");
    };

    return (
        <form onSubmit={handleSubmit}>
            <input />
            <button type="submit">Enviar</button>
        </form>
    );
    
    /*
    const handleClick = () => {
        alert("Has pulsado")
    }
     const handleKeyDown = () => {
        alert("Has pulsado")
    }

    return(
       // <button onClick={handleClick}>Pulsa aquí</button>
       <input onKeyDown = {handleKeyDown}/>
    )*/

}

export default MyComponent