## Mouse:

### Simple event
* click on div: Yes
* right click: Does not differentiate between a right click and a left click and isn't capable to use the contextmenu.
* dbleclick : Yes
* dbleclick on a text :
* onmouseenter: No
* onmouseleave: No
* onmousemove: No


### Senarios
* Follow hypertext link: It works, but the transitions are very fast. It is necessary to add time.sleep in the script to understand what is being displayed on the screen.

* The menus activate by click : Selenium doesn't detect the hover menu.

* The hovers menues : No 

* Copy and paste with the context menue :

* The combo box :

## KeyBoard

### Atomic event
* onkeydown	: No
* onkeypress : No
* onkeyup : No	

### Senarios
* A user presses the Tab key to navigate within the page : Yes
* Pressing Enter on an element like an href to navigate to the page: Yes
* A user copies and pastes text using Ctrl+C and Ctrl+V : he didn't detect it but when u paste a text in an input he will type it so it work.
* A user selects text using Ctrl+A : No
* A user goes back using Ctrl+Z : Yes


## Keyboard + mouse
* fill a text field and submit with the enter key : 
* fill a text field and submit with the submit button : 
* Select and delete : 