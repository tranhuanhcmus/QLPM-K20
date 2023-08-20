use [sunrise-silk];
go


ALTER TABLE Fabric
ALTER COLUMN Image VARCHAR(255);
go

--SET SQL_SAFE_UPDATES = 0;
delete from FabricProvided;
delete from Supplier;
delete from Jacket;
delete from Product;
delete from Fabric;

-- delete jacket component;
delete from JacketStyle;
delete from JacketSleeveButton;
delete from JacketFit;
delete from JacketPocket;
delete from JacketStyle;
delete from JacketBreastPocket;
delete from JacketBackStyle;

--SET SQL_SAFE_UPDATES = 1;


INSERT INTO Supplier (SupplierID, Name, Phone, Email, Address)
VALUES
    (101, 'ABC Textiles', '555-123-4567', 'abc.textiles@example.com', '123 Main St'),
    (102, 'XYZ Fabrics', '555-987-6543', 'xyz.fabrics@example.com', '456 Oak Ave'),
    (103, 'Global Suppliers', '555-222-3333', 'info@globalsuppliers.com', '789 Elm St'),
    (104, 'Fine Textiles', '555-888-7777', 'contact@finetextiles.com', '567 Maple Rd'),
    (105, 'Best Fabrics', '555-444-3333', 'sales@bestfabrics.com', '789 Pine Ave');

INSERT INTO Fabric (FabricID, FabricName, Material, Price, Color, Style, Image, Category, Inventory)
VALUES
    (1, 'Cotton', 'Cotton', 12.99, 'White', 'Plain', 'https://adongsilk.com/wp-content/uploads/2023/06/191.200_Blue-Grey-Windowpane-tailored-suits-in-hoi-an-150x150.jpg', 'Apparel', 1000),
    (2, 'Silk', 'Silk', 25.50, 'Pink', 'Embroidered', 'https://adongsilk.com/wp-content/uploads/2023/04/533.450-dark-grey-tailored-suits-in-hoian-150x150.jpg', 'Apparel', 500),
    (3, 'Linen', 'Linen', 8.75, 'Beige', 'Woven', 'https://adongsilk.com/wp-content/uploads/2023/03/894.250-burgundy-tailored-suits-in-hoi-an-150x150.jpg', 'Home Textiles', 800),
    (4, 'Polyester', 'Synthetic', 10.25, 'Black', 'Printed', 'https://adongsilk.com/wp-content/uploads/2023/02/408.350-medium-grey-tailored-suits-in-hoi-an-150x150.jpg', 'Apparel', 1200),
    (5, 'Wool', 'Wool', 18.50, 'Grey', 'Herringbone', 'https://adongsilk.com/wp-content/uploads/2023/02/179.250-blue-windowpane-tailored-suits-in-hoi-an-150x150.jpg', 'Apparel', 600);

INSERT INTO Fabric (FabricID, FabricName, Material, Price, Color, Style, Image, Category, Inventory)
VALUES
    (191, 'Cashmere', 'Cashmere: 85%. Wool: 10%', 200, 'Gray', 'Plain', 'https://adongsilk.com/wp-content/uploads/2023/06/191.200_Blue-Grey-Windowpane-tailored-suits-in-hoi-an.jpg', 'Apparel', 1000),
    (533, 'Wool 95', 'Wool: 95%',450, 'Black', 'Embroidered', 'https://adongsilk.com/wp-content/uploads/2023/04/533.450-dark-grey-tailored-suits-in-hoian.jpg', 'Apparel', 500),
    (1621, 'Wool 100', 'Wool: 100%', 350, 'Black', 'Woven', 'https://adongsilk.com/wp-content/uploads/2021/11/1621-grey-with-chalk-stripe-suits-online-350.jpg', 'Home Textiles', 800)

INSERT INTO FabricProvided (Fabric, Supplier, Price, Number)
VALUES
    (1, 101, 11.50, 1000),
    (1, 102, 10.25, 500),
    (2, 102, 23.50, 800),
    (3, 103, 7.80, 1200),
    (4, 101, 9.50, 700);


-- Jacket component
INSERT INTO JacketStyle (ID, Name, Image) VALUES
(1, 'Single-Breasted 1 Button', 'SingleBreasted1Button.jpg'),
(2, 'Single-Breasted 2 Buttons', 'SingleBreasted2Buttons.jpg'),
(3, 'Single-Breasted 3 Buttons', 'SingleBreasted3Buttons.jpg'),
(4, 'Double-Breasted 2 Buttons', 'DoubleBreasted2Buttons.jpg'),
(5, 'Double-Breasted 4 Buttons', 'DoubleBreasted4Buttons.jpg'),
(6, 'Double-Breasted 6 Buttons', 'DoubleBreasted6Buttons.jpg'),
(7, 'Mandarin', 'Mandarin.jpg');
-- Insert data into JacketFit
INSERT INTO JacketFit (ID, Name, Image) VALUES
(1, 'Slim Fit', 'SlimFit.jpg'),
(2, 'Regular', 'Regular.jpg');

-- Insert data into JacketLapel
INSERT INTO JacketLapel (ID, Name, Image) VALUES
(1, 'Notch', 'Notch.jpg'),
(2, 'Peak', 'Peak.jpg'),
(3, 'Shawl', 'Shawl.jpg'),
(4, 'Slim', 'Slim.jpg'),
(5, 'Standard', 'Standard.jpg'),
(6, 'Wide', 'Wide.jpg');

