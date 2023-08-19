use [sunrise-silk];
GO


CREATE OR ALTER PROC USP_GetNextColumnId(
	@tablename SYSNAME,
	@columnname SYSNAME
)
AS
	DECLARE @IntVariable INT = 0;  
	DECLARE @SQLString NVARCHAR(MAX);  
	DECLARE @ParmDefinition NVARCHAR(500);
  
	SET @SQLString = 
		N'with cte as (select ' + @columnname + ' id, lead(' + @columnname + ') over (order by ' + @columnname + ') nextid from ' + @tablename + ')
		select @gapstartOUT = MIN(id) from cte
		where id < nextid - 1';
	SET @ParmDefinition = N'@gapstartOUT INTEGER OUTPUT';  
  
	EXECUTE sp_executesql @SQLString, @ParmDefinition, @gapstartOUT = @IntVariable OUTPUT;  

	IF (@IntVariable IS NULL)
	BEGIN
		DECLARE @SQL NVARCHAR(MAX);
		SET @SQL = N'select @IdOUT = count(' + @columnname + ') from ' + @tablename + '';
		SET @ParmDefinition = N'@IdOUT INTEGER OUTPUT';
		EXEC sp_executesql @SQL, @ParmDefinition, @IdOUT = @IntVariable OUTPUT;

		RETURN @IntVariable + 1;
	END

	RETURN @IntVariable + 1; 
GO




CREATE OR ALTER PROCEDURE usp_InsertJacket(
    @p_Price FLOAT,
    @p_ImageFront VARCHAR(255),
    @p_Name VARCHAR(100),
    @p_Description TEXT,
    @p_Discount TINYINT,
    -- IN p_Fabric INT,
    @p_FabricName VARCHAR(100),
    @p_color VARCHAR(100),
    @p_Type VARCHAR(20),
    
    -- To Jacket Component
    @p_Style VARCHAR(100),
    @p_Fit VARCHAR(100),
    @p_Lapel VARCHAR(100),
    @p_SleeveButton VARCHAR(100),
    @p_Pocket VARCHAR(100),
    @p_BackStyle VARCHAR(100),
    @p_BreastPocket VARCHAR(100),
    @p_ImageBack VARCHAR(255)

)
AS
BEGIN
    -- Declare variable to hold the generated ProductID
    DECLARE @newProductID INT;
	DECLARE @aFabricID INT;
    

    -- Declare variable to hold the ID of each jacket component
    DECLARE @jStyle INT;
    DECLARE @jFit INT;
    DECLARE @jLapel INT;
    DECLARE @jSleeveButton INT;
    DECLARE @jPocket INT;
    DECLARE @jBackStyle INT;
    DECLARE @jBreastPocket INT;

     -- Get the generated ProductID
    EXEC @newProductID = USP_GetNextColumnId 'Product', 'ProductID';

    -- Insert into the Product table
	select @aFabricID = FabricId from Fabric where FabricName = @p_FabricName;
    INSERT INTO Product (ProductID, Price, ImageFront, Name, Description, Discount, Fabric, FabricName, color, Type, ImageBack)
    VALUES (@newProductID, @p_Price, @p_ImageFront, @p_Name, @p_Description, @p_Discount, @aFabricID, @p_FabricName, @p_color, @p_Type, @p_ImageBack);

    -- Retrieve IDs for each jacket component based on their names
    SELECT @jStyle = ID FROM JacketStyle WHERE Name = @p_Style;
    SELECT @jFit = ID FROM JacketFit WHERE Name = @p_Fit;
    SELECT @jLapel = ID FROM JacketLapel WHERE Name = @p_Lapel;
    SELECT @jSleeveButton = ID FROM JacketSleeveButton WHERE Name = @p_SleeveButton;
    SELECT @jPocket = ID FROM JacketPocket WHERE Name = @p_Pocket;
    SELECT @jBackStyle = ID FROM JacketBackStyle WHERE Name = @p_BackStyle;
    SELECT @jBreastPocket = ID FROM JacketBreastPocket WHERE Name = @p_BreastPocket;

    -- Insert into the Jacket table
    INSERT INTO Jacket (JacketID, Style, Fit, Lapel, SleeveButton, BackStyle, BreastPocket, Pocket)
    VALUES (@newProductID, @jStyle, @jFit, @jLapel, @jSleeveButton, @jBackStyle, @jBreastPocket, @jPocket);
END -- //
GO
-- DELIMITER ;



