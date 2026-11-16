function Rating({ valor, max = 5 }) {

    const completas = Math.floor(valor);
    const media = valor % 1 >= 0.5;
    const vacias = max - completas - (media ? 1 : 0);

    const estrellas = [...Array(completas).fill("★"),...(media ? ["⯪"] : []),...Array(vacias).fill("☆")];

    return (
    <span
        role="img"
        aria-label={`Valoración: ${valor} de ${max}`}
    >
        {estrellas.map((estrella, index) => (
            <span key={index} aria-hidden="true">
                {estrella}
            </span>
        ))}
    </span>
);
}

export default Rating;