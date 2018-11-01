<?php


$arr_book = [
    ['צילום', 'צילומי',  'צלם', 'צלמת'],
    ['בוקים', 'בוק', 'בוק שחקן', 'בוק דוגמנות', 'בוק דוגמנית', 'תדמית', 'אתר הכרויות', 'לאתר הכרויות', 'הריון', 'משפחה', 'משפחתיים'],
    ['מקצועי', 'מקצועית', 'איכותי', 'איכותית', 'ברמה גבוהה'],
    ['במרכז', 'מרכז', 'מרכז הארץ', 'בתל אביב', 'תל אביב', 'ברמת גן', 'רמת גן', 'בגבעתיים', 'גבעתיים', 'בבני ברק', 'בני ברק', 'בבת ים', 'בת ים'],
];

$arr_fashion = [
    ['צילום', 'צלם', 'צלמת'],
    ['אופנה','בגדים','שמלות','שמלות כלה','בגדי מעצבים'],
    ['מקצועי', 'מקצועית', 'איכותי', 'איכותית', 'ברמה גבוהה'],
    ['במרכז', 'מרכז', 'מרכז הארץ', 'בתל אביב', 'תל אביב', 'ברמת גן', 'רמת גן', 'בגבעתיים', 'גבעתיים', 'בבני ברק', 'בני ברק', 'בבת ים', 'בת ים'],
];

function echoVariations($arr, $collectionNumber = -1, $itemNumber = 0, $theString = '') 
{
    // concat the current value and echo the string
    if (strlen($theString) > 0) {
        $theString.= ' ';
    }
    if ($collectionNumber >= 0) {
        $theString.= $arr[$collectionNumber][$itemNumber];
        $wrappers = substr_count($theString, ' ') > 2 ? ['"', '"'] : ['[', ']'];
        if (substr_count($theString, ' ') > 1) {
            echo $wrappers[0].$theString.$wrappers[1]."\n";
        }
    }

    // check if this is the last collation
    if ($collectionNumber >= count($arr) - 1) {
        return;
    }

    // send to all the next children
    foreach ($arr[$collectionNumber + 1] as $i => $_unused) {
        echoVariations($arr, $collectionNumber + 1, $i, $theString);
    }
}

echoVariations($arr_fashion);