drop database TailorManagement;
create database TailorManagement;
use TailorManagement;

-- Table Account
Create table Account (
	AccountID INT AUTO_INCREMENT PRIMARY KEY,
    Username char(40) unique,
    Name varchar(80) character set utf8mb4,
    Phone char(15),
    Email varchar(320),
    Address varchar(200) character set utf8mb4,
    password varchar(150),
    role bool
);

-- Table Customer measurement
Create table BodyMeasurement (
	Customer int primary key,
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
	PantsCircumference DECIMAL(10, 2),
    weight DECIMAL(10, 2),
    Point int
);

-- --------------------------
-- << 14. Table Product >>
-- --------------------------
Create table Product (
	ProductID int auto_increment primary key,
    Price FLOAT,
    Image varchar(100),
    Name varchar(100) character set utf8mb4,
    Description text character set utf8mb4,
    Discount TINYINT,
    Fabric int,
    FabricName varchar(100) character set utf8mb4,
    color varchar(50),
    Type varchar(20)
);
-- --------------------------
-- << 3. Tables for Jacket >>
-- --------------------------

Create table Jacket (
	JacketID int auto_increment primary key,
    Style int,
    Fit int,
    Lapel int,
    SleeveButton int,
    BackStyle int,
    BreastPocket int,
	Pocket int
);
 -- Jacket's components