-- Insert data into JacketPocket
INSERT INTO JacketPocket (ID, Name, Image) VALUES
(1, 'No Pockets', 'NoPockets.jpg'),
(2, 'With Flap', 'WithFlap.jpg'),
(3, 'Double-Welted', 'DoubleWelted.jpg'),
(4, 'Patched', 'Patched.jpg'),
(5, 'With Flap X3', 'WithFlapX3.jpg'),
(6, 'Double-Welted X3', 'DoubleWeltedX3.jpg'),
(7, 'Standard', 'Standard.jpg'),
(8, 'Slanted', 'Slanted.jpg');

-- Insert data into JacketSleeveButton
INSERT INTO JacketSleeveButton (ID, Name, Image) VALUES
(1, '0', '0.jpg'),
(2, '2', '2.jpg'),
(3, '3', '3.jpg'),
(4, '4', '4.jpg');

-- Insert data into JacketBackStyle
INSERT INTO JacketBackStyle (ID, Name, Image) VALUES
(1, 'Ventless', 'Ventless.jpg'),
(2, 'Center Vent', 'CenterVent.jpg'),
(3, 'Side Vents', 'SideVents.jpg');

-- Insert data into JacketBreastPocket
INSERT INTO JacketBreastPocket (ID, Name, Image) VALUES
(1, 'No', 'No.jpg'),
(2, 'Yes', 'Yes.jpg'),
(3, 'Patched', 'Patched.jpg'),
(4, 'Patched X2', 'PatchedX2.jpg');

-- Vest component
-- Insert data into VestType with formatted Image names
INSERT INTO VestType (ID, Name, Image)
VALUES
    (1, '2 PIECE SUIT', '2PieceSuit.jpg'),
    (2, '3 PIECE SUIT', '3PieceSuit.jpg');

-- Insert data into VestStyle with formatted Image names
INSERT INTO VestStyle (ID, Name, Image)
VALUES
    (1, 'SINGLE BREASTED 3 BUTTONS', 'SingleBreasted3Buttons.jpg'),
    (2, 'SINGLE BREASTED 4 BUTTONS', 'SingleBreasted4Buttons.jpg'),
    (3, 'SINGLE BREASTED 5 BUTTONS', 'SingleBreasted5Buttons.jpg'),
    (4, 'SINGLE BREASTED 6 BUTTONS', 'SingleBreasted6Buttons.jpg'),
    (5, 'DOUBLE BREASTED 4 BUTTONS', 'DoubleBreasted4Buttons.jpg'),
    (6, 'DOUBLE BREASTED 6 BUTTONS', 'DoubleBreasted6Buttons.jpg');

-- Insert data into VestEdge with formatted Image names
INSERT INTO VestEdge (ID, Name, Image)
VALUES
    (1, 'STRAIGHT', 'Straight.jpg'),
    (2, 'DIAGONAL', 'Diagonal.jpg'),
    (3, 'ROUNDED', 'Rounded.jpg');

-- Insert data into VestLapel with formatted Image names
INSERT INTO VestLapel (ID, Name, Image)
VALUES
    (1, 'WITHOUT LAPELS', 'WithoutLapels.jpg'),
    (2, 'NOTCHED', 'Notched.jpg'),
    (3, 'PEAK', 'Peak.jpg'),
    (4, 'SHAWL', 'Shawl.jpg');

-- Insert data into VestBreastPocket with formatted Image names
INSERT INTO VestBreastPocket (ID, Name, Image)
VALUES
    (1, 'Yes', 'Yes.jpg'),
    (2, 'No', 'No.jpg');

-- Insert data into VestFrontPocket with formatted Image names
INSERT INTO VestFrontPocket (ID, Name, Image)
VALUES
    (1, 'NO POCKETS', 'NoPockets.jpg'),
    (2, 'WELT POCKETS', 'WeltPockets.jpg'),
    (3, 'DOUBLE WELT', 'DoubleWelt.jpg'),
    (4, 'WITH FLAP', 'WithFlap.jpg'),
    (5, 'WELT POCKETS X3', 'WeltPocketsX3.jpg'),
    (6, 'DOUBLE WELT X3', 'DoubleWeltX3.jpg'),
    (7, 'WITH FLAPS X3', 'WithFlapsX3.jpg');


-- Pants components
-- Insert data into PantsFit with formatted Image names
INSERT INTO PantsFit (ID, Name, Image) VALUES
    (1, 'REGULAR FIT', 'RegularFit.jpg'),
    (2, 'SLIM FIT', 'SlimFit.jpg');

-- Insert data into PantsPleats with formatted Image names
INSERT INTO PantsPleats (ID, Name, Image) VALUES
    (1, 'NO PLEATS', 'NoPleats.jpg'),
    (2, 'PLEATED', 'Pleated.jpg'),
    (3, 'DOUBLE PLEATS', 'DoublePleats.jpg');

-- Insert data into PantsFastening with formatted Image names
INSERT INTO PantsFastening (ID, Name, Image) VALUES
    (1, 'CENTERED', 'Centered.jpg'),
    (2, 'DISPLACED', 'Displaced.jpg'),
    (3, 'NO BUTTON', 'NoButton.jpg'),
    (4, 'OFF-CENTERED: BUTTONLESS', 'OffCenteredButtonless.jpg');

