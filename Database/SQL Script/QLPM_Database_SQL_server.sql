use master;
go

if DB_ID('TailorManagement') IS NOT NULL
	drop database TailorManagement;

create database TailorManagement;
go

use TailorManagement;
go
-- Table Account
Create table Account (
	AccountID INT PRIMARY KEY,
    Username char(40) unique,
    Name nvarchar(80), -- character set utf8mb4
    Phone char(15),
    Email varchar(320),
    Address nvarchar(200), --  character set utf8mb4
    password varchar(150),
    role BIT
);

-- Table Customer measurement
Create table BodyMeasurement (
	Customer INT PRIMARY KEY,
    ShoulderWidth DECIMAL(10, 2),
	SleeveLength DECIMAL(10, 2),
	ArmCircumference DECIMAL(10, 2),
	Chest DECIMAL(10, 2),
	Waist DECIMAL(10, 2),
	FrontLength DECIMAL(10, 2),
	BackLength DECIMAL(10, 2),
	Neck DECIMAL(10, 2),
	WaistOfPants DECIMAL(10, 2),
	Hips DECIMAL(10, 2),
	BottomOfPants DECIMAL(10, 2),
	Thigh DECIMAL(10, 2),
	PantsLength DECIMAL(10, 2),
	PantsCircumference DECIMAL(10, 2)
);

-- --------------------------
-- << 14. Table Product >>
-- --------------------------
Create table Product (
	ProductID INT PRIMARY KEY,
    Price FLOAT,
    Image varchar(100),
    Name nvarchar(100), --character set utf8mb4
    Description text, --character set utf8mb4
    Discount TINYINT,
    Fabric INT,
    FabricName nvarchar(100), --character set utf8mb4
    color varchar(50),
    Type varchar(20)
);
-- --------------------------
-- << 3. Tables for Jacket >>
-- --------------------------

Create table Jacket (
	JacketID INT PRIMARY KEY, -- IDENTITY(1, 1)
    Style INT,
    Fit INT,
    Lapel INT,
    SleeveButton INT,
    BackStyle INT,
    BreastPocket INT,
	Pocket INT
);
 -- Jacket's components
