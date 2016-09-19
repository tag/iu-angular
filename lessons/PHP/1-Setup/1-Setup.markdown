# 1. Setup
  
  - [ ] Review tech stack, discuss purpose of PHP
  - [ ] PHP is an interpreted server-side language
  
## Server set up
  - [ ] If they haven't already, students should run the new SQL script, to 
    populate `StockTicker` table
   
## Copy files

  - [ ] Connect to web server, open FTP client
  - [ ] Each student should make their own "playground" folder, so that all may
        do lessons, but so they don't step on each other.
  - [ ] Create a phpinfo page to make sure everything is working
  
  ```php
  <?php
  phpinfo();
  
  ```
  
## Create new folders for PHP
  
  - [ ] Create folders for project (inside "playground" folder)
  - [ ] Create `api` folder, for PHP endpoints
  - [ ] Create `app` folder, for PHP support files
  - [ ] Show [php.net](http://php.net/docs.php) as a good source for documentation
  
  ```
    # File structure should look something like this:
    
    [root/play]
      +- app   (php app specific files; will be private)
      +- api   (php api endpoints files)
      +- css   (folder)
      +- js    (folder, holds js lib files)
      |  +- lib   
	  |     |- angular-1.5.7.js  (etc., etc.)
      |  +- app (angular js app files go here)
      |- index.html
    ```
