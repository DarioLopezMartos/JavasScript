class Producto {
    constructor(id, nombre, precio, disponible) {

        if (nombre.trim() === "") {
            throw new Error("El nombre no puede estar vacío.");
        }

        if (!Number.isFinite(precio) || precio <= 0) {
            throw new Error("El precio tiene que ser finito y mayor que 0");
        }

        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
        this.disponible = disponible;
    }
}

class Pedido {
    constructor() {
        this.pedido = [];
    }

    
    añadirProducto(producto, cantidad) {
        if (producto == null) {
            throw new Error("El producto no existe.");
        }

        if (!producto.disponible) {
            throw new Error("El producto no está disponible.");
        }

        if (!Number.isInteger(cantidad) || cantidad <= 0) {
            throw new Error("La cantidad debe ser un entero positivo.");
        }

        
        const productoDentropedido = this.pedido.find(
            productoDentropedido => productoDentropedido.producto.id === producto.id
        );

        if (productoDentropedido != null) {
            productoDentropedido.cantidad += cantidad;
        } else {
            this.pedido.push({producto,cantidad});
        }
    }

    
    calcularSubtotal() {
        let subtotal = 0;

        for (const productoDentropedido of this.pedido) {
            subtotal += productoDentropedido.producto.precio * productoDentropedido.cantidad;
        }

        return subtotal;
    }

    
    calcularTotal() {
        let total = this.calcularSubtotal();

        if (total >= 20) {
            total = total * 0.90;
        }

        return total;
    }
}

const comida = new Producto(1,"Sopa", 3, true);

const Pedido1 = new Pedido();

Pedido1.añadirProducto(comida, 2);

console.log(Pedido1.calcularTotal());

function buscarPorNombre(nombre, array) {
    const nombreEnMinusculas = nombre.toLowerCase();

    const producto = array.find(
        producto => producto.nombre.toLowerCase() === nombreEnMinusculas
    );

    if (producto == null) {
        throw new Error("No se ha encontrado el producto.");
    }

    return producto;
}

const productos = [
    new Producto(1, "Sopa", 3, true),
    new Producto(2, "Pan", 1.5, true),
    new Producto(3, "Leche", 2, false)
];

console.log(buscarPorNombre("Sopa", productos));

