import * as $ from 'jquery';

export class DisplayBody {

    addClass(className: string) {
        $('body').addClass(className);
    }

    removeClass(className: string) {
        $('body').removeClass(className);
    }
}

export class DisplayLoader {

    on(): void {
        $('body').removeClass('loaded');
        $('.loader').show();
    }

    off(): void {
        setTimeout(function () {
            $('body').addClass('loaded');
        }, 1000);
        setTimeout(function () {
            $('.loader').fadeOut('400');
        }, 400);
    }
}

export class DisplayTextfield {

    error($element) {
        $element.addClass('invalid').removeClass('valid');
    }

    errorReset($element) {
        $element.removeClass('invalid').removeClass('valid');
    }
}

export default class Display
{
    //Helper functions for making common display functions
    static body: DisplayBody = new DisplayBody
    static loader: DisplayLoader = new DisplayLoader
    static textfield: DisplayTextfield = new DisplayTextfield
}

/*
body: {
        addClass(class)
        {

        }
    },
    main: {
        loader: {
            on()
            {
                $('body').removeClass('loaded');
                $('.loader').show();
            },
            off()
            {
                setTimeout(function () {
                    $('body').addClass('loaded');
                }, 1000);
                setTimeout(function () {
                    $('.loader').fadeOut('400');
                }, 400);
            }
        }
    },
    textfield: {
        error($element)
        {
            $element.addClass('invalid').removeClass('valid');
        },
        errorReset($element)
        {
            $element.removeClass('invalid').removeClass('valid');
        }
    }

*/
