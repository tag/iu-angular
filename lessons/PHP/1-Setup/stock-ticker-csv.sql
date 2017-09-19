
-- You may need to change and uncomment the following:
-- USE dbname;

-- You may also need to change the input CSV file at the bottom.

DROP TABLE IF EXISTS StockPrice;

CREATE TABLE StockPrice (
    company varchar(36) NOT NULL,
    ticker varchar(8) NOT NULL,
	date date NOT NULL,
	open decimal(20,6) DEFAULT NULL,
	high decimal(20,6) DEFAULT NULL,
	low decimal(20,6) DEFAULT NULL,
	close decimal(20,6) DEFAULT NULL,
	adjClose decimal(20,6) DEFAULT NULL,
	volume BIGINT DEFAULT NULL,
	PRIMARY KEY (ticker,date)
);


LOAD DATA LOCAL INFILE '~/stock-2015-2017.csv' INTO TABLE StockPrice
FIELDS TERMINATED BY ','
LINES TERMINATED BY '\n';