-- Insert data into PantsCuff with formatted Image names
INSERT INTO PantsCuff (ID, Name, Image) VALUES
    (1, 'NO PANT CUFFS', 'NoPantCuffs.jpg'),
    (2, 'WITH PANT CUFFS', 'WithPantCuffs.jpg');

-- Insert data into PantsPocket with formatted Image names
INSERT INTO PantsPocket (ID, Name, Image) VALUES
    (1, 'SIDE POCKETS DIAGONAL', 'SidePocketsDiagonal.jpg'),
    (2, 'SIDE POCKETS VERTICAL', 'SidePocketsVertical.jpg'),
    (3, 'SIDE POCKETS ROUNDED', 'SidePocketsRounded.jpg'),
    (4, 'BACK POCKETS NO POCKETS', 'BackPocketsNoPockets.jpg'),
    (5, 'BACK POCKETS DOUBLE-WELTED POCKET WITH BUTTON', 'BackPocketsDoubleWeltedWithButton.jpg'),
    (6, 'BACK POCKETS PATCHED', 'BackPocketsPatched.jpg'),
    (7, 'BACK POCKETS FLAP POCKETS', 'BackPocketsFlapPockets.jpg'),
    (8, 'BACK POCKETS DOUBLE-WELTED POCKET WITH BUTTON X2', 'BackPocketsDoubleWeltedWithButtonX2.jpg'),
    (9, 'BACK POCKETS PATCHED X2', 'BackPocketsPatchedX2.jpg'),
    (10, 'BACK POCKETS FLAP POCKETS X2', 'BackPocketsFlapPocketsX2.jpg');

---
DECLARE @counter INT = 1;

WHILE @counter <= 32
BEGIN
    -- Randomize variables
    DECLARE @p_Price FLOAT = CAST((RAND() * 500 + 100) AS DECIMAL(10, 2)); -- Random price between 100 and 600
    DECLARE @p_Description VARCHAR(100) = 'Jacket ' + (SELECT Name FROM JacketStyle WHERE ID = ((@counter - 1) % 7) + 1) + ' ' +
                                    (SELECT Name FROM JacketFit WHERE ID = ((@counter - 1) / 4) % 2 + 1) + ' ' +
                                    (SELECT Name FROM JacketLapel WHERE ID = ((@counter - 1) / 8) % 6 + 1) + ' ' +
                                    (SELECT Name FROM JacketSleeveButton WHERE ID = ((@counter - 1) / 16) % 4 + 1) + ' ' +
                                    (SELECT Name FROM JacketPocket WHERE ID = ((@counter - 1) / 32) % 8 + 1) + ' ' +
                                    (SELECT Name FROM JacketBackStyle WHERE ID = ((@counter - 1) / 64) % 3 + 1) + ' ' +
                                    (SELECT Name FROM JacketBreastPocket WHERE ID = ((@counter - 1) / 128) % 4 + 1);
    DECLARE @p_Name VARCHAR(100) = @p_Description;
    DECLARE @p_Image VARCHAR(255) = 'wait for real link'; -- Replace with actual link
    DECLARE @p_FabricName VARCHAR(100) = 'Wool 100';
    DECLARE @p_color VARCHAR(100) = 'Black';
    DECLARE @p_Type VARCHAR(20) = 'Jacket';
    DECLARE @p_Style VARCHAR(100) = (SELECT Name FROM JacketStyle WHERE ID = ((@counter - 1) % 7) + 1);
    DECLARE @p_Fit VARCHAR(100) = (SELECT Name FROM JacketFit WHERE ID = ((@counter - 1) / 4) % 2 + 1);
    DECLARE @p_Lapel VARCHAR(100) = (SELECT Name FROM JacketLapel WHERE ID = ((@counter - 1) / 8) % 6 + 1);
    DECLARE @p_SleeveButton VARCHAR(100) = (SELECT Name FROM JacketSleeveButton WHERE ID = ((@counter - 1) / 16) % 4 + 1);
    DECLARE @p_Pocket VARCHAR(100) = (SELECT Name FROM JacketPocket WHERE ID = ((@counter - 1) / 32) % 8 + 1);
    DECLARE @p_BackStyle VARCHAR(100) = (SELECT Name FROM JacketBackStyle WHERE ID = ((@counter - 1) / 64) % 3 + 1);
    DECLARE @p_BreastPocket VARCHAR(100) = (SELECT Name FROM JacketBreastPocket WHERE ID = ((@counter - 1) / 128) % 4 + 1);
    DECLARE @p_ImageFront VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/1621.350%20(done)/jacket/front/' + CAST(@counter AS VARCHAR) + '.png';
    DECLARE @p_ImageBack VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/1621.350%20(done)/jacket/back/' + CAST((@counter % 4 + 1) AS VARCHAR) + '.png';

    -- Execute the stored procedure with randomized variables
    EXEC usp_InsertJacket
        @p_Price,
        @p_Image,
        @p_Name,
        @p_Description,
        0, -- Discount (assuming no discount)
        @p_FabricName,
        @p_color,
        @p_Type,
        @p_Style,
        @p_Fit,
        @p_Lapel,
        @p_SleeveButton,
        @p_Pocket,
        @p_BackStyle,
        @p_BreastPocket,
        @p_ImageFront,
        @p_ImageBack;

    -- Increment the counter
    SET @counter = @counter + 1;
