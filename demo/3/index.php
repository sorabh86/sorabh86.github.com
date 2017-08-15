<!DOCTYPE html>
<html>
<title>W3.CSS Template</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
<link href="http://fonts.googleapis.com/css?family=Raleway" rel="stylesheet" type="text/css">
<style>
body {font-family: "Raleway", Arial, sans-serif}
.w3-row img {margin-bottom: -8px}
</style>
<body>

<!-- !PAGE CONTENT! -->
<div class="w3-content" style="max-width:1500px">

  <!-- Header -->
  <header class="w3-container w3-xlarge w3-padding-24">
    <a href="#" class="w3-left w3-btn w3-white">MY ART</a>
    <a href="#about" class="w3-right w3-btn w3-white">About</a>
  </header>

  <!-- Photo Grid -->
  <div class="w3-row">
    <div class="w3-half">
      <img src="http://www.w3schools.com/w3images/streetart.jpg" style="width:100%">
      <img src="http://www.w3schools.com/w3images/streetart2.jpg" style="width:100%">
      <img src="http://www.w3schools.com/w3images/streetart5.jpg" style="width:100%">
    </div>

    <div class="w3-half">
      <img src="http://www.w3schools.com/w3images/streetart3.jpg" style="width:100%">
      <img src="http://www.w3schools.com/w3images/streetart4.jpg" style="width:100%">
    </div>
  </div>
  
<!-- End Page Content -->
</div>

<!-- Footer / About Section -->
<footer class="w3-light-grey w3-padding-64 w3-center" id="about">
  <h2>About</h2>
  <img src="http://www.w3schools.com/w3images/boy.jpg" class="w3-image w3-padding-32" width="300" height="300">
  <form style="margin:auto;width:60%" action="form.asp" target="_blank">
    <p>Just me, myself and I, exploring the universe of unknownment. I have a heart of love and an interest of lorem ipsum and mauris neque quam blog. I want to share my world with you. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla. Praesent tincidunt sed tellus ut rutrum. Sed vitae justo condimentum, porta lectus vitae, ultricies congue gravida diam non fringilla.</p>
    <p class="w3-large w3-text-pink">Do not hesitate to contact me!</p>
    <div class="w3-group">
      <label><b>Name</b></label>
      <input class="w3-input w3-border" type="text" required name="Name">
    </div>
    <div class="w3-group">
      <label><b>Email</b></label>
      <input class="w3-input w3-border" type="text" required name="Email">
    </div>
    <div class="w3-group">
      <label><b>Message</b></label>
      <input class="w3-input w3-border" required name="Message">
    </div>
    <button type="submit" class="w3-btn w3-btn-block w3-padding-12 w3-dark-grey">Send</button>
  </form>
  <br>
  <p>Powered by <a href="." target="_self" class="w3-hover-text-green" title=" development"> at expertcodedesign</a></p>
</footer>
 
</body>
</html>
