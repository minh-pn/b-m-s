/* French initialisation for the jQuery UI date picker plugin. */
/* Written by Keith Wood (kbwood{at}iinet.com.au),
        Stéphane Nahmani (sholby@sholby.net),
        Stéphane Raimbault <stephane.raimbault@gmail.com> */
(function (factory) {
    "use strict";
    if (typeof define === "function" && define.amd) {
        // AMD. Register as an anonymous module.
        define(["../widgets/datepicker"], factory);
    } else {
        // Browser globals
        factory(jQuery.datepicker);
    }
})(function (datepicker) {
    "use strict";
    datepicker.regional.fr = {
        closeText: "Fermer",
        prevText: "Précédent",
        nextText: "Suivant",
        currentText: "Aujourd'hui",
        monthNames: ["janvier", "février", "mars", "avril", "mai", "juin",
            "juillet", "août", "septembre", "octobre", "novembre", "décembre"
        ],
        monthNamesShort: ["janv.", "févr.", "mars", "avr.", "mai", "juin",
            "juil.", "août", "sept.", "oct.", "nov.", "déc."
        ],
        dayNames: ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
        dayNamesShort: ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
        dayNamesMin: ["D", "L", "M", "M", "J", "V", "S"],
        weekHeader: "Sem.",
        dateFormat: "dd/mm/yy",
        firstDay: 1,
        isRTL: false,
        showMonthAfterYear: false,
        yearSuffix: ""
    };
    datepicker.setDefaults(datepicker.regional.fr);
    return datepicker.regional.fr;
});

function onChangeMultiSelect(element, maximum) {
    
    let $node = $(element.parents('select'));
    let selectedOptions = $node.find('option:selected');

    if (selectedOptions.length >= maximum) {
        let nonSelectedOptions = $node.find('option').filter(function() {
            return !$(this).is(':selected');
        });
       
        nonSelectedOptions.each(function() {
            let input = $('input[value="' + $(this).val() + '"]');
            input.prop('disabled', true);
            input.parents('.multiselect-option').addClass('disabled');
        });
    }
    else {
        $node.find('option').each(function() {
            let input = $('input[value="' + $(this).val() + '"]');
            input.prop('disabled', false);
            input.parents('.multiselect-option').removeClass('disabled');
        });
    }
}