END;
GO


DECLARE @counter INT = 33;

WHILE @counter <= 64
BEGIN
    -- Randomize variables
    DECLARE @p_Price FLOAT = CAST((RAND() * 500 + 100) AS DECIMAL(10, 2)); -- Random price between 100 and 600
    DECLARE @p_Description VARCHAR(100) = 'Jacket ' + (SELECT Name FROM JacketStyle WHERE ID = ((@counter - 1) % 7) + 1) + ' ' +
                                    (SELECT Name FROM JacketFit WHERE ID = ((@counter - 1) / 4) % 2 + 1) + ' ' +
                                    (SELECT Name FROM JacketLapel WHERE ID = ((@counter - 1) / 8) % 6 + 1) + ' ' +
                                    (SELECT Name FROM JacketSleeveButton WHERE ID = ((@counter - 1) / 16) % 4 + 1) + ' ' +
                                    (SELECT Name FROM JacketPocket WHERE ID = ((@counter - 1) / 32) % 8 + 1) + ' ' +
                                    (SELECT Name FROM JacketBackStyle WHERE ID = ((@counter - 1) / 64) % 3 + 1) + ' ' +
                                    (SELECT Name FROM JacketBreastPocket WHERE ID = ((@counter - 1) / 128) % 4 + 1);
    DECLARE @p_Name VARCHAR(100) = @p_Description;
    DECLARE @p_Image VARCHAR(255) = 'wait for real link'; -- Replace with actual link
    DECLARE @p_FabricName VARCHAR(100) = 'Cashmere';
    DECLARE @p_color VARCHAR(100) = 'Grey';
    DECLARE @p_Type VARCHAR(20) = 'Jacket';
    DECLARE @p_Style VARCHAR(100) = (SELECT Name FROM JacketStyle WHERE ID = ((@counter - 1) % 7) + 1);
    DECLARE @p_Fit VARCHAR(100) = (SELECT Name FROM JacketFit WHERE ID = ((@counter - 1) / 4) % 2 + 1);
    DECLARE @p_Lapel VARCHAR(100) = (SELECT Name FROM JacketLapel WHERE ID = ((@counter - 1) / 8) % 6 + 1);
    DECLARE @p_SleeveButton VARCHAR(100) = (SELECT Name FROM JacketSleeveButton WHERE ID = ((@counter - 1) / 16) % 4 + 1);
    DECLARE @p_Pocket VARCHAR(100) = (SELECT Name FROM JacketPocket WHERE ID = ((@counter - 1) / 32) % 8 + 1);
    DECLARE @p_BackStyle VARCHAR(100) = (SELECT Name FROM JacketBackStyle WHERE ID = ((@counter - 1) / 64) % 3 + 1);
    DECLARE @p_BreastPocket VARCHAR(100) = (SELECT Name FROM JacketBreastPocket WHERE ID = ((@counter - 1) / 128) % 4 + 1);
    DECLARE @p_ImageFront VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/191.200%20(done)/jacket/front/' + CAST(@counter - 32 AS VARCHAR) + '.png';
    DECLARE @p_ImageBack VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/191.200%20(done)/jacket/back/' + CAST((@counter % 4 + 1) - 32 AS VARCHAR) + '.png';

    -- Execute the stored procedure with randomized variables
    EXEC usp_InsertJacket
        @p_Price,
        @p_Image,
        @p_Name,
        @p_Description,
        0, -- Discount (assuming no discount)
        @p_FabricName,
        @p_color,
        @p_Type,
        @p_Style,
        @p_Fit,
        @p_Lapel,
        @p_SleeveButton,
        @p_Pocket,
        @p_BackStyle,
        @p_BreastPocket,
        @p_ImageFront,
        @p_ImageBack;

    -- Increment the counter
    SET @counter = @counter + 1;
END;
GO



DECLARE @counter INT = 65;

