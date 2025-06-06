<?php
include_once "./connection.php";

$title = $_POST["title"]
$letters = $_POST["letters"]

$connect = new Connection();

$result = $connect->updateQuery("insert into pasapalabra (name, letters) VALUES ('$name', '$letters')");

echo $result;