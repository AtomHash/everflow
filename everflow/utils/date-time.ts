import * as moment from 'moment';
import App from '../app';

/**
 * Adds the ability to convert dates and times using config options.
 * @class
 */
export default class DateTime
{
    /**
     * Returns the format string for date from app.config or defaults to YYYY-MM-DD
     * @function getDateFormat
     * @private
     * @static
     */
    private static getDateFormat(everflowApp: App = null): string
    {
        var dateFormat = null;
        try {
            var config = everflowApp.config;
            dateFormat = everflowApp.config.datetime.date.format;
        } catch (e){
            dateFormat = 'YYYY-MM-DD';
        }
        return dateFormat;
    }

    /**
     * Returns the format string for time from app.config or defaults to LTS
     * @function getTimeFormat
     * @private
     * @static
     */
    private static getTimeFormat(everflowApp: App = null): string
    {
        var timeFormat = null;
        try {
            var config = everflowApp.config;
            timeFormat = everflowApp.config.datetime.time.format;
        } catch (e){
            timeFormat = 'LTS';
        }
        return timeFormat;
    }

    /**
     * Returns the format string for time from app.config or defaults to LTS
     * @function moment
     * @param {moment.MomentInput} dateTime - date and time value
     * @param {string} format - date and time format string, if empty values are generated using default or config options
     * @static
     */
    static moment(dateTime: moment.MomentInput = null, format: string = null): moment.Moment
    {
        if (!format)
        {
            format = `${DateTime.getDateFormat()} ${DateTime.getTimeFormat()}`;
        }
        if (!dateTime)
        {
            dateTime = new Date();
        }
        if (!format)
        {
            format = 'MMMM Do YYYY, h:mm:ss a';
        }
        return moment(dateTime, format);
    }

    /**
     * Return only date of date and time value 
     * @function date
     * @param {moment.MomentInput} dateTime - date and time value
     * @static
     */
    static date(dateTime: moment.MomentInput = null): string
    {
        return DateTime.moment(dateTime).format(DateTime.getDateFormat());
    }

    /**
     * Return only time of date and time value 
     * @function time
     * @param {moment.MomentInput} dateTime - date and time value
     * @static
     */
    static time(dateTime: moment.MomentInput = null): string
    {
        return DateTime.moment(dateTime).format(DateTime.getTimeFormat());
    }

}