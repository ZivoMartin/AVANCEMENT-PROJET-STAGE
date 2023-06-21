## Mouse:

### Simple event
* click on div: Yes
* click on img: Yes
* click on input: Yes
* right click: Does not differentiate between a right click and a left click and isn't capable to use the contextmenu.
* dbleclick on div: Yes
* dbleclick on img: Yes
* dbleclick on input: Yes
* onmousedown: No
* onmouseenter: No
* onmouseleave: No
* onmousemove: No
* onmouseout: No
* onmouseover: No
* onmouseup: No

### Senarios
* A user clicks on a hypertext link, the browser loads the new page, the user then clicks on an element in the new page (2 clicks on two pages):    It works, but the transitions are very fast. It is necessary to add time.sleep in the script to understand what is being displayed on the screen.

* A user hovers their mouse over a hover menu and clicks on a link to another page : Selenium doesn't detect the hover menu.

* The user do a copy and paste with the mouse: No 

* The user click on a combo box and selects a subbmenu:

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