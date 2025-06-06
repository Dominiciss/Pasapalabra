<?php
include_once "./connection.php";

$title = $_POST["title"];
$letters = $_POST["letters"];

$connect = new Connection();

$result = $connect->updateQuery("insert into pasapalabra (title, letters) VALUES ('$title', '$letters')");

echo $result;