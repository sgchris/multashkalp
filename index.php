<!doctype html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta name="description" content="Fashion, beauty and products photographer. Video maker, producer">
    <meta name="author" content="Gregory Chris">

    <title>צילום והפקות אופנה וביוטי. צילום וידאו</title>

    <!-- Bootstrap core CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossorigin="anonymous">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.4.1/css/all.css" integrity="sha384-5sAR7xN1Nv6T6+dT2mhtzEpVJvfS3NScPQTrOxhwjIuvcA67KV2R5Jz6kr4abQsz" crossorigin="anonymous">
    <link rel="stylesheet" href="assets/styles.css">

</head>

<body>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark rtl">
        <a class="navbar-brand h1" href="#">מרינה מושקוביץ צילום
            <small class="d-none d-lg-inline">אופנה, ביוטי, וידאו, תכשיטים</small>
        </a>
        <a class="navbar-brand h1 navbar-whatsapp-link" href="#">
            <i class="fab fa-whatsapp"></i> <span class="d-none d-lg-inline-block">פנייה ב-WhatsApp</span>
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainNavBar" aria-controls="navbarSupportedContent"
            aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="mainNavBar">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a href="tel:+972543013513" class="nav-link">
                        <i class="fas fa-phone"></i> 054-30-13-513</a>
                </li>
                <li class="nav-item active">
                    <a href="mailto:moshkovich.marina@gmail.com" class="nav-link">
                        <i class="far fa-envelope-open"></i> אימייל</a>
                </li>
                <li class="nav-item active">
                    <a href="https://www.facebook.com/multashka/photos" target="_blank" class="nav-link">
                        <i class="fab fa-facebook-square"></i> Facebook</a>
                </li>
                <li class="nav-item active">
                    <a href="https://web.whatsapp.com/send?phone=+972543013513" target="_blank" class="nav-link whatsapp-link">
                        <i class="fab fa-whatsapp"></i> WhatsApp</a>
                </li>
                <li class="nav-item active">
                    <a href="https://www.instagram.com/moshkovich.marina/" target="_blank" class="nav-link">
                        <i class="fab fa-instagram"></i> Instagram</a>
                </li>
            </ul>
        </div>
    </nav>

    <!-- title -->
    <div class="container rtl">
        <h1 class="rtl">צילום מקצועי <small>אופנה, ביוטי, תכשיטים ומוצרים</small></h1>
        <p>צילום וידאו וסטילז באיכות וברמה בינלאומית עם הציוד הכי מתקדם בתעשייה</p>
    </div>


    <!-- carousel -->
    <main role="main" class="container-fluid">
        <div id="homepageCarousel" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <?php $i = 0; foreach (scandir(__DIR__.'/images/demo') as $imageFileName) { ?>
                    <?php if ($imageFileName == '.' || $imageFileName == '..') continue; ?>
                    <li data-target="#homepageCarousel" data-slide-to="<?php echo $i; ?>" 
                        <?php if ($i == 0) { ?>
                        class="active"
                        <?php } ?>
                    ></li>
                <?php ++$i; } ?>
            </ol>
            <div class="carousel-inner">
                <?php $i = 0; foreach (scandir(__DIR__.'/images/demo') as $imageFileName) { ?>
                    <?php if ($imageFileName == '.' || $imageFileName == '..') continue; ?>
                    <div class="carousel-item <?php echo $i == 0 ? 'active' : ''; ?>">
                        <img class="d-block w-100" src="images/demo/<?php echo $imageFileName; ?>">
                    </div>
                <?php ++$i; } ?>
            </div>
            <a class="carousel-control-prev" href="#homepageCarousel" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#homepageCarousel" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </main>

    <!-- contact us buttons -->
    <div class="container rtl mt-5">
        <div class="row">
            <div class="col-12 col-sm-6 px-3 py-1">
                <a href="http://multashka.com" target="_blank" class="btn btn-primary btn-block btn-lg"><i class="fa fa-external-link-alt"></i> צפייה בפורטפוליו המלא</a>
            </div>
            <div class="col-12 col-sm-6 px-3 py-1">
                <button type="button" onclick="openContactUs(1);" class="btn btn-primary btn-block btn-lg"><i class="fa fa-pencil-alt"></i> יצירת קשר</button>
            </div>
        </div>
    </div>

    <div class="container rtl mt-5 contact-us-form-wrapper contact-us-form-wrapper-1 d-none" style="background: #EEE;">
        <?php include __DIR__.'/assets/contact-us-form.html'; ?>
    </div>

    <?php
    $bullets = [
        [
            'title' => 'צילום אופנה',
            'content' => 'צילומי וידאו וסטילז ברמה ובאיכות גבוהה. הצילומים מתרשים בסטודיו או בלוקיישן, תוך
                    בניית סט צילומים שמותאם ללקוח, לדגמים ולקונספט של העיצוב. אנחנו מספקים סיוע מלא בהתאמת 
                    דוגמניות, מעצבי שיער וסטיילינג',
            'link' => 'http://multashka.com/category/album-types/fashion/',
        ],
        [
            'title' => 'צילום ביוטי',
            'content' => 'צילומי סט יצירתיים ומושקעים לבניית תיק עבודות, קטלוג, שלטים, ועוד. בין 
            הלקוחות - מאפרות מקצועיות, מעצבי שיער ואמנים מתחומים שונים',
            'link' => 'http://multashka.com/category/album-types/beauty/',
        ],
        [
            'title' => 'צילום מוצרים ותכשיטים',
            'content' => 'צילומים של תכשיטים, שעונים או או כל מוצר אחר, עם דוגמנית או בלי. 
            צילומי סרטוני תדמית או פירסום',
            'link' => 'http://multashka.com/category/album-types/jewelry/',
        ],
        [
            'title' => 'צילום בוקים',
            'content' => 'צילומי בוק מושקעים לאנשי מקצוע, דוגמניות או כל מטרה אחרת. צילומי זוגות ומשפחות. צילומי הריון.',
            'link' => 'http://books.multashka.com/',
        ],
    ]
    ?>

    <!-- Accordion -->
    <div class="container rtl mt-5 categories-bullets">
        <div class="row"><div class="col-12 col-md-8">
            <h2>תחומי התמחות</h2>
            <div class="accordion rtl" id="accordion">
                <?php foreach ($bullets as $i => $bullet) { ?>
                <div class="card">
                    <div class="card-header" id="heading-<?php echo $i; ?>">
                        <h5 class="mb-0">
                            <button class="btn btn-link collapsed" type="button" 
                                data-toggle="collapse" data-target="#collapse-<?php echo $i; ?>" 
                                aria-expanded="true" aria-controls="collapse-<?php echo $i; ?>">
                                <i class="fa fa-chevron-left"></i><i class="fa fa-chevron-down"></i>&nbsp;&nbsp;<?php echo $bullet['title']; ?>
                            </button>
                        </h5>
                    </div>

                    <div id="collapse-<?php echo $i; ?>" class="collapse" aria-labelledby="heading-<?php echo $i; ?>" data-parent="#accordion">
                        <div class="card-body">
                            <?php echo $bullet['content']; ?>
                            <br >
                            <a href="<?php echo $bullet['link']; ?>" target="_blank">לצפייה בעבודות</a>
                        </div>
                    </div>
                </div>
                <?php } ?>
            </div>
        </div></div>
    </div>

    <!-- About -->
    <div class="container rtl mt-5 p-3 rounded" style="background: #ffcd96; box-sizing: border-box;">
        <div class="row">
            <div class="col-md-3 d-xs-none d-sm-none d-md-block">
                <img src="images/marina_userpic3_square.jpg" class="w-100" style="border-radius: 80px;" />
            </div>
            <div class="col-12 col-md-8">
                <h1>קצת עלי...</h1>
                <p>
                אני <strong>מרינה מושקוביץ</strong>, צלמת אופנה מקצועית עם נסיון של יותר מעשור, בעלת סטודיו לצילום
                 במרכז הארץ (מתחם הבורסה, קרוב לרכבת מרכז). מתמחה בצילומי אופנה, ביוטי, תכשיטים ומוצרים.
                בין לקוחותינו מעצבי אופנה, מאפרות מקצועיות, מעצבי שיער, מעצבי תכשיטים ואמנים שונים מתחום הסטייל והביוטי.
                מה שמייחד אותנו זו הגישה היצירתית והאומנותית, כולל עיצוב סט, תאורה, זויות צילום והגשת המוצר הסופי בדרך הנוחה והמהירה ביותר.
                אנחנו מסייעים בהפקה ובליהוק דוגמניות, על מנת ליצור מוצר סופי ברמה ובאיכות הכי גבוהים בתעשייה.
                </p>
            </div>
        </div>
    </div>

    <!-- bottom footer -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark mt-5 rtl">
        <a class="navbar-brand" href="https://web.whatsapp.com/send?phone=+972543013513">
            <small><i class="fab fa-whatsapp" style="color: #25d366;"></i> מרינה מושקוביץ</small>
        </a>

        <a class="navbar-brand h1 navbar-whatsapp-link" href="#">
            <i class="fab fa-whatsapp"></i> <span class="d-none d-lg-inline-block">פנייה ב-WhatsApp</span>
        </a>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent_footer" aria-controls="navbarSupportedContent_footer" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent_footer">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item">
                    <a class="nav-link" href="tel:+972543013513">
                        <i class="fas fa-phone"></i> 054-30-13-513
                    </a>
                </li>


                <li class="nav-item">
                    <a class="nav-link" href="mailto:moshkovich.marina@gmail.com">
                        <i class="far fa-envelope-open"></i> אימייל
                    </a>
                </li>

        
                <li class="nav-item">
                    <a class="nav-link" href="https://www.facebook.com/multashka/photos" target="_blank">
                        <i class="fab fa-facebook-square"></i> Facebook
                    </a>
                </li>

        
                <li class="nav-item">
                    <a class="nav-link" href="https://web.whatsapp.com/send?phone=+972543013513" target="_blank" class="nav-link whatsapp-link">
                        <i class="fab fa-whatsapp"></i> WhatsApp
                    </a>
                </li>

        
                <li class="nav-item">
                    <a class="nav-link" href="https://www.instagram.com/moshkovich.marina/" target="_blank">
                        <i class="fab fa-instagram"></i> Instagram
                    </a>
                </li>
            </ul>
        </div>
    </nav>


    <!-- Bootstrap core JavaScript
    ================================================== -->
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="assets/main.js"></script>
</body>

</html>