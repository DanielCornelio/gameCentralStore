-- Crear BD
CREATE DATABASE game_store

\c game_store

-- Tabla de usuarios
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    rol  NOT NULL CHECK (rol IN ('admin', 'usuario')) DEFAULT 'usuario',
    activo BOOLEAN DEFAULT TRUE
    username VARCHAR(50) UNIQUE,
    nombre VARCHAR(100),
    apellido VARCHAR(100),
    fecha_nacimiento DATE,
    pais VARCHAR(50),
    avatar_url VARCHAR(255)
);


-- Tabla de métodos de pago simplificada
CREATE TABLE metodos_pago (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('tarjeta', 'paypal', 'transferencia')),
    titular VARCHAR(100) NOT NULL,
    numero_tarjeta VARCHAR(20), -- Últimos 4 dígitos para tarjetas
    cvc INTEGER,
    fecha_vencimiento DATE, -- Solo para tarjetas
    paypal_email VARCHAR(255), -- Solo para PayPal
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de juegos
CREATE TABLE juegos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    precio DECIMAL(10,2) NOT NULL,
    precio_descuento DECIMAL(10,2),
    desarrollador VARCHAR(100) NOT NULL,
    fecha_lanzamiento DATE,
    portada_url VARCHAR(255),
    genero VARCHAR(50),
    stock INTEGER NOT NULL DEFAULT 0 CHECK (stock >= 0),
    plataforma VARCHAR(50),
    edad_minima INTEGER,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de pedidos simplificada
CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    metodo_pago_id INTEGER REFERENCES metodos_pago(id) ON DELETE SET NULL,
    fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estado VARCHAR(20) DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'completado', 'cancelado')),
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    direccion_envio TEXT
);

-- Tabla de compras (detalle de pedidos)
CREATE TABLE compras (
    id SERIAL PRIMARY KEY,
    pedido_id INTEGER NOT NULL REFERENCES pedidos(id) ON DELETE CASCADE,
    juego_id INTEGER NOT NULL REFERENCES juegos(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL DEFAULT 1 CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) GENERATED ALWAYS AS (precio_unitario * cantidad) STORED
);

-- Tabla del carrito de compras
CREATE TABLE carrito (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    juego_id INTEGER NOT NULL REFERENCES juegos(id) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL DEFAULT 1 CHECK (cantidad > 0),
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, juego_id)
);

-- Tabla de favoritos
CREATE TABLE favoritos (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    juego_id INTEGER NOT NULL REFERENCES juegos(id) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, juego_id)
);

-- Tabla de ratings/reseñas
CREATE TABLE ratings (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    juego_id INTEGER NOT NULL REFERENCES juegos(id) ON DELETE CASCADE,
    calificacion INTEGER NOT NULL CHECK (calificacion >= 1 AND calificacion <= 5),
    comentario TEXT,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, juego_id)
);

-- Índices básicos para mejorar el rendimiento
CREATE INDEX idx_pedidos_usuario ON pedidos(usuario_id);
CREATE INDEX idx_compras_pedido ON compras(pedido_id);
CREATE INDEX idx_carrito_usuario ON carrito(usuario_id);
CREATE INDEX idx_juegos_titulo ON juegos(titulo);

-- Función simple para actualizar el total del pedido
CREATE OR REPLACE FUNCTION actualizar_total_pedido()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE pedidos 
    SET total = COALESCE((
        SELECT SUM(subtotal) 
        FROM compras 
        WHERE pedido_id = NEW.pedido_id
    ), 0)
    WHERE id = NEW.pedido_id;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar total del pedido
CREATE TRIGGER trigger_actualizar_total
    AFTER INSERT OR UPDATE OR DELETE ON compras
    FOR EACH ROW EXECUTE FUNCTION actualizar_total_pedido();