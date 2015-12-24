<!DOCTYPE html><!-- HTML5 -->
<html lang="en-US">
  <head>
    <meta charset="utf-8"/><!-- HTML5 -->
    <meta http-equiv="Content-type" content="text/html; charset=utf-8"> 
    <meta name="keywords" content="HTML, CSS, Javascript, jQuery"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Zip Lookup</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="../stylesheet/postal.css">
  </head>

  <body>
  	<div class="container">
  		<div class="row center">
  			<div class="col-md-6 col-md-offset-3">
  				<h1>Zip Code Finder</h1>

  				<form>
  					<div class="form-group">
  						<input type="text" id="address" class="form-control input-lg" placeholder="Enter an address...">
  					</div><!-- end of form-group -->
  				</form>

  				<button id="findZipBtn" class="btn btn-success btn-lg">Find My Zip</button>

  			</div><!-- end of col-md-6 and col-md-offset-3 -->
      </div><!-- end of row -->

      <div class="row center">
        <div class="col-md-4 col-md-offset-4">
          <div class="alert alert-info"></div>
          <div class="alert alert-danger"></div>
        </div><!-- end of col-md-3 -->
      </div>

  	</div>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    <script type="text/javascript" src="../applications/postal.js"></script>
  </body>
</html>