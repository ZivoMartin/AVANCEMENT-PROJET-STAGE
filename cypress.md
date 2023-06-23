## Mouse:

### Simple event
* click : Yes
* right click: Does not differentiate between a left click and a right click but is capable of using the context menu, such as copy and paste.
* dbleclick on text: script no (its a simple double click), replay no on all website
* onmouseenter: script no, replay no on all website
* onmouseleave: script no, replay no on all website
* onmousemove: script no, replay no on all website
 
### Senarios
* Follow hypertext link: Yes

* The menus activate by click :

* The hovers menues : No

* Copy and paste with the context menue: Yes

* The combo box: Cypress detects the click and the selection in a combo box, but the replayer doesn't replay them.


## KeyBoard

### Atomic event
* onkeydown	: script, yes, replay yes for all website
* onkeypress : script, its just a spam of onkeydown, replay yes
* onkeyup : script, Yes, replay yes for all website

### Senarios
*  A user presses the Tab key to navigate within the page :
* Pressing Enter on an element like an href to navigate to the page :
* A user copies and pastes text using Ctrl+C and Ctrl+V: No
* A user selects text using Ctrl+A : No
* A user goes back using Ctrl+Z : No


## Keyboard + mouse
* fill a text field and submit with the enter key : Yes for the submit, but the recorder dont understand what are u typing
* fill a text field and submit with the submit button : Yes for the submit, but the recorder dont understand what are u typing
* Select and delete : No