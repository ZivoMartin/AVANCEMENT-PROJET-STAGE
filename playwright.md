## Mouse:

### Simple event
* click : script yes replay yes for all website
* right clicks: The events are understood, but the contextmenu event is not usable for all website
* dbleclick : script no, but if you start spamming clicks playwright will make a click count instead, record yes for all website
* dbleclick on a text: script no, record no, but you can triple-click to select the text, and the recorder will understand it. For all website
* onmouseenter: script no, replay no on all website
* onmouseleave: script no, replay no on all website
* onmousemove: script no, replay no on all website
GOOD FOR ALL

### Senarios
* Follow hypertext link : script yes, replay yes

* The menus activate by click : Not for all the menus.

* The hovers menues : No 

* Copy and paste with the context menue : it is possible to do this, but playwright doesn't copy and paste, it simply writes the value of the copied text to the input.

* The combo box : Yes, playwright has a specific method for using the combo box

## KeyBoard

### Atomic event
* onkeydown	: Not all actions, only those that perform a specific task.
* onkeypress : Not all actions, only those that perform a specific task.
* onkeyup : Not all actions, only those that perform a specific task.

### Senarios
* press tab : Yes
* Press the Enter key on an item to navigate: No
* Copy and paste with keyboard : Yes
* select text with ctrle+A : No 
* go back with ctrle+Z : Yes


## Keyboard + mouse
* fill a text field and submit with the enter key : Yes
* fill a text field and submit with the submit button : Yes
* Select and delete : Yes
