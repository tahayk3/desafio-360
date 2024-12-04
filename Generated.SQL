/*
Created: 3/12/2024
Modified: 3/12/2024
Model: Microsoft SQL Server 2019
Database: MS SQL Server 2019
*/


-- Create tables section -------------------------------------------------

-- Table Estados

CREATE TABLE [Estados]
(
 [id_estado] Int IDENTITY NOT NULL,
 [nombre] Varchar(45) NOT NULL
)
go

-- Add keys for table Estados

ALTER TABLE [Estados] ADD CONSTRAINT [PK_Estados] PRIMARY KEY NONCLUSTERED ([id_estado])
go

ALTER TABLE [Estados] ADD CONSTRAINT [nombre] UNIQUE ([nombre])
go

ALTER TABLE [Estados] ADD CONSTRAINT [id_estado] UNIQUE ([id_estado])
go

-- Table Productos

CREATE TABLE [Productos]
(
 [id_producto] Int IDENTITY(1,1) NOT NULL,
 [nombre] Varchar(45) NOT NULL,
 [marca] Varchar(45) NULL,
 [codigo] Varchar(45) NOT NULL,
 [stock] Float NULL,
 [precio] Float NOT NULL,
 [fecha_creacion] Datetime NOT NULL,
 [foto] Varbinary(max) NULL,
 [id_categoria_producto] Int NULL,
 [id_estado] Int NULL
)
go

-- Create indexes for table Productos

CREATE INDEX [IX_Relationship5] ON [Productos] ([id_categoria_producto])
go

CREATE INDEX [IX_Relationship14] ON [Productos] ([id_estado])
go

-- Add keys for table Productos

ALTER TABLE [Productos] ADD CONSTRAINT [PK_Productos] PRIMARY KEY NONCLUSTERED ([id_producto])
go

ALTER TABLE [Productos] ADD CONSTRAINT [id_producto] UNIQUE CLUSTERED ([id_producto])
go

-- Table Usuarios

CREATE TABLE [Usuarios]
(
 [id_usuario] Int IDENTITY(1,1) NOT NULL,
 [correo] Varchar(55) NOT NULL,
 [nombre_completo] Varchar(70) NOT NULL,
 [password] Varchar(35) NOT NULL,
 [telefono] Varchar(45) NULL,
 [fecha_nacimiento] Date NULL,
 [fecha_creacion] Datetime NULL,
 [id_rol] Int NULL,
 [id_cliente] Int NULL,
 [id_estado] Int NULL
)
go

-- Create indexes for table Usuarios

CREATE INDEX [IX_Relationship9] ON [Usuarios] ([id_rol])
go

CREATE INDEX [IX_Relationship11] ON [Usuarios] ([id_cliente])
go

CREATE INDEX [IX_Relationship12] ON [Usuarios] ([id_estado])
go

-- Add keys for table Usuarios

ALTER TABLE [Usuarios] ADD CONSTRAINT [PK_Usuarios] PRIMARY KEY NONCLUSTERED ([id_usuario])
go

ALTER TABLE [Usuarios] ADD CONSTRAINT [id_usuario] UNIQUE ([id_usuario])
go

ALTER TABLE [Usuarios] ADD CONSTRAINT [correo] UNIQUE CLUSTERED ([correo])
go

-- Table OrdenDetalles

CREATE TABLE [OrdenDetalles]
(
 [id_orden_detalle] Int IDENTITY(1,1) NOT NULL,
 [cantidad] Int NOT NULL,
 [precio] Float NOT NULL,
 [sub_total] Float NULL,
 [id_orden] Int NULL,
 [id_producto] Int NULL
)
go

-- Create indexes for table OrdenDetalles

CREATE INDEX [IX_Relationship1] ON [OrdenDetalles] ([id_orden])
go

CREATE INDEX [IX_Relationship3] ON [OrdenDetalles] ([id_producto])
go

-- Add keys for table OrdenDetalles

ALTER TABLE [OrdenDetalles] ADD CONSTRAINT [PK_OrdenDetalles] PRIMARY KEY NONCLUSTERED ([id_orden_detalle])
go

ALTER TABLE [OrdenDetalles] ADD CONSTRAINT [id_orden_detalle] UNIQUE CLUSTERED ([id_orden_detalle])
go

-- Table Orden

CREATE TABLE [Orden]
(
 [id_orden] Int IDENTITY(1,1) NOT FOR REPLICATION NOT NULL,
 [fecha_creacion] Datetime NULL,
 [nombre_completo] Varchar(60) NOT NULL,
 [direccion] Char(70) NULL,
 [telefono] Tinyint NULL,
 [correo] Varbinary(50) NULL,
 [fecha_entrega] Date NULL,
 [total_orden] Float NULL,
 [id_estado] Int NULL,
 [id_usuario] Int NULL
)
go

-- Create indexes for table Orden

CREATE INDEX [IX_Relationship15] ON [Orden] ([id_estado])
go

CREATE INDEX [IX_Relationship18] ON [Orden] ([id_usuario])
go

-- Add keys for table Orden

ALTER TABLE [Orden] ADD CONSTRAINT [PK_Orden] PRIMARY KEY NONCLUSTERED ([id_orden])
go

ALTER TABLE [Orden] ADD CONSTRAINT [id_orden] UNIQUE CLUSTERED ([id_orden])
go

-- Table Rol

CREATE TABLE [Rol]
(
 [id_rol] Int IDENTITY(1,1) NOT NULL,
 [nombre] Varchar(45) NOT NULL
)
go

-- Add keys for table Rol