-- DELIMITER -- //
GO
CREATE OR ALTER PROCEDURE usp_InsertVest(
    @p_Price FLOAT,
    @p_ImageFront VARCHAR(255),
    @p_Name VARCHAR(100),
    @p_Description TEXT,
    @p_Discount TINYINT,
    -- IN p_Fabric INT,
    @p_FabricName VARCHAR(100),
    @p_color VARCHAR(100),
    @p_Type VARCHAR(20),
    -- To Vest Components
    @p_Style VARCHAR(100),
    @p_vType VARCHAR(100),
    @p_Lapel VARCHAR(100),
    @p_Edge VARCHAR(100),
    @p_BreastPocket VARCHAR(100),
    @p_FrontPocket VARCHAR(100),
    @p_ImageBack VARCHAR(255)
)
AS
BEGIN
    -- Declare variable to hold the generated ProductID
     DECLARE @newProductID INT;
     DECLARE @aFabricID INT;
    -- Declare variable to hold the ID of each vest component
     DECLARE @vStyle INT;
     DECLARE @vType INT;
     DECLARE @vLapel INT;
     DECLARE @vEdge INT;
     DECLARE @vBreastPocket INT;
     DECLARE @vFrontPocket INT;

	 -- Get the generated ProductID
    EXEC @newProductID = USP_GetNextColumnId 'Product', 'ProductID';

    -- Insert into the Product table
	select @aFabricID = FabricId from Fabric where FabricName = @p_FabricName;
    INSERT INTO Product (ProductID, Price, ImageFront, Name, Description, Discount, Fabric, FabricName, color, Type, ImageBack)
    VALUES (@newProductID, @p_Price, @p_ImageFront, @p_Name, @p_Description, @p_Discount, @aFabricID, @p_FabricName, @p_color, @p_Type, @p_ImageBack);


    -- Retrieve IDs for each vest component based on their names
    SELECT @vStyle = ID FROM VestStyle WHERE Name = @p_Style;
    SELECT @vType = ID  FROM VestType WHERE Name = @p_vType;
    SELECT @vLapel = ID  FROM VestLapel WHERE Name = @p_Lapel;
    SELECT @vEdge = ID  FROM VestEdge WHERE Name = @p_Edge;
    SELECT @vBreastPocket = ID  FROM VestBreastPocket WHERE Name = @p_BreastPocket;
    SELECT @vFrontPocket = ID  FROM VestFrontPocket WHERE Name = @p_FrontPocket;

    -- Insert into the Vest table
    INSERT INTO Vest (VestID, Style, Type, Lapel, Edge, BreastPocket, FrontPocket)
    VALUES (@newProductID, @vStyle, @vType, @vLapel, @vEdge, @vBreastPocket, @vFrontPocket);
END
GO

-- insert pants

-- DELIMITER -- //
GO
CREATE OR ALTER PROCEDURE usp_InsertPants(
    @p_Price FLOAT,
    @p_ImageFront VARCHAR(255),
    @p_Name VARCHAR(100),
    @p_Description TEXT,
    @p_Discount TINYINT,
    -- IN p_Fabric INT,
    @p_FabricName VARCHAR(100),
    @p_color VARCHAR(100),
    @p_Type VARCHAR(20),
    
    -- To Jacket Component
    @p_Pocket VARCHAR(100),
    @p_Fit VARCHAR(100),
    @p_Cuff VARCHAR(100),
    @p_Fastening VARCHAR(100),
    @p_Pleats VARCHAR(100),
    @p_ImageBack VARCHAR(255)
)
AS
BEGIN
    -- Declare variable to hold the generated ProductID
    DECLARE @newProductID INT;
	DECLARE @aFabricID INT;
    

    -- Declare variable to hold the ID of each jacket component
    DECLARE @pPocket INT;
    DECLARE @pFit INT;
    DECLARE @pCuff INT;
    DECLARE @pFastening INT;
    DECLARE @pPleats INT;

    -- Get the generated ProductID
	EXEC @newProductID = USP_GetNextColumnId 'Product', 'ProductID';

    -- Insert into the Product table
    select @aFabricID = FabricId from Fabric where FabricName = @p_FabricName;
    INSERT INTO Product (ProductID, Price, ImageFront, Name, Description, Discount, Fabric, FabricName, color, Type, ImageBack)
    VALUES (@newProductID, @p_Price, @p_ImageFront, @p_Name, @p_Description, @p_Discount, @aFabricID, @p_FabricName, @p_color, @p_Type, @p_ImageBack);

    -- Retrieve IDs for each jacket component based on their names
    SELECT @pCuff = ID FROM PantsCuff WHERE Name = @p_Cuff;
    SELECT @pFit = ID FROM PantsFit WHERE Name = @p_Fit;
    SELECT @pPleats = ID FROM PantsPleats WHERE Name = @p_Pleats;
    SELECT @pFastening = ID FROM PantsFastening WHERE Name = @p_Fastening;
    SELECT @pPocket = ID FROM PantsPocket WHERE Name = @p_Pocket;

    -- Insert into the Jacket table
    INSERT INTO Pants (PantsID, Pocket, Fit, Cuff, Pleats, Fastening)
    VALUES (@newProductID, @pPocket, @pFit, @pCuff, @pPleats, @pFastening);
