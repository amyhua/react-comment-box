autoscale: true


# React workshop

---

## Agenda

- Workshop to build a React component
- Compare against jQuery implementation and how they are different

---

We are going to implement a comment box

---

```html
<div class="well clearfix">
  <textarea class="form-control"></textarea><br/>
  <button class="btn btn-primary pull-right">Comment</button>
</div>
```

---

## 1) the Comment button should be initially disabled. When there’s at least one character in the text field,
the Comment button should be enabled.

The `disabled` property is true if the attribute is present at all.

----

## In jQuery

How is this done?

---

jQuery

```js
// Initially disable the button
$("button").prop("disabled", true);

// When the value of the text area changes...
$("textarea").on("input", function() {
  // If there's at least one character...
  if ($(this).val().length > 0) {
    // Enable the button.
    $("button").prop("disabled", false);
  } else {
    // Else, disable the button.
    $("button").prop("disabled", true);
  }
});
```

The `.prop()` method is a convenient way to set the value of properties

----

## In React

1. Disable the button initially. Add the `disabled` property.

----

## In React

### Objective 1. Disable the button initially. Add the `disabled` property.

In jQuery,

```js
$("button").prop("disabled", true);
```

----

## In React

2. wait when users enter the text

We used the `input` event for jQuery, but in React we use `onChange`

```html
<textarea className="form-control"
          onChange={this.handleChange}></textarea>
```

* `handleChange` is prefixed with `this`, because it's a method on the component.

----

3. verify that `handleChange` is actually being called

```js
handleChange: function(event) {
  console.log(event.target.value);
}
```

* The `event` object contains `target`, which is the `textarea`.
* We use `.value` on it to output the current value of the textarea.

----

## Breaking difference between jQuery and React: using state

* In React, we don't directly modify the DOM. Instead, in an event handler, you modify "the *state*" by calling `this.setState`.

---

![inline fit](4-jquery.png)

![inline fit](4-react.png)

----

* Then, every time the state is updated, **render() is called again**

* Inside render() you can **access the state** with `this.state`

![inline fit](react-state.png)

---

## Writing the event handler

### 4. Initialize the state object. In ES6, do this in the `constructor()` of the class.

```js
constructor(props) {
  super(props); // makes this a React component
  this.state = {
    ...
  };
}
```

---

In this state object, we can create a key called `text` and have it store whatever is inside the comment textarea.

```js
constructor(props) {
  super(props); // makes this a React component
  this.state = {
    text: "" // initialize to an empty string at app load
  };
}
```

---

### 5. Modify the event handler to set the state's `text` field to what is in the text box.

* **Use the special built-in method `setState` to pass the updated key-value pair**

```js
handleChange: (event) => {
  this.setState({ text: event.target.value });
}
```

---

### 6. Check that the state is correctly being rendered by writing some debugging ('console log') code in the render() to show the state's text field.

```html
render() {
  return (
    <div className="well clearfix">
      <textarea className="form-control"
                onChange={this.handleChange}>
      </textarea>
      <br/>
      <button className="btn btn-primary pull-right" disabled>Tweet</button>
      <br/>
      {this.state.text}
    </div>
  );
}
```

---

Test it by entering some text in the comment box.

The same set of text should appear below the button!


---

6. Check that the state is correctly being set

Like we console-logged the `handleChange` method, we'll verify that `render` can access `this.state.text`.

---

![inline fit](react-style-event-handling.png)

---

7. Remove the debugging code.

---

Recall our original goal,

### Objective 1. Disable the button initially. Add the `disabled` property.

How do we implement this using the state?


---

If `this.state.text.length === 0`, then the button should be disabled.

----

**Add disabled attribute, and set it with the return value of `this.state.text.length === 0`**

```html
<button className="btn btn-primary pull-right"
        disabled={this.state.text.length === 0}>Comment</button>
```

Some special React rules with disabled:

---

If you write disabled="true" or disabled="false" in raw HTML it won’t work - in raw HTML, you need to remove the disabled attribute to enable the button

In React: behind the scenes --

* If you do `disabled={true}` in JSX, it gets converted to just `<button ... disabled>` in HTML.

* If you do `disabled={false}` in JSX, the disabled attribute is removed from the button tag in HTML.

Works with `checked` (booleans).

---

## Objective 2. Include a remaining character count

Have the character count display `300 - the number of characters entered`.


#### JQuery vs React

----

How do we do this in jQuery first?

----

```js
$("textarea").on("input", function() {
  $("#count").text(300 - $(this).val().length);
  ...
});
```

---

How about in React?

---

## Use `this.state.text.length` in `render()`

```html
<span id="count">{300 - this.state.text.length}</span>
```

---


### Objective 3. Add a "Add Photo" button


* Create an “Add Photo” button.
* Clicking this button toggles the ON/OFF state. If it’s ON, the button will say "✓ Photo Added".
* When the button is ON, it reduces the character count by 20.

---

* Change what the handler was attaching on (there are now two buttons)


---

## 1) Clicking the “Add Photo” button toggles the ON/OFF state. If it’s ON, the button will say ✓ Photo Added.

How can we do this in jQuery?

---

## 2) Decrement the character count if Add Photo is ON


---

Note: this is supposed to be confusing.

---

## 3) If the Add Photo button is ON, even if there’s no text entered, the Comment button remains enabled.

---

In jQuery, **if several event handlers are modifying several parts of the DOM, the code gets ugly.**

![inline fit](jquery-confusing.png)

---

In React:

---

the state

```js
this.state = {
  text: "",
  photoAdded: false
}
```

---

```html
<button className="btn btn-default pull-right">
  {this.state.photoAdded ? "✓ Photo Added" : "Add Photo" }
</button>
```

---

```js
remainingCharacters: function() {
  if (this.state.photoAdded) {
    return 140 - 23 - this.state.text.length;
  } else {
    return 140 - this.state.text.length;
  }
}
```

```html
<span id="count">{ this.remainingCharacters() }</span>
```

---

Solution

```js
handleChange: function(event) {
    this.setState({ text: event.target.value });
  },
  togglePhoto: function(event) {
    this.setState({ photoAdded: !this.state.photoAdded });
  },
  remainingCharacters: function() {
    if (this.state.photoAdded) {
      return 140 - 23 - this.state.text.length;
    } else {
      return 140 - this.state.text.length;
    }
  },
  render: function() {
    return (
      <div className="well clearfix">
        <textarea className="form-control"
                  onChange={this.handleChange}></textarea>
        <br/>
        <span>{ this.remainingCharacters() }</span>
        <button className="btn btn-primary pull-right"
          disabled={this.state.text.length === 0 && !this.state.photoAdded}>Tweet</button>
        <button className="btn btn-default pull-right"
          onClick={this.togglePhoto}>
          {this.state.photoAdded ? "✓ Photo Added" : "Add Photo" }
        </button>
      </div>
    );
  }
```

----

React components get attached to the DOM through `ReactDOM.render(<CommentBox />, document.getElementById("container"))`

---

jQuery: we interact directly with the DOM to manipulate it, based on events sent from the app

* Updating the DOM is expensive

---

React: primary goal is to provide a more efficient way of performing DOM updates.

* React handle updating to the real DOM.
* changes to the virtual DOM are not guaranteed to take effect immediately
* React waits until the end of its event loop before it touches the real DOM.
  * it **batches DOM updates**

* The nodes of the virtual DOM are *components*

----

Lifecycle

----

**Mounting** is the process that occurs when a component is being inserted into the DOM

