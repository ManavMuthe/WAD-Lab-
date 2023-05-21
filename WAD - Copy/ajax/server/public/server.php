<?php
   // $name = $_POST["name"];
   // $password = $_POST["password"];
   // echo $name." ".$password;
   // //enter name and lastname into your form and onclick they will be alerted 

   if ($_SERVER["REQUEST_METHOD"] == "POST") {
      // collect value of input field
      $name = $_POST['name'];
      if (empty($name)) {
        echo "Name is empty";
      } else {
        echo $name;
      }
    }
?>