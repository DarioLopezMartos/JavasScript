const MyComponent1 = ({ idioma }) => {
  const saludar = () => {
    if (idioma === "es") alert("¡Hola!");
    else if (idioma === "en") alert("Hello!");
    else alert("Bonjour !");
  };

  return <button onClick={saludar}>{idioma}</button>;
};

export default MyComponent1;