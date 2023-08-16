USE TailorManagement;
GO
--dbo.USP_GetDetailJacketByID
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

CREATE OR ALTER PROCEDURE usp_InsertTies(
    @p_Price FLOAT,
    @p_Image VARCHAR(100),
    @p_Name VARCHAR(100),
    @p_Description TEXT,
    @p_Discount TINYINT,
    -- IN p_Fabric INT;
    @p_FabricName VARCHAR(100),
    @p_color VARCHAR(100),
    @p_Type VARCHAR(20),
    
    -- Tie Component
    @p_Size DECIMAL(10, 2),
    @p_Style NVARCHAR(100)
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
    INSERT INTO Product (ProductID, Price, Image, Name, Description, Discount, Fabric, FabricName, color, Type)
    VALUES (@newProductID, @p_Price, @p_Image, @p_Name, @p_Description, @p_Discount, @aFabricID, @p_FabricName, @p_color, @p_Type);

    -- Insert into the Ties table
    INSERT INTO Ties (TiesID, size, style)
    VALUES (@newProductID, @p_Size, @p_Style);
END
GO
