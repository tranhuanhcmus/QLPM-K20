use tailormanagement;
go
/*
test area

select * from Fabric;
select * from Product;
select * from Jacket;
select * from Vest;
select * from Pants;

select * from JacketStyle;
select * from JacketSleeveButton;



*/
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


INSERT INTO Fabric (FabricID, FabricName, Meterial, Price, Color, Style, Image, Category, Inventory)
VALUES
    (1, 'Cotton', 'Cotton', 12.99, 'White', 'Plain', 'img001', 'Apparel', 1000),
    (2, 'Silk', 'Silk', 25.50, 'Pink', 'Embroidered', 'img002', 'Apparel', 500),
    (3, 'Linen', 'Linen', 8.75, 'Beige', 'Woven', 'img003', 'Home Textiles', 800),
    (4, 'Polyester', 'Synthetic', 10.25, 'Black', 'Printed', 'img004', 'Apparel', 1200),
    (5, 'Wool', 'Wool', 18.50, 'Grey', 'Herringbone', 'img005', 'Apparel', 600);

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
INSERT INTO JacketFit (Name, Image) VALUES
(1, 'Slim Fit', 'SlimFit.jpg'),
(2, 'Regular', 'Regular.jpg');

-- Insert data into JacketLapel
INSERT INTO JacketLapel (Name, Image) VALUES
(1, 'Notch', 'Notch.jpg'),
(2, 'Peak', 'Peak.jpg'),
(3, 'Shawl', 'Shawl.jpg'),
(4, 'Slim', 'Slim.jpg'),
(5, 'Standard', 'Standard.jpg'),
(6, 'Wide', 'Wide.jpg');

-- Insert data into JacketPocket
INSERT INTO JacketPocket (Name, Image) VALUES
(1, 'No Pockets', 'NoPockets.jpg'),
(2, 'With Flap', 'WithFlap.jpg'),
(3, 'Double-Welted', 'DoubleWelted.jpg'),
(4, 'Patched', 'Patched.jpg'),
(5, 'With Flap X3', 'WithFlapX3.jpg'),
(6, 'Double-Welted X3', 'DoubleWeltedX3.jpg'),
(7, 'Standard', 'Standard.jpg'),
(8, 'Slanted', 'Slanted.jpg');

-- Insert data into JacketSleeveButton
INSERT INTO JacketSleeveButton (Name, Image) VALUES
(1, '0', '0.jpg'),
(2, '2', '2.jpg'),
(3, '3', '3.jpg'),
(4, '4', '4.jpg');

-- Insert data into JacketBackStyle
INSERT INTO JacketBackStyle (Name, Image) VALUES
(1, 'Ventless', 'Ventless.jpg'),
(2, 'Center Vent', 'CenterVent.jpg'),
(3, 'Side Vents', 'SideVents.jpg');

-- Insert data into JacketBreastPocket
INSERT INTO JacketBreastPocket (Name, Image) VALUES
(1, 'No', 'No.jpg'),
(2, 'Yes', 'Yes.jpg'),
(3, 'Patched', 'Patched.jpg'),
(4, 'Patched X2', 'PatchedX2.jpg');

-- Vest component
-- Insert data into VestType with formatted Image names
INSERT INTO VestType (Name, Image)
VALUES
    (1, '2 PIECE SUIT', '2PieceSuit.jpg'),
    (2, '3 PIECE SUIT', '3PieceSuit.jpg');

-- Insert data into VestStyle with formatted Image names
INSERT INTO VestStyle (Name, Image)
VALUES
    (1, 'SINGLE BREASTED 3 BUTTONS', 'SingleBreasted3Buttons.jpg'),
    (2, 'SINGLE BREASTED 4 BUTTONS', 'SingleBreasted4Buttons.jpg'),
    (3, 'SINGLE BREASTED 5 BUTTONS', 'SingleBreasted5Buttons.jpg'),
    (4, 'SINGLE BREASTED 6 BUTTONS', 'SingleBreasted6Buttons.jpg'),
    (5, 'DOUBLE BREASTED 4 BUTTONS', 'DoubleBreasted4Buttons.jpg'),
    (6, 'DOUBLE BREASTED 6 BUTTONS', 'DoubleBreasted6Buttons.jpg');

