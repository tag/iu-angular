#6 - POST With Parameters (and review)

  - [ ] REVIEW: What is a POST body?
    
    - POST bodies are typically url-form-encoded, but Angular sends raw JSON
    
  - [ ] Adapt our PHP API files to translate POST-ed JSON:
  
  ```PHP
  // In app/environment.php
  
  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
      $contentTypes = explode(';', $_SERVER['CONTENT_TYPE']); //parse content_type headers
      if ($contentTypes[0] == 'application/json') {
          $_POST = json_decode(file_get_contents('php://input'), true);
      }
  }
  ```
  
  - [ ] With this change, sending POST web service requests from Angular
        is largely similar to sending GET requests. Use the `data` parameter
        in the options hash instead of `params`:
        
    ```js
    $htttp.post( 
        url,
        {
            data: self.formData
        }
    ). then(
        // ...
    );
    ```