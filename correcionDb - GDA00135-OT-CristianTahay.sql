USE desafio3601

/*
Created: 3/12/2024
Modified: 17/12/2024
Model: Microsoft SQL Server 2019
Database: MS SQL Server 2019
*/


-- Create tables section -------------------------------------------------

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
 [id_estado] Int NULL,
 [activo] Bit DEFAULT 1 NULL,
 [id_usuario] Int NULL
)
go

-- Create indexes for table Productos

CREATE INDEX [IX_Relationship5] ON [Productos] ([id_categoria_producto])
go

CREATE INDEX [IX_Relationship14] ON [Productos] ([id_estado])
go

CREATE INDEX [IX_Relationship19] ON [Productos] ([id_usuario])
go

-- Add keys for table Productos

ALTER TABLE [Productos] ADD CONSTRAINT [PK_Productos] PRIMARY KEY NONCLUSTERED ([id_producto])
go

ALTER TABLE [Productos] ADD CONSTRAINT [id_producto] UNIQUE CLUSTERED ([id_producto])
go

-- Table Usuarios

CREATE TABLE [Usuarios]
(
 [password] Varchar(255) NOT NULL,
 [id_usuario] Int IDENTITY(1,1) NOT NULL,
 [correo] Varchar(55) NOT NULL,
 [nombre_completo] Varchar(70) NOT NULL,
 [telefono] Varchar(45) NULL,
 [fecha_nacimiento] Date NULL,
 [fecha_creacion] Datetime NULL,
 [razon_social] Varchar(250) NULL,
 [nombre_comercial] Varchar(340) NULL,
 [direccion_entrega] Varchar(60) NULL,
 [id_rol] Int NULL,
 [id_estado] Int NULL,
 [activo] Bit DEFAULT 1 NULL
)
go

-- Create indexes for table Usuarios

CREATE INDEX [IX_Relationship9] ON [Usuarios] ([id_rol])
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
 [id_producto] Int NULL,
 [activo] Bit DEFAULT 1 NULL
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
 [fecha_entrega] Date NULL,
 [total_orden] Float NULL,
 [activo] Bit DEFAULT 1 NULL,
 [id_estado] Int NULL,
 [id_operador] Int NULL,
 [id_cliente] Int NULL
)
go

-- Create indexes for table Orden

CREATE INDEX [IX_Relationship15] ON [Orden] ([id_estado])
go

CREATE INDEX [IX_Relationship18] ON [Orden] ([id_cliente])
go

CREATE INDEX [IX_Relationship21] ON [Orden] ([id_operador])
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
 [nombre] Varchar(45) NOT NULL,
 [activo] Bit DEFAULT 1 NULL
)
go

-- Add keys for table Rol

ALTER TABLE [Rol] ADD CONSTRAINT [PK_Rol] PRIMARY KEY ([id_rol])
go

ALTER TABLE [Rol] ADD CONSTRAINT [id_rol] UNIQUE ([id_rol])
go

-- Table Estados

CREATE TABLE [Estados]
(
 [id_estado] Int IDENTITY(1,1) NOT NULL,
 [nombre_estado] Varchar(50) NOT NULL,
 [activo] Bit DEFAULT 1 NULL
)
go

-- Add keys for table Estados

ALTER TABLE [Estados] ADD CONSTRAINT [PK_Estados] PRIMARY KEY NONCLUSTERED ([id_estado])
go

ALTER TABLE [Estados] ADD CONSTRAINT [nombre_estado] UNIQUE CLUSTERED ([nombre_estado])
go

-- Table CategoriasProductos

CREATE TABLE [CategoriasProductos]
(
 [id_categoria_producto] Int IDENTITY(1,1) NOT NULL,
 [nombre_categoria] Varchar(45) NOT NULL,
 [fecha_creacion] Datetime NULL,
 [id_estado] Int NULL,
 [activo] Bit DEFAULT 1 NULL,
 [id_usuario] Int NULL
)
go

-- Create indexes for table CategoriasProductos

CREATE INDEX [IX_Relationship16] ON [CategoriasProductos] ([id_estado])
go

CREATE INDEX [IX_Relationship20] ON [CategoriasProductos] ([id_usuario])
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



