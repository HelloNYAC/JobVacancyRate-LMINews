"use strict";

$(document).ready(function () {
  $.get("common/com_header.html", function (data) {
    $("#page_header").replaceWith(data);
  });
  $.get("common/com_social.html", function (data) {
    $("#social_placeholder").replaceWith(data);
  });
  $.get("common/com_footer.html", function (data) {
    $("#page_footer").replaceWith(data);
  });
  $.get("common/com_navbar.html", function (data) {
    $("#nav-placeholder").replaceWith(data);
  });
});