$(document).ready(function () {
    //Custom select element layout
    // $('select').select2();
    
    // $('select').val('').trigger('change');

    // $('select.type-diplome').select2({
    //     placeholder: "Type de diplôme"
    // });


    // $('select.type-specialite').select2({
    //     placeholder: "Choix de Spécialitée",
    //     maximumSelectionLength: 1
    // });

    // $('.show-1 select.type-specialite').select2({
    //     placeholder: "Choix des Spécialitées",
    // });

    // $('.show-3 select.type-specialite,.show-5 select.type-specialite').select2({
    //     placeholder: "Choix de Spécialitée",
    //     maximumSelectionLength: 1
    // });

    // $('.show-theme select').select2({
    //     placeholder: "Choix des thèmes",
    //     maximumSelectionLength: 2
    // });
    // $('.bac-choix-spec select').select2({
    //     placeholder: "Choix des Spécialitées",
    //     maximumSelectionLength: 6
    // });


    // Custom multiSelect
    const configChoseOne = {
        maxHeight:300,
        nonSelectedText: 'Choix de Spécialitée',
        numberDisplayed: 1,
        enableFiltering: true,
        onChange:function(element){
            onChangeMultiSelect(element,maximum=1)
        }
    };

    const configBacShow1Select = {
        maxHeight:300,
        nonSelectedText: 'Choix des Spécialitées',
        numberDisplayed: 1,
        enableFiltering: true
    };

    const configBacShow35Select = {
        maxHeight:300,
        nonSelectedText: 'Choix de Spécialitée',
        numberDisplayed: 2,
        enableFiltering: true,
        onChange:function(element){
            onChangeMultiSelect(element,maximum=1)
        }
    };

    const configBacChoixSpec = {
        maxHeight:300,
        nonSelectedText: 'Choix des Spécialitées',
        numberDisplayed: 1,
        enableFiltering: true,
        onChange:function(element){
            onChangeMultiSelect(element,maximum=6)
        }
    };

    const configTheme = {
        maxHeight:300,
        nonSelectedText: 'Choix des thèmes',
        numberDisplayed: 1,
        enableFiltering: true,
        onChange:function(element){
            onChangeMultiSelect(element,maximum=2)
        }
    };

    const configTypeDiplome = {
        maxHeight:300,
        nonSelectedText: 'Type de diplôme',
    };

    const configSingleSelect = {
        maxHeight:300,
        enableFiltering: true
    };

    $('select').val('').trigger('change');

    $('select.single-select').multiselect(configSingleSelect);

    $('select.type-diplome').multiselect(configTypeDiplome);
    
    $('select.type-specialite-chose-one').multiselect(configChoseOne);

    $('.show-1 select.type-specialite').multiselect(configBacShow1Select);

    $('.show-3 select.type-specialite,.show-5 select.type-specialite').multiselect(configBacShow35Select);

    $('.bac-choix-spec select').multiselect(configBacChoixSpec);

    $('.show-theme select').multiselect(configTheme);
    
    // End custom multiSelect

    if ($('.bac').length) {
        $('.bac select.type-diplome').change('select', function (e) {
            var data = $(this).find(":selected").val();
            $('.bac .control-div').removeClass('show');

            $('.loading').hide();
            $('.bac .loading').show();

            //Reset all select box & radio
            $('.control-div select:not(.bac-speciality)').val('');
            $('.control-div select:not(.bac-speciality)').multiselect('refresh');
            $('input[type=radio]:not(.niveau):not(.level-choice)').prop('checked', false);
            $('input[type=text]').val('');

            setTimeout(function (argument) {
                $('.bac .loading').hide();
                $('.bac .show-' + data).addClass('show');
            }, 500);
        });
    }
    
    if ($('.bac-1').length) {
        $('.bac-1 select.type-diplome').change('select', function (e) {
            var data = $(this).find(":selected").val();
            $('.bac-1 .control-div').removeClass('show');

            $('.loading').hide();
            $('.bac-1 .loading').show();

            //Reset all select box & radio
            $('.control-div select').val('');
            $('.control-div select').multiselect('refresh');
            $('input[type=radio]:not(.niveau):not(.level-choice)').prop('checked', false);
            $('input[type=text]').val('');

            setTimeout(function (argument) {
                $('.bac-1 .loading').hide();

                if ((DiplomaIdBac['bac1']).includes(Number(data))) {
                    $('.bac-1 .show-' + data).addClass('show');
                } else {
                    $('.bac-1 .show-theme').addClass('show');
                }
            }, 500);
        });
    }

    if ($('.bac-2').length) {
        $('.bac-2 select.type-diplome').change('select', function (e) {
            var data = $(this).find(":selected").val();
            $('.bac-2 .control-div').removeClass('show');

            $('.loading').hide();
            $('.bac-2 .loading').show();

            //Reset all select box & radio
            $('.control-div select').val('');
            $('.control-div select').multiselect('refresh');
            $('input[type=radio]:not(.niveau):not(.level-choice)').prop('checked', false);
            $('input[type=text]').val('');

            setTimeout(function (argument) {
                $('.bac-2 .loading').hide();
                if ((DiplomaIdBac['bac2']).includes(Number(data))) {
                    $('.bac-2 .show-' + data).addClass('show');
                } else if (data != 0) {
                    $('.bac-2 .show-theme').addClass('show');
                }
            }, 500);
        });
    }

    if ($('.bac-3').length) {
        $('.bac-3 select.type-diplome').change('select', function (e) {
            var data = $(this).find(":selected").val();
            $('.bac-3 .control-div').removeClass('show');

            $('.loading').hide();
            $('.bac-3 .loading').show();

            //Reset all select box & radio
            $('.control-div select').val('');
            $('.control-div select').multiselect('refresh');
            $('input[type=radio]:not(.niveau):not(.level-choice)').prop('checked', false);
            $('input[type=text]').val('');

            setTimeout(function (argument) {
                $('.bac-3 .loading').hide();
                if ((DiplomaIdBac['bac3']).includes(Number(data))) {
                    $('.bac-3 .show-' + data).addClass('show');
                } else {
                    $('.bac-3 .show-theme').addClass('show');
                }
                //$('.bac-3 .show-theme').addClass('show');
            }, 500);
        });
    }

    if ($('.bac-4').length) {
        $('.bac-4 select.type-diplome').change('select', function (e) {
            var data = $(this).find(":selected").val();
            $('.bac-4 .control-div').removeClass('show');

            $('.loading').hide();
            $('.bac-4 .loading').show();

            //Reset all select box & radio
            $('.control-div select').val('');
            $('.control-div select').multiselect('refresh');
            $('input[type=radio]:not(.niveau):not(.level-choice)').prop('checked', false);
            $('input[type=text]').val('');

            setTimeout(function (argument) {
                $('.bac-4 .loading').hide();
                $('.bac-4 .show-' + data).addClass('show');
            }, 500);
        });
    }

    if ($('.bac-5').length) {
        $('.bac-5 select.type-diplome').change('select', function (e) {
            var data = $(this).find(":selected").val();
            $('.bac-5 .control-div').removeClass('show');

            $('.loading').hide();
            $('.bac-5 .loading').show();

            //Reset all select box & radio
            $('.control-div select').val('');
            $('.control-div select').multiselect('refresh');
            $('input[type=radio]:not(.niveau):not(.level-choice)').prop('checked', false);
            $('input[type=text]').val('');

            setTimeout(function (argument) {
                $('.bac-5 .loading').hide();
                $('.bac-5 .show-' + data).addClass('show');
            }, 500);
        });
    }
    

    //============================================================
    //Step 1
    $.datepicker.setDefaults($.datepicker.regional["fr"]);
    $("#datepicker").datepicker({
        changeMonth: true,
        changeYear: true,
        yearRange: '1950:2022'
    });

    //============================================================
    //Step 2
    $('[name=study_level]').each(function (i, d) {
        var p = $(this).prop('checked');
        var tab_name = $(this).attr('data-tab');

        if (p) {
            $('article.' + tab_name).addClass('on');
        }
    });

    $('[name=study_level]').on('change', function () {
        var p = $(this).prop('checked');
        var tab_name = $(this).attr('data-tab');


        $('article').removeClass('on');
        $('article.' + tab_name).addClass('on');
        $('article.' + tab_name).find('input[name=study_level]').val($(this).val());

        //Reset all select box & radio
        $('select').val('');
        $('select').multiselect('refresh');

        $('input[type=radio]:not(.niveau):not(.level-choice)').prop('checked', false);
        $('input[type=text]').val('');
        $('input[type=checkbox]').prop('checked', false);

        $('.control-div').removeClass('show');
    });

    // Step 2 - BAC
    $('.toggle').click(function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.next().hasClass('show')) {
            $this.next().removeClass('show');
            $this.next().slideUp(350);
        } else {
            $this.parent().parent().find('li .inner').removeClass('show');
            $this.parent().parent().find('li .inner').slideUp(350);
            $this.next().toggleClass('show');
            $this.next().slideToggle(350);
        }
        //if clicking off from this toggle, will collapse all other list items
        $("li a.toggle").not(this).removeClass('expanded');
        // ensures all ancestors of this class will also remain expanded
        $this.parents('.inner').siblings('a.toggle').addClass("expanded");
        // to expand or collapse arrow on click (toggle)
        $this.toggleClass("expanded");

        // Checkbox Select/Deselect using
        var $find_closest = $(this).closest("ul")
        $('.checkall').on('change', function () {
            $find_closest.find("input[type='checkbox']").not($(this)).prop("checked", $(this).is(":checked"));
        });
        $(".case").on('change', function () {
            if ($find_closest.find(".case").length == $find_closest.find(".case:checked").length) {
                $find_closest.find(".checkall").prop('checked', true);
            } else {
                $find_closest.find(".checkall").prop('checked', false);
            }
        });
    });

    $('li[data-rel=objective-level-1]').hide();

    $('body').on('change', 'input.level-choice[name="objective-level"]', function () {
        let $this = $(this);
        let this_name = $this.attr('name');
        let this_id = this.id;
        let this_value = $this.val();

        console.log(this_name + '; ' + this_id + '; ' + this_value);

        let $accordion = $('.ul-accordion[for="' + this_name + '"]');
        let $checked_specialies = $accordion.find('input.check-speciality:checked');

        let $hide_elements = $accordion.find('li[name="major-line"][data-rel!="' + this_name + '-' + this_value + '"]');
        let $show_elements = $accordion.find('li[name="major-line"][data-rel="' + this_name + '-' + this_value + '"]');
        let $first_show_element = $accordion.find('li[name="major-line"][data-rel="' + this_name + '-' + this_value + '"]:first');

        $hide_elements.hide();

        $show_elements.show();
        $first_show_element.find('a').addClass('expanded');
        $first_show_element.find('ul').addClass('show').show();

        $accordion.show();
    });

    $('body').on('click', '.check-speciality', function () {
        if ($(this).hasClass('disabled-check')) {
            return false;
        }

        let $this = $(this);
        let this_name = $this.attr('name');
        let checked = $(this).prop('checked');

        let $checked_specialies = $('input[name="' + this_name + '"]:checked');
        let can_check_more = true;

        let $selected_speciality_list = $('.selected-speciality[for="' + this_name + '"]:first');



        if (this_name.includes('obtained') || this_name.includes('additional')) {
            var $other_specialies = $('input[name="' + this_name + '"]').not('[id="' + this.id + '"]');
            var tooltip_message = "Vous ne pouvez pas sélectionner plus d'une spécialité. Veuillez enlever l'ancienne pour sélectionner à nouveau";

            if (checked && $checked_specialies.length >= 1) {
                can_check_more = false;
            }
        } else if (this_name.includes('objective')) {
            var $other_specialies = $('input[name="' + this_name + '"]:not(:checked)');
            var tooltip_message = "Vous ne pouvez pas sélectionner plus de 2 spécialités. Veuillez enlever la(les) ancienne(s) pour sélectionner à nouveau";

            if ($checked_specialies.length >= 6) {
                can_check_more = false;
            }
        }

        if (!can_check_more) {
            $other_specialies.each(function (index) {
                $(this).addClass('disabled-check');
                $(this).closest('div').find('label').addClass('disabled-check');
            });
        } else {
            $other_specialies.each(function (index) {
                $(this).removeClass('disabled-check');
                $(this).closest('div').find('label').removeClass('disabled-check');
            });
        }

        update_preview_selected_speciality($selected_speciality_list);
    });

    $('body').on('click', '.remove-selected-speciality', function () {
        let selected_id = $(this).attr('data-id');

        clear_selected_additional_speciality(selected_id);
        $(this).closest('div').remove();
    });

    $('body').on('click', '.remove-checked-speciality', function () {
        let $this = $(this);
        let target_id = $this.attr('data-id');
        let $target_element = $('input[id="' + target_id + '"]');

        if (typeof $target_element === 'undefined') {
            return false;
        }

        $target_element.click();
    });
});

