## Mouse:

### Simple event
* click : Yes on all website
* right click: Does not differentiate between a right click and a left click and isn't capable to use the contextmenu. On all website
* dbleclick : Yes on all website
* dbleclick on a text : script no (its a simple dbleclick), replay yes. For all website
* onmouseenter: script no, replay no on all website
* onmouseleave: script no, replay no on all website
* onmousemove: script no, replay no on all website

### Senarios
* Follow hypertext link: script, y, for the replay it works, but the transitions are very fast. It is necessary to add time.sleep in the script to understand what is being displayed on the screen.

* The menus activate by click : Not for all the menus.

* The hovers menues : script, no, replay, no 

* Copy and paste with the context menue : No

* The combo box : Yes

## KeyBoard

### Atomic event
* onkeydown	: script: no, replay no. If u press a random key who doesn't do anything, the recorder don't get it for all website
* onkeypress : script: no, replay no for all website
* onkeyup : script: no, replay no for all website	

### Senarios
* A user presses the Tab key to navigate within the page : Yes
* Pressing Enter on an element like an href to navigate to the page: Yes
* A user copies and pastes text using Ctrl+C and Ctrl+V : No
* A user selects text using Ctrl+A : No
* A user goes back using Ctrl+Z : 


## Keyboard + mouse
* fill a text field and submit with the enter key : Yes
* fill a text field and submit with the submit button : Yes
* Select and delete : If you do, the part of the script where you type is deleted. So on the script it's just a double click and on the replay you see nothing.