Create table JacketPocket (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table JacketSleeveButton (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table JacketBackStyle (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table JacketLapel (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table JacketFit (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table JacketStyle (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table JacketBreastPocket (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

-- -----------------------------------
-- << 4. Tables for Vest >>
-- -----------------------------------
Create table Vest (
	VestID int auto_increment primary key,
    Style int,
    Type int
);


Create table VestStyle (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table VestType (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

-- -----------------------------------
-- << 5. Tables for Pants >>
-- -----------------------------------
Create table Pants (
	PantsID int auto_increment primary key,
    Pocket int,
    Cuff int,
    Fit int,
    Fastening int,
    Pleats int
);


Create table PantsPocket (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table PantsCuff (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table PantsFit (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table PantsPleats (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

Create table PantsFastening (
	ID int auto_increment primary key,
    Name varchar(100) character set utf8mb4,
    Image varchar(100)
);

-- -----------------------------------
-- << 5. Tables Order >>
-- -----------------------------------
Create table Orders (
	OrderId int auto_increment primary key,
    customer int,
    Address varchar(150) character set utf8mb4,
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
	Orders int,
    Product int,
    NumberOfOrder int,
    Price float
);

-- -----------------------------------
-- << 7. Tables Evaluation >>
-- -----------------------------------
Create table Evaluation (
	ID int auto_increment primary key,
    Product int,
    Rate tinyint,
    Comment varchar(300) character set utf8mb4,
    Evaluator int,
    Username char(40)
);

-- -----------------------------------
-- << 8. Tables Cart >>
-- -----------------------------------
Create table Cart (
	ID int auto_increment primary key,
	Customer int,
    Product int,
    NumberOfProduct int
);

-- -----------------------------------
-- << 9. Tables WishList >>
-- -----------------------------------
Create table WishList (
	Customer int,
    Collection int,
    
    Constraint PK_WL primary key(Customer, Collection)
);

-- -----------------------------------
-- << 10. Tables Collection >>
-- -----------------------------------
Create table Collection (
	Id int auto_increment primary key,
    Name varchar(150) character set utf8mb4,
    Description text,
    Jacket int,
    Vest int,
    Pants int,
    Rate tinyint,
    Theme varchar(150) character set utf8mb4
);

-- -----------------------------------
-- << 11. Tables Fabric >>
-- -----------------------------------
Create table Fabric (
	FabricID int auto_increment primary key,
    FabricName varchar(100) character set utf8mb4,
    Meterial varchar(100),
    Price float,
    Color varchar(50),
    Style varchar(100),
    Image varchar(50),
    Category varchar(100),
    Inventory int
);

-- -----------------------------------
-- << 12. Tables Fabric Provided >>
-- -----------------------------------
Create table FabricProvided (
	Fabric int,
    Supplier int,
    Price float,
    Number int,
	
    Constraint PK_FP primary key(Fabric, Supplier)

);

-- -----------------------------------
-- << 13. Tables Supplier >>
-- -----------------------------------
Create table Supplier (
	SupplierID int auto_increment primary key,
    Name varchar(250) character set utf8mb4,
    Phone varchar(15),
    Email varchar(320),
    Address varchar(150) character set utf8mb4
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
	ADD CONSTRAINT FK_J_JF
		FOREIGN KEY (Fit) REFERENCES JacketFit (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Lapel) REFERENCES JacketLapel
	ADD CONSTRAINT FK_J_JL
		FOREIGN KEY (Lapel) REFERENCES JacketLapel (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (SleeveButton) REFERENCES JacketSleeveButton
	ADD CONSTRAINT FK_J_JSB
		FOREIGN KEY (SleeveButton) REFERENCES JacketSleeveButton (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Pocket) REFERENCES JacketPocket
	ADD CONSTRAINT FK_J_JP
		FOREIGN KEY (Pocket) REFERENCES JacketPocket (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (BackStyle) REFERENCES JacketBackStyle
	ADD CONSTRAINT FK_J_JBS
		FOREIGN KEY (BackStyle) REFERENCES JacketBackStyle (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (BreastPocket) REFERENCES JacketBreastPocket
	ADD CONSTRAINT FK_J_JBP
		FOREIGN KEY (BreastPocket) REFERENCES JacketBreastPocket (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (JacketId) REFERENCES Product
	ADD CONSTRAINT FK_J_Pt
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
	ADD CONSTRAINT FK_V_VT
		FOREIGN KEY (Type) REFERENCES VestType (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (VestID) REFERENCES Product
	ADD CONSTRAINT FK_V_Pt
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
	ADD CONSTRAINT FK_P_PC
		FOREIGN KEY (Cuff) REFERENCES PantsCuff (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Fastening) REFERENCES PantFastening
	ADD CONSTRAINT FK_P_PF
		FOREIGN KEY (Fastening) REFERENCES PantsFastening (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Fit) REFERENCES PantsFit
	ADD CONSTRAINT FK_P_PFt
		FOREIGN KEY (Fit) REFERENCES PantsFit (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Pleats) REFERENCES PantsPleats
	ADD CONSTRAINT FK_P_PPl
		FOREIGN KEY (Pleats) REFERENCES PantsPleats (ID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (PantsID) REFERENCES Product
	ADD CONSTRAINT FK_P_Pt
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
	ADD CONSTRAINT FK_E_Pt
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
	ADD CONSTRAINT FK_C_Pt
		FOREIGN KEY (Product) REFERENCES Product (ProductID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;
-- Collection
ALTER TABLE Collection
-- (Jacket) REFERENCES Jacket
	ADD CONSTRAINT FK_CLT_J
		FOREIGN KEY (Jacket) REFERENCES Jacket (JacketID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Vest) REFERENCES Vest
	ADD CONSTRAINT FK_CLT_V
		FOREIGN KEY (Vest) REFERENCES Vest (VestID)
		ON DELETE CASCADE
		ON UPDATE CASCADE,
-- (Pants) REFERENCES Pants
	ADD CONSTRAINT FK_CLT_P
		FOREIGN KEY (Pants) REFERENCES Pants (PantsID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;

-- WishList
-- (Customer) REFERENCES Account
ALTER TABLE WishList
	ADD CONSTRAINT FK_WL_A
		FOREIGN KEY (Customer) REFERENCES Account (AccountID)
		ON DELETE CASCADE
		ON UPDATE CASCADE, 
-- (Collection) REFERENCES Collection
	ADD CONSTRAINT FK_WL_CLT
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
    ADD CONSTRAINT FK_OD_Pt
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
	ADD CONSTRAINT FK_FP_S
		FOREIGN KEY (Supplier) REFERENCES Supplier (SupplierID)
		ON UPDATE CASCADE;
        
-- Body Mesurement
ALTER TABLE BodyMeasurement
	ADD CONSTRAINT FK_BM_A
		FOREIGN KEY (Customer) REFERENCES Account (AccountID)
		ON DELETE CASCADE
		ON UPDATE CASCADE;