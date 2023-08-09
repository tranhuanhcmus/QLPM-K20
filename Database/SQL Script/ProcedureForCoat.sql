USE TailorManagement;
GO
--dbo.USP_GetDetailJacketByID
CREATE OR ALTER PROC USP_GetDetailJacketByID(
    @jStyle INT,
    @jFit INT,
    @jLapel INT,
    @jSleeveButton INT,
    @jBackStyle INT,
    @jBreastPocket INT,
    @jPocket INT,
    -- for out put
    @jStyleOut NVARCHAR(100) OUTPUT,
    @jFitOut NVARCHAR(100) OUTPUT,
    @jLapelOut NVARCHAR(100) OUTPUT,
    @jSleeveButtonOut NVARCHAR(100) OUTPUT,
    @jBackStyleOut NVARCHAR(100) OUTPUT,
    @jBreastPocketOut NVARCHAR(100) OUTPUT,
    @jPocketOut NVARCHAR(100) OUTPUT
)
AS
BEGIN
    -- Retrieve IDs for each jacket component based on their names
    SET @jStyleOut = (SELECT top 1 Name FROM JacketStyle WHERE ID = @jStyle);
    SET @jFitOut = (SELECT top 1 Name FROM JacketFit WHERE ID = @jFit);
    SET @jLapelOut = (SELECT top 1 Name FROM JacketLapel WHERE ID = @jLapel);
    SET @jSleeveButtonOut = (SELECT top 1 Name FROM JacketSleeveButton WHERE ID = @jSleeveButton);
    SET @jPocketOut = (SELECT top 1 Name FROM JacketPocket WHERE ID = @jPocket);
    SET @jBackStyleOut = (SELECT top 1 Name FROM JacketBackStyle WHERE ID = @jBackStyle);
    SET @jBreastPocketOut = (SELECT top 1 Name FROM JacketBreastPocket WHERE ID = @jBreastPocket);

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
    @pPocket INT,
    @pFit INT,
    @pCuff INT,
    @pFastening INT,
    @pPleats INT,
    -- for output
    @pPocketOut NVARCHAR(100) OUTPUT,
    @pFitOut NVARCHAR(100) OUTPUT,
    @pCuffOut NVARCHAR(100) OUTPUT,
    @pFasteningOut NVARCHAR(100) OUTPUT,
    @pPleatsOut NVARCHAR(100) OUTPUT
)
AS
BEGIN
    -- Retrieve names for each pants component based on their IDs
    SET @pPocketOut = (SELECT top 1 Name FROM PantsPocket WHERE ID = @pPocket);
    SET @pFitOut = (SELECT top 1 Name FROM PantsFit WHERE ID = @pFit);
    SET @pCuffOut = (SELECT top 1 Name FROM PantsCuff WHERE ID = @pCuff);
    SET @pFasteningOut = (SELECT top 1 Name FROM PantsFastening WHERE ID = @pFastening);
    SET @pPleatsOut = (SELECT top 1 Name FROM PantsPleats WHERE ID = @pPleats);

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
    @vStyle INT,
    @vType INT,
    @vLapel INT,
    @vEdge INT,
    @vBreastPocket INT,
    @vFrontPocket INT,
    -- for output
    @vStyleOut NVARCHAR(100) OUTPUT,
    @vTypeOut NVARCHAR(100) OUTPUT,
    @vLapelOut NVARCHAR(100) OUTPUT,
    @vEdgeOut NVARCHAR(100) OUTPUT,
    @vBreastPocketOut NVARCHAR(100) OUTPUT,
    @vFrontPocketOut NVARCHAR(100) OUTPUT
)
AS
BEGIN
    -- Retrieve names for each vest component based on their IDs
    SET @vStyleOut = (SELECT top 1 Name FROM VestStyle WHERE ID = @vStyle);
    SET @vTypeOut = (SELECT top 1 Name FROM VestType WHERE ID = @vType);
    SET @vLapelOut = (SELECT top 1 Name FROM VestLapel WHERE ID = @vLapel);
    SET @vEdgeOut = (SELECT top 1 Name FROM VestEdge WHERE ID = @vEdge);
    SET @vBreastPocketOut = (SELECT top 1 Name FROM VestBreastPocket WHERE ID = @vBreastPocket);
    SET @vFrontPocketOut = (SELECT top 1 Name FROM VestFrontPocket WHERE ID = @vFrontPocket);

    IF @@ERROR <> 0
    BEGIN
        -- Raise an error if proc does not execute successfully
        RAISERROR('An error occurred during procedure execution. Proc: USP_GetDetailVestByID', 16, 1);
        -- Optionally, you can log the error or take other actions
    END;
END;
GO
