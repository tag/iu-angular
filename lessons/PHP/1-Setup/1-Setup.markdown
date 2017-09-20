# 1—Setup

  - [ ] Review tech stack, discuss purpose of PHP
  - [ ] PHP is an interpreted server-side language

## Server set up
  - [ ] If they haven't already, students should run the new SQL script, to
    populate `StockTicker` table

## Copy files

  - [ ] Connect to web server, open FTP client
  - [ ] Each student should make their own "playground" folder, so that all may
        do lessons, but so they don't step on each other.

## Create new folders for PHP

  - [ ] Create folders for project (inside personal "playground" folder)
  - [ ] Create `api` folder, for PHP endpoints
  - [ ] Create `php` folder, for PHP support files (you might see this called "app" in many environments)
  - [ ] Show [php.net](http://php.net/docs.php) as a good source for documentation
  
  ```
    # File structure should look something like this:
    
    [root/play]
      +- php   (php app specific files; will be private)
      +- api   (php api endpoints files)
      +- css   (folder)
      +- js    (folder, holds js lib files)
      |  +- lib
	  |     |- angular-1.5.7.js  (etc., etc.)
      |  +- app (angular js app files go here)
      |- index.html
  ```

## Test PHP

  - [ ] Create a `phpinfo()` page to make sure everything is working. Call it `info.php`.
  
  ```php
  <?php
  phpinfo();
  ```
  - [ ] Show [php.net](http://php.net/docs.php) as a good source for documentation
  
  - [ ] PHP allows a mix between static and dynamic content in the same file. However, this is poor practice. PHP files begin with `<?php`. Some resources will tell you to close your PHP tags (`?>`). Don't. As we will never mix PHP with static content, we don't need to. Also, closeing your tags can lead to hard to find errors in bigger applications.
  
  
## Load data to MySQL

  - [ ] Load one of the two SQL files:
      
      * `stock-ticker.sql` (old stock data)
      * Or, `stock-ticker-csv.sql` and the associated `stock-2015-2017.csv` file (preferred)
      
      There are directions in Canvas to help you do this.
