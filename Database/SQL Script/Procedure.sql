DROP PROCEDURE IF EXISTS InsertJacket;

DELIMITER //

CREATE PROCEDURE InsertJacket(
    IN p_Price FLOAT,
    IN p_Image VARCHAR(100),
    IN p_Name VARCHAR(100),
    IN p_Description TEXT,
    IN p_Discount TINYINT,
    IN p_Fabric INT,
    IN p_FabricName VARCHAR(100),
    IN p_color VARCHAR(100),
    IN p_Type VARCHAR(20),
    
    -- To Jacket Component
    IN p_Style VARCHAR(100),
    IN p_Fit VARCHAR(100),
    IN p_Lapel VARCHAR(100),
    IN p_SleeveButton VARCHAR(100),
    IN p_Pocket VARCHAR(100),
    IN p_BackStyle VARCHAR(100),
    IN p_BreastPocket VARCHAR(100)
)
BEGIN
    -- Declare variable to hold the generated ProductID
    DECLARE newProductID INT;
    
    -- Declare variable to hold the ID of each jacket component
    DECLARE jStyle INT;
    DECLARE jFit INT;
    DECLARE jLapel INT;
    DECLARE jSleeveButton INT;
    DECLARE jPocket INT;
    DECLARE jBackStyle INT;
    DECLARE jBreastPocket INT;

    -- Insert into the Product table
    INSERT INTO Product (Price, Image, Name, Description, Discount, Fabric, FabricName,color, Type)
    VALUES (p_Price, p_Image, p_Name, p_Description, p_Discount, p_Fabric, p_FabricName,p_color, p_Type);

    -- Get the generated ProductID
    SET newProductID = LAST_INSERT_ID();

    -- Retrieve IDs for each jacket component based on their names
    SELECT ID INTO jStyle FROM JacketStyle WHERE Name = p_Style;
    SELECT ID INTO jFit FROM JacketFit WHERE Name = p_Fit;
    SELECT ID INTO jLapel FROM JacketLapel WHERE Name = p_Lapel;
    SELECT ID INTO jSleeveButton FROM JacketSleeveButton WHERE Name = p_SleeveButton;
    SELECT ID INTO jPocket FROM JacketPocket WHERE Name = p_Pocket;
    SELECT ID INTO jBackStyle FROM JacketBackStyle WHERE Name = p_BackStyle;
    SELECT ID INTO jBreastPocket FROM JacketBreastPocket WHERE Name = p_BreastPocket;

    -- Insert into the Jacket table
    INSERT INTO Jacket (JacketID, Style, Fit, Lapel, SleeveButton, BackStyle, BreastPocket, Pocket)
    VALUES (newProductID, jStyle, jFit, jLapel, jSleeveButton, jBackStyle, jBreastPocket, jPocket);
END //

DELIMITER ;