ALTER TABLE [Usuarios] ADD CONSTRAINT [Relationship12] FOREIGN KEY ([id_estado]) REFERENCES [Estados] ([id_estado]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Productos] ADD CONSTRAINT [Relationship14] FOREIGN KEY ([id_estado]) REFERENCES [Estados] ([id_estado]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Orden] ADD CONSTRAINT [Relationship15] FOREIGN KEY ([id_estado]) REFERENCES [Estados] ([id_estado]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [CategoriasProductos] ADD CONSTRAINT [Relationship16] FOREIGN KEY ([id_estado]) REFERENCES [Estados] ([id_estado]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Orden] ADD CONSTRAINT [Relationship18] FOREIGN KEY ([id_cliente]) REFERENCES [Usuarios] ([id_usuario]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Productos] ADD CONSTRAINT [Relationship19] FOREIGN KEY ([id_usuario]) REFERENCES [Usuarios] ([id_usuario]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [CategoriasProductos] ADD CONSTRAINT [Relationship20] FOREIGN KEY ([id_usuario]) REFERENCES [Usuarios] ([id_usuario]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



ALTER TABLE [Orden] ADD CONSTRAINT [Relationship21] FOREIGN KEY ([id_operador]) REFERENCES [Usuarios] ([id_usuario]) ON UPDATE NO ACTION ON DELETE NO ACTION
go



---------------------PROCEDIMIENTOS ALMACENADOS PARA ESTADOS-------------------
--Insertar
IF OBJECT_ID('InsertarEstado', 'P') IS NOT NULL
    DROP PROCEDURE InsertarEstado
GO

CREATE PROCEDURE InsertarEstado
    @data NVARCHAR(MAX),
    @code INT OUTPUT,       -- 1 para �xito, -0 para fallo
    @message NVARCHAR(MAX) OUTPUT  -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Tabla temporal para capturar lo insertado
        DECLARE @result TABLE (
            id_estado INT,
            nombre_estado VARCHAR(50)
        );

        -- Inserci�n y captura de las filas
        INSERT INTO Estados (nombre_estado)
        OUTPUT INSERTED.id_estado, INSERTED.nombre_estado INTO @result
        SELECT nombre_estado
        FROM OPENJSON(@data)
        WITH (nombre_estado VARCHAR(50))
        WHERE nombre_estado IS NOT NULL;

        -- Comprobar si se insertaron filas
        IF EXISTS (SELECT 1 FROM @result)
        BEGIN
            SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Estado insertado correctamente'; -- Mensaje de �xito
            -- Retornar lo insertado junto con el c�digo y mensaje
            SELECT @code AS code, @message AS message, * FROM @result;  -- Incluir code y message en el resultado
        END
        ELSE
        BEGIN
            SET @code = -0;  -- No se insertaron filas
            SET @message = 'No se insertaron estados, aseg�rate de que los datos sean v�lidos';  -- Mensaje de error
            -- Incluir code y message tambi�n en este caso
            SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje en caso de error
        END
    END TRY
    BEGIN CATCH
        -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        -- Retornar c�digo y mensaje de error
        SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje de error
        THROW;  -- Lanza la excepci�n para que el cliente la vea
    END CATCH;
END;
GO


--Actualizar
IF OBJECT_ID('ActualizarEstado', 'P') IS NOT NULL
    DROP PROCEDURE ActualizarEstado
GO

CREATE PROCEDURE ActualizarEstado
    @data NVARCHAR(MAX),  -- JSON que contiene los datos
    @code INT OUTPUT,      -- 1 para �xito, -0 para fallo
    @message NVARCHAR(MAX) OUTPUT  -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Declarar una tabla temporal para manejar los datos deserializados
        DECLARE @estadoData TABLE (
            id_estado INT,
            nombre_estado NVARCHAR(50)
        );

        -- Deserializamos el JSON
        INSERT INTO @estadoData
        SELECT id_estado, nombre_estado
        FROM OPENJSON(@data)
        WITH (
            id_estado INT,
            nombre_estado NVARCHAR(50)
        );

        -- Comprobamos si el ID proporcionado existe
        IF NOT EXISTS (SELECT 1 FROM Estados WHERE id_estado = (SELECT id_estado FROM @estadoData))
        BEGIN
            SET @code = -1;  -- Estado no encontrado
            SET @message = 'El estado con el ID proporcionado no existe.';
            -- Retornar c�digo y mensaje de error
            SELECT @code AS code, @message AS message;
            RETURN;
        END

        -- Actualizaci�n del nombre_estado
        UPDATE E
        SET E.nombre_estado = D.nombre_estado
        FROM Estados E
        INNER JOIN @estadoData D ON E.id_estado = D.id_estado;

        -- Verificar si se realiz� la actualizaci�n 
        IF @@ROWCOUNT > 0
        BEGIN
            SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Estado actualizado correctamente.';
            -- Retornar el estado actualizado
            SELECT @code AS code, @message AS message, E.id_estado, E.nombre_estado
            FROM Estados E
            INNER JOIN @estadoData D ON E.id_estado = D.id_estado;
        END
        ELSE
        BEGIN
            SET @code = -0;  -- No se actualiz� ninguna fila
            SET @message = 'No se pudo actualizar el estado, verifique los datos.';
            -- Retornar c�digo y mensaje
            SELECT @code AS code, @message AS message;
        END
    END TRY
    BEGIN CATCH
        -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        -- Retornar c�digo y mensaje de error
        SELECT @code AS code, @message AS message;
        THROW;  -- Lanza la excepci�n para que el cliente la vea
    END CATCH;
END;
GO



--Eliminar estado
IF OBJECT_ID('EliminarEstado', 'P') IS NOT NULL
    DROP PROCEDURE EliminarEstado;
GO

CREATE PROCEDURE EliminarEstado
    @id_estado INT,        -- ID del estado a eliminar (cambiar estado)
    @code INT OUTPUT,      -- 1 para �xito, -1 para fallo
    @message NVARCHAR(MAX) OUTPUT -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Verificar que el estado exista
        IF EXISTS (SELECT 1 FROM Estados WHERE id_estado = @id_estado AND activo = 1)
        BEGIN
            -- Cambiar el estado a 0 (inactivo)
            UPDATE Estados
            SET activo = 0
            WHERE id_estado = @id_estado;

            -- Validar que el cambio fue exitoso
            IF @@ROWCOUNT > 0
            BEGIN
                SET @code = 1;  -- Operaci�n exitosa
                SET @message = 'Estado eliminado (cambiado a inactivo) correctamente'; -- Mensaje de �xito
            END
            ELSE
            BEGIN
                SET @code = -1;  -- Fallo
                SET @message = 'No se pudo cambiar el estado, puede que ya est� inactivo';  -- Mensaje de error
            END
        END
        ELSE
        BEGIN
            SET @code = -1;
            SET @message = 'Estado no encontrado o ya est� inactivo';
        END

        -- Retornar c�digo y mensaje
        SELECT @code AS code, @message AS message;

    END TRY
    BEGIN CATCH
        -- Manejo de errores
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje de error
    END CATCH;
END;
GO



--Consultar por id
IF OBJECT_ID('ConsultarEstadoPorID', 'P') IS NOT NULL
    DROP PROCEDURE ConsultarEstadoPorID;
GO

CREATE PROCEDURE ConsultarEstadoPorID
    @id_estado Int
AS
BEGIN
    SELECT id_estado, nombre_estado, activo
    FROM Estados
    WHERE id_estado = @id_estado;

    --Manejo de error si no se encuentra
    IF @@ROWCOUNT = 0
        RAISERROR ('No se encontr� el estado con el ID proporcionado', 16, 1);
END;
GO

--Listar todos los datos de la tabla
IF OBJECT_ID('ListarEstados', 'P') IS NOT NULL
    DROP PROCEDURE ListarEstados;
GO

CREATE PROCEDURE ListarEstados
AS
BEGIN
    SELECT id_estado, nombre_estado, activo
    FROM Estados;
END;
GO


---------------------PROCEDIMIENTOS ALMACENADOS PARA PRODUCTOS-------------------
--Insertar
IF OBJECT_ID ('InsertarProducto', 'P') IS NOT NULL
	DROP PROCEDURE InsertarProducto
GO

CREATE PROCEDURE InsertarProducto
    @data NVARCHAR(MAX),
	@code INT OUTPUT, -- 1 para �xito, -0 para fallo
	@message NVARCHAR(MAX) OUTPUT -- Mensaje descriptivo
AS
BEGIN
	SET NOCOUNT ON;
	BEGIN TRY
		--Tabla temporal para la captura de insertado
		DECLARE @result TABLE(
			id_producto INT,
			nombre VARCHAR(45),
			marca VARCHAR(45),
			codigo VARCHAR(45),
			stock FLOAT,
			precio FLOAT,
			fecha_creacion DATETIME,
			foto VARBINARY (MAX),
			id_categoria_producto INT,
			id_estado INT,
			activo INT,
			id_usuario INT
		);

		-- Inserci�n y captura de las filas
		INSERT INTO Productos (
			nombre, marca, codigo, stock, precio, 
			fecha_creacion, foto, id_categoria_producto, 
			id_estado, activo, id_usuario
		)
		OUTPUT INSERTED.id_producto, INSERTED.nombre, INSERTED.marca, 
			   INSERTED.codigo, INSERTED.stock , INSERTED.precio,
			   INSERTED.fecha_creacion, INSERTED.foto, INSERTED.id_categoria_producto,
			   INSERTED.id_estado, INSERTED.activo, INSERTED.id_usuario
			INTO @result

		SELECT nombre, marca, codigo, stock, precio, GETDATE(),
			   foto, id_categoria_producto, id_estado, 1, id_usuario

		FROM OPENJSON(@data)
		WITH(
			nombre VARCHAR(45),
			marca VARCHAR(45),
			codigo VARCHAR(45),
			stock FLOAT,
			precio FLOAT,
			fecha_creacion DATETIME,
			foto VARBINARY (MAX),
			id_categoria_producto INT,
			id_estado INT,
			activo INT,
			id_usuario INT
		)
		WHERE nombre IS NOT NULL AND precio IS NOT NULL;

		-- Comprobar si se insertaron filas
		IF EXISTS (SELECT 1 FROM @result)
		BEGIN
			SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Producto(s) insertado(s) correctamente.';
            -- Retornar lo insertado junto con el c�digo y mensaje
            SELECT @code AS code, @message AS message, * FROM @result;
		END
		ELSE
		BEGIN
			SET @code = 0;  -- No se insertaron filas
            SET @message = 'No se insertaron usuarios, verifica los datos proporcionados.';
            -- Retornar solo c�digo y mensaje
            SELECT @code AS code, @message AS message;
		END

	END TRY
	BEGIN CATCH
		 -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();
        -- Retornar el error
        SELECT @code AS code, @message AS message;
        THROW;
	END CATCH

END;
GO

--Actualizar
IF OBJECT_ID('ActualizarProducto', 'P') IS NOT NULL
	DROP PROCEDURE ActualizarProducto;
GO

CREATE PROCEDURE ActualizarProducto
	@data NVARCHAR(MAX),  -- JSON que contiene los datos
    @code INT OUTPUT,     -- 1 para �xito, 0 para fallo
    @message NVARCHAR(MAX) OUTPUT  -- Mensaje descriptivo
AS
BEGIN
   SET NOCOUNT ON;
   BEGIN TRY

		-- Declarar una tabla temporal para manejar los datos deserializados
        DECLARE @productoData TABLE (
            id_producto INT,
			nombre VARCHAR(45),
			marca VARCHAR(45),
			codigo VARCHAR(45),
			stock FLOAT,
			precio FLOAT,
			fecha_creacion DATETIME,
			foto VARBINARY (MAX),
			id_categoria_producto INT,
			id_estado INT,
			activo INT,
			id_usuario INT
        );

        -- Deserializamos el JSON
        INSERT INTO @productoData
        SELECT id_producto, nombre, marca, codigo, stock, precio, fecha_creacion, foto,
			   id_categoria_producto, id_estado, activo, id_usuario
        FROM OPENJSON(@data)
        WITH (
            id_producto INT,
			nombre VARCHAR(45),
			marca VARCHAR(45),
			codigo VARCHAR(45),
			stock FLOAT,
			precio FLOAT,
			fecha_creacion DATETIME,
			foto VARBINARY (MAX),
			id_categoria_producto INT,
			id_estado INT,
			activo INT,
			id_usuario INT
        );

		-- Comprobamos si el ID proporcionado existe
        IF NOT EXISTS (SELECT 1 FROM Productos WHERE id_producto = (SELECT id_producto FROM @productoData))
        BEGIN
            SET @code = -1;  -- Usuario no encontrado
            SET @message = 'El producto con el ID proporcionado no existe.';
            -- Retornar c�digo y mensaje de error
            SELECT @code AS code, @message AS message;
            RETURN;
        END;

        -- Actualizaci�n de los datos del usuario
        UPDATE U
        SET 
            U.nombre = COALESCE(D.nombre, U.nombre),
            U.marca = COALESCE(D.marca, U.marca),
            U.codigo = COALESCE(D.codigo, U.codigo),
            U.stock = COALESCE(D.stock, U.stock),
            U.precio = COALESCE(D.precio, U.precio),
            U.fecha_creacion = COALESCE(D.fecha_creacion, U.fecha_creacion),
            U.foto = COALESCE(D.foto, U.foto),
            U.id_categoria_producto = COALESCE(D.id_categoria_producto, U.id_categoria_producto),
            U.id_estado = COALESCE(D.id_estado, U.id_estado),
			U.activo = COALESCE(D.activo, U.activo),
			U.id_usuario = COALESCE(D.id_usuario, U.id_usuario)
        FROM Productos U
        INNER JOIN @productoData D ON U.id_usuario = D.id_producto;

		-- Verificar si se realiz� la actualizaci�n 
        IF @@ROWCOUNT > 0
        BEGIN
            SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Usuario actualizado correctamente.';
            -- Retornar el producto actualizado
            SELECT @code AS code, @message AS message, 
                   U.id_producto, U.nombre, U.marca, U.codigo, U.stock,
                   U.precio, U.fecha_creacion, U.foto, U.id_categoria_producto, 
				   U.id_estado, U.activo, U.id_usuario
            FROM Productos U
            INNER JOIN @productoData D ON U.id_producto = D.id_producto;
        END
        ELSE
        BEGIN
            SET @code = 0;  -- No se actualiz� ninguna fila
            SET @message = 'No se pudo actualizar el usuario, verifique los datos.';
            -- Retornar c�digo y mensaje
            SELECT @code AS code, @message AS message;
        END;
   END TRY
   BEGIN CATCH
		 -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        -- Retornar c�digo y mensaje de error
        SELECT @code AS code, @message AS message;
        THROW;  -- Lanza la excepci�n para que el cliente la vea
   END CATCH
END;
GO

--Eliminar producto
IF OBJECT_ID('EliminarProducto', 'P') IS NOT NULL
	DROP PROCEDURE EliminarProducto
GO

CREATE PROCEDURE EliminarProducto
    @id_producto INT,        -- ID del estado a eliminar (cambiar estado)
    @code INT OUTPUT,      -- 1 para �xito, -1 para fallo
    @message NVARCHAR(MAX) OUTPUT -- Mensaje descriptivo
AS
BEGIN
    BEGIN TRY
		-- Verificar que el estado exista
        IF EXISTS (SELECT 1 FROM Productos WHERE id_producto = @id_producto AND activo = 1)
        BEGIN
            -- Cambiar el estado a 0 (inactivo)
            UPDATE Productos
            SET activo = 0
            WHERE id_producto = @id_producto;

            -- Validar que el cambio fue exitoso
            IF @@ROWCOUNT > 0
            BEGIN
                SET @code = 1;  -- Operaci�n exitosa
                SET @message = 'Estado eliminado (cambiado a inactivo) correctamente'; -- Mensaje de �xito
            END
            ELSE
            BEGIN
                SET @code = -1;  -- Fallo
                SET @message = 'No se pudo cambiar el estado, puede que ya est� inactivo';  -- Mensaje de error
            END
        END
        ELSE
        BEGIN
            SET @code = -1;
            SET @message = 'Estado no encontrado o ya est� inactivo';
        END

        -- Retornar c�digo y mensaje
        SELECT @code AS code, @message AS message;
	END TRY
	BEGIN CATCH
		 -- Manejo de errores
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje de error
	END CATCH
END;
GO

--Consultar por id
IF OBJECT_ID('ConsultarProductoPorID', 'P') IS NOT NULL 
	DROP PROCEDURE ConsultarProductoPorID
GO

CREATE PROCEDURE ConsultarProductoPorID
    @id_producto Int
AS
BEGIN
    SELECT 
        id_producto, nombre, marca, codigo, stock, precio, fecha_creacion, foto, id_categoria_producto, id_estado, activo, id_usuario
    FROM 
        Productos
    WHERE 
        id_producto = @id_producto;

    -- Opcional: Manejo de error si no se encuentra
    IF @@ROWCOUNT = 0
        RAISERROR ('No se encontr� el producto con el ID proporcionado', 16, 1);
END;
GO

--Listar todos los datos de la tabla
IF OBJECT_ID('ListarProductos', 'P') IS NOT NULL
	DROP PROCEDURE ListarProductos
GO

CREATE PROCEDURE ListarProductos
AS
BEGIN
    SELECT 
        id_producto, nombre, marca, codigo, stock, precio, fecha_creacion, foto, id_categoria_producto, id_estado, activo, id_usuario
    FROM 
        Productos;
END;
GO

-- Inactivar producto
IF OBJECT_ID('InactivarProducto', 'P') IS NOT NULL
	DROP PROCEDURE InactivarProducto
GO
CREATE PROCEDURE InactivarProducto
    @id_producto Int,
    @id_estado Int
AS
BEGIN
    -- Ver si el producto existe
    IF EXISTS (SELECT 1 FROM PRODUCTOS WHERE id_producto = @id_producto)
    BEGIN
        UPDATE Productos
        SET id_estado = @id_estado
        WHERE id_producto = @id_producto;
        PRINT 'Producto inactivado correctamente';
    END
    ELSE
    BEGIN
        PRINT 'Error: producto no encontrado';
    END
END;
GO



---------------------PROCEDIMIENTOS ALMACENADOS PARA USUARIOS-------------------
--Insertar
IF OBJECT_ID('InsertarUsuario', 'P') IS NOT NULL
    DROP PROCEDURE InsertarUsuario;
GO

CREATE PROCEDURE InsertarUsuario
    @data NVARCHAR(MAX),    -- Datos en formato JSON
    @code INT OUTPUT,       -- 1 para �xito, 0 para fallo
    @message NVARCHAR(MAX) OUTPUT  -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Tabla temporal para capturar lo insertado
        DECLARE @result TABLE (
            id_usuario INT,
            correo VARCHAR(55),
            nombre_completo VARCHAR(70),
            telefono VARCHAR(45),
            fecha_nacimiento DATE,
            fecha_creacion DATETIME,
            razon_social VARCHAR(250),
            nombre_comercial VARCHAR(340),
            direccion_entrega VARCHAR(60),
            id_rol INT,
            id_estado INT,
            activo BIT
        );

        -- Inserci�n y captura de las filas
        INSERT INTO Usuarios (
            password, correo, nombre_completo, telefono, 
            fecha_nacimiento, fecha_creacion, razon_social, 
            nombre_comercial, direccion_entrega, id_rol, 
            id_estado, activo
        )
        OUTPUT INSERTED.id_usuario, INSERTED.correo, INSERTED.nombre_completo,
               INSERTED.telefono, INSERTED.fecha_nacimiento, INSERTED.fecha_creacion,
               INSERTED.razon_social, INSERTED.nombre_comercial,
               INSERTED.direccion_entrega, INSERTED.id_rol, INSERTED.id_estado,
               INSERTED.activo
               INTO @result
        SELECT 
            password, correo, nombre_completo, telefono, 
            fecha_nacimiento, GETDATE(), razon_social, nombre_comercial, 
            direccion_entrega, id_rol, id_estado, 0  -- Inactivo por defecto
        FROM OPENJSON(@data)
        WITH (
            password NVARCHAR(255),
            correo NVARCHAR(55),
            nombre_completo NVARCHAR(70),
            telefono NVARCHAR(45),
            fecha_nacimiento DATE,
            razon_social NVARCHAR(250),
            nombre_comercial NVARCHAR(340),
            direccion_entrega NVARCHAR(60),
            id_rol INT,
            id_estado INT
        )
        WHERE correo IS NOT NULL AND nombre_completo IS NOT NULL;

        -- Comprobar si se insertaron filas
        IF EXISTS (SELECT 1 FROM @result)
        BEGIN
            SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Usuario(s) insertado(s) correctamente.';
            -- Retornar lo insertado junto con el c�digo y mensaje
            SELECT @code AS code, @message AS message, * FROM @result;
        END
        ELSE
        BEGIN
            SET @code = 0;  -- No se insertaron filas
            SET @message = 'No se insertaron usuarios, verifica los datos proporcionados.';
            -- Retornar solo c�digo y mensaje
            SELECT @code AS code, @message AS message;
        END
    END TRY
    BEGIN CATCH
        -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();
        -- Retornar el error
        SELECT @code AS code, @message AS message;
        THROW;
    END CATCH;
END;
GO


--Actualizar
IF OBJECT_ID('ActualizarUsuario', 'P') IS NOT NULL
    DROP PROCEDURE ActualizarUsuario;
GO

CREATE PROCEDURE ActualizarUsuario
    @data NVARCHAR(MAX),  -- JSON que contiene los datos
    @code INT OUTPUT,     -- 1 para �xito, 0 para fallo
    @message NVARCHAR(MAX) OUTPUT  -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Declarar una tabla temporal para manejar los datos deserializados
        DECLARE @usuarioData TABLE (
            id_usuario INT,
			password NVARCHAR(255),
            correo NVARCHAR(55),
            nombre_completo NVARCHAR(70),
            telefono NVARCHAR(45),
            fecha_nacimiento DATE,
            razon_social NVARCHAR(250),
            nombre_comercial NVARCHAR(340),
            direccion_entrega NVARCHAR(60),
            id_rol INT,
            id_estado INT,
            activo BIT
        );

        -- Deserializamos el JSON
        INSERT INTO @usuarioData
        SELECT id_usuario, password,  correo, nombre_completo, telefono, fecha_nacimiento,
               razon_social, nombre_comercial, direccion_entrega, id_rol, id_estado, activo
        FROM OPENJSON(@data)
        WITH (
            id_usuario INT,
			password NVARCHAR(255),
            correo NVARCHAR(55),
            nombre_completo NVARCHAR(70),
            telefono NVARCHAR(45),
            fecha_nacimiento DATE,
            razon_social NVARCHAR(250),
            nombre_comercial NVARCHAR(340),
            direccion_entrega NVARCHAR(60),
            id_rol INT,
            id_estado INT,
            activo BIT
        );

        -- Comprobamos si el ID proporcionado existe
        IF NOT EXISTS (SELECT 1 FROM Usuarios WHERE id_usuario = (SELECT id_usuario FROM @usuarioData))
        BEGIN
            SET @code = -1;  -- Usuario no encontrado
            SET @message = 'El usuario con el ID proporcionado no existe.';
            -- Retornar c�digo y mensaje de error
            SELECT @code AS code, @message AS message;
            RETURN;
        END;

        -- Actualizaci�n de los datos del usuario
        UPDATE U
        SET 
		    U.password = COALESCE(D.password, U.password),
            U.correo = COALESCE(D.correo, U.correo),
            U.nombre_completo = COALESCE(D.nombre_completo, U.nombre_completo),
            U.telefono = COALESCE(D.telefono, U.telefono),
            U.fecha_nacimiento = COALESCE(D.fecha_nacimiento, U.fecha_nacimiento),
            U.razon_social = COALESCE(D.razon_social, U.razon_social),
            U.nombre_comercial = COALESCE(D.nombre_comercial, U.nombre_comercial),
            U.direccion_entrega = COALESCE(D.direccion_entrega, U.direccion_entrega),
            U.id_rol = COALESCE(D.id_rol, U.id_rol),
            U.id_estado = COALESCE(D.id_estado, U.id_estado),
            U.activo = COALESCE(D.activo, U.activo)
        FROM Usuarios U
        INNER JOIN @usuarioData D ON U.id_usuario = D.id_usuario;

        -- Verificar si se realiz� la actualizaci�n 
        IF @@ROWCOUNT > 0
        BEGIN
            SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Usuario actualizado correctamente.';
            -- Retornar el usuario actualizado
            SELECT @code AS code, @message AS message, 
                   U.id_usuario, U.password, U.correo, U.nombre_completo, U.telefono,
                   U.fecha_nacimiento, U.razon_social, U.nombre_comercial,
                   U.direccion_entrega, U.id_rol, U.id_estado, U.activo
            FROM Usuarios U
            INNER JOIN @usuarioData D ON U.id_usuario = D.id_usuario;
        END
        ELSE
        BEGIN
            SET @code = 0;  -- No se actualiz� ninguna fila
            SET @message = 'No se pudo actualizar el usuario, verifique los datos.';
            -- Retornar c�digo y mensaje
            SELECT @code AS code, @message AS message;
        END;
    END TRY
    BEGIN CATCH
        -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        -- Retornar c�digo y mensaje de error
        SELECT @code AS code, @message AS message;
        THROW;  -- Lanza la excepci�n para que el cliente la vea
    END CATCH;
END;
GO



--Eliminar usuario
IF OBJECT_ID('EliminarUsuario','P') IS NOT NULL
	DROP PROCEDURE EliminarUsuario;
GO

CREATE PROCEDURE EliminarUsuario
    @id_usuario INT,        -- ID del estado a eliminar (cambiar estado)
    @code INT OUTPUT,      -- 1 para �xito, -1 para fallo
    @message NVARCHAR(MAX) OUTPUT -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Verificar que el estado exista
        IF EXISTS (SELECT 1 FROM Usuarios WHERE id_usuario = @id_usuario AND activo = 1)
        BEGIN
            -- Cambiar el estado a 0 (inactivo)
            UPDATE Usuarios
            SET activo = 0
            WHERE id_usuario = @id_usuario;

            -- Validar que el cambio fue exitoso
            IF @@ROWCOUNT > 0
            BEGIN
                SET @code = 1;  -- Operaci�n exitosa
                SET @message = 'Estado eliminado (cambiado a inactivo) correctamente'; -- Mensaje de �xito
            END
            ELSE
            BEGIN
                SET @code = -1;  -- Fallo
                SET @message = 'No se pudo cambiar el estado, puede que ya est� inactivo';  -- Mensaje de error
            END
        END
        ELSE
        BEGIN
            SET @code = -1;
            SET @message = 'Estado no encontrado o ya est� inactivo';
        END

        -- Retornar c�digo y mensaje
        SELECT @code AS code, @message AS message;

    END TRY
    BEGIN CATCH
        -- Manejo de errores
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje de error
    END CATCH;
END;
GO

--Consultar por id
IF OBJECT_ID('ConsultarUsuarioPorID', 'P') IS NOT NULL
	DROP PROCEDURE ConsultarUsuarioPorID
GO
CREATE PROCEDURE ConsultarUsuarioPorID
    @id_usuario Int
AS
BEGIN
    SELECT 
        id_usuario, correo, nombre_completo, telefono, fecha_nacimiento, fecha_creacion, razon_social, nombre_comercial, direccion_entrega, id_rol, id_estado, activo
    FROM 
        Usuarios
    WHERE 
        id_usuario = @id_usuario;

    -- Opcional: Manejo de error si no se encuentra
    IF @@ROWCOUNT = 0
        RAISERROR ('No se encontr� el usuario con el ID proporcionado', 16, 1);
END;
GO

--Listar todos los datos de la tabla
IF OBJECT_ID('ListarUsuarios', 'P') IS NOT NULL
	DROP PROCEDURE ListarUsuarios
GO

CREATE PROCEDURE ListarUsuarios
AS
BEGIN
    SELECT 
        id_usuario, correo, nombre_completo, telefono, fecha_nacimiento, fecha_creacion, razon_social, nombre_comercial, direccion_entrega, id_rol, id_estado, activo
    FROM 
        Usuarios;
END;
GO

---------------------PROCEDIMIENTOS ALMACENADOS PARA ROL-------------------
--Insertar
IF OBJECT_ID('InsertarRol', 'P') IS NOT NULL
    DROP PROCEDURE InsertarRol
GO

CREATE PROCEDURE InsertarRol
    @data NVARCHAR(MAX),
    @code INT OUTPUT,       -- 1 para �xito, -0 para fallo
    @message NVARCHAR(MAX) OUTPUT  -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Tabla temporal para capturar lo insertado
        DECLARE @result TABLE (
            id_rol INT,
            nombre VARCHAR(50)
        );

        -- Inserci�n y captura de las filas
        INSERT INTO Rol (nombre)
        OUTPUT INSERTED.id_rol, INSERTED.nombre INTO @result
        SELECT nombre
        FROM OPENJSON(@data)
        WITH (nombre VARCHAR(50))
        WHERE nombre IS NOT NULL;

        -- Comprobar si se insertaron filas
        IF EXISTS (SELECT 1 FROM @result)
        BEGIN
            SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Estado insertado correctamente'; -- Mensaje de �xito
            -- Retornar lo insertado junto con el c�digo y mensaje
            SELECT @code AS code, @message AS message, * FROM @result;  -- Incluir code y message en el resultado
        END
        ELSE
        BEGIN
            SET @code = -0;  -- No se insertaron filas
            SET @message = 'No se insertaron Rol, aseg�rate de que los datos sean v�lidos';  -- Mensaje de error
            -- Incluir code y message tambi�n en este caso
            SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje en caso de error
        END
    END TRY
    BEGIN CATCH
        -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        -- Retornar c�digo y mensaje de error
        SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje de error
        THROW;  -- Lanza la excepci�n para que el cliente la vea
    END CATCH;
END;
GO


--Actualizar
IF OBJECT_ID('ActualizarRol', 'P') IS NOT NULL
    DROP PROCEDURE ActualizarRol
GO

CREATE PROCEDURE ActualizarRol
    @data NVARCHAR(MAX),  -- JSON que contiene los datos
    @code INT OUTPUT,      -- 1 para �xito, -0 para fallo
    @message NVARCHAR(MAX) OUTPUT  -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Declarar una tabla temporal para manejar los datos deserializados
        DECLARE @estadoData TABLE (
            id_rol INT,
            nombre NVARCHAR(50)
        );

        -- Deserializamos el JSON
        INSERT INTO @estadoData
        SELECT id_rol, nombre
        FROM OPENJSON(@data)
        WITH (
            id_rol INT,
            nombre NVARCHAR(50)
        );

        -- Comprobamos si el ID proporcionado existe
        IF NOT EXISTS (SELECT 1 FROM Rol WHERE id_rol = (SELECT id_rol FROM @estadoData))
        BEGIN
            SET @code = -1;  -- Estado no encontrado
            SET @message = 'El estado con el ID proporcionado no existe.';
            -- Retornar c�digo y mensaje de error
            SELECT @code AS code, @message AS message;
            RETURN;
        END

        -- Actualizaci�n del nombre
        UPDATE E
        SET E.nombre = D.nombre
        FROM Rol E
        INNER JOIN @estadoData D ON E.id_rol = D.id_rol;

        -- Verificar si se realiz� la actualizaci�n 
        IF @@ROWCOUNT > 0
        BEGIN
            SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Estado actualizado correctamente.';
            -- Retornar el estado actualizado
            SELECT @code AS code, @message AS message, E.id_rol, E.nombre
            FROM Rol E
            INNER JOIN @estadoData D ON E.id_rol = D.id_rol;
        END
        ELSE
        BEGIN
            SET @code = -0;  -- No se actualiz� ninguna fila
            SET @message = 'No se pudo actualizar el estado, verifique los datos.';
            -- Retornar c�digo y mensaje
            SELECT @code AS code, @message AS message;
        END
    END TRY
    BEGIN CATCH
        -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        -- Retornar c�digo y mensaje de error
        SELECT @code AS code, @message AS message;
        THROW;  -- Lanza la excepci�n para que el cliente la vea
    END CATCH;
END;
GO

--Eliminar estado
IF OBJECT_ID('EliminarRol', 'P') IS NOT NULL
    DROP PROCEDURE EliminarRol;
GO

CREATE PROCEDURE EliminarRol
    @id_rol INT,        -- ID del estado a eliminar (cambiar estado)
    @code INT OUTPUT,      -- 1 para �xito, -1 para fallo
    @message NVARCHAR(MAX) OUTPUT -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Verificar que el estado exista
        IF EXISTS (SELECT 1 FROM Rol WHERE id_rol = @id_rol AND activo = 1)
        BEGIN
            -- Cambiar el estado a 0 (inactivo)
            UPDATE Rol
            SET activo = 0
            WHERE id_rol = @id_rol;

            -- Validar que el cambio fue exitoso
            IF @@ROWCOUNT > 0
            BEGIN
                SET @code = 1;  -- Operaci�n exitosa
                SET @message = 'Estado eliminado (cambiado a inactivo) correctamente'; -- Mensaje de �xito
            END
            ELSE
            BEGIN
                SET @code = -1;  -- Fallo
                SET @message = 'No se pudo cambiar el estado, puede que ya est� inactivo';  -- Mensaje de error
            END
        END
        ELSE
        BEGIN
            SET @code = -1;
            SET @message = 'Estado no encontrado o ya est� inactivo';
        END

        -- Retornar c�digo y mensaje
        SELECT @code AS code, @message AS message;

    END TRY
    BEGIN CATCH
        -- Manejo de errores
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje de error
    END CATCH;
END;
GO

--Consultar por id
IF OBJECT_ID('BuscarRolPorId', 'P') IS NOT NULL
    DROP PROCEDURE BuscarRolPorId;
GO

CREATE PROCEDURE BuscarRolPorId
    @id_rol Int
AS
BEGIN
    SELECT id_rol, nombre, activo
    FROM Rol
    WHERE id_rol = @id_rol;

    --Manejo de error si no se encuentra
    IF @@ROWCOUNT = 0
        RAISERROR ('No se encontr� el estado con el ID proporcionado', 16, 1);
END;
GO

--Listar todos los datos de la tabla
IF OBJECT_ID('ListarRoles', 'P') IS NOT NULL
    DROP PROCEDURE ListarRoles;
GO

CREATE PROCEDURE ListarRoles
AS
BEGIN
    SELECT id_rol, nombre, activo
    FROM Rol;
END;
GO

---------------------PROCEDIMIENTOS ALMACENADOS PARA categoria productos-------------------
--Insertar
IF OBJECT_ID('InsertarCategoriaProducto', 'P') IS NOT NULL
    DROP PROCEDURE InsertarCategoriaProducto
GO

CREATE PROCEDURE InsertarCategoriaProducto
    @data NVARCHAR(MAX),
    @code INT OUTPUT,       -- 1 para �xito, -0 para fallo
    @message NVARCHAR(MAX) OUTPUT  -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Tabla temporal para capturar lo insertado
        DECLARE @result TABLE (
            id_categoria_producto INT,
            nombre_categoria VARCHAR(45),
			fecha_creacion DATETIME,
			id_estado INT,
			activo BIT,
			id_usuario INT
        );

        -- Inserci�n y captura de las filas
        INSERT INTO CategoriasProductos (nombre_categoria, fecha_creacion, id_estado, activo, id_usuario)
        OUTPUT INSERTED.id_categoria_producto, INSERTED.nombre_categoria,  INSERTED.fecha_creacion, INSERTED.id_estado, INSERTED.activo, INSERTED.id_usuario INTO @result
        SELECT nombre_categoria, GETDATE(), id_estado, 1, id_usuario
        FROM OPENJSON(@data)
        WITH (
				nombre_categoria VARCHAR(45),
				fecha_creacion DATETIME,
				id_estado INT,
				activo BIT,
				id_usuario INT
			)
        WHERE nombre_categoria IS NOT NULL AND  id_estado IS NOT NULL AND id_usuario IS NOT NULL;

        -- Comprobar si se insertaron filas
        IF EXISTS (SELECT 1 FROM @result)
        BEGIN
            SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Estado insertado correctamente'; -- Mensaje de �xito
            -- Retornar lo insertado junto con el c�digo y mensaje
            SELECT @code AS code, @message AS message, * FROM @result;  -- Incluir code y message en el resultado
        END
        ELSE
        BEGIN
            SET @code = -0;  -- No se insertaron filas
            SET @message = 'No se insertaron estados, aseg�rate de que los datos sean v�lidos';  -- Mensaje de error
            -- Incluir code y message tambi�n en este caso
            SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje en caso de error
        END
    END TRY
    BEGIN CATCH
        -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        -- Retornar c�digo y mensaje de error
        SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje de error
        THROW;  -- Lanza la excepci�n para que el cliente la vea
    END CATCH;
END;
GO


--Actualizar
IF OBJECT_ID('ActualizarCategoriaProducto', 'P') IS NOT NULL
    DROP PROCEDURE ActualizarCategoriaProducto
GO

CREATE PROCEDURE ActualizarCategoriaProducto
    @data NVARCHAR(MAX),  -- JSON que contiene los datos
    @code INT OUTPUT,      -- 1 para �xito, -0 para fallo
    @message NVARCHAR(MAX) OUTPUT  -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Declarar una tabla temporal para manejar los datos deserializados
        DECLARE @estadoData TABLE (
            id_categoria_producto INT,
			nombre_categoria VARCHAR(45),
			fecha_creacion DATETIME,
			id_estado INT,
			activo BIT,
			id_usuario INT
        );

        -- Deserializamos el JSON
        INSERT INTO @estadoData
        SELECT id_categoria_producto, nombre_categoria, fecha_creacion, id_estado, activo, id_usuario
        FROM OPENJSON(@data)
        WITH (
            id_categoria_producto INT,
			nombre_categoria VARCHAR(45),
			fecha_creacion DATETIME,
			id_estado INT,
			activo BIT,
			id_usuario INT
        );

        -- Comprobamos si el ID proporcionado existe
        IF NOT EXISTS (SELECT 1 FROM CategoriasProductos WHERE id_categoria_producto = (SELECT id_categoria_producto FROM @estadoData))
        BEGIN
            SET @code = -1;  -- Estado no encontrado
            SET @message = 'El estado con el ID proporcionado no existe.';
            -- Retornar c�digo y mensaje de error
            SELECT @code AS code, @message AS message;
            RETURN;
        END


        -- Actualizaci�n de la categoria de producto
        UPDATE E
        SET E.nombre_categoria = D.nombre_categoria, 
			E.id_estado = D.id_estado, 
			E.activo = D.activo,
			E.id_usuario = D.id_usuario
        FROM CategoriasProductos E
        INNER JOIN @estadoData D ON E.id_categoria_producto = D.id_categoria_producto;

        -- Verificar si se realiz� la actualizaci�n 
        IF @@ROWCOUNT > 0
        BEGIN
            SET @code = 1;  -- Operaci�n exitosa
            SET @message = 'Estado actualizado correctamente.';
            -- Retornar el estado actualizado
            SELECT @code AS code, @message AS message, E.id_categoria_producto, E.nombre_categoria
            FROM CategoriasProductos E
            INNER JOIN @estadoData D ON E.id_categoria_producto = D.id_categoria_producto;
        END
        ELSE
        BEGIN
            SET @code = -0;  -- No se actualiz� ninguna fila
            SET @message = 'No se pudo actualizar el estado, verifique los datos.';
            -- Retornar c�digo y mensaje
            SELECT @code AS code, @message AS message;
        END
    END TRY
    BEGIN CATCH
        -- Captura el error
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        -- Retornar c�digo y mensaje de error
        SELECT @code AS code, @message AS message;
        THROW;  -- Lanza la excepci�n para que el cliente la vea
    END CATCH;
END;
GO

--Eliminar categoria producto
IF OBJECT_ID('EliminarCategoriaProducto', 'P') IS NOT NULL
    DROP PROCEDURE EliminarCategoriaProducto;
GO

CREATE PROCEDURE EliminarCategoriaProducto
    @id_categoria_producto INT,        -- ID del estado a eliminar (cambiar estado)
    @code INT OUTPUT,      -- 1 para �xito, -1 para fallo
    @message NVARCHAR(MAX) OUTPUT -- Mensaje descriptivo
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        -- Verificar que el estado exista
        IF EXISTS (SELECT 1 FROM CategoriasProductos WHERE id_categoria_producto = @id_categoria_producto AND activo = 1)
        BEGIN
            -- Cambiar el estado a 0 (inactivo)
            UPDATE CategoriasProductos
            SET activo = 0
            WHERE id_categoria_producto = @id_categoria_producto;

            -- Validar que el cambio fue exitoso
            IF @@ROWCOUNT > 0
            BEGIN
                SET @code = 1;  -- Operaci�n exitosa
                SET @message = 'Categoria de producto eliminado (cambiado a inactivo) correctamente'; -- Mensaje de �xito
            END
            ELSE
            BEGIN
                SET @code = -1;  -- Fallo
                SET @message = 'No se pudo cambiar el estado, puede que ya est� inactivo';  -- Mensaje de error
            END
        END
        ELSE
        BEGIN
            SET @code = -1;
            SET @message = 'Estado no encontrado o ya est� inactivo';
        END

        -- Retornar c�digo y mensaje
        SELECT @code AS code, @message AS message;

    END TRY
    BEGIN CATCH
        -- Manejo de errores
        SET @code = -1;
        SET @message = ERROR_MESSAGE();  -- Captura el mensaje de error
        SELECT @code AS code, @message AS message;  -- Retornar c�digo y mensaje de error
    END CATCH;
END;
GO

--Consultar por id
IF OBJECT_ID('BuscarCategoriaProductoPorId', 'P') IS NOT NULL
	DROP PROCEDURE BuscarCategoriaProductoPorId
GO
CREATE PROCEDURE BuscarCategoriaProductoPorId
    @id_categoria_producto Int
AS
BEGIN
    SELECT 
        id_categoria_producto,
        nombre_categoria,
        fecha_creacion,
        id_estado,
        activo,
		id_usuario
    FROM 
        CategoriasProductos 
	WHERE id_categoria_producto = @id_categoria_producto;
END;
GO

--Listar todos los datos de la tabla 
IF OBJECT_ID('ListarCategoriasProductos', 'P') IS NOT NULL
	DROP PROCEDURE ListarCategoriasProductos
GO
CREATE PROCEDURE ListarCategoriasProductos
AS
BEGIN
     SELECT 
        id_categoria_producto,
        nombre_categoria,
        fecha_creacion,
        id_estado,
        activo,
		id_usuario
    FROM 
        CategoriasProductos 
END;
GO




---------------------PROCEDIMIENTOS ALMACENADOS PARA ORDEN y DETALLE DE ORDEN-------------------
--Insertar
IF OBJECT_ID('InsertarOrden', 'P') IS NOT NULL
    DROP PROCEDURE InsertarOrden
GO

CREATE PROCEDURE InsertarOrden
    @data NVARCHAR(MAX),        -- JSON que contiene los datos de la orden
    @code INT OUTPUT,           -- Código de salida (0 para éxito, -1 para error)
    @message NVARCHAR(MAX) OUTPUT -- Mensaje de salida
AS
BEGIN
    SET NOCOUNT ON;
    BEGIN TRANSACTION;

    BEGIN TRY
        -- Declaraciones internas
        DECLARE @id_orden INT;
        DECLARE @total FLOAT;

        -- Insertar en la tabla Orden
        INSERT INTO Orden (fecha_creacion, fecha_entrega, id_cliente, id_operador, activo, total_orden, id_estado)
        VALUES (
            GETDATE(),                                           -- fecha_creacion
            JSON_VALUE(@data, '$.fecha_entrega'),                -- fecha_entrega
            CAST(JSON_VALUE(@data, '$.id_cliente') AS INT),      -- id_cliente
            CAST(JSON_VALUE(@data, '$.id_operador') AS INT),     -- id_operador
            1,                                                   -- activo
            0,                                                   -- total_orden (se actualizará más adelante)
            1                                                    -- id_estado
        );

        -- Obtener el ID generado para la orden
        SET @id_orden = SCOPE_IDENTITY();

        -- Insertar los detalles de la orden
        INSERT INTO OrdenDetalles (cantidad, precio, sub_total, id_orden, id_producto, activo)
        SELECT 
            CAST(JSON_VALUE(detalle.value, '$.cantidad') AS INT) AS cantidad,
            p.precio AS precio,
            CAST(JSON_VALUE(detalle.value, '$.cantidad') AS INT) * p.precio AS sub_total,
            @id_orden AS id_orden,
            CAST(JSON_VALUE(detalle.value, '$.id_producto') AS INT) AS id_producto,
            1 AS activo
        FROM OPENJSON(@data, '$.detalles') AS detalle
        INNER JOIN Productos p ON p.id_producto = CAST(JSON_VALUE(detalle.value, '$.id_producto') AS INT);

        -- Actualizar el stock por cada producto en los detalles
        DECLARE @productId INT, @quantity INT;
        DECLARE details_cursor CURSOR FOR
        SELECT 
            CAST(JSON_VALUE(detalle.value, '$.id_producto') AS INT) AS id_producto,
            CAST(JSON_VALUE(detalle.value, '$.cantidad') AS INT) AS cantidad
        FROM OPENJSON(@data, '$.detalles') AS detalle;

        OPEN details_cursor;
        FETCH NEXT FROM details_cursor INTO @productId, @quantity;

        WHILE @@FETCH_STATUS = 0
        BEGIN
            UPDATE Productos
            SET stock = stock - @quantity
            WHERE id_producto = @productId;

            -- Verificar si hay stock insuficiente
            IF EXISTS (
                SELECT 1
                FROM Productos
                WHERE id_producto = @productId AND stock < 0
            )
            BEGIN
                CLOSE details_cursor;
                DEALLOCATE details_cursor;
                ROLLBACK TRANSACTION;

                SET @code = 50000;
                SET @message = 'Stock insuficiente para uno o más productos.';
                RETURN;
            END;

            FETCH NEXT FROM details_cursor INTO @productId, @quantity;
        END;

        CLOSE details_cursor;
        DEALLOCATE details_cursor;

        -- Calcular el total de la orden
        SELECT @total = ISNULL(SUM(sub_total), 0)
        FROM OrdenDetalles
        WHERE id_orden = @id_orden;

        -- Actualizar el total de la orden
        UPDATE Orden
        SET total_orden = @total
        WHERE id_orden = @id_orden;

        -- Confirmar la transacción
        COMMIT TRANSACTION;

        -- Parámetros de salida
        SET @code = 0;
        SET @message = 'Orden y detalles insertados exitosamente.';
    END TRY
    BEGIN CATCH
        -- Revertir en caso de error
        ROLLBACK TRANSACTION;

        -- Mensaje de error
        SET @code = ERROR_NUMBER();
        SET @message = ERROR_MESSAGE();
    END CATCH
END;
GO




--Actualizar
IF OBJECT_ID('ActualizarOrden', 'P') IS NOT NULL
	DROP PROCEDURE ActualizarOrden
GO

CREATE PROCEDURE ActualizarOrden
    @data NVARCHAR(MAX),         -- JSON con los datos de la orden
    @code INT OUTPUT,            -- C�digo de salida (0 para �xito, -1 para error)
    @message NVARCHAR(MAX) OUTPUT -- Mensaje de salida
AS
BEGIN
    BEGIN TRY
        DECLARE @id_orden INT;
        DECLARE @nuevo_estado INT;
        DECLARE @cancelar BIT;
		DECLARE @id_operador INT;
        
        -- Parseamos el JSON recibido
        SET @id_orden = JSON_VALUE(@data, '$.id_orden');
        SET @nuevo_estado = JSON_VALUE(@data, '$.nuevo_estado');
        SET @cancelar = JSON_VALUE(@data, '$.cancelar');
		SET @id_operador = JSON_VALUE(@data, '$.id_operador');
        
        -- Si cancelar = 1, la orden es cancelada
        IF @cancelar = 1
        BEGIN
            -- Se actualiza la orden a cancelada
            UPDATE [Orden]
            SET 
                activo = 0,                -- Orden inactiva
                id_estado = 2,          -- Estado 'Cancelada'
            WHERE id_orden = @id_orden;

			-- Se actualiza el detalle de la orden para cancelarlo
			UPDATE OrdenDetalles
			SET 
				activo = 0
			WHERE id_orden = @id_orden


            -- Respuesta de �xito al cancelar
            SET @code = 0;
            SET @message = 'Orden cancelada con exito.';
        END
        ELSE
        BEGIN
            -- Si no se cancela, solo se actualiza el estado de la orden, se actualiza  el operador que modifica el estado de la orden
            UPDATE [Orden]
            SET 
                id_estado = @nuevo_estado,  -- Cambia el estado de la orden
				id_operador = @id_operador
            WHERE id_orden = @id_orden;

            -- Respuesta de exito al cambiar el estado
            SET @code = 0;
            SET @message = 'Estado de la orden actualizado con exito.';
        END
    END TRY
    BEGIN CATCH
        -- Manejo de errores
        SET @code = -1;
        SET @message = ERROR_MESSAGE();
    END CATCH;
END


--Actualizar encabezado
IF OBJECT_ID('ActualizarOrdenEncabezado', 'P') IS NOT NULL
	DROP PROCEDURE ActualizarOrdenEncabezado
GO

CREATE PROCEDURE ActualizarOrdenEncabezado
	@data NVARCHAR(MAX),          -- JSON con los datos de la orden
    @code INT OUTPUT,             -- C�digo de salida (0 para �xito, -1 para error)
    @message NVARCHAR(MAX) OUTPUT -- Mensaje de salida
AS
BEGIN
    SET NOCOUNT ON;

    -- Variables locales para extraer datos del JSON
    DECLARE @id_orden INT,
            @fecha_entrega DATE,
            @total_orden FLOAT,
            @activo BIT,
            @id_estado INT,
            @id_operador INT,
            @id_cliente INT;

    -- Variables para manejar errores
    BEGIN TRY
        -- Extraer datos del JSON
        SELECT 
            @id_orden = JSON_VALUE(@data, '$.id_orden'),
            @fecha_entrega = JSON_VALUE(@data, '$.fecha_entrega'),
            @total_orden = JSON_VALUE(@data, '$.total_orden'),
            @activo = JSON_VALUE(@data, '$.activo'),
            @id_estado = JSON_VALUE(@data, '$.id_estado'),
            @id_operador = JSON_VALUE(@data, '$.id_operador'),
            @id_cliente = JSON_VALUE(@data, '$.id_cliente');

        -- Validar que @id_orden est� presente en el JSON
        IF @id_orden IS NULL
        BEGIN
            SET @code = -1;
            SET @message = 'El campo "id_orden" es obligatorio.';
            RETURN;
        END

        -- Verificar que la orden existe
        IF NOT EXISTS (SELECT 1 FROM Orden WHERE id_orden = @id_orden)
        BEGIN
            SET @code = -1;
            SET @message = 'La orden especificada no existe.';
            RETURN;
        END;

        -- Actualizar la orden
        UPDATE Orden
        SET 
            fecha_entrega = COALESCE(@fecha_entrega, fecha_entrega),
            total_orden = COALESCE(@total_orden, total_orden),
            activo = COALESCE(@activo, activo),
            id_estado = COALESCE(@id_estado, id_estado),
            id_operador = COALESCE(@id_operador, id_operador),
            id_cliente = COALESCE(@id_cliente, id_cliente)
        WHERE id_orden = @id_orden;

        -- Establecer c�digo y mensaje de �xito
        SET @code = 0;
        SET @message = 'La orden se actualiz� correctamente.';
    END TRY
    BEGIN CATCH
        -- Manejar errores
        SET @code = -1;
        SET @message = ERROR_MESSAGE();
    END CATCH
END;
GO




--Consultar por id
IF OBJECT_ID('BuscarOrden', 'P') IS NOT NULL
    DROP PROCEDURE BuscarOrden;
GO

CREATE PROCEDURE BuscarOrden
    @id_orden Int
AS
BEGIN
    SELECT 
        *
    FROM 
        Orden
	INNER JOIN OrdenDetalles 
	ON
	OrdenDetalles.id_orden = Orden.id_orden
	WHERE Orden.id_orden = @id_orden;
END;
GO

--Listar todos los datos de la tabla 
IF OBJECT_ID('ListarOrdenes', 'P') IS NOT NULL
	DROP PROCEDURE ListarOrdenes;
GO

CREATE PROCEDURE ListarOrdenes
AS
BEGIN
    SELECT 
    Orden.id_orden AS orden_id,
    Orden.fecha_creacion AS fecha_creacion,
    Orden.fecha_entrega AS fecha_entrega,
    Orden.total_orden AS total_orden,
    Orden.activo AS activo,
    Orden.id_estado AS id_estado,
    Orden.id_operador AS id_operador,
    Orden.id_cliente AS id_cliente,
    STRING_AGG(
        JSON_QUERY(
            CONCAT(
                '{"id_detalle": ', OrdenDetalles.id_orden_detalle,
                ',"producto": ', OrdenDetalles.id_producto,
                ',"cantidad": ', OrdenDetalles.cantidad,
                ',"precio": ', OrdenDetalles.precio,
                ',"subtotal": ', OrdenDetalles.sub_total,
                ',"activo": ', OrdenDetalles.activo,
                ' }'
            )
        ), 
        ', '
    ) AS productos_detalle
FROM 
    Orden
INNER JOIN OrdenDetalles 
    ON OrdenDetalles.id_orden = Orden.id_orden
GROUP BY 
    Orden.id_orden, 
    Orden.fecha_creacion, 
    Orden.fecha_entrega, 
    Orden.total_orden, 
    Orden.activo,
    Orden.id_estado,
    Orden.id_operador,
    Orden.id_cliente;
END;
GO































