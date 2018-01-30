import * as moment from 'moment';
import Utils from './utils';

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
    private static getDateFormat(): string
    {
        var config = window.app.config;
        var dateFormat = null;
        try {
            dateFormat = window.app.config.datetime.date.format;
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
    private static getTimeFormat(): string
    {
        var config = window.app.config;
        var timeFormat = null;
        try {
            timeFormat = window.app.config.datetime.time.format;
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
        if (Utils.isEmpty(format))
        {
            format = `${DateTime.getDateFormat()} ${DateTime.getTimeFormat()}`;
        }
        if (Utils.isEmpty(dateTime))
        {
            dateTime = new Date();
        }
        if (Utils.isEmpty(format))
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