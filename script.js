$(document).ready(function() {
    $.ajax({
        url: 'fetch_question.php',
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            $('#question').text(data.question.question);

            data.options.forEach(function(option) {
                let optionElement;
                switch (option.option_type) {
                    case 'text':
                        optionElement = `<div class="option">
                                            <input type="radio" name="option" value="${option.option_content}">
                                            <label>${option.option_content}</label>
                                        </div>`;
                        break;
                    case 'image':
                        optionElement = `<div class="option">
                                            <input type="radio" name="option" value="${option.option_content}">
                                            <img src="${option.option_content}" alt="Option Image" style="max-width: 200px;">
                                        </div>`;
                        break;
                    case 'video':
                        optionElement = `<div class="option">
                                            <input type="radio" name="option" value="${option.option_content}">
                                            <video width="320" height="240" controls>
                                                <source src="${option.option_content}" type="video/mp4">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>`;
                        break;
                    case 'link':
                        optionElement = `<div class="option">
                                            <input type="radio" name="option" value="${option.option_content}">
                                            <a href="${option.option_content}" target="_blank">${option.option_content}</a>
                                        </div>`;
                        break;
                }
                $('#options-container').append(optionElement);
            });

            $('#submit-btn').click(function() {
                var selectedOption = $('input[name="option"]:checked').val();
                if (selectedOption) {
                    if (selectedOption === data.question.answer) {
                        $('#result').text("Correct! The answer is " + data.question.answer + ".");
                    } else {
                        $('#result').text("Incorrect. The correct answer is " + data.question.answer + ".");
                    }
                    $('#result-container').show();
                } else {
                    alert("Please select an option.");
                }
            });
        }
    });
});
