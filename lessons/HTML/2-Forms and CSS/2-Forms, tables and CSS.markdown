# Forms, Tables, and CSS

##Forms

  - [ ] REVIEW: Create a new HTML page, called `myForm.html`
  
    - Add a title, a heading, and a paragraph of text
  
  - [ ] Add a `DOCTYPE` to the top of all HTML files
  
  ```html
  <!DOCTYPE html>
  ```
  - [ ] Add form and input: 

    ```html
    <form class="tool">
        <p>
            <label for="userName">Enter your name: </label> 
            <input id="userName">
        </p>
        <button type="submit">Submit</button>
    </form>
    ```
    
    - `<form>` tags use the `action` and `method` attributes. `action` tells
      the form where to submit to, while `method` specifies the HTTP method to use
    - `action` may be `#`.
    - `<input>` does not have a closing tag
    - `<input>` tags can be many [types][INPUT_TYPES], such as `number`, `date`, 
      `email`, `url`. Some change the look of the input, like `button` or `submit`
    - Forms should typically have a `submit` input
    - Discuss importance of `<label>` tag
    
    
[INPUT_TYPES]:https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input
    
  - [ ] EXERCISE: Build a form that submits to our dynamic API.
  
  ```html
      <form action="api/StockPrice/byDate.php" method="get">
      <p>
          <label for="ticker">Ticker:</label>
          <input id="ticker" name="ticker">
      </p>
      <p>
          <label for="date">Date:</label>
          <input id="date" name="date">
      </p>
         <input type="submit" value="Go!"> 
      </form>
  ```
  
  
## Tables

  - [ ] Explain `<table>`, and associated tags: `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`.
      
  ```html
    <table>
        <thead>
            <tr>
                <th>Stock</th>
                <th>Price</th>
                <th>Market Cap</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>DISN</td>
                <td>92.8</td>
                <td>151.0 B</td>
            </tr>
            <tr>
                <td>TWTR</td>
                <td>23.05</td>
                <td>$16.3 B</td>
            </tr>
        </tbody>
    </table>
  ```

##CSS

  - [ ] CSS is a way to separate concerns. Three places to put style information
    
    - Inline, with `style` attribute
    - `<style>` tag in `<head>`
    - External style sheet; this is the preference

  - [ ] Change font of all content in the file

  ```css
    body {
        font-family: sans-serif;
    }
  ```

  - [ ] `font-family` can accept a list of fonts, and searches until one is found
  ```css
    body {
        font-family: Helvetica, Arial, sans-serif;
    }
  ```
  
  - [ ] Change `<h1>` to display a different color and font size.
      
    - When specifying `color`, it's good practice to also specify `background-color`.

  ```css
    h1 {
        color: royalblue;
        background-color: white;
        font-size: 18px;
    }
  ```

  - [ ] [Box model](http://www.w3schools.com/css/css_boxmodel.asp) (IMPORTANT!)
  
  - [ ] Identify elements by tag, by class (leading period), or by id (hash).
  
  ```css
  .content {
      color: royalblue;
      padding:  10px 10px 10px 10px;
  }

  #main {
        margin: 10px 10px;
        border: 2px solid purple;
        padding: 10px 20px 10px 20px;
  }
  ```
 