END
GO


-- Full text search
GO
CREATE OR ALTER PROCEDURE usp_SearchProduct(@searchTerm NVARCHAR(255))
AS
BEGIN
    SELECT *
    FROM product
    WHERE Name like (N'%' + @searchTerm + N'%') 
	OR description like (N'%' + @searchTerm + N'%');
END
GO

-- Authen and Author
CREATE OR ALTER PROC USP_GetAccountDetailByEmail
	@Email NVARCHAR(200)
AS
	SELECT * FROM Account
	WHERE Email = @Email
GO

CREATE OR ALTER PROC USP_GetAccountById
	@Id NVARCHAR(200)
AS
	SELECT * FROM Account
	WHERE AccountID = @Id
GO


GO
CREATE OR ALTER PROCEDURE USP_AddToCart (
	@Customer INT,
	@Product INT,
	@NumberOfProduct INT
) AS
BEGIN
    
	BEGIN TRAN
	BEGIN TRY
		DECLARE @Id INT;
		SELECT @Id = ID FROM Cart WHERE Customer = @Customer AND Product = @Product;

		IF (@Id IS NOT NULL)
		BEGIN
			UPDATE Cart SET NumberOfProduct = NumberOfProduct + @NumberOfProduct
			WHERE ID = @Id
		END
		ELSE
		BEGIN
			DECLARE @newProductID INT;
			EXEC @newProductID = USP_GetNextColumnId 'Cart', 'ID';

			INSERT INTO Cart (ID, Customer, Product, NumberOfProduct) VALUES
				(@newProductID, @Customer, @Product, @NumberOfProduct)
		END

	END TRY

	BEGIN CATCH
		PRINT N'Lỗi thêm sản phẩm vào giỏ hàng.'
		ROLLBACK;
		RETURN -1;
	END CATCH

	COMMIT;
	RETURN 0;
END
GO

GO
CREATE OR ALTER PROCEDURE USP_GetCart (
	@AccountId INT
) AS
BEGIN
    SELECT CA.*, prd.* FROM (SELECT * FROM Cart WHERE Customer = @AccountId) CA
	JOIN Product prd ON CA.Product = prd.ProductID;
END
GO

GO
CREATE OR ALTER PROCEDURE USP_DeleteProductInCart (
	@AccountId INT,
	@ProductId INT
) AS
BEGIN
    DELETE FROM Cart WHERE Customer = @AccountId and Product = @ProductId
END
GO

GO
CREATE OR ALTER PROCEDURE USP_ClearCart (
	@Customer INT) AS
BEGIN
	BEGIN TRAN

	BEGIN TRY

		DELETE FROM Cart WHERE Customer = @Customer;

	END TRY

	BEGIN CATCH
		PRINT N'Lỗi clear giỏ hàng.'
		ROLLBACK;
		RETURN -1;
	END CATCH

	COMMIT;
	RETURN 0;
END
GO

GO
CREATE OR ALTER PROCEDURE USP_ChangeCartItemNum (
	@Customer INT,
	@Product INT,
	@NumChange INT) AS
BEGIN
	BEGIN TRAN

	BEGIN TRY
		DECLARE @NewNum INT;
		SELECT @NewNum = NumberOfProduct + @NumChange FROM Cart WHERE Customer = @Customer AND Product = @Product;
		IF (@NewNum IS NULL) 
		BEGIN
			PRINT N'Lỗi không tìm thấy sản phẩm giỏ hàng.'
			ROLLBACK;
			RETURN -1;
		END

		IF (@NewNum <= 0)
			DELETE FROM Cart WHERE Customer = @Customer AND Product = @Product;
		ELSE
			UPDATE Cart SET
				NumberOfProduct = @NewNum
			WHERE Customer = @Customer AND Product = @Product;

	END TRY

	BEGIN CATCH
		PRINT N'Lỗi thay đổi số lượng sản phẩm giỏ hàng.'
		ROLLBACK;
		RETURN -1;
	END CATCH

	COMMIT;
	RETURN 0;
END
GO


GO
CREATE OR ALTER PROCEDURE USP_GetOrderById (
	@OrderId INT) AS
BEGIN
	SELECT 
		od.OrderId,
		od.customer as AccountId,
		od.Address,
		od.TimeOrder,
		od.TimeDone,
		od.Status,
		od.TotalPrice,
		od.PaymentMethod
	FROM Orders od WHERE od.OrderId = @OrderId;
END
GO

GO
CREATE OR ALTER PROCEDURE USP_GetOrderDetailById (
	@OrderId INT) AS
BEGIN
	SELECT 
		od.Orders as OrderId,
		od.Product as ProductId,
		od.Quantity,
		od.Price
	FROM OrderDetail od WHERE od.Orders = @OrderId;
