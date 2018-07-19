(function() { // anonymous namespace

  // ///////////////////////////////////////////////////////////////////////////
  // NESTED FUNCTIONS

  // reference to anonymous arrow function expression
  let getCurrentDateAndTime = () => new Date();

  // named function
  function addToBody(element) {
    document.body.appendChild(element);
  };

  // ///////////////////////////////////////////////////////////////////////////
  // HTML ELEMENTS

  // Add new header 1 with current date to body
  let h2_0 = document.createElement('h2');
  h2_0.innerHTML = `Today's date is ${getCurrentDateAndTime()}`;
  h2_0.id = 'h1_1';
  h2_0.classList.add('h2_');
  h2_0.style.backgroundColor = 'lavender';
  addToBody(h2_0);

  // Add new header 2 to body
  document.body.innerHTML += `<h2 id="h2_1" class="h2_">Another way to add a header</h2>`;

  // Add a paragraph
  document.body.innerHTML += `<p id="p_0" class="p_">Click the button above</p>`;

  // Get the paragraph
  let p_0 = document.getElementById('p_0');

  // Add a button after the paragraphs
  let button_0 = document.createElement('button');
  button_0.id = 'button_0';
  button_0.className = 'button_';
  button_0.style['font-size'] = '14px';
  button_0.innerHTML = 'Jump Down';
  document.body.insertBefore(button_0, document.body.firstChild);

  // Insert a button before the paragraph
  p_0.insertAdjacentHTML('beforebegin', `<button id="button_1" class="button_">Jump Up</button>`);

  // ///////////////////////////////////////////////////////////////////////////
  // EXTEND NODE CLASS

  Node.prototype.moveUp = function() {
    let node = this;
    let previousNode = node.previousElementSibling;
    let parent = node.parentNode;
    node.parentNode.removeChild(node);
    if (null == previousNode) {
      parent.appendChild(node);
      return;
    }
    while (previousNode.nodeType != 1 || previousNode.nodeName == 'SCRIPT') {
      previousNode = previousNode.previousElementSibling;
    }
    previousNode.parentNode.insertBefore(node, previousNode);
  };

  Node.prototype.moveDown = function() {
    let node = this;
    let nextNode = node.nextElementSibling;
    let parent = node.parentNode;
    node.parentNode.removeChild(node);
    if (null == nextNode) {
      parent.insertBefore(node, parent.firstChild);
      return;
    }
    while (nextNode.nodeType != 1 || nextNode.nodeName == 'SCRIPT') {
      nextNode = nextNode.nextElementSibling;
    }
    nextNode.parentNode.insertBefore(node, nextNode.nextElementSibling);
  };

  // ///////////////////////////////////////////////////////////////////////////
  // EVENT LISTENERS

  // mouse events

  // every object in <body> will be considered as event context -
  // the place where an event can occur
  document.body.addEventListener('mousedown', (event) => {
    if (event.button == 0) {
      event.target.moveUp();
    }
    else if (event.button == 2) {
      event.target.moveDown();
    }
    console.log(event.currentTarget); // object with attached event listener
    console.log(event.target);        // object that triggered an event
  });

  button_0 = document.body.getElementsByClassName('button_')[0];
  button_0.addEventListener('mousedown', (event) => {
    console.log('event propagation will be stopped');
    event.stopPropagation();
  });

  let scheduled = null;
  window.addEventListener("mousemove", event => {
    if (!scheduled) {
      setTimeout(() => {
        p_0.innerText =
          `Mouse at ${scheduled.pageX}, ${scheduled.pageY}`;
        scheduled = null;
      }, 250);
    }
    scheduled = event;
  });

  // key events

  window.addEventListener("keydown", event => {
    console.log(event.key + ' is pressed');
  });
  window.addEventListener("keyup", event => {
    console.log(event.key + ' is released');
  });

  //

})();
// console.log(h2_0); // will through an error that `h2_0` is not defined