ALTER TABLE [Rol] ADD CONSTRAINT [PK_Rol] PRIMARY KEY ([id_rol])
go

ALTER TABLE [Rol] ADD CONSTRAINT [id_rol] UNIQUE ([id_rol])
go

-- Table Estado

CREATE TABLE [Estado]
(
 [id_estado] Int IDENTITY(1,1) NOT NULL,
 [nombre_estado] Varchar(50) NOT NULL
)
go

-- Add keys for table Estado

ALTER TABLE [Estado] ADD CONSTRAINT [PK_Estado] PRIMARY KEY NONCLUSTERED ([id_estado])
go

ALTER TABLE [Estado] ADD CONSTRAINT [nombre_estado] UNIQUE CLUSTERED ([nombre_estado])
go

-- Table Clientes

CREATE TABLE [Clientes]
(
 [id_cliente] Int IDENTITY(1,1) NOT NULL,
 [razon_social] Varchar(250) NULL,
 [nombre_comercial] Varchar(340) NULL,
 [direccion_entrega] Varchar(60) NULL,
 [telefono] Int NULL,
 [correo_electronico] Varchar(45) NULL
)
go

-- Add keys for table Clientes

ALTER TABLE [Clientes] ADD CONSTRAINT [PK_Clientes] PRIMARY KEY ([id_cliente])
go

-- Table CategoriasProductos

CREATE TABLE [CategoriasProductos]
(
 [id_categoria_producto] Int IDENTITY(1,1) NOT NULL,
 [nombre_categoria] Varchar(45) NOT NULL,
 [fecha_creacion] Datetime NULL,
 [id_estado] Int NULL
)
go

-- Create indexes for table CategoriasProductos

CREATE INDEX [IX_Relationship16] ON [CategoriasProductos] ([id_estado])
go

-- Add keys for table CategoriasProductos

ALTER TABLE [CategoriasProductos] ADD CONSTRAINT [PK_CategoriasProductos] PRIMARY KEY ([id_categoria_producto])
go

-- Create foreign keys (relationships) section ------------------------------------------------- 


ALTER TABLE [OrdenDetalles] ADD CONSTRAINT [Relationship1] FOREIGN KEY ([id_orden]) REFERENCES [Orden] ([id_orden]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [OrdenDetalles] ADD CONSTRAINT [Relationship3] FOREIGN KEY ([id_producto]) REFERENCES [Productos] ([id_producto]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Productos] ADD CONSTRAINT [Relationship5] FOREIGN KEY ([id_categoria_producto]) REFERENCES [CategoriasProductos] ([id_categoria_producto]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Usuarios] ADD CONSTRAINT [Relationship9] FOREIGN KEY ([id_rol]) REFERENCES [Rol] ([id_rol]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Usuarios] ADD CONSTRAINT [Relationship11] FOREIGN KEY ([id_cliente]) REFERENCES [Clientes] ([id_cliente]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Usuarios] ADD CONSTRAINT [Relationship12] FOREIGN KEY ([id_estado]) REFERENCES [Estado] ([id_estado]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Productos] ADD CONSTRAINT [Relationship14] FOREIGN KEY ([id_estado]) REFERENCES [Estado] ([id_estado]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Orden] ADD CONSTRAINT [Relationship15] FOREIGN KEY ([id_estado]) REFERENCES [Estado] ([id_estado]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [CategoriasProductos] ADD CONSTRAINT [Relationship16] FOREIGN KEY ([id_estado]) REFERENCES [Estado] ([id_estado]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Orden] ADD CONSTRAINT [Relationship18] FOREIGN KEY ([id_usuario]) REFERENCES [Usuarios] ([id_usuario]) ON UPDATE NO ACTION ON DELETE NO ACTION
go


---------------------PROCEDIMIENTOS ALMACENADOS PARA ESTADOS-------------------
--Insertar
CREATE PROCEDURE InsertarEstado
    @nombre Varchar(45)
AS
BEGIN
    INSERT INTO Estados (nombre)
    VALUES(@nombre);

    --Regresar id de, registro insertado
    SELECT SCOPE_IDENTITY() AS id_estado;
END;
GO

--Actualizar
CREATE PROCEDURE ActualizarEstado
    @id_estado Int,
    @nombre Varchar(45)
AS
BEGIN 
    UPDATE Estados
    SET nombre = @nombre
    WHERE id_estado = @id_estado;
    --Verifica si se actualizo algun registro 
    IF @@ROWCOUNT = 0
        RAISERROR('No se encontro el estado con el ID  proporcionado', 16,1);
END;
GO

--Eliminar producto
CREATE PROCEDURE EliminarEstado
    @id_estado Int
AS
BEGIN
    DELETE FROM Estados
    WHERE id_estado = @id_estado;

    --Verifica si se elimino algun registro
    IF @@ROWCOUNT = 0
        RAISERROR ('No se encontró el estado con el ID proporcionado', 16, 1);
END;
GO

--Consultar por id
CREATE PROCEDURE ConsultarEstadoPorID
    @id_estado Int
AS
BEGIN
    SELECT id_estado, nombre
    FROM Estados
    WHERE id_estado = @id_estado;

    --Manejo de error si no se encuentra
    IF @@ROWCOUNT = 0
        RAISERROR ('No se encontró el estado con el ID proporcionado', 16, 1);
END;
GO

--LISTAR TODOS LOS DATOS DE LA TABLA 
CREATE PROCEDURE ListarEstados
AS
BEGIN
    SELECT id_estado, nombre
    FROM Estados;
END;
GO



