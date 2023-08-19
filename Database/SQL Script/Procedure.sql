use TailorManagement;
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




-- for insert


CREATE OR ALTER PROCEDURE usp_InsertJacket(
    @p_Price FLOAT,
    @p_Image VARCHAR(255),
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
    @p_ImageFront VARCHAR(255),
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
    INSERT INTO Product (ProductID, Price, Image, Name, Description, Discount, Fabric, FabricName, color, Type,ImageFront, ImageBack)
    VALUES (@newProductID, @p_Price, @p_Image, @p_Name, @p_Description, @p_Discount, @aFabricID, @p_FabricName, @p_color, @p_Type,@p_ImageFront, @p_ImageBack);

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
    @p_Image VARCHAR(255),
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
    @p_ImageFront VARCHAR(255),
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
    INSERT INTO Product (ProductID, Price, Image, Name, Description, Discount, Fabric, FabricName, color, Type, ImageFront, ImageBack)
    VALUES (@newProductID, @p_Price, @p_Image, @p_Name, @p_Description, @p_Discount, @aFabricID, @p_FabricName, @p_color, @p_Type,@p_ImageFront, @p_ImageBack);


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
    @p_Image VARCHAR(255),
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
    @p_ImageFront VARCHAR(255),
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
    INSERT INTO Product (ProductID, Price, Image, Name, Description, Discount, Fabric, FabricName, color, Type, ImageFront, ImageBack)
    VALUES (@newProductID, @p_Price, @p_Image, @p_Name, @p_Description, @p_Discount, @aFabricID, @p_FabricName, @p_color, @p_Type,@p_ImageFront, @p_ImageBack);

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

CREATE OR ALTER PROCEDURE usp_InsertTies(
    @p_Price FLOAT,
    @p_Image VARCHAR(255),
    @p_Name VARCHAR(100),
    @p_Description TEXT,
    @p_Discount TINYINT,
    -- IN p_Fabric INT;
    @p_FabricName VARCHAR(100),
    @p_color VARCHAR(100),
    @p_Type VARCHAR(20),
    
    -- Tie Component
    @p_Size DECIMAL(10, 2),
    @p_Style NVARCHAR(100),
    -- for image back
    @p_ImageFront VARCHAR(255),
    @p_ImageBack VARCHAR(255)

)
AS
BEGIN
    -- Declare variable to hold the generated ProductID
    DECLARE @newProductID INT;
	DECLARE @aFabricID INT;

    -- Get the generated ProductID
	EXEC @newProductID = USP_GetNextColumnId 'Product', 'ProductID';

    -- Insert into the Product table
    SELECT @aFabricID = FabricId FROM Fabric WHERE FabricName = @p_FabricName;
    INSERT INTO Product (ProductID, Price, Image, Name, Description, Discount, Fabric, FabricName, color, Type, ImageFront, ImageBack)
    VALUES (@newProductID, @p_Price, @p_Image, @p_Name, @p_Description, @p_Discount, @aFabricID, @p_FabricName, @p_color, @p_Type,@p_ImageFront, @p_ImageBack);

    -- Insert into the Ties table
    INSERT INTO Ties (TiesID, size, style)
    VALUES (@newProductID, @p_Size, @p_Style);
END
GO

-- for update

CREATE OR ALTER PROC USP_UpdateJacket(
    @jacketId INT,

    -- Jacket Component
    @p_Style VARCHAR(100),
    @p_Fit VARCHAR(100),
    @p_Lapel VARCHAR(100),
    @p_SleeveButton VARCHAR(100),
    @p_BackStyle VARCHAR(100),
    @p_BreastPocket VARCHAR(100),
    @p_Pocket VARCHAR(100)
)
AS
BEGIN
    DECLARE @jStyle INT;
    DECLARE @jFit INT;
    DECLARE @jLapel INT;
    DECLARE @jSleeveButton INT;
    DECLARE @jPocket INT;
    DECLARE @jBackStyle INT;
    DECLARE @jBreastPocket INT;


    -- Retrieve IDs for each jacket component based on their names
    SELECT @jStyle = ISNULL((SELECT ID FROM JacketStyle WHERE Name = @p_Style), 1);
    SELECT @jFit = ISNULL((SELECT ID FROM JacketFit WHERE Name = @p_Fit), 1);
    SELECT @jLapel = ISNULL((SELECT ID FROM JacketLapel WHERE Name = @p_Lapel), 1);
    SELECT @jSleeveButton = ISNULL((SELECT ID FROM JacketSleeveButton WHERE Name = @p_SleeveButton), 1);
    SELECT @jPocket = ISNULL((SELECT ID FROM JacketPocket WHERE Name = @p_Pocket), 1);
    SELECT @jBackStyle = ISNULL((SELECT ID FROM JacketBackStyle WHERE Name = @p_BackStyle), 1);
    SELECT @jBreastPocket = ISNULL((SELECT ID FROM JacketBreastPocket WHERE Name = @p_BreastPocket), 1);


    -- Update jacket
    UPDATE Jacket
    SET Style = @jStyle, Fit = @jFit, Lapel = @jLapel,
        SleeveButton = @jSleeveButton, Pocket = @jPocket,
        BackStyle = @jBackStyle, BreastPocket = @jBreastPocket
    WHERE JacketID = @jacketId;

    
    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_UpdateJacket', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;
END;
GO

--dbo.USP_GetDetailJacketByID
CREATE OR ALTER PROC USP_UpdateVest(
    @vestId INT,

    -- Vest Component
    @p_Style VARCHAR(100),
    @p_vType VARCHAR(100),
    @p_Lapel VARCHAR(100),
    @p_Edge VARCHAR(100),
    @p_BreastPocket VARCHAR(100),
    @p_FrontPocket VARCHAR(100)
)
AS
BEGIN
    DECLARE @vStyle INT;
    DECLARE @vType INT;
    DECLARE @vLapel INT;
    DECLARE @vEdge INT;
    DECLARE @vBreastPocket INT;
    DECLARE @vFrontPocket INT;

    -- Retrieve IDs for each vest component based on their names
    SELECT @vStyle = ISNULL((SELECT ID FROM VestStyle WHERE Name = @p_Style), 1);
    SELECT @vType = ISNULL((SELECT ID FROM VestType WHERE Name = @p_vType), 1);
    SELECT @vLapel = ISNULL((SELECT ID FROM VestLapel WHERE Name = @p_Lapel), 1);
    SELECT @vEdge = ISNULL((SELECT ID FROM VestEdge WHERE Name = @p_Edge), 1);
    SELECT @vBreastPocket = ISNULL((SELECT ID FROM VestBreastPocket WHERE Name = @p_BreastPocket), 1);
    SELECT @vFrontPocket = ISNULL((SELECT ID FROM VestFrontPocket WHERE Name = @p_FrontPocket), 1);

    -- Update vest
    UPDATE Vest
    SET Style = @vStyle,
        Type = @vType,
        Lapel = @vLapel,
        Edge = @vEdge,
        BreastPocket = @vBreastPocket,
        FrontPocket = @vFrontPocket
    WHERE vestId = @vestId


    
    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_UpdateVest', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;

    return 0;
END;
GO

-- TO update
CREATE OR ALTER PROC USP_UpdatePants(
    @pantsId INT,

    -- Pants Component
    @p_Pocket VARCHAR(100),
    @p_Fit VARCHAR(100),
    @p_Cuff VARCHAR(100),
    @p_Fastening VARCHAR(100),
    @p_Pleats VARCHAR(100)
)
AS
BEGIN
    DECLARE @pPocket INT;
    DECLARE @pFit INT;
    DECLARE @pCuff INT;
    DECLARE @pFastening INT;
    DECLARE @pPleats INT;

    -- Retrieve IDs for each pants component based on their names
    SELECT @pCuff = ISNULL((SELECT ID FROM PantsCuff WHERE Name = @p_Cuff), 1);
    SELECT @pFit = ISNULL((SELECT ID FROM PantsFit WHERE Name = @p_Fit), 1);
    SELECT @pPleats = ISNULL((SELECT ID FROM PantsPleats WHERE Name = @p_Pleats), 1);
    SELECT @pFastening = ISNULL((SELECT ID FROM PantsFastening WHERE Name = @p_Fastening), 1);
    SELECT @pPocket = ISNULL((SELECT ID FROM PantsPocket WHERE Name = @p_Pocket), 1);

    -- Update Pants
    UPDATE Pants
    SET Cuff = @pCuff,
        Fit = @pFit,
        Pleats = @pPleats,
        Fastening = @pFastening,
        Pocket = @pPocket
    WHERE pantsId = @pantsId


    
    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_UpdatePants', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;

        return 0;

END;
GO


-- for get detail


CREATE OR ALTER PROC USP_GetDetailJacketByID(
    @jacketId INT
)
AS
BEGIN
    DECLARE @jStyle INT;
    DECLARE @jFit INT;
    DECLARE @jLapel INT;
    DECLARE @jSleeveButton INT;
    DECLARE @jBackStyle INT;
    DECLARE @jBreastPocket INT;
    DECLARE @jPocket INT;

    SELECT  @jStyle = style, @jFit = fit, @jLapel = lapel, @jSleeveButton = sleeveButton,
        @jBackStyle = backStyle, @jBreastPocket = breastPocket, @jPocket = pocket
    FROM Jacket
    WHERE jacketId = @jacketId;
    
     -- for out put
    DECLARE @jStyleOut NVARCHAR(100);
    DECLARE @jFitOut NVARCHAR(100);
    DECLARE @jLapelOut NVARCHAR(100);
    DECLARE @jSleeveButtonOut NVARCHAR(100);
    DECLARE @jBackStyleOut NVARCHAR(100);
    DECLARE @jBreastPocketOut NVARCHAR(100);
    DECLARE @jPocketOut NVARCHAR(100);

    -- Retrieve IDs for each jacket component based on their names
    SET @jStyleOut = (SELECT top 1 Name FROM JacketStyle WHERE ID = @jStyle);
    SET @jFitOut = (SELECT top 1 Name FROM JacketFit WHERE ID = @jFit);
    SET @jLapelOut = (SELECT top 1 Name FROM JacketLapel WHERE ID = @jLapel);
    SET @jSleeveButtonOut = (SELECT top 1 Name FROM JacketSleeveButton WHERE ID = @jSleeveButton);
    SET @jPocketOut = (SELECT top 1 Name FROM JacketPocket WHERE ID = @jPocket);
    SET @jBackStyleOut = (SELECT top 1 Name FROM JacketBackStyle WHERE ID = @jBackStyle);
    SET @jBreastPocketOut = (SELECT top 1 Name FROM JacketBreastPocket WHERE ID = @jBreastPocket);

    -- the output
    SELECT @jStyleOut AS Style, @jFitOut AS Fit, @jLapelOut AS Lapel, 
        @jSleeveButtonOut AS SleeveButton, @jPocketOut AS Pocket,
            @jBackStyleOut AS BackStyle, @jBreastPocketOut AS BreastPocket;
    
    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_GetDetailJacketByID', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;

        return 0;

END;
GO

--dbo.USP_GetDetailPantsByID
CREATE OR ALTER PROC USP_GetDetailPantsByID(
    @pantsId INT
)
AS
BEGIN

    DECLARE @pPocket INT;
    DECLARE @pFit INT;
    DECLARE @pCuff INT;
    DECLARE @pFastening INT;
    DECLARE @pPleats INT;
    --
    -- Retrieve and assign values for pants components
    SELECT @pPocket = pocket, @pFit = fit, @pCuff = cuff,
        @pFastening = fastening, @pPleats = pleats
    FROM Pants
    WHERE PantsID = @pantsId;


    -- for output
    DECLARE @pPocketOut NVARCHAR(100);
    DECLARE @pFitOut NVARCHAR(100);
    DECLARE @pCuffOut NVARCHAR(100);
    DECLARE @pFasteningOut NVARCHAR(100);
    DECLARE @pPleatsOut NVARCHAR(100);

    -- Retrieve names for each pants component based on their IDs
    SET @pPocketOut = (SELECT top 1 Name FROM PantsPocket WHERE ID = @pPocket);
    SET @pFitOut = (SELECT top 1 Name FROM PantsFit WHERE ID = @pFit);
    SET @pCuffOut = (SELECT top 1 Name FROM PantsCuff WHERE ID = @pCuff);
    SET @pFasteningOut = (SELECT top 1 Name FROM PantsFastening WHERE ID = @pFastening);
    SET @pPleatsOut = (SELECT top 1 Name FROM PantsPleats WHERE ID = @pPleats);

    -- the output
    SELECT @pPocketOut AS Pocket, @pFitOut AS Fit, @pCuffOut AS Cuff, 
        @pFasteningOut AS Fastening, @pPleatsOut AS Pleats;

    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_GetDetailPantsByID', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;
END;
GO

--dbo.USP_GetDetailVestByID
CREATE OR ALTER PROC USP_GetDetailVestByID(
    @vestId INT 
)
AS
BEGIN


    DECLARE @vStyle INT;
    DECLARE @vType INT;
    DECLARE @vLapel INT;
    DECLARE @vEdge INT;
    DECLARE @vBreastPocket INT;
    DECLARE @vFrontPocket INT;
    ---
    SELECT @vStyle = style, @vType = type, @vLapel = lapel,
        @vEdge = edge, @vBreastPocket = breastPocket, @vFrontPocket = frontPocket
    FROM Vest
    WHERE vestId = @vestId;

    -- for output
    DECLARE @vStyleOut NVARCHAR(100);
    DECLARE @vTypeOut NVARCHAR(100);
    DECLARE @vLapelOut NVARCHAR(100);
    DECLARE @vEdgeOut NVARCHAR(100);
    DECLARE @vBreastPocketOut NVARCHAR(100);
    DECLARE @vFrontPocketOut NVARCHAR(100);
    -- Retrieve names for each vest component based on their IDs
    SET @vStyleOut = (SELECT top 1 Name FROM VestStyle WHERE ID = @vStyle);
    SET @vTypeOut = (SELECT top 1 Name FROM VestType WHERE ID = @vType);
    SET @vLapelOut = (SELECT top 1 Name FROM VestLapel WHERE ID = @vLapel);
    SET @vEdgeOut = (SELECT top 1 Name FROM VestEdge WHERE ID = @vEdge);
    SET @vBreastPocketOut = (SELECT top 1 Name FROM VestBreastPocket WHERE ID = @vBreastPocket);
    SET @vFrontPocketOut = (SELECT top 1 Name FROM VestFrontPocket WHERE ID = @vFrontPocket);

     -- the output
    SELECT @vStyleOut AS Style, @vTypeOut AS Type, @vLapelOut AS Lapel, 
        @vEdgeOut AS Edge, @vFrontPocketOut AS FrontPocket, @vBreastPocketOut AS BreastPocket;

    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_GetDetailVestByID', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;
END;
GO


--- Get image

--dbo.USP_GetDetailJacketByID
CREATE OR ALTER PROC USP_GetCustomJacketImage(
    -- Fabric type
    @p_Fabric VARCHAR(100),
    -- Jacket Component
    @p_Style VARCHAR(100),
    @p_Fit VARCHAR(100),
    @p_Lapel VARCHAR(100),
    @p_SleeveButton VARCHAR(100),
    @p_BackStyle VARCHAR(100),
    @p_BreastPocket VARCHAR(100),
    @p_Pocket VARCHAR(100)
)
AS
BEGIN
    DECLARE @jStyle INT;
    DECLARE @jFit INT;
    DECLARE @jLapel INT;
    DECLARE @jSleeveButton INT;
    DECLARE @jPocket INT;
    DECLARE @jBackStyle INT;
    DECLARE @jBreastPocket INT;


    -- Retrieve IDs for each jacket component based on their names
    SELECT @jStyle = ISNULL((SELECT ID FROM JacketStyle WHERE Name = @p_Style), 1);
    SELECT @jFit = ISNULL((SELECT ID FROM JacketFit WHERE Name = @p_Fit), 1);
    SELECT @jLapel = ISNULL((SELECT ID FROM JacketLapel WHERE Name = @p_Lapel), 1);
    SELECT @jSleeveButton = ISNULL((SELECT ID FROM JacketSleeveButton WHERE Name = @p_SleeveButton), 1);
    SELECT @jPocket = ISNULL((SELECT ID FROM JacketPocket WHERE Name = @p_Pocket), 1);
    SELECT @jBackStyle = ISNULL((SELECT ID FROM JacketBackStyle WHERE Name = @p_BackStyle), 1);
    SELECT @jBreastPocket = ISNULL((SELECT ID FROM JacketBreastPocket WHERE Name = @p_BreastPocket), 1);



    -- Retrive Image
    select ProductID, ImageFront as Front, ImageBack as Back
     from Product where FabricName = @p_Fabric and ProductID in (
            SELECT JacketId FROM Jacket 
            WHERE Style = @jStyle AND Fit = @jFit AND Lapel = @jLapel AND SleeveButton = @jSleeveButton 
                AND Pocket = @jPocket AND BackStyle = @jBackStyle AND BreastPocket = @jBreastPocket
        );

    
    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_GetCustomJacket', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;
END;
GO

CREATE OR ALTER PROC USP_GetCustomVestImage(
    -- Fabric type
    @p_Fabric VARCHAR(100),
    -- Jacket Component
    @p_Style VARCHAR(100),
    @p_vType VARCHAR(100),
    @p_Lapel VARCHAR(100),
    @p_Edge VARCHAR(100),
    @p_BreastPocket VARCHAR(100),
    @p_FrontPocket VARCHAR(100)
)
AS
BEGIN
    DECLARE @vStyle INT;
    DECLARE @vType INT;
    DECLARE @vLapel INT;
    DECLARE @vEdge INT;
    DECLARE @vBreastPocket INT;
    DECLARE @vFrontPocket INT;

    -- Retrieve IDs for each vest component based on their names
    SELECT @vStyle = ISNULL((SELECT ID FROM VestStyle WHERE Name = @p_Style), 1);
    SELECT @vType = ISNULL((SELECT ID FROM VestType WHERE Name = @p_vType), 1);
    SELECT @vLapel = ISNULL((SELECT ID FROM VestLapel WHERE Name = @p_Lapel), 1);
    SELECT @vEdge = ISNULL((SELECT ID FROM VestEdge WHERE Name = @p_Edge), 1);
    SELECT @vBreastPocket = ISNULL((SELECT ID FROM VestBreastPocket WHERE Name = @p_BreastPocket), 1);
    SELECT @vFrontPocket = ISNULL((SELECT ID FROM VestFrontPocket WHERE Name = @p_FrontPocket), 1);


    
    -- Retrieve Image
    select ProductID, ImageFront as Front, ImageBack as Back
    FROM Product 
    WHERE FabricName = @p_Fabric AND ProductID IN (
        SELECT vestId 
        FROM Vest
        WHERE Style = @vStyle AND Type = @vType
            AND Lapel = @vLapel AND Edge = @vEdge
            AND BreastPocket = @vBreastPocket AND FrontPocket = @vFrontPocket);

    
    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_GetCustomJacket', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;
END;
GO

CREATE OR ALTER PROC USP_GetCustomPantsImage(
    -- Fabric type
    @p_Fabric VARCHAR(100),
    -- Pants Component
    @p_Pocket VARCHAR(100),
    @p_Fit VARCHAR(100),
    @p_Cuff VARCHAR(100),
    @p_Fastening VARCHAR(100),
    @p_Pleats VARCHAR(100)
)
AS
BEGIN
    DECLARE @pPocket INT;
    DECLARE @pFit INT;
    DECLARE @pCuff INT;
    DECLARE @pFastening INT;
    DECLARE @pPleats INT;

    -- Retrieve IDs for each pants component based on their names
    SELECT @pCuff = ISNULL((SELECT ID FROM PantsCuff WHERE Name = @p_Cuff), 1);
    SELECT @pFit = ISNULL((SELECT ID FROM PantsFit WHERE Name = @p_Fit), 1);
    SELECT @pPleats = ISNULL((SELECT ID FROM PantsPleats WHERE Name = @p_Pleats), 1);
    SELECT @pFastening = ISNULL((SELECT ID FROM PantsFastening WHERE Name = @p_Fastening), 1);
    SELECT @pPocket = ISNULL((SELECT ID FROM PantsPocket WHERE Name = @p_Pocket), 1);


    
        
    -- Retrieve Image
    select ProductID, ImageFront as Front, ImageBack as Back
    FROM Product 
    WHERE FabricName = @p_Fabric AND ProductID IN (
        SELECT pantsId 
        FROM Pants
        WHERE Cuff = @pCuff
            AND Fit = @pFit
            AND Pleats = @pPleats
            AND Fastening = @pFastening
            AND Pocket = @pPocket
    );

    
    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_GetCustomJacket', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;
END;
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