END
GO

-- Create or Alter Procedures


CREATE OR ALTER PROCEDURE USP_CreateOrder
    @AccountId INT,
    @PaymentMethod NVARCHAR(100),
    @TimeOrder DATE,
    @TimeDone DATE,
    @Status NVARCHAR(50),
    @Address NVARCHAR(300)
AS
BEGIN
	DECLARE @OrderId INT;

	---- Check if PaymentMethod exists
	--IF (@PaymentMethod NOT IN ('MONEY', 'CARD'))
	--BEGIN
	--	RAISERROR(N'Phương thức thanh toán không hợp lệ.', 11, 1)
	--	RETURN -2;
	--END

	BEGIN TRAN

	BEGIN TRY
		EXEC @OrderId = USP_GetNextColumnId 'Orders', 'OrderId';

		INSERT INTO Orders (OrderId, customer, PaymentMethod, TimeOrder, TimeDone, Status, Address, TotalPrice)
		VALUES (@OrderId, @AccountId, @PaymentMethod, @TimeOrder, @TimeDone, @Status, @Address, 0);

	END TRY

	BEGIN CATCH
		RAISERROR(N'Không thể tạo đơn đặt hàng.', 11, 1)
		ROLLBACK;
		RETURN -1;
	END CATCH

	COMMIT;
	RETURN @OrderId;
END
GO

CREATE OR ALTER PROCEDURE USP_AddProdToOrder
    @OrderId INT,
    @ProductId INT,
    @Quantity INT
AS
BEGIN
	DECLARE @Price FLOAT;
	SELECT @Price = prd.Price FROM Product prd WHERE prd.ProductID = @ProductId;
	IF (@Price IS NULL)
	BEGIN
		RAISERROR(N'Sản phẩm không hợp lệ.', 11, 1)
        RETURN -2;
	END

	BEGIN TRAN

	BEGIN TRY
		-- Update totalPrice and orderDetail.Price based on Product
		INSERT INTO OrderDetail(Orders, Product, Quantity, Price)
		VALUES (@OrderId, @ProductId, @Quantity, @Price * @Quantity);

		-- Update totalPrice
		UPDATE Orders SET TotalPrice = TotalPrice + (@Price * @Quantity)
		WHERE OrderId = @OrderId;
	END TRY

	BEGIN CATCH
		RAISERROR(N'Không thể thêm sản phẩm vào đơn.', 11, 1)
		ROLLBACK;
		RETURN -1;
	END CATCH

	COMMIT;
	RETURN 0;
END
GO

GO
CREATE OR ALTER PROCEDURE USP_UpdateOrderUser
    @OrderId INT,
    @AccountId INT,
    @Address NVARCHAR(150),
    @PaymentMethod NVARCHAR(100)
AS
BEGIN
    ---- Check if PaymentMethod exists
	--IF (@PaymentMethod NOT IN ('MONEY', 'CARD'))
	--BEGIN
	--	RAISERROR(N'Phương thức thanh toán không hợp lệ.', 11, 1)
	--	RETURN -2;
	--END

	IF NOT EXISTS (SELECT OrderId FROM Orders WHERE OrderId = @OrderId AND Customer = @AccountId)
	BEGIN
		RAISERROR(N'Tài khoản không sỡ hữu đơn này.', 11, 1)
        RETURN -2;
	END
	
	BEGIN TRAN

	BEGIN TRY
		-- Update Orders table
		UPDATE Orders
		SET customer = @AccountId,
			PaymentMethod = @PaymentMethod,
			Address = @Address
		WHERE OrderId = @OrderId;

		-- Delete existing OrderDetail records for the order
		DELETE FROM OrderDetail WHERE Orders = @OrderId;
	END TRY

	BEGIN CATCH
		RAISERROR(N'Không thể cập nhật đơn.', 11, 1)
		ROLLBACK;
		RETURN -1;
	END CATCH

	COMMIT;
	RETURN @OrderId;
END
GO

CREATE OR ALTER PROCEDURE DeleteOrder
	@AccountId INT,
    @OrderId INT
AS
BEGIN
	IF NOT EXISTS (SELECT OrderId FROM Orders WHERE OrderId = @OrderId AND Customer = @AccountId)
	BEGIN
		RAISERROR(N'Tài khoản không sỡ hữu đơn này.', 11, 1)
        RETURN -2;
	END

	BEGIN TRAN

	BEGIN TRY
		DELETE FROM Orders WHERE OrderId = @OrderId;
	END TRY

	BEGIN CATCH
		RAISERROR(N'Không xóa đơn.', 11, 1)
		ROLLBACK;
		RETURN -1;
	END CATCH

	COMMIT;
	RETURN 0;
END
GO
