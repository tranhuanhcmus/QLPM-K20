use tailormanagement;

/*
test area

select * from Fabric;
select * from Product;
select * from Jacket;
select * from JacketStyle;
select * from JacketSleeveButton;



*/
SET SQL_SAFE_UPDATES = 0;
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

SET SQL_SAFE_UPDATES = 1;


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
INSERT INTO JacketStyle (Name, Image) VALUES
('Single-Breasted 1 Button', 'SingleBreasted1Button.jpg'),
('Single-Breasted 2 Buttons', 'SingleBreasted2Buttons.jpg'),
('Single-Breasted 3 Buttons', 'SingleBreasted3Buttons.jpg'),
('Double-Breasted 2 Buttons', 'DoubleBreasted2Buttons.jpg'),
('Double-Breasted 4 Buttons', 'DoubleBreasted4Buttons.jpg'),
('Double-Breasted 6 Buttons', 'DoubleBreasted6Buttons.jpg'),
('Mandarin', 'Mandarin.jpg');
-- Insert data into JacketFit
INSERT INTO JacketFit (Name, Image) VALUES
('Slim Fit', 'SlimFit.jpg'),
('Regular', 'Regular.jpg');

-- Insert data into JacketLapel
INSERT INTO JacketLapel (Name, Image) VALUES
('Notch', 'Notch.jpg'),
('Peak', 'Peak.jpg'),
('Shawl', 'Shawl.jpg'),
('Slim', 'Slim.jpg'),
('Standard', 'Standard.jpg'),
('Wide', 'Wide.jpg');

-- Insert data into JacketPocket
INSERT INTO JacketPocket (Name, Image) VALUES
('No Pockets', 'NoPockets.jpg'),
('With Flap', 'WithFlap.jpg'),
('Double-Welted', 'DoubleWelted.jpg'),
('Patched', 'Patched.jpg'),
('With Flap X3', 'WithFlapX3.jpg'),
('Double-Welted X3', 'DoubleWeltedX3.jpg'),
('Standard', 'Standard.jpg'),
('Slanted', 'Slanted.jpg');

-- Insert data into JacketSleeveButton
INSERT INTO JacketSleeveButton (Name, Image) VALUES
('0', '0.jpg'),
('2', '2.jpg'),
('3', '3.jpg'),
('4', '4.jpg');

-- Insert data into JacketBackStyle
INSERT INTO JacketBackStyle (Name, Image) VALUES
('Ventless', 'Ventless.jpg'),
('Center Vent', 'CenterVent.jpg'),
('Side Vents', 'SideVents.jpg');

-- Insert data into JacketBreastPocket
INSERT INTO JacketBreastPocket (Name, Image) VALUES
('No', 'No.jpg'),
('Yes', 'Yes.jpg'),
('Patched', 'Patched.jpg'),
('Patched X2', 'PatchedX2.jpg');


-- Insert 7 rows into the Product and Jacket tables using the procedure
CALL InsertJacket(65.0, 'jacket1.jpg', 'Jacket 1', 'Description for Jacket 1', 10, 1, 'Cotton', 'White', 'Type 1', 'Single-Breasted 1 Button', 'Slim Fit', 'Notch', '1', 'No Pockets', 'Ventless', 'No');
CALL InsertJacket(80.0, 'jacket2.jpg', 'Jacket 2', 'Description for Jacket 2', 20, 2, 'Silk', 'Pink', 'Type 2', 'Single-Breasted 2 Buttons', 'Regular', 'Peak', '2', 'With Flap', 'Center Vent', 'Yes');
CALL InsertJacket(90.0, 'jacket3.jpg', 'Jacket 3', 'Description for Jacket 3', 15, 3, 'Linen', 'Beige', 'Type 3', 'Single-Breasted 3 Buttons', 'Regular', 'Shawl', '3', 'Double-Welted', 'Side Vents', 'No');
CALL InsertJacket(140.0, 'jacket4.jpg', 'Jacket 4', 'Description for Jacket 4', 30, 4, 'Polyester', 'Black', 'Type 4', 'Double-Breasted 2 Buttons', 'Slim Fit', 'Standard', '2', 'With Flap X3', 'Center Vent', 'No');
CALL InsertJacket(180.0, 'jacket5.jpg', 'Jacket 5', 'Description for Jacket 5', 25, 5, 'Wool', 'Grey', 'Type 5', 'Double-Breasted 4 Buttons', 'Regular', 'Standard', '4', 'Double-Welted X3', 'Side Vents', 'Yes');
update Jacket set SleeveButton = 1 where JacketID = 1;
-- Repeat the CALL InsertJacket procedure with different data for the remaining jackets (up to 2 more times).