-- Insert data into VestEdge with formatted Image names
INSERT INTO VestEdge (Name, Image)
VALUES
    (1, 'STRAIGHT', 'Straight.jpg'),
    (2, 'DIAGONAL', 'Diagonal.jpg'),
    (3, 'ROUNDED', 'Rounded.jpg');

-- Insert data into VestLapel with formatted Image names
INSERT INTO VestLapel (Name, Image)
VALUES
    (1, 'WITHOUT LAPELS', 'WithoutLapels.jpg'),
    (2, 'NOTCHED', 'Notched.jpg'),
    (3, 'PEAK', 'Peak.jpg'),
    (4, 'SHAWL', 'Shawl.jpg');

-- Insert data into VestBreastPocket with formatted Image names
INSERT INTO VestBreastPocket (Name, Image)
VALUES
    (1, 'Yes', 'Yes.jpg'),
    (2, 'No', 'No.jpg');

-- Insert data into VestFrontPocket with formatted Image names
INSERT INTO VestFrontPocket (Name, Image)
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
INSERT INTO PantsFit (Name, Image) VALUES
    (1, 'REGULAR FIT', 'RegularFit.jpg'),
    (2, 'SLIM FIT', 'SlimFit.jpg');

-- Insert data into PantsPleats with formatted Image names
INSERT INTO PantsPleats (Name, Image) VALUES
    (1, 'NO PLEATS', 'NoPleats.jpg'),
    (2, 'PLEATED', 'Pleated.jpg'),
    (3, 'DOUBLE PLEATS', 'DoublePleats.jpg');

-- Insert data into PantsFastening with formatted Image names
INSERT INTO PantsFastening (Name, Image) VALUES
    (1, 'CENTERED', 'Centered.jpg'),
    (2, 'DISPLACED', 'Displaced.jpg'),
    (3, 'NO BUTTON', 'NoButton.jpg'),
    (4, 'OFF-CENTERED: BUTTONLESS', 'OffCenteredButtonless.jpg');

-- Insert data into PantsCuff with formatted Image names
INSERT INTO PantsCuff (Name, Image) VALUES
    (1, 'NO PANT CUFFS', 'NoPantCuffs.jpg'),
    (2, 'WITH PANT CUFFS', 'WithPantCuffs.jpg');

-- Insert data into PantsPocket with formatted Image names
INSERT INTO PantsPocket (Name, Image) VALUES
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