Create table JacketPocket (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table JacketSleeveButton (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table JacketBackStyle (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table JacketLapel (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table JacketFit (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table JacketStyle (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table JacketBreastPocket (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

-- -----------------------------------
-- << 4. Tables for Vest >>
-- -----------------------------------
Create table Vest (
	VestID INT PRIMARY KEY, -- IDENTITY(1, 1)
    Style INT,
    Type INT
);


Create table VestStyle (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table VestType (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

-- -----------------------------------
-- << 5. Tables for Pants >>
-- -----------------------------------
Create table Pants (
	PantsID INT PRIMARY KEY, -- IDENTITY(1, 1)
    Pocket INT,
    Cuff INT,
    Fit INT,
    Fastening INT,
    Pleats INT
);


Create table PantsPocket (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table PantsCuff (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table PantsFit (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table PantsPleats (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

Create table PantsFastening (
	ID INT PRIMARY KEY,
    Name nvarchar(100), --character set utf8mb4
    Image varchar(100)
);

-- -----------------------------------
-- << 5. Tables Order >>
-- -----------------------------------
Create table Orders (
	OrderId INT PRIMARY KEY,
    customer INT,
    Address nvarchar(150), --character set utf8mb4
    TimeOrder datetime,
    Status varchar(50),
    TimeDone date,
    PaymentMethod varchar(100),
    ToTalPrice float
);

-- -----------------------------------
-- << 6. Tables Order Detail >>
-- -----------------------------------
Create table OrderDetail (
	Orders INT,
    Product INT,
    NumberOfOrder INT,
    Price float
);

-- -----------------------------------
-- << 7. Tables Evaluation >>
-- -----------------------------------
Create table Evaluation (
	ID INT PRIMARY KEY,
    Product INT,
    Rate tinyINT,
    Comment nvarchar(300), --character set utf8mb4
    Evaluator INT,
    Username char(40)
);

-- -----------------------------------
-- << 8. Tables Cart >>
-- -----------------------------------
Create table Cart (
	ID INT PRIMARY KEY,
	Customer INT,
    Product INT,
    NumberOfProduct INT
);

-- -----------------------------------
-- << 9. Tables WishList >>
-- -----------------------------------
Create table WishList (
	Customer INT,
    Collection INT,
    
    ConstraINT PK_WL PRIMARY KEY(Customer, Collection)
);

-- -----------------------------------
-- << 10. Tables Collection >>
-- -----------------------------------
Create table Collection (
	Id INT PRIMARY KEY,
    Name nvarchar(150), --character set utf8mb4
    Description text,
    JacketId INT,
    VestId INT,
    PantsId INT,
    Rate tinyINT
);

-- -----------------------------------
-- << 11. Tables Fabric >>
-- -----------------------------------
Create table Fabric (
	FabricID INT PRIMARY KEY,
    FabricName nvarchar(100), --character set utf8mb4
    Meterial varchar(100),
    Price float,
    Color varchar(50),
    Style varchar(100),
    Image varchar(50),
    Category varchar(100),
    Inventory INT
);

-- -----------------------------------
-- << 12. Tables Fabric Provided >>
-- -----------------------------------
Create table FabricProvided (
	Fabric INT,
    Supplier INT,
    Price float,
    Number INT,
	
    ConstraINT PK_FP PRIMARY KEY(Fabric, Supplier)

);

-- -----------------------------------
-- << 13. Tables Supplier >>
-- -----------------------------------
Create table Supplier (
	SupplierID INT PRIMARY KEY,
    Name nvarchar(250), --character set utf8mb4
    Phone varchar(15),
    Email varchar(320),
    Address nvarchar(150), -- character set utf8mb4
);



-- -----------------------------------
-- Foreign Key
-- -----------------------------------
/*
ALTER TABLE A
	ADD CONSTRAINT FK_A_Fabric
	FOREIGN KEY (fabric) REFERENCES Fabric (id)
	ON DELETE CASCADE
	ON UPDATE CASCADE;
*/

-- Jacket
-- (Style) REFERENCES JacketStyle
ALTER TABLE Jacket
	ADD CONSTRAINT FK_J_JS
		FOREIGN KEY (Style) REFERENCES JacketStyle (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Fit) REFERENCES JacketFit
	CONSTRAINT FK_J_JF
		FOREIGN KEY (Fit) REFERENCES JacketFit (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Lapel) REFERENCES JacketLapel
	CONSTRAINT FK_J_JL
		FOREIGN KEY (Lapel) REFERENCES JacketLapel (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (SleeveButton) REFERENCES JacketSleeveButton
	CONSTRAINT FK_J_JSB
		FOREIGN KEY (SleeveButton) REFERENCES JacketSleeveButton (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Pocket) REFERENCES JacketPocket
	CONSTRAINT FK_J_JP
		FOREIGN KEY (Pocket) REFERENCES JacketPocket (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (BackStyle) REFERENCES JacketBackStyle
	CONSTRAINT FK_J_JBS
		FOREIGN KEY (BackStyle) REFERENCES JacketBackStyle (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (BreastPocket) REFERENCES JacketBreastPocket
	CONSTRAINT FK_J_JBP
		FOREIGN KEY (BreastPocket) REFERENCES JacketBreastPocket (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (JacketId) REFERENCES Product
	CONSTRAINT FK_J_Pt
		FOREIGN KEY (JacketId) REFERENCES Product (ProductID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;


-- Vest
-- (Style) REFERENCES VestStyle
ALTER TABLE Vest
	ADD CONSTRAINT FK_V_VS
		FOREIGN KEY (Style) REFERENCES VestStyle (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Type) REFERENCES VestType
	CONSTRAINT FK_V_VT
		FOREIGN KEY (Type) REFERENCES VestType (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (VestID) REFERENCES Product
	CONSTRAINT FK_V_Pt
		FOREIGN KEY (VestID) REFERENCES Product (ProductID)
		ON DELETE CASCADE
        ON UPDATE CASCADE;

-- Pants

-- (Pocket) REFERENCES PantsPocket
ALTER TABLE Pants
	ADD CONSTRAINT FK_P_PP
		FOREIGN KEY (Pocket) REFERENCES PantsPocket (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Cuff) REFERENCES PantsCuff
	CONSTRAINT FK_P_PC
		FOREIGN KEY (Cuff) REFERENCES PantsCuff (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Fastening) REFERENCES PantFastening
	CONSTRAINT FK_P_PF
		FOREIGN KEY (Fastening) REFERENCES PantsFastening (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Fit) REFERENCES PantsFit
	CONSTRAINT FK_P_PFt
		FOREIGN KEY (Fit) REFERENCES PantsFit (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Pleats) REFERENCES PantsPleats
	CONSTRAINT FK_P_PPl
		FOREIGN KEY (Pleats) REFERENCES PantsPleats (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (PantsID) REFERENCES Product
	CONSTRAINT FK_P_Pt
		FOREIGN KEY (PantsID) REFERENCES Product (ProductID)
		ON DELETE CASCADE
        ON UPDATE CASCADE;

-- Evaluation
-- (Evaluator) REFERENCES Account
ALTER TABLE Evaluation
	ADD CONSTRAINT FK_E_A
		FOREIGN KEY (Evaluator) REFERENCES Account (AccountID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Product) REFERENCES Product (ProductID)
	CONSTRAINT FK_E_Pt
		FOREIGN KEY (Product) REFERENCES Product (ProductID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
        
-- Cart
-- (Customer) REFERENCES Account
ALTER TABLE Cart
	ADD CONSTRAINT FK_C_A
		FOREIGN KEY (Customer) REFERENCES Account (AccountID)
		ON DELETE CASCADE
		ON UPDATE CASCADE, 
-- (Product) REFERENCES Product (ProductID)
	CONSTRAINT FK_C_Pt
		FOREIGN KEY (Product) REFERENCES Product (ProductID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
-- Collection
ALTER TABLE Collection
-- (Jacket) REFERENCES Jacket
	ADD CONSTRAINT FK_CLT_J
		FOREIGN KEY (JacketId) REFERENCES Jacket (JacketID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Vest) REFERENCES Vest
	CONSTRAINT FK_CLT_V
		FOREIGN KEY (VestId) REFERENCES Vest (VestID),
		--ON DELETE CASCADE
		--ON UPDATE CASCADE,
-- (Pants) REFERENCES Pants
	CONSTRAINT FK_CLT_P
		FOREIGN KEY (PantsId) REFERENCES Pants (PantsID)
		--ON DELETE CASCADE
		--ON UPDATE CASCADE;

-- WishList
-- (Customer) REFERENCES Account
ALTER TABLE WishList
	ADD CONSTRAINT FK_WL_A
		FOREIGN KEY (Customer) REFERENCES Account (AccountID)
		ON DELETE CASCADE
		ON UPDATE CASCADE, 
-- (Collection) REFERENCES Collection
	CONSTRAINT FK_WL_CLT
		FOREIGN KEY (Collection) REFERENCES Collection (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
-- Orders
-- (Customer) REFERENCES Account
ALTER TABLE Orders
	ADD CONSTRAINT FK_O_A
		FOREIGN KEY (Customer) REFERENCES Account (AccountID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
        
-- Order Detail
-- (Orders) REFERENCES Orders
ALTER TABLE OrderDetail
	ADD CONSTRAINT FK_OD_O
		FOREIGN KEY (Orders) REFERENCES Orders (OrderID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Product) REFERENCES Product (ProductID)
    CONSTRAINT FK_OD_Pt
		FOREIGN KEY (Product) REFERENCES Product (ProductID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
	
-- Product
ALTER TABLE Product
	ADD CONSTRAINT FK_Pt_F
		FOREIGN KEY (Fabric) REFERENCES Fabric (FabricID)
		ON UPDATE CASCADE;
        
-- Fabric Provided
-- (Fabric) REFERENCES Fabric
ALTER TABLE FabricProvided
	ADD CONSTRAINT FK_FP_F
		FOREIGN KEY (Fabric) REFERENCES Fabric (FabricID)
		ON UPDATE CASCADE, 
-- (Supplier) REFERENCES Supplier
	CONSTRAINT FK_FP_S
		FOREIGN KEY (Supplier) REFERENCES Supplier (SupplierID)
		ON UPDATE CASCADE;
        
-- Body Mesurement
ALTER TABLE BodyMeasurement
	ADD CONSTRAINT FK_BM_A
		FOREIGN KEY (Customer) REFERENCES Account (AccountID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;