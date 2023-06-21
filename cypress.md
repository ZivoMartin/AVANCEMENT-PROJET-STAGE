## Mouse:

### Simple event
* click on div: Yes
* click on img: Yes
* click on input: Yes
* right click: Does not differentiate between a left click and a right click but is capable of using the context menu, such as copy and paste.
* dbleclick on div: Yes
* dbleclick on img: Yes
* dbleclick on input: Yes
* dbleclick on text: Yes
* onmousedown: No
* onmouseenter: No
* onmouseleave: No
* onmousemove: No
* onmouseout: No
* onmouseover: No
* onmouseup: No

### Senarios
* A user clicks on a hypertext link, the browser loads the new page, the user then clicks on an element in the new page (2 clicks on two pages): Yes

* A user hovers their mouse over a hover menu and clicks on a link to another page: No

* The user do a copy and paste with the mouse: Yes

* The user click on a combo box and selects a subbmenu: Cypress detects the click and the selection in a combo box, but the replayer doesn't replay them.


## KeyBoard

### Atomic event
* onkeydown	: Yes
* onkeypress : Yes, but its just a spam of onkeydown
* onkeyup : Yes

### Senarios
* A user presses the Tab key to navigate within the page
* A user copies and pastes text using Ctrl+C and Ctrl+V: No
* A user selects text using Ctrl+A: No
* A user goes back using Ctrl+Z: No
