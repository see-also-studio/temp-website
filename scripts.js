function obscureEmail() {
  var em = [".com", "-also", "see", "@", "studio", "mailto:"];
  em = em[5] + em[4] + em[3] + em[2] + em[1] + em[0];
  var emel = document.getElementById("email");
  emel.setAttribute("href", em);
}
obscureEmail();