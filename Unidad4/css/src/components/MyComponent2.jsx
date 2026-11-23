const MyComponent2 = () => {
  const entrar = () => {
    console.log("Has entrado");
  };

  const salir = () => {
    console.log("Has salido");
  };

  const hacerClic = (e) => {
    console.log(e.clientX, e.clientY);
  };

  const menu = (e) => {
    e.preventDefault();
    alert("Menú personalizado");
  };

  return (
    <div
      onMouseEnter={entrar}
      onMouseLeave={salir}
      onClick={hacerClic}
      onContextMenu={menu}
      style={{ width: 500, height: 500, border: "2px solid black" }}
    >
      Zona del ratón
    </div>
  );
};

export default MyComponent2;