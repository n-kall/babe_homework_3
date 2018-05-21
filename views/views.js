var intro = {
    name: 'intro',
    // introduction title
    "title": "Welcome!",
    // introduction text
    "text": "Thank you for participating in our study. In this study, you will see pictures and click on buttons.",
    // introduction's slide proceeding button text
    "buttonText": "Begin experiment",
    // render function renders the view
    render: function() {

        viewTemplate = $('#intro-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    // for how many trials should this view be repeated?
    trials: 1
};

var instructionsForcedChoice = {
    name: 'instructions',
    // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "On each trial, you will see a question and two response options. Please select the response option you like most. We start with two practice trials.",
    // instuction's slide proceeding button text
    "buttonText": "Go to practice trial",
    render: function() {

        viewTemplate = $("#instructions-view").html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};

var instructionsSliderRating = {
     // instruction's title
    "title": "Instructions",
    // instruction's text
    "text": "You completed the first part. In the next part you will adjust sliders. Training is not necessary. We know you can do it, so we start right away.",
    // instuction's slide proceeding button text
    "buttonText": "Start slider task",
    render: function() {
        var view = {};
        view.name = 'instructions';
        view.template = $("#instructions-view").html();
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            text: this.text,
            button: this.buttonText
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

        return view;
    },
    trials: 1
};


var practiceForcedChoice = {
    name: 'practice',
    "title": "Practice trial",
    // render function renders the view
    render: function (CT) {

        trialInfo = generateTrial()

        var filled = exp.currentTrialInViewCounter * (exp.progress_bar_width / exp.views_seq[exp.currentViewCounter].trials);

        viewTemplate = $("#practice-view-buttons-response").html();
        $('#main').html(Mustache.render(viewTemplate, {
        title: this.title,
        question: trialInfo.question,
        option1: trialInfo.option1,
        option2: trialInfo.option2,
        }));

        // update the progress bar based on how many trials there are in this round
        $('#filled').css('width', filled);

        // draws the shapes on the canvas
        drawOnCanvas(document.getElementById('canvas'), trialInfo);
        startingTime = Date.now();
        // attaches an event listener to the yes / no radio inputs
        // when an input is selected a response property with a value equal to the answer is added to the trial object
        // as well as a readingTimes property with value - a list containing the reading times of each word
        // update the progress bar based on how many trials there are in this round
        var filled = exp.currentTrialInViewCounter * (exp.progress_bar_width / exp.views_seq[exp.currentViewCounter].trials);

        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "practice",
                trial_number: CT+1,
                question: exp.trial_info.practice_trials[CT].question,
                option1: exp.trial_info.practice_trials[CT].option1,
                option2: exp.trial_info.practice_trials[CT].option2,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data)
            exp.findNextView();
        });

    },
    trials: 2
};


var practiceSliderRating = {
    render : function(CT) {
        var view = {};

        var trialInfo = generateTrial()

        var filled = exp.currentTrialInViewCounter * (exp.progress_bar_width / exp.views_seq[exp.currentViewCounter].trials);

        view.name = 'practice',
        view.template = $('#practice-view-slider-response').html();
        view.response = $('#response').html();
        var response;
        $('#main').html(Mustache.render(view.template, {
            title: this.title,
            question: trialInfo.question,
            option1: trialInfo.option1,
            option2: trialInfo.option2,
        }));
        startingTime = Date.now();

        // update the progress bar based on how many trials there are in this round
        $('#filled').css('width', filled);

        // draw the stimulus based on the trialInfo
        drawOnCanvas(document.getElementById('canvas'), trialInfo)

        response = $('#response');

        // checks if the slider has been changed
        response.on('change', function() {
            $('#next').removeClass('nodisplay');
        });
        response.on('click', function() {
            $('#next').removeClass('nodisplay');
        });

        $('#next').on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "practiceSliderRating",
                trial_number: CT+1,
                question: exp.trial_info.practice_trials[CT].question,
                option1: exp.trial_info.practice_trials[CT].option1,
                option2: exp.trial_info.practice_trials[CT].option2,
                rating_slider: response.val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 2
};



var beginMainExp = {
    name: 'beginMainExp',
    "text": "Now that you have acquainted yourself with the procedure of the task, the actual experiment will begin.",
    // render function renders the view
    render: function() {

        viewTemplate = $('#begin-exp-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            text: this.text
        }));

        // moves to the next view
        $('#next').on('click', function(e) {
            exp.findNextView();
        });

    },
    trials: 1
};

