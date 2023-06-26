# List of criteria used to compare Record and Replay tools

For all criteria, we'll check whether the script obtains them and then whether the recorder succeeds in replaying them.

## Mouse Action

### Atomic Events
* onclick The user clicks on an element
    * how : open the browser, goto the web site, click one time on the backgound     
* oncontextmenu	The user right-clicks on an element
    * how : open the browser, goto the web site, right click, back
* ondblclick The user double-clicks on an element
    * how : open the browser, goto the web site, double click one time on the backgound
* double click on a text
    * how : we place the mouse on a text, then we double click on him.
* onmouseenter	The pointer is moved onto an element
    * how : we place the mouse on the body 
* onmouseleave	The pointer is moved out of an element
    * how : we move out the mouse of the body 
* onmousemove	The pointer is moving over an element
    * how : we move the mouse on the body


### Scenarios
* Follow hypertext link
    * how : click on a hypertext link, wait the browser to load the new page, click on an element in the new page (2 clicks on two pages).
    * why : it's one of the simplest and most popular mouse actions, and being able to navigate with hypertext is a fundamental thing.

* The menus activate by click
    * how : a user click on a button for activate a menu, then he click on the first link in the menue
    * why : Hover menus are very difficult to detect, so it's important to test them.

* The hovers menues
    * how : hover your mouse over a hover menu, then click on the first link you see to another page
    * why : Hover menus are very difficult to detect, so it's important to test them. They're different from menus activated by a click.

* Copy and paste with the context menue
    * how : Select a text with a double click, then right click on the selected text. Copy him then pas him in a form.
    * why : Copy and paste is an important feature, and we're going to test whether it's really possible to do this with the mouse and then again with the keyboard.

* The combo box 
    * how : we click on a combo box, then we select the first possible value, then the second.
    * why : like the hover menues, the combo box are difficult to detect for the recorder. So it's worth testing them..

* The scroll
    * how : we go to a website with a scroll bar, then use the mouse wheel to scroll.
    * why : moving around a website with the mouse wheel is a very popular action, so it's worth testing it out

## KeyBoard

### Atomic event
* onkeydown	A user presses a key
    * how : we press the 'a' key without selecting an element
* onkeypress A user presses a key
    * how : we keep pressing the 'a' key without selecting an item
* onkeyup A user releases a key
    * how : we press the 'a' key without selecting an element


### Senarios
* Press tab
    * how : we press the tab key and cycle through all the elements of the web page
    * why :  In the keyboard scenarios, we're trying to test whether it's possible to use keyboard commands like tab.

* Press the Enter key on an item to navigate.
    * how : press enter on a tab-selected element such as a href to navigate to another page
    * why : after testing "tab", we test whether we can interact with the selected element

* Copy and paste with keyboard
    * how : select a text with the mouse (if possible), then press control+C, then go to an input field and press control+V
    * why :  In the keyboard scenarios, we're trying to test whether it's possible to use keyboard commands like a copy paste.

* select text with ctrle+A
    * how : we go to an input field, then type a random text (like "hello world"), then press control+A and delete the text.
    * why :  In the keyboard scenarios, we're trying to test whether it's possible to use keyboard commands like controle+A.

* go back with ctrle+Z
    * how : we go to an input field, then type a random text (like "hello world"), then we delete the text then we press controle+Z.
    * why :  In the keyboard scenarios, we're trying to test whether it's possible to use keyboard commands like controle+Z.

## Keyboard + mouse
* fill a text field and submit with the enter key
    * how : click on a text field, then type a random text (like "Hello World"), then submit it with the "enter" key.
    * why : Filling in text is a popular action, so it's obvious to test it. We can submit the input with 2 methods, here we test with the keyboard.

* fill a text field and submit with the submit button
    * how : click on a text field, then type a random text (like "Hello World"), then submit it with a click on the submit button.
    * why : Filling in text is a classic action, so it's obvious to test it. We can submit the input with 2 methods, here we test with the submit button

* Select and delete
    * how : Select a text in a text field with the mouse, then start typing a random text (such as "Hello World"). If the text is correct, the previous test should be replaced by the text you typed.
    * why : The select delete function is very important and practical, so it's important to test it.



## Site used

To carry out the tests, I've decided to use 3 different sites for greater precision, so all 3 must have the necessary functionality to test all the criteria. The difficulty lies in finding 3 pages that have a hover menu, a combo box and a search text field. Most of the other criteria are found on all websites. It's also much more efficient to test on the most popular sites, so I picked the top 3 sites with all the features from the official rankings (https://www.similarweb.com/top-websites/) and tested on them. So, the first one is eBay (https://www.ebay.com/), the second id fandom (https://www.fandom.com/) and the last is cdiscount (https://www.cdiscount.com/), not in the ranking of most popular websites, but still a very popular website.