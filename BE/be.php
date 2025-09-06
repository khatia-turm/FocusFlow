<?php
session_start();

// 1. ფორმა და მასთან მუშაობის მეთოდები
$answers = [
  'q1' => $_POST['q1'] ?? '',
  'q2' => $_POST['q2'] ?? '',
  'q3' => $_POST['q3'] ?? '',
  'q4' => $_POST['q4'] ?? '',
  'q5' => $_POST['q5'] ?? '',
  'q6' => $_POST['q6'] ?? ''
];

// 2. სტრიქონებთან მუშაობის მეთოდები
$result_str = "";
foreach ($answers as $key => $value) {
  $result_str .= strtoupper($key) . ": " . ucfirst(strtolower($value)) . "\n";
}

// 3. მასივები
$methods = ['Leitner' => 0, 'Feynman' => 0, 'PQ4R' => 0, 'Pomodoro' => 0];
foreach ($answers as $method) {
  if (isset($methods[$method])) {
    $methods[$method]++;
  }
}

// Get the dominant method
arsort($methods);
$best_method = array_key_first($methods);

// 4. სესიები და ქუქისები
$_SESSION['best_method'] = $best_method;
setcookie("last_method", $best_method, time() + 3600); // 1hr

// 5. ფაილებთან მუშაობა (ჩაწერა/წაკითხვა/წაშლა)
$file = "results.txt";
file_put_contents($file, $result_str, FILE_APPEND); // write
$saved_data = file_get_contents($file); // read


// 6. ფაილის ატვირთვა და ჩანაწერი ფაილში
if (isset($_FILES['upload']) && $_FILES['upload']['error'] === UPLOAD_ERR_OK) {
  $uploadDir = 'uploads/';
  if (!is_dir($uploadDir)) mkdir($uploadDir);
  $tmpName = $_FILES['upload']['tmp_name'];
  $uploadPath = $uploadDir . basename($_FILES['upload']['name']);
  move_uploaded_file($tmpName, $uploadPath);
  file_put_contents('upload_log.txt', "Uploaded: $uploadPath\n", FILE_APPEND);
}
?>


<!-- THIS IS HTML  -->
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Quiz Results - Study Hub</title>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Poppins:wght@400;500&display=swap" rel="stylesheet">
  <link href="css/results-style.css" rel="stylesheet">
  <link rel="icon" href="/images/Untitled.PNG" type="image/icon">
</head>

<body>
  <div class="container result-container">
    <header>
      <h1>Your Study Method Recommendation</h1>
    </header>

    <main>
      <section class="result-section">
        <h2>Your dominant study method is: <span class="method-highlight"><?= htmlspecialchars($best_method) ?></span></h2>

        <div class="result-details">
          <h2>Your answers:</h2>
          <div class="answers-box">
            <pre><?= htmlspecialchars($result_str) ?></pre>
          </div>
        </div>

        <?php if (isset($uploadPath)): ?>
          <div class="upload-info">
            <p>Uploaded file saved to: <strong><?= htmlspecialchars($uploadPath) ?></strong></p>
          </div>
        <?php endif; ?>

      </section>
    </main>
  </div>
</body>

</html>