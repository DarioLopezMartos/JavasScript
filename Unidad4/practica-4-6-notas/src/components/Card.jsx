const Card = ({ children, colorBorde = "#ccc", atenuada = false }) => {
    return (
        <div
            style={{
                border: "1px solid #ccc",
                borderLeft: `6px solid ${colorBorde}`,
                padding: 12,
                marginBottom: 12,
                opacity: atenuada ? 0.5 : 1,
            }}
        >
            {children}
        </div>
    );
};

export default Card;