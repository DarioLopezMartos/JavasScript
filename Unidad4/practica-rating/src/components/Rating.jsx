const Rating = ({ valor, max = 5 }) => {
  const estrellas = [];
  for (let i = 1; i <= max; i++) {
    if (valor >= i) estrellas.push("★");
    else if (valor >= i - 0.5) estrellas.push("⯪");
    else estrellas.push("☆");
  }

  return (
    <span role="img" aria-label={`Valoración: ${valor} de ${max}`}>
      {estrellas.map((estrella, index) => (
        // key = index: la lista es fija, nunca se reordena ni se filtra
        <span key={index} aria-hidden="true">{estrella}</span>
      ))}
    </span>
  );
};

export default Rating;