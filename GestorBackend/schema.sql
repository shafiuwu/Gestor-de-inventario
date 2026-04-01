CREATE TABLE categorias
(
    id uuid NOT NULL,
    nombre character varying(100) COLLATE pg_catalog."default" NOT NULL,
    activo boolean DEFAULT true,
    CONSTRAINT categorias_pkey PRIMARY KEY (id)
)

CREATE TABLE productos
(
    id uuid NOT NULL,
    nombre character varying(150) COLLATE pg_catalog."default" NOT NULL,
    sku character varying(50) COLLATE pg_catalog."default" NOT NULL,
    stock_actual integer DEFAULT 0,
    precio_venta numeric(10,2),
    categoria_id uuid,
    marca character varying(100) COLLATE pg_catalog."default",
    activo boolean DEFAULT true,
    CONSTRAINT productos_pkey PRIMARY KEY (id),
    CONSTRAINT productos_sku_key UNIQUE (sku),
    CONSTRAINT productos_categoria_id_fkey FOREIGN KEY (categoria_id)
        REFERENCES public.categorias (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

CREATE TABLE movimientos
(
    id uuid NOT NULL,
    producto_id uuid,
    tipo character varying(10) COLLATE pg_catalog."default",
    cantidad integer NOT NULL,
    fecha timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    activo boolean DEFAULT true,
    CONSTRAINT movimientos_pkey PRIMARY KEY (id),
    CONSTRAINT movimientos_producto_id_fkey FOREIGN KEY (producto_id)
        REFERENCES public.productos (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT movimientos_tipo_check CHECK (tipo::text = ANY (ARRAY['ENTRADA'::character varying, 'SALIDA'::character varying]::text[]))
)