-- Insert 7 rows into the Product and Jacket tables using the procedure
EXEC usp_InsertJacket 65.0, 'jacket1.jpg', 'Jacket 1', 'Description for Jacket 1', 10, 'Cotton', 'White', 'Type 1', 'Single-Breasted 1 Button', 'Slim Fit', 'Notch', '1', 'No Pockets', 'Ventless', 'No';
EXEC usp_InsertJacket 80.0, 'jacket2.jpg', 'Jacket 2', 'Description for Jacket 2', 20, 'Silk', 'Pink', 'Type 2', 'Single-Breasted 2 Buttons', 'Regular', 'Peak', '2', 'With Flap', 'Center Vent', 'Yes';
EXEC usp_InsertJacket 90.0, 'jacket3.jpg', 'Jacket 3', 'Description for Jacket 3', 15, 'Linen', 'Beige', 'Type 3', 'Single-Breasted 3 Buttons', 'Regular', 'Shawl', '3', 'Double-Welted', 'Side Vents', 'No';
EXEC usp_InsertJacket 140.0, 'jacket4.jpg', 'Jacket 4', 'Description for Jacket 4', 30, 'Polyester', 'Black', 'Type 4', 'Double-Breasted 2 Buttons', 'Slim Fit', 'Standard', '2', 'With Flap X3', 'Center Vent', 'No';
EXEC usp_InsertJacket 180.0, 'jacket5.jpg', 'Jacket 5', 'Description for Jacket 5', 25, 'Wool', 'Grey', 'Type 5', 'Double-Breasted 4 Buttons', 'Regular', 'Standard', '4', 'Double-Welted X3', 'Side Vents', 'Yes';
EXEC usp_InsertJacket 280.0, 'jacket6.jpg', 'Jacket 6', 'This is super jacket 6', 20, 'Wool', 'Black', 'Type 5', 'Double-Breasted 4 Buttons', 'Regular', 'Standard', '4', 'Double-Welted X3', 'Side Vents', 'Yes';
update Jacket set SleeveButton = 1 where JacketID = 1;
-- Repeat the CALL InsertJacket procedure with different data for the remaining jackets (up to 2 more times).
-- Insert Vest data with components
--EXEC usp_InsertVest 65.0, 'vest1.jpg', 'Vest 1', 'Description for Vest 1', 10, 'Cotton', 'White', 'Vest', 'SINGLE BREASTED 3 BUTTONS', '2 PIECE SUIT', 'WITHOUT LAPELS', 'STRAIGHT', 'Yes', 'NO POCKETS';
--EXEC usp_InsertVest 80.0, 'vest2.jpg', 'Vest 2', 'Description for Vest 2', 20, 'Silk', 'Pink', 'Vest', 'SINGLE BREASTED 4 BUTTONS', '3 PIECE SUIT', 'NOTCHED', 'DIAGONAL', 'No', 'WELT POCKETS';
--EXEC usp_InsertVest 90.0, 'vest3.jpg', 'Vest 3', 'Description for Vest 3', 15, 'Linen', 'Beige', 'Vest', 'SINGLE BREASTED 5 BUTTONS', '2 PIECE SUIT', 'PEAK', 'ROUNDED', 'Yes', 'DOUBLE WELT X3';
--EXEC usp_InsertVest 140.0, 'vest4.jpg', 'Vest 4', 'Description for Vest 4', 30, 'Polyester', 'Black', 'Vest', 'DOUBLE BREASTED 4 BUTTONS', '3 PIECE SUIT', 'NOTCHED', 'STRAIGHT', 'No', 'WITH FLAPS X3';
--EXEC usp_InsertVest 180.0, 'vest5.jpg', 'Vest 5', 'Description for Vest 5', 25, 'Wool', 'Grey', 'Vest', 'DOUBLE BREASTED 6 BUTTONS', '2 PIECE SUIT', 'SHAWL', 'ROUNDED', 'Yes', 'WITH FLAPS X3';
---- Insert 5 rows using the stored procedure for Pants and Product
--EXEC usp_InsertPants 65.0, 'pants1.jpg', 'Pants 1', 'Description for Pants 1', 10, 'Cotton', 'White', 'Pants', 'SIDE POCKETS DIAGONAL', 'REGULAR FIT', 'WITH PANT CUFFS', 'CENTERED', 'NO PLEATS';
--EXEC usp_InsertPants 80.0, 'pants2.jpg', 'Pants 2', 'Description for Pants 2', 20, 'Silk', 'Pink', 'Pants', 'BACK POCKETS NO POCKETS', 'SLIM FIT', 'NO PANT CUFFS', 'DISPLACED', 'PLEATED';
--EXEC usp_InsertPants 90.0, 'pants3.jpg', 'Pants 3', 'Description for Pants 3', 15, 'Linen', 'Beige', 'Pants', 'BACK POCKETS DOUBLE-WELTED POCKET WITH BUTTON', 'REGULAR FIT', 'WITH PANT CUFFS', 'NO BUTTON', 'DOUBLE PLEATS';
--EXEC usp_InsertPants 140.0, 'pants4.jpg', 'Pants 4', 'Description for Pants 4', 30, 'Polyester', 'Black', 'Pants', 'SIDE POCKETS VERTICAL', 'SLIM FIT', 'WITH PANT CUFFS', 'OFF-CENTERED: BUTTONLESS', 'DOUBLE PLEATS';
--EXEC usp_InsertPants 180.0, 'pants5.jpg', 'Pants 5', 'Description for Pants 5', 25, 'Wool', 'Grey', 'Pants', 'BACK POCKETS PATCHED X2', 'REGULAR FIT', 'NO PANT CUFFS', 'CENTERED', 'NO PLEATS';