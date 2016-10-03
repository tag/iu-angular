# 1 - Introduction to HTML

  - [ ] Review included slides. Answer the following questions:
    * What does HTML stand for?
    * What is a tag?
    * What is the DOM?
    * What is the structure of the DOM?
    
  - [ ] Create a simple HTML file. Call it `index.html`
    
    * Files named `index.html` (and `index.htm` or 
      `index.php`) get special treatment by the web server

  - [ ] `<title>` is a require tag. Give your page a title.
        Save and reload.
    
    ```html
    <html>
    <head>
        <title>Demo 1 - Hello World</title>
    </head>
    <body>
    </body>
    </html>
    ```

  - [ ] Add basic tags to the body 
  
    ```html
    <div class="content">
        <h1>Hello World!</h1>
        <p>Welcome to Bloomington!</p>
    </div>
    ```

      * Explain `<div>` and `<p>` tags
      * Explain `<h1>` through `<h6>` tags
  
  - [ ] Make some thing bold or italics 
  
    ```html
    <div class="content">
        <h1>Hello World!</h1>
        <p><em>Welcome</em> to <strong>Bloomington!</strong></p>
    </div>
    ```
    
  - [ ] In general, there are two difference types of (visible) tags: *inline 
        elements* and *block elements*.
        
      * Are `<p>` tags block or inline?
      * What about bold and italics?
    
  - [ ] Explain `id` and `class`
  
  - [ ] Create a nav bar, explain lists `<ul>` and links `<a href="...">`
  
  ```html
  <div id="navBar">
      <ul>
          <li><a href="#">Link one</a></li>
          <li><a href="http://bing.com">Search</a></li>    
      </ul>
  </div>
  ```
  