# Learning Notes: Periodic Tables Project

### Description:
I decided to improve this project I first built in 2013 to add new features and use more modern tooling.

**Goals:**

- [x] Use JavaScript templating for the typefaces table, the typeface meta card, and the typeface meta modal
- [x] When clicking on a typeface in the table, open a modal with more detailed information about that typeface
- [ ] Open tooltip on hover
- [x] Optimize SVGs
- [x] [Inline SVGs](https://css-tricks.com/svg-symbol-good-choice-icons/) with `symbol` 
- [ ] Fix any weirdness with corrupted SVGs
- [ ] Make table responsive
- [ ] Add detailed description (from Wikipedia?) to the modal

### 06/20/2016

**Mustache.js**

- Was a bit confused about how to use the npm package version of Mustache (where to put the JS and `Mustache.render` commands, etc)
- Decided to just include the mustache.js file and follow tutorials online
- Also had to figure out how to load external files, because my views were already complicated enough that defining them as variables in a single function would be gross
- Don't really know the importance of the 2nd two arguments in the [`getJSON`](https://github.com/jessabean/periodic_table_typefaces/blob/6d57ece54b2a39f7d0b17ed55d8bb29dd350bc3c/_layouts/test.html#L53) function (`$.getJSON('./js/typefaces.json', {}, function (typefaceData, textStatus, jqXHr)`) or where `typefaceData` comes from
  - It all magically works, but I'd like to know why/how 
- Wanted to be able to pull typeface family data attribute and, for example, convert that string to something I could use as a CSS class
  - Had to play around on regex websites to figure out how to target spaces and special characters
  - [My solution](https://github.com/jessabean/periodic_table_typefaces/blob/16db1409730121f37fb419ed0779a660e595ca27/_layouts/test.html#L59) seems gross; there has to be a better way?
 
**Resources:**

- [How to load Mustachejs templates from an external file with jQuery](http://www.levihackwith.com/how-to-load-mustache-js-templates-from-an-external-file-with-jquery/)
- [External templates using Mustache, jQuery](https://devdays.com/2014/05/07/object-javascript-external-templates-using-mustache-jquery/)

### 06/21/2016

- Update on `getJSON` confusion:
  - Learned more about callbacks today, and realized that's what I'm looking at
  - 1st argument: the URL (e.g., path to my typefaces.json file), 2nd argument: object or string sent along with request, 3rd argument: callback function for when request succeeds
  - Then the callback function takes 3 arguments as well: object data, textStatus, jqXHR
  - Still need to figure out how first argument is defined: e.g., is `typefaceData` just a variable pointing to my JSON data?
- Sass Maps weirdness: trying to implement an `@each` loop on a nested map and then create a class from an interpolated variable, and nothing was happening
  - I was trying to use the syntax for a list `@each $key in $list` but that won't work on maps 
  - This [Stack Overflow post](http://stackoverflow.com/questions/32286463/sass-looping-through-nested-list-is-not-a-map-for-map-get) helped explain the `@each $key, $value` syntax I need to use

**Resources:**

- [jQuery.getJSON() docs](http://api.jquery.com/jquery.getjson/)
- [Using Sass functions to create complex variable maps](http://codepen.io/jakealbaugh/post/using-sass-functions-to-access-complex-variable-maps)
- [An introduction to Sass maps](http://webdesign.tutsplus.com/tutorials/an-introduction-to-sass-maps-usage-and-examples--cms-22184)

### 06/22/2016

- Weirdness with the hover effects on the periodic table: couldn't get the card to show up when hovering over li tags

```
$('li.typeface').hover(buildCard);
```

**Learnings:**
- When dynamically creating elements (hello, dynamically generated periodic table!), delegate handlers to parent elements, e.g. document