function update_preview_selected_speciality($element) {
    let $parent_div = $element.closest('div');
    let input_name = $element.attr('for')
    let $checked_specialities = $('input[name="' + input_name + '"]:checked');

    $element.html('');
    $parent_div.hide();

    if (typeof $checked_specialities !== 'undefined' && $checked_specialities.length > 0) {
        $checked_specialities.each(function (index) {
            let this_id = this.id;
            let input_id = $(this).val();
            let level = $(this).attr('data-level');
            let major = $(this).attr('data-major');
            let text = $(this).attr('data-text');
            let new_child = '';

            if (typeof level === 'undefined' || level.length === 0) {
                if (typeof major === 'undefined' || major.length === 0) {
                    new_child = '<li><span class="text-desc">' + text + '</span> <i title="Supprimer" class="fas fa-times remove-checked-speciality" data-id="' + this_id + '"></i></li>';
                } else {
                    new_child = '<li><span class="text-desc">' + major + '</span></li><ul><li>' + text + ' <i title="Supprimer" class="fas fa-times remove-checked-speciality" data-id="' + this_id + '"></i></li>';
                }
            } else {
                new_child = '<li><span class="text-desc">[' + level + ']</span> - ' + major + '</li><ul><li>' + text + ' <i title="Supprimer" class="fas fa-times remove-checked-speciality" data-id="' + this_id + '"></i></li></ul>';
            }

            $element.append(new_child);
        });

        $parent_div.show();
    }
}

function clear_selected_additional_speciality(selected_id = null) {
    let $select_additional_speciality = $('select[name="additional_speciality_ids[]"]');
    let $selected_options = $select_additional_speciality.find('option:selected');
    let $preview_selected_speciality = $('.selected-speciality[for="additional_speciality_ids[]"]');
    let $example_wrapper = $preview_selected_speciality.closest('.examples-infomation');

    if (typeof $selected_options === 'undefined') {
        return false;
    }

    if ($selected_options.length === 1 || selected_id === null) {
        $selected_options.prop('selected', false);
        $select_additional_speciality.selectpicker('refresh');

        $preview_selected_speciality.html('');
        $example_wrapper.hide();
    } else {
        $select_additional_speciality.find('option[value="' + selected_id + '"]').prop('selected', false);
        $select_additional_speciality.selectpicker('refresh');
    }
}


function ValidationFormSelf(ele = '') {

    if (ele) {
        $("." + ele).find("button[type=submit],button[type=button]").removeAttr("disabled");
        var forms = document.getElementsByClassName(ele);
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }
}