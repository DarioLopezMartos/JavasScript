let opcion = prompt(
    "MENÚ\n" +
    "1. Usuario principiante\n" +
    "2. Usuario intermedio\n" +
    "3. Usuario avanzado\n" +
    "4. Salir"
);

switch (opcion) {
    case "1":
        alert("Usuario principiante");
        break;

    case "2":
        alert("Usuario intermedio");
        break;

    case "3":
        alert("Usuario avanzado");
        break;

    case "4":
        alert("Salir");
        break;

    default:
        alert("Opción no válida");
}