WHILE @counter <= 96
BEGIN
    -- Randomize variables
    DECLARE @p_Price FLOAT = CAST((RAND() * 500 + 100) AS DECIMAL(10, 2)); -- Random price between 100 and 600
    DECLARE @p_Description VARCHAR(100) = 'Jacket ' + (SELECT Name FROM JacketStyle WHERE ID = ((@counter - 1) % 7) + 1) + ' ' +
                                    (SELECT Name FROM JacketFit WHERE ID = ((@counter - 1) / 4) % 2 + 1) + ' ' +
                                    (SELECT Name FROM JacketLapel WHERE ID = ((@counter - 1) / 8) % 6 + 1) + ' ' +
                                    (SELECT Name FROM JacketSleeveButton WHERE ID = ((@counter - 1) / 16) % 4 + 1) + ' ' +
                                    (SELECT Name FROM JacketPocket WHERE ID = ((@counter - 1) / 32) % 8 + 1) + ' ' +
                                    (SELECT Name FROM JacketBackStyle WHERE ID = ((@counter - 1) / 64) % 3 + 1) + ' ' +
                                    (SELECT Name FROM JacketBreastPocket WHERE ID = ((@counter - 1) / 128) % 4 + 1);
    DECLARE @p_Name VARCHAR(100) = @p_Description;
    DECLARE @p_Image VARCHAR(255) = 'wait for real link'; -- Replace with actual link
    DECLARE @p_FabricName VARCHAR(100) = 'Wool 95';
    DECLARE @p_color VARCHAR(100) = 'Black';
    DECLARE @p_Type VARCHAR(20) = 'Jacket';
    DECLARE @p_Style VARCHAR(100) = (SELECT Name FROM JacketStyle WHERE ID = ((@counter - 1) % 7) + 1);
    DECLARE @p_Fit VARCHAR(100) = (SELECT Name FROM JacketFit WHERE ID = ((@counter - 1) / 4) % 2 + 1);
    DECLARE @p_Lapel VARCHAR(100) = (SELECT Name FROM JacketLapel WHERE ID = ((@counter - 1) / 8) % 6 + 1);
    DECLARE @p_SleeveButton VARCHAR(100) = (SELECT Name FROM JacketSleeveButton WHERE ID = ((@counter - 1) / 16) % 4 + 1);
    DECLARE @p_Pocket VARCHAR(100) = (SELECT Name FROM JacketPocket WHERE ID = ((@counter - 1) / 32) % 8 + 1);
    DECLARE @p_BackStyle VARCHAR(100) = (SELECT Name FROM JacketBackStyle WHERE ID = ((@counter - 1) / 64) % 3 + 1);
    DECLARE @p_BreastPocket VARCHAR(100) = (SELECT Name FROM JacketBreastPocket WHERE ID = ((@counter - 1) / 128) % 4 + 1);
    DECLARE @p_ImageFront VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/533.450%20(done)/jacket/front/' + CAST(@counter - 65 AS VARCHAR) + '.png';
    DECLARE @p_ImageBack VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/533.450%20(done)/jacket/back/' + CAST((@counter % 4 + 1) - 65 AS VARCHAR) + '.png';

    -- Execute the stored procedure with randomized variables
    EXEC usp_InsertJacket
        @p_Price,
        @p_Image,
        @p_Name,
        @p_Description,
        0, -- Discount (assuming no discount)
        @p_FabricName,
        @p_color,
        @p_Type,
        @p_Style,
        @p_Fit,
        @p_Lapel,
        @p_SleeveButton,
        @p_Pocket,
        @p_BackStyle,
        @p_BreastPocket,
        @p_ImageFront,
        @p_ImageBack;

    -- Increment the counter
    SET @counter = @counter + 1;
END;
GO


DECLARE @counter INT = 97;

WHILE @counter <= 104
BEGIN
    -- Randomize variables
    DECLARE @p_Price FLOAT = CAST((RAND() * 500 + 100) AS DECIMAL(10, 2)); -- Random price between 100 and 600
    DECLARE @p_Description VARCHAR(100) = 'Vest ' + 
        (SELECT Name FROM VestType WHERE ID = (@counter % 2) + 1) + ' ' +
        (SELECT Name FROM VestStyle WHERE ID = ((@counter - 1) % 6) + 1) + ' ' +
        (SELECT Name FROM VestLapel WHERE ID = ((@counter - 1) / 2) % 4 + 1) + ' ' +
        (SELECT Name FROM VestEdge WHERE ID = ((@counter - 1) / 8) % 3 + 1);
    DECLARE @p_Name VARCHAR(100) = @p_Description;
    DECLARE @p_Image VARCHAR(255) = 'wait for real link'; -- Replace with actual link
    DECLARE @p_FabricName VARCHAR(100) = 'Cashmere';
    DECLARE @p_color VARCHAR(100) = 'Grey';
    DECLARE @p_Type VARCHAR(20) = 'Vest';
    DECLARE @p_Style VARCHAR(100) = (SELECT Name FROM VestStyle WHERE ID = ((@counter - 1) % 6) + 1);
    DECLARE @p_vType VARCHAR(100) = (SELECT Name FROM VestType WHERE ID = (@counter % 2) + 1);
    DECLARE @p_Lapel VARCHAR(100) = (SELECT Name FROM VestLapel WHERE ID = ((@counter - 1) / 2) % 4 + 1);
    DECLARE @p_Edge VARCHAR(100) = (SELECT Name FROM VestEdge WHERE ID = ((@counter - 1) / 8) % 3 + 1);
    DECLARE @p_BreastPocket VARCHAR(100) = 'Yes';
    DECLARE @p_FrontPocket VARCHAR(100) = 'WELT POCKETS';
    DECLARE @p_ImageFront VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/191.200%20(done)/vest/front/' + CAST(@counter -96 AS VARCHAR) + '.png';
    DECLARE @p_ImageBack VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/191.200%20(done)/vest/back/1.png';

    -- Execute the stored procedure with randomized variables
    EXEC usp_InsertVest
        @p_Price,
        @p_Image,
        @p_Name,
        @p_Description,
        0, -- Discount (assuming no discount)
        @p_FabricName,
        @p_color,
        @p_Type,
        @p_Style,
        @p_vType,
        @p_Lapel,
        @p_Edge,
        @p_BreastPocket,
        @p_FrontPocket,
        @p_ImageFront,
        @p_ImageBack;

    -- Increment the counter
    SET @counter = @counter + 1;
END;
go

DECLARE @counter INT = 105;

