-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- Link to schema: https://app.quickdatabasediagrams.com/#/d/9SNscs
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.

-- Modify this code to update the DB schema diagram.
-- To reset the sample schema, replace everything with
-- two dots ('..' - without quotes).

	CREATE TABLE "Client" (
		"client_id" INT   NOT NULL,
		"client" VARCHAR(50)   NOT NULL,
		"client_" VARCHAR(50)   NOT NULL,
		"region" VARCHAR(50)   NOT NULL,
		"enterprise" VARCHAR(50)   NOT NULL,
		CONSTRAINT "pk_Client" PRIMARY KEY (
			"client_id"
		 )
	);

	CREATE TABLE "Product" (
		"product_id" INT   NOT NULL,
		"product" VARCHAR(50)   NOT NULL,
		"product_" VARCHAR(50)   NOT NULL,
		"formula" VARCHAR(10)   NOT NULL,
		"product_category" VARCHAR(50)   NOT NULL,
		"product_type" VARCHAR(50)   NOT NULL,
		CONSTRAINT "pk_Product" PRIMARY KEY (
			"product_id"
		 )
	);

	CREATE TABLE "Crop" (
		"crop_id" INT   NOT NULL,
		"crop" VARCHAR(50)   NOT NULL,
		"crop_" VARCHAR(50)   NOT NULL,
		"crop_category" VARCHAR(50)   NOT NULL,
		CONSTRAINT "pk_Crop" PRIMARY KEY (
			"crop_id"
		 )
	);

	CREATE TABLE "Sales" (
		"sales_id" SERIAL PRIMARY KEY,
		"client_id" INT   NOT NULL,
		"product_id" INT   NOT NULL,
		"crop_id" INT   NOT NULL,
		"month" INT   NOT NULL,
		"profit" FLOAT   NOT NULL,
		"cost" FLOAT   NOT NULL,
		"sales" FLOAT   NOT NULL,
		"volume" FLOAT   NOT NULL,
		"source" VARCHAR(20)   NOT NULL,
		"presentation" VARCHAR(10)   NOT NULL,
		"year" INT   NOT NULL
	);

	ALTER TABLE "Sales" ADD CONSTRAINT "fk_Sales_client_id" FOREIGN KEY("client_id")
	REFERENCES "Client" ("client_id");

	ALTER TABLE "Sales" ADD CONSTRAINT "fk_Sales_product_id" FOREIGN KEY("product_id")
	REFERENCES "Product" ("product_id");

	ALTER TABLE "Sales" ADD CONSTRAINT "fk_Sales_crop_id" FOREIGN KEY("crop_id")
	REFERENCES "Crop" ("crop_id");

