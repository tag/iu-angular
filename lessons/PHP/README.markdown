
PHP "Lessons"
=============

  1. Explain purpose of PHP, and set up for future lessons
    
    - Review tech stack, discuss purpose of PHP
    - PHP is an interpreted server-side language
    - Connect to web server, open FTP client
    - Each student should make their own "playground" folder, so that all may
      do lessons, but so they don't step on each other.
    - Download `7.after` zip; from Angular "Working With API" lesson
    - Copy the Angular files to server
    - All static files should normally be in the server's document root, but
      put a copy of 7.after in your personal 'play' folder for now.
    - TEST: Visit the `index.html` page in a browser to make sure it's working.
    - Create `api` folder, for PHP endpoints
    - Create `php-app` folder, for PHP support files
    - Show [php.net](http://php.net/docs.php) as a good source for documentation
    
  2. Simple api file with dummy data (perhaps even start this during AngularJS session)

    - create `api/MasterTool.php`
    - straight JSON dummy output
    - use `<?php` to begin processing in a file.
    - explain variables, e.g., `$var`
    - create an PHP_ARRAY:`array('key'=>'value')`
    - accessing array members: `$arr['prop']`
    - output data with `echo`; explain difference between '' and ""
    - output the results of `json_encode()`

  3. Classes

    - Make a class file, `php-app/Model/MasterTool.php`
    - Create a simple class, with attributes
    - Explain `public`, `private`
    - Explain comments
    - EXCERCISE: Add the remaining attributes of `MasterTool` class
    - Accessing class variables: (`$this->varName`)
    - Class method example
    - Create a constructor, `__construct()`
    - Optional parameters
    - `json_encode()` sees only public attributes by default
    - Test the model with some dummy data. (Doesn't work)
    - `require()` statements, and a shared `../php-app/environment.php` file
    - Test again. (Works now)

  4. Connect DB to an array of model

    - Explain the steps of connecting to a database
    - Use PDO to create a database connection
    - Create DB constants in `php-app/environment.php`
    - Create and run a SQL statement
    - Add error handling
    - Handle the results of the query (if any)
    - Loops
    - Test whether it works.

  5. Filter query with GET params

    - Add folder `api/MasterTool`
    - Add file `api/MasterTool/filter.php`
    - Review HTTP methods GET and POST, introduce PHP magic
      "superglobals" `$_GET`, `$_POST`
    - PHP only works when served from same server as Angular files
    - Copy/paste the contents of `/api/MasterTools.php` to `filter.php`.
    - Modify path to environment file (one level deeper than before)
    - Explain that we'll read in the data from `$_GET`
    - Open a db connection, and prepare the SQL
    - Explain parameterized queries
    - Explain SQL injection, briefly
    - Test!

  6. Connect DB to model with parameterized query
    
    - Add file `api/MasterTool/create.php`
    - Review HTTP methods GET and POST
    - Introduce PHP magic "superglobals" `$_GET`, `$_POST`
    - Adjust to reading in data from Angular (it's JSON instead of url-encoded)
    - Tweak `environment.php` so we get better error information (dev only)
    - Mention Angular XSS protections, ways to test our code
    - Read in data from `$_POST`, and create a MasterTool object
    - Open a db connection, and prepare the SQL
    - Explain parameterized queries
    - Handle the query results, and respond
    - Encourage students to build a delete page on their own. (It's almost
      exactly the same.) An example is included in the "after" folder.

  7. Cleanup

    - There are a few small cleanup steps we should accomplish in `php-app/environment.php`
    - It may be easier to simply download the "after" file, and talk through
      the changes
    - PHP and 'autoload' functions
    - Set the `Content-type` header, because we should
    - Personalize your code?
    - EXCERCISE: Implement FieldEngineer's Request object end-to-end w/
      PHP and Angular
