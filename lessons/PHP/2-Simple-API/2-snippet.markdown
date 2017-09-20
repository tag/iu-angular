
# 2. Simple api file with dummy data

  - [ ] Create `api/stockPrice.php`
  - [ ] Begin with straight JSON dummy output, no PHP processing:

    ```js
    [{
        "stock": "MSFT",
        "date": "2016-09-16",
        "open": 57.630001,
        "high": 57.630001,
        "low":  56.75,
	    "close": 57.25,
	    "volume": 44493500,
	    "adjClose": 57.25
    }]
    ```
   
    - **TEST by reloading the page**
    
  - [ ] Use `<?php` to begin processing in a file.

    - Use the full tag, not the "short tag", `<?`
    - Although files can be be mixed PHP and HTML, by convention, keep files
      as one or the other. Don't use closing tags (`?>`) in PHP-only files, as
      it can cause hard-to-track bugs (like outputting content before sending
      headers.)

  - [ ] Explain [variables](http://php.net/manual/en/language.variables.basics.php),
    e.g., `$var`

  - [ ] Create an [array](http://php.net/manual/en/language.types.array.php):
    `array('key'=>'value')`

    - We call these "arrays" (more specifically, "associative arrays"), but
      when we specify textual keys, these are similar to Javascript objects.
      If we use only numeric keys, they behave like Javascript arrays.

  - [ ] Accessing array members: `$arr['prop']`

  - [ ] Output data with `echo`

    - Strings can use single quotes `' '` or double quotes `" "`. The parser will
      accept escape sequences (`\t\n`) and will try to expand variables within double
      quotes, but will only process the escaped single quite within single
      quotes. For more information, see the [string type](http://php.net/manual/en/language.types.string.php) documentation.
    
    - Concatenate strings with `.`

    ```php
    <?php
    echo 'Foo\n ' . "Foo\n";
    
    $var = 1.21;
    
    echo '$var gigawatts\n';
    echo "$var gigawatts\n";
    
    $arr = array(
        'id'=>1,
        'price'=>5.45,
        'name'='hammer'
    );
    echo $arr;
    ```
    
    - Test and run on the server.
    
    - Notice how output is squished together, with no new lines, because it's
      being processed as HTML. If you "View Source", you'll see the newlines.
    
  - [ ] Create a sample array, and output the results of `json_encode()`.

	```php
	<?php

	$stock = array(
	    'ticker'   => 'AAPL',
	    'date'     => '2016-09-16',
	    'open'     => 115.120003,
	    'high'     => 116.129997,
	    'low'      => 114.040001,
		'close'    => 114.919998,
		'volume'   => 79677200,
		'adjClose' => 114.919998
	);

	echo json_encode($stock);
	````

  - [ ] Create another stock array. Push both stocks onto an aggregating array with `array_push()`
    
    - **TEST by reloading the page**

