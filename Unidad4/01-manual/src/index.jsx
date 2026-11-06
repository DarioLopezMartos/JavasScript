import { createRoot } from "react-dom/client";
import "./Titulo.css";

const Titulo = ({ subTitle }) => {
  return (
    <div>
      <h1>Esto es un título personalizado</h1>
      <h2>{subTitle}</h2>
    </div>
  );
};

const root = createRoot(document.getElementById("root"));
root.render(<Titulo subTitle="Subtítulo" />);