var mainForcedChoice = {
    name: 'main',
    // render function renders the view
    render : function(CT) {

        var trialInfo = generateTrial()

        // fill variables in view-template
        var viewTemplate = $('#trial-view-buttons-response').html();
        $('#main').html(Mustache.render(viewTemplate, {
            question: trialInfo.question,
            option1:  trialInfo.option1,
            option2:  trialInfo.option2,
        }));

        // update the progress bar based on how many trials there are in this round
        var filled = exp.currentTrialInViewCounter * (exp.progress_bar_width / exp.views_seq[exp.currentViewCounter].trials);

        $('#filled').css('width', filled);
        // draw the canvas
        drawOnCanvas(document.getElementById('canvas'), trialInfo)
        // event listener for buttons; when an input is selected, the response
        // and additional information are stored in exp.trial_info
        $('input[name=answer]').on('change', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainForcedChoice",
                trial_number: CT + 1,
                question: trialInfo.question,
                option1:  trialInfo.option1,
                option2:  trialInfo.option2,
                option_chosen: $('input[name=answer]:checked').val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        // record trial starting time
        startingTime = Date.now();

    },
	trials : 10
};


var mainSliderRating = {
    render : function(CT) {
        var view = {};
        var trialInfo = generateTrial()
        // what part of the progress bar is filled
        var filled = exp.currentTrialInViewCounter * (exp.progress_bar_width / exp.views_seq[exp.currentViewCounter].trials);
        view.name = 'trial',
        view.template = $('#trial-view-slider-response').html();
        view.response = $('#response').html();
        var response;
        $('#main').html(Mustache.render(view.template, {
            question: trialInfo.question,
            option1: trialInfo.option1,
            option2: trialInfo.option2,
        }));
        startingTime = Date.now();
        drawOnCanvas(document.getElementById('canvas'), trialInfo)
        response = $('#response');
        // updates the progress bar
        $('#filled').css('width', filled);

        // checks if the slider has been changed
        response.on('change', function() {
            $('#next').removeClass('nodisplay');
        });
        response.on('click', function() {
            $('#next').removeClass('nodisplay');
        });

        $('#next').on('click', function() {
            RT = Date.now() - startingTime; // measure RT before anything else
            trial_data = {
                trial_type: "mainSliderRating",
                trial_number: CT+1,
                question: trialInfo.question,
                option1: trialInfo.option1,
                option2: trialInfo.option2,
                rating_slider: response.val(),
                RT: RT
            };
            exp.trial_data.push(trial_data);
            exp.findNextView();
        });

        return view;
    },
    trials: 10
};


var postTest = {
    name: 'postTest',
    "title": "Additional Info",
    "text": "Answering the following questions is optional, but will help us understand your answers.",
    "buttonText": "Continue",
    // render function renders the view
    render : function() {

        viewTemplate = $('#post-test-view').html();
        $('#main').html(Mustache.render(viewTemplate, {
            title: this.title,
            text: this.text,
            buttonText: this.buttonText
        }));

        $('#next').on('click', function(e) {
            // prevents the form from submitting
            e.preventDefault();

            // records the post test info
            exp.global_data.age = $('#age').val();
            exp.global_data.gender = $('#gender').val();
            exp.global_data.education = $('#education').val();
            exp.global_data.languages = $('#languages').val();
            exp.global_data.comments = $('#comments').val().trim();
            exp.global_data.endTime = Date.now();
            exp.global_data.timeSpent = (exp.global_data.endTime - exp.global_data.startTime) / 60000;

            // moves to the next view
            exp.findNextView();
        })

    },
    trials: 1
};

var thanks = {
    name: 'thanks',
    "message": "Thank you for taking part in this experiment!",
    render: function() {

        viewTemplate = $('#thanks-view').html();

        // what is seen on the screen depends on the used deploy method
		//    normally, you do not need to modify this
        if ((config_deploy.is_MTurk) || (config_deploy.deployMethod === 'directLink')) {
            // updates the fields in the hidden form with info for the MTurk's server
            $('#main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
            }));
        } else if (config_deploy.deployMethod === 'Prolific') {
            var prolificURL = 'https://prolific.ac/submissions/complete?cc=' + config_deploy.prolificCode;

            $('main').html(Mustache.render(viewTemplate, {
                thanksMessage: this.message,
                extraMessage: "Please press the button below<br />" + '<a href=' + prolificURL +  ' class="prolific-url">Finished!</a>'
            }));
        } else if (config_deploy.deployMethod === 'debug') {
            $('main').html(Mustache.render(viewTemplate, {}));
        } else {
            console.log('no such config_deploy.deployMethod');
        }

        exp.submit();

    },
    trials: 1
};
