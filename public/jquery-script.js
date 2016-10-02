console.log('jquery-script is included!');

var length = 0;
var photoAdded = false;

function updateCount() {
  console.log('updateCount length', length);
  var remaining = 300 - length;
  $("#jquery .count").text(remaining);
}

function updateCommentBtn() {
  // If there's at least one character...
  if (length > 0 && length <= 300) {
    // Enable the button.
    $("#jquery .comment-btn").prop("disabled", false);
  } else {
    // Else, disable the button.
    $("#jquery .comment-btn").prop("disabled", true);
  }
}

$(document).on('ready', function() {
  // When the value of the text area changes...
  $("#jquery textarea").on("input", function() {
    length = $(this).val().length + (photoAdded ? 20 : 0);
    updateCommentBtn();
    updateCount();
  });

  $('#jquery .photo-btn').on('click', function(event) {
    var $btn = $(event.target);
    var status = $btn.data('status');
    if (status === 'on') {
      // turn it off
      $btn.data('status', 'off');
      photoAdded = false;
      $btn.text('Add Photo');
      length = length - 20;
      updateCommentBtn();
      updateCount();
    } else {
      // turn it on
      $btn.data('status', 'on');
      photoAdded = true;
      $btn.text('Photo Added');
      length = length + 20;
      updateCommentBtn();
      updateCount();
    }
  });
});