import moment from 'moment';
/**
 * Adds the ability to convert dates and times using config options.
 * @class
 */
export default class DateTime {
    /**
     * Returns the format string for date from app.config or defaults to YYYY-MM-DD
     * @function getDateFormat
     * @private
     * @static
     */
    private static getDateFormat;
    /**
     * Returns the format string for time from app.config or defaults to LTS
     * @function getTimeFormat
     * @private
     * @static
     */
    private static getTimeFormat;
    /**
     * Returns the format string for time from app.config or defaults to LTS
     * @function moment
     * @param {moment.MomentInput} dateTime - date and time value
     * @param {string} format - date and time format string, if empty values are generated using default or config options
     * @static
     */
    static moment(dateTime?: moment.MomentInput, format?: string): moment.Moment;
    /**
     * Return only date of date and time value
     * @function date
     * @param {moment.MomentInput} dateTime - date and time value
     * @static
     */
    static date(dateTime?: moment.MomentInput): string;
    /**
     * Return only time of date and time value
     * @function time
     * @param {moment.MomentInput} dateTime - date and time value
     * @static
     */
    static time(dateTime?: moment.MomentInput): string;
}