WHILE @counter <= 112
BEGIN
    -- Randomize variables
    DECLARE @p_Price FLOAT = CAST((RAND() * 500 + 100) AS DECIMAL(10, 2)); -- Random price between 100 and 600
    DECLARE @p_Description VARCHAR(100) = 'Vest ' + 
        (SELECT Name FROM VestType WHERE ID = (@counter % 2) + 1) + ' ' +
        (SELECT Name FROM VestStyle WHERE ID = ((@counter - 1) % 6) + 1) + ' ' +
        (SELECT Name FROM VestLapel WHERE ID = ((@counter - 1) / 2) % 4 + 1) + ' ' +
        (SELECT Name FROM VestEdge WHERE ID = ((@counter - 1) / 8) % 3 + 1);
    DECLARE @p_Name VARCHAR(100) = @p_Description;
    DECLARE @p_Image VARCHAR(255) = 'wait for real link'; -- Replace with actual link
    DECLARE @p_FabricName VARCHAR(100) = 'Wool 100';
    DECLARE @p_color VARCHAR(100) = 'Black';
    DECLARE @p_Type VARCHAR(20) = 'Vest';
    DECLARE @p_Style VARCHAR(100) = (SELECT Name FROM VestStyle WHERE ID = ((@counter - 1) % 6) + 1);
    DECLARE @p_vType VARCHAR(100) = (SELECT Name FROM VestType WHERE ID = (@counter % 2) + 1);
    DECLARE @p_Lapel VARCHAR(100) = (SELECT Name FROM VestLapel WHERE ID = ((@counter - 1) / 2) % 4 + 1);
    DECLARE @p_Edge VARCHAR(100) = (SELECT Name FROM VestEdge WHERE ID = ((@counter - 1) / 8) % 3 + 1);
    DECLARE @p_BreastPocket VARCHAR(100) = 'Yes';
    DECLARE @p_FrontPocket VARCHAR(100) = 'WELT POCKETS';
    DECLARE @p_ImageFront VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/1621.350%20(done)/vest/front/' + CAST(@counter - 104 AS VARCHAR) + '.png';
    DECLARE @p_ImageBack VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/1621.350%20(done)/vest/back/1.png';

    -- Execute the stored procedure with randomized variables
    EXEC usp_InsertVest
        @p_Price,
        @p_Image,
        @p_Name,
        @p_Description,
        0, -- Discount (assuming no discount)
        @p_FabricName,
        @p_color,
        @p_Type,
        @p_Style,
        @p_vType,
        @p_Lapel,
        @p_Edge,
        @p_BreastPocket,
        @p_FrontPocket,
        @p_ImageFront,
        @p_ImageBack;

    -- Increment the counter
    SET @counter = @counter + 1;
END;
go


DECLARE @counter INT = 113;

WHILE @counter <= 120
BEGIN
    -- Randomize variables
    DECLARE @p_Price FLOAT = CAST((RAND() * 500 + 100) AS DECIMAL(10, 2)); -- Random price between 100 and 600
    DECLARE @p_Description VARCHAR(100) = 'Vest ' + 
        (SELECT Name FROM VestType WHERE ID = (@counter % 2) + 1) + ' ' +
        (SELECT Name FROM VestStyle WHERE ID = ((@counter - 1) % 6) + 1) + ' ' +
        (SELECT Name FROM VestLapel WHERE ID = ((@counter - 1) / 2) % 4 + 1) + ' ' +
        (SELECT Name FROM VestEdge WHERE ID = ((@counter - 1) / 8) % 3 + 1);
    DECLARE @p_Name VARCHAR(100) = @p_Description;
    DECLARE @p_Image VARCHAR(255) = 'wait for real link'; -- Replace with actual link
    DECLARE @p_FabricName VARCHAR(100) = 'Wool 95';
    DECLARE @p_color VARCHAR(100) = 'Black';
    DECLARE @p_Type VARCHAR(20) = 'Vest';
    DECLARE @p_Style VARCHAR(100) = (SELECT Name FROM VestStyle WHERE ID = ((@counter - 1) % 6) + 1);
    DECLARE @p_vType VARCHAR(100) = (SELECT Name FROM VestType WHERE ID = (@counter % 2) + 1);
    DECLARE @p_Lapel VARCHAR(100) = (SELECT Name FROM VestLapel WHERE ID = ((@counter - 1) / 2) % 4 + 1);
    DECLARE @p_Edge VARCHAR(100) = (SELECT Name FROM VestEdge WHERE ID = ((@counter - 1) / 8) % 3 + 1);
    DECLARE @p_BreastPocket VARCHAR(100) = 'Yes';
    DECLARE @p_FrontPocket VARCHAR(100) = 'WELT POCKETS';
    DECLARE @p_ImageFront VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/533.450%20(done)/vest/front/' + CAST(@counter - 112 AS VARCHAR) + '.png';
    DECLARE @p_ImageBack VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/533.450%20(done)/vest/back/1.png';

    -- Execute the stored procedure with randomized variables
    EXEC usp_InsertVest
        @p_Price,
        @p_Image,
        @p_Name,
        @p_Description,
        0, -- Discount (assuming no discount)
        @p_FabricName,
        @p_color,
        @p_Type,
        @p_Style,
        @p_vType,
        @p_Lapel,
        @p_Edge,
        @p_BreastPocket,
        @p_FrontPocket,
        @p_ImageFront,
        @p_ImageBack;

    -- Increment the counter
    SET @counter = @counter + 1;
