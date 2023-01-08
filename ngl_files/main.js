$(document).ready(function () {
    if (window.location.pathname.includes('p/sent')) document.title = 'NGL - Sent!'
    questionId = null;

    $('.form').submit(function (e) {
        e.preventDefault();
        $('.submit').attr('disabled', true)
        //Setting Kirim Send Button
    })


    // Hide Button
    $('textarea').focus(function () {
        $('.bottom-container').hide()
    })
    $('textarea').blur(function () {
        $('.bottom-container').show()
    })
    $('textarea').on('change keyup paste', function (e) {
        if (e.target.value == '') {
            $('.submit').hide()
        } else {
            $('.submit').show()
        }
    });
    // Hide Button

    setInterval(() => {
        let clickCount = parseInt($('.clickCount').text())
        clickCount += 4
        $('.clickCount').text(clickCount)
    }, 800)

    // Setting Random Question
    const APP_CDN_BASE_URL = "https://cdn.simplelocalize.io/57157aec81d54cb6b2a43f8b34a61d47/_production/";
    const userLanguage = $("meta[name='user:language']").attr("content");
    let randomQuestions = []
    $.get(APP_CDN_BASE_URL + userLanguage, function (data) {
        const fakeQuestionKeys = Object.keys(data).filter(key => key.startsWith('FAKE_QUESTIONS.'))
        randomQuestions = fakeQuestionKeys.map(key => data[key])
    });


    $('.dice-button').click(function (e) {
        // Set textarea text to a random question
        const randomQuestion = randomQuestions[Math.floor(Math.random() * randomQuestions.length)];
        // const randomQuestion = "Halo";
        $('textarea').val(randomQuestion + ' ')
        $('textarea').focus()
        $('textarea')[0].selectionStart = randomQuestion.length + 1
        $('textarea')[0].selectionEnd = randomQuestion.length + 1
        $('.submit').show()
        e.preventDefault()
    })
});