<!DOCTYPE html>
<html>
<title>W3.CSS portfolio photographer Template</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
<body>

<!-- Header -->
<header class="w3-display-container w3-content" style="max-width:1500px">
  <img class="w3-image" src="http://www.w3schools.com/w3images/photographer.jpg" alt="Me" width="1500" height="600">
  <div class="w3-display-middle w3-padding-xlarge w3-border w3-wide w3-text-light-grey w3-center">
    <h1 class="w3-hide-medium w3-hide-small w3-xxxlarge">JANE DOE</h1>
    <h5 class="w3-hide-large" style="white-space:nowrap">JANE DOE</h5>
    <h3 class="w3-hide-medium w3-hide-small">PHOTOGRAPHER</h3>
  </div>
  
  <!-- Navbar (placed at the bottom of the header image) -->
  <ul class="w3-navbar w3-light-grey w3-round w3-display-bottommiddle w3-hide-small" style="bottom:-16px">
    <li><a href="#">Home</a></li>
    <li><a href="#portfolio">Portfolio</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</header>

<!-- Navbar on small screens -->
<ul class="w3-navbar w3-light-grey w3-hide-large w3-hide-medium">
  <li><a href="#">Home</a></li>
  <li><a href="#portfolio">Portfolio</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>

<!-- Page content -->
<div class="w3-content w3-padding-xlarge w3-margin-top" id="portfolio">

  <!-- Images (Portfolio) -->
  <img src="http://www.w3schools.com/w3images/ocean.jpg" alt="Ocean" class="w3-image" width="1000" height="500">
  <img src="http://www.w3schools.com/w3images/ocean2.jpg" alt="Ocean II" class="w3-image w3-margin-top" width="1000" height="500">
  <img src="http://www.w3schools.com/w3images/falls2.jpg" alt="Falls" class="w3-image w3-margin-top" width="1000" height="500">
  <img src="http://www.w3schools.com/w3images/mountainskies.jpg" alt="Skies" class="w3-image w3-margin-top" width="1000" height="500">
  <img src="http://www.w3schools.com/w3images/mountains2.jpg" alt="Mountains" class="w3-image w3-margin-top" width="1000" height="500">

  <!-- Contact -->
  <div class="w3-light-grey w3-padding-xlarge w3-padding-32 w3-margin-top" id="contact">
    <h3 class="w3-center">Contact</h3>
    <hr>
    <p>Mauris neque quam, fermentum ut nisl vitae, convallis maximus nisl. Sed mattis nunc id lorem euismod placerat. Vivamus porttitor magna enim, ac accumsan tortor cursus at. Phasellus sed ultricies mi non congue ullam corper. Praesent tincidunt sed tellus.</p>

    <form action="form.asp" target="_blank">
      <div class="w3-group">
        <label>Name</label>
        <input class="w3-input w3-border" type="text" required name="Name">
      </div>
      <div class="w3-group">
        <label>Email</label>
        <input class="w3-input w3-border" type="text" required name="Email">
      </div>
      <div class="w3-group">
        <label>Message</label>
        <input class="w3-input w3-border" required name="Message">
      </div>
      <button type="submit" class="w3-btn w3-btn-block w3-padding-12 w3-dark-grey">Send</button>
    </form><br>
    <p>Powered by <a href="."  class="w3-hover-text-green" target="_self" title=" development" > at expertcodedesign</a></p>

  </div>

<!-- End page content -->
</div>

</body>
</html>
