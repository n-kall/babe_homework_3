// customize the experiment by specifying a view order and a trial structure
exp.customize = function() {

    // record current date and time in global_data
    this.global_data.startDate = Date();
    this.global_data.startTime = Date.now();

    // choose randomly between slider and forced response type
    this.responseType = _.sample(["slider", "forced"])

    if (this.responseType === "slider") {

        // specify view order for slider type response
        this.views_seq = [intro,
                          instructionsSliderRating,
                          practiceSliderRating,
                          beginMainExp,
                          mainSliderRating,
                          postTest,
                          thanks];
    } else {

        // specify view order for forced type response
        this.views_seq = [intro,
                          instructionsForcedChoice,
                          practiceForcedChoice,
                          beginMainExp,
                          mainForcedChoice,
                          postTest,
                          thanks];

    }


    // prepare information about trials (procedure)
    // randomize main trial order, but keep practice trial order fixed
    this.trial_info.main_trials = _.shuffle(main_trials.concat(practice_trials));
    this.trial_info.practice_trials = practice_trials;

    // adds progress bars to the views listed
    // view's name coinsides with object's name
    this.progress_bar_in = ['practiceForcedChoice', 'mainForcedChoice', 'practiceSliderRating', 'mainSliderRating'];
    // styles: chunks, separate or default
    this.progress_bar_style = 'default';
    // the width of the progress bar or a single chunk
    this.progress_bar_width = 60;
};