END;
go

-- pants;
DECLARE @counter INT = 121;
WHILE @counter <= 128
BEGIN
    -- Randomize variables
    DECLARE @p_Price FLOAT = CAST((RAND() * 500 + 100) AS DECIMAL(10, 2)); -- Random price between 100 and 600
    DECLARE @p_Description VARCHAR(100) = 'Pants ' + 
        (SELECT Name FROM PantsFit WHERE ID = ((@counter - 1) % 2) + 1) + ' ' +
        (SELECT Name FROM PantsPleats WHERE ID = ((@counter - 1) / 2) % 2 + 1) + ' ' +
        (SELECT Name FROM PantsFastening WHERE ID = ((@counter - 1) / 4) % 2 + 1);
    DECLARE @p_Name VARCHAR(100) = @p_Description;
    DECLARE @p_Cuff VARCHAR(100) = 'NO PANT CUFFS';
    DECLARE @p_Image VARCHAR(255) = 'wait for real link'; -- Replace with actual link
    DECLARE @p_FabricName VARCHAR(100) = 'Cashmere';
    DECLARE @p_color VARCHAR(100) = 'Grey';
    DECLARE @p_Type VARCHAR(20) = 'Pants';
    DECLARE @p_Pocket VARCHAR(100) = (SELECT Name FROM PantsPocket WHERE ID = ((@counter - 1) / 8) % 10 + 1);
    DECLARE @p_Fit VARCHAR(100) = (SELECT Name FROM PantsFit WHERE ID = ((@counter - 1) % 2) + 1);
    DECLARE @p_Pleats VARCHAR(100) = (SELECT Name FROM PantsPleats WHERE ID = ((@counter - 1) / 2) % 2 + 1);
    DECLARE @p_Fastening VARCHAR(100) = (SELECT Name FROM PantsFastening WHERE ID = ((@counter - 1) / 4) % 2 + 1);
    DECLARE @p_ImageFront VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/191.200%20(done)/pant/front/' + CAST(@counter-120 AS VARCHAR) + '.png';
    DECLARE @p_ImageBack VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/191.200%20(done)/pant/back/' + CAST((@counter % 4 + 1) AS VARCHAR) + '.png';

    -- Execute the stored procedure with randomized variables
    EXEC usp_InsertPants
        @p_Price,
        @p_Image,
        @p_Name,
        @p_Description,
        0, -- Discount (assuming no discount)
        @p_FabricName,
        @p_color,
        @p_Type,
        @p_Pocket,
        @p_Fit,
        @p_Cuff,
        @p_Fastening,
        @p_Pleats,
        @p_ImageFront,
        @p_ImageBack;

    -- Increment the counter
    SET @counter = @counter + 1;
END;
GO


-- pants;
DECLARE @counter INT = 129;
WHILE @counter <= 136
BEGIN
    -- Randomize variables
    DECLARE @p_Price FLOAT = CAST((RAND() * 500 + 100) AS DECIMAL(10, 2)); -- Random price between 100 and 600
    DECLARE @p_Description VARCHAR(100) = 'Pants ' + 
        (SELECT Name FROM PantsFit WHERE ID = ((@counter - 1) % 2) + 1) + ' ' +
        (SELECT Name FROM PantsPleats WHERE ID = ((@counter - 1) / 2) % 2 + 1) + ' ' +
        (SELECT Name FROM PantsFastening WHERE ID = ((@counter - 1) / 4) % 2 + 1);
    DECLARE @p_Name VARCHAR(100) = @p_Description;
    DECLARE @p_Cuff VARCHAR(100) = 'NO PANT CUFFS';
    DECLARE @p_Image VARCHAR(255) = 'wait for real link'; -- Replace with actual link
    DECLARE @p_FabricName VARCHAR(100) = 'Wool 100';
    DECLARE @p_color VARCHAR(100) = 'Black';
    DECLARE @p_Type VARCHAR(20) = 'Pants';
    DECLARE @p_Pocket VARCHAR(100) = (SELECT Name FROM PantsPocket WHERE ID = ((@counter - 1) / 8) % 10 + 1);
    DECLARE @p_Fit VARCHAR(100) = (SELECT Name FROM PantsFit WHERE ID = ((@counter - 1) % 2) + 1);
    DECLARE @p_Pleats VARCHAR(100) = (SELECT Name FROM PantsPleats WHERE ID = ((@counter - 1) / 2) % 2 + 1);
    DECLARE @p_Fastening VARCHAR(100) = (SELECT Name FROM PantsFastening WHERE ID = ((@counter - 1) / 4) % 2 + 1);
    DECLARE @p_ImageFront VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/1621.350%20(done)/pant/front/' + CAST(@counter-128 AS VARCHAR) + '.png';
    DECLARE @p_ImageBack VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/1621.350%20(done)/pant/back/' + CAST((@counter % 4 + 1) AS VARCHAR) + '.png';

    -- Execute the stored procedure with randomized variables
    EXEC usp_InsertPants
        @p_Price,
        @p_Image,
        @p_Name,
        @p_Description,
        0, -- Discount (assuming no discount)
        @p_FabricName,
        @p_color,
        @p_Type,
        @p_Pocket,
        @p_Fit,
        @p_Cuff,
        @p_Fastening,
        @p_Pleats,
        @p_ImageFront,
        @p_ImageBack;

    -- Increment the counter
    SET @counter = @counter + 1;
