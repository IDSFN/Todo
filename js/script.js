/**
 *
 * Add functionality
 *
 */
var add_btn = document.querySelector(".wtd i");
var labelText = document.querySelector(".wtd span");
var inputField = labelText.parentNode.querySelector("input[type='text']");
var to_do = document.querySelector(".to-do");
var done = document.querySelector(".done");

var saveTask = function () {
  to_do.insertAdjacentHTML('beforeend', 
    '<li><label>'+ inputField.value +'</label><input type="text" value ="Call my lawyer at 9PM"><i class="fa fa-check"></i><i class="fa fa-pencil"></i><i class="fa fa-trash-o"></i></li>');
  bindTo(to_do.children[to_do.children.length - 1]);
};

var toggleEditMode = function () {
  // save the typed information
  if (add_btn.classList.contains("fa-plus")) {
    // change icons status
    add_btn.classList.remove('fa-plus');
    add_btn.classList.add('fa-floppy-o');
    inputField.style.display = "block";
    inputField.focus();
    labelText.style.display = "none";
  }
  else {
    //change icon status
    add_btn.classList.remove('fa-floppy-o');
    add_btn.classList.add('fa-plus');
    inputField.style.display = "none";
    labelText.style.display = "block";

    // save the task / add the task to todo list
    if (inputField.value !== "") {
      saveTask();
      inputField.value = ""; // clear it
    }
  }
};

// listen for add events
add_btn.addEventListener("click", toggleEditMode);
labelText.addEventListener("click", function(e) {
  if (e.button === 0)
    toggleEditMode();
});
inputField.addEventListener("keydown", function(e) {
  if (e.keyCode === 13)
    toggleEditMode();
});


var checkFn = function() {
  if (this.parentElement.parentElement.classList.contains("to-do"))
    done.appendChild(this.parentElement);
  else
    to_do.appendChild(this.parentElement);
};

var editFn = function() {
  var label = this.parentElement.querySelector("label");
  var inputText = this.parentElement.querySelector("input[type='text']");

  if (this.classList.contains("fa-pencil")) {
    this.classList.remove('fa-pencil');
    this.classList.add('fa-floppy-o');
    inputText.value = label.textContent;
    inputText.style.display = "block";
    inputText.focus();
    label.style.display = "none";
    var tmp = this;
    inputText.addEventListener('keydown', function(e) {
      if (e.keyCode === 13) {
        tmp.classList.remove('fa-floppy-o');
        tmp.classList.add('fa-pencil');
        inputText.style.display = "none";
        label.textContent = inputText.value;
        label.style.display = "block";
      }
    });
  }
  else {
    this.classList.remove('fa-floppy-o');
    this.classList.add('fa-pencil');
    inputText.style.display = "none";
    label.textContent = inputText.value;
    label.style.display = "block";
  }
};
var deleteFn = function() {
  this.parentElement.parentElement.removeChild(this.parentElement);
};

// listen for delete edit check click events
function bindTo(listItem) {
  listItem.querySelector(".fa-check").onclick = checkFn;
  listItem.querySelector(".fa-pencil").onclick = editFn;
  listItem.querySelector(".fa-trash-o").onclick = deleteFn;
}
function bindEvents(elements) {
  for (var i = 0; i < elements.length; ++i)
    for (var j = 0; j < elements[i].children.length; ++j)
      bindTo(elements[i].children[j]);
}
bindEvents([to_do, done]);