END;
go
-- pants;
DECLARE @counter INT = 137;
WHILE @counter <= 144
BEGIN
    -- Randomize variables
    DECLARE @p_Price FLOAT = CAST((RAND() * 500 + 100) AS DECIMAL(10, 2)); -- Random price between 100 and 600
    DECLARE @p_Description VARCHAR(100) = 'Pants ' + 
        (SELECT Name FROM PantsFit WHERE ID = ((@counter - 1) % 2) + 1) + ' ' +
        (SELECT Name FROM PantsPleats WHERE ID = ((@counter - 1) / 2) % 2 + 1) + ' ' +
        (SELECT Name FROM PantsFastening WHERE ID = ((@counter - 1) / 4) % 2 + 1);
    DECLARE @p_Name VARCHAR(100) = @p_Description;
    DECLARE @p_Cuff VARCHAR(100) = 'NO PANT CUFFS';
    DECLARE @p_Image VARCHAR(255) = 'wait for real link'; -- Replace with actual link
    DECLARE @p_FabricName VARCHAR(100) = 'Wool 95';
    DECLARE @p_color VARCHAR(100) = 'Black';
    DECLARE @p_Type VARCHAR(20) = 'Pants';
    DECLARE @p_Pocket VARCHAR(100) = (SELECT Name FROM PantsPocket WHERE ID = ((@counter - 1) / 8) % 10 + 1);
    DECLARE @p_Fit VARCHAR(100) = (SELECT Name FROM PantsFit WHERE ID = ((@counter - 1) % 2) + 1);
    DECLARE @p_Pleats VARCHAR(100) = (SELECT Name FROM PantsPleats WHERE ID = ((@counter - 1) / 2) % 2 + 1);
    DECLARE @p_Fastening VARCHAR(100) = (SELECT Name FROM PantsFastening WHERE ID = ((@counter - 1) / 4) % 2 + 1);
    DECLARE @p_ImageFront VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/533.450%20(done)/pant/front/' + CAST(@counter-136 AS VARCHAR) + '.png';
    DECLARE @p_ImageBack VARCHAR(255) = 'https://inallidg.sirv.com/Screenshot_Images%20Data/533.450%20(done)/pant/back/' + CAST((@counter % 4 + 1) AS VARCHAR) + '.png';

    -- Execute the stored procedure with randomized variables
    EXEC usp_InsertPants
        @p_Price,
        @p_Image,
        @p_Name,
        @p_Description,
        0, -- Discount (assuming no discount)
        @p_FabricName,
        @p_color,
        @p_Type,
        @p_Pocket,
        @p_Fit,
        @p_Cuff,
        @p_Fastening,
        @p_Pleats,
        @p_ImageFront,
        @p_ImageBack;

    -- Increment the counter
    SET @counter = @counter + 1;
END;
go


-- Insert ties - Row 1
EXEC usp_InsertTies @p_Price = 65.0, @p_Image = 'tie1.jpg', @p_Name = 'Tie 1', @p_Description = 'Description for Tie 1', @p_Discount = 10, @p_FabricName = 'Cotton', @p_color = 'White', @p_Type = 'Ties', @p_Size = 5.0, @p_Style = 'Style for Tie 1', @p_ImageFront = 'Waiting for Image',@p_ImageBack = 'Waiting for Image';

-- Insert ties - Row 2
EXEC usp_InsertTies @p_Price = 65.0, @p_Image = 'tie2.jpg', @p_Name = 'Tie 2', @p_Description = 'Description for Tie 2', @p_Discount = 10, @p_FabricName = 'Cotton', @p_color = 'White', @p_Type = 'Ties', @p_Size = 4.5, @p_Style = 'Style for Tie 2', @p_ImageFront = 'Waiting for Image',@p_ImageBack = 'Waiting for Image';

-- Insert ties - Row 3
EXEC usp_InsertTies @p_Price = 65.0, @p_Image = 'tie3.jpg', @p_Name = 'Tie 3', @p_Description = 'Description for Tie 3', @p_Discount = 10, @p_FabricName = 'Cotton', @p_color = 'White', @p_Type = 'Ties', @p_Size = 5.5, @p_Style = 'Style for Tie 3', @p_ImageFront = 'Waiting for Image',@p_ImageBack = 'Waiting for Image';

-- Insert ties - Row 4
EXEC usp_InsertTies @p_Price = 65.0, @p_Image = 'tie4.jpg', @p_Name = 'Tie 4', @p_Description = 'Description for Tie 4', @p_Discount = 10, @p_FabricName = 'Cotton', @p_color = 'White', @p_Type = 'Ties', @p_Size = 6.0, @p_Style = 'Style for Tie 4', @p_ImageFront = 'Waiting for Image',@p_ImageBack = 'Waiting for Image';

-- Insert ties - Row 5
EXEC usp_InsertTies @p_Price = 65.0, @p_Image = 'tie5.jpg', @p_Name = 'Tie 5', @p_Description = 'Description for Tie 5', @p_Discount = 10, @p_FabricName = 'Cotton', @p_color = 'White', @p_Type = 'Ties', @p_Size = 4.0, @p_Style = 'Style for Tie 5', @p_ImageFront = 'Waiting for Image',@p_ImageBack = 'Waiting for Image';
