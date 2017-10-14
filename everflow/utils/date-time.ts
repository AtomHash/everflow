import * as moment from "moment";
import Utils from './utils';

export default class DateTime
{
    private static getDateFormat(): string
    {
        var config = window.app.config;
        var dateFormat = null;
        try {
            dateFormat = window.app.config.datetime.date.format;
        } catch (e){
            dateFormat = "YYYY-MM-DD";
        }
        return dateFormat;
    }

    private static getTimeFormat(): string
    {
        var config = window.app.config;
        var timeFormat = null;
        try {
            timeFormat = window.app.config.datetime.time.format;
        } catch (e){
            timeFormat = "LTS";
        }
        return timeFormat;
    }

    static moment(dateTime: moment.MomentInput = null, format: string = null, override: boolean = false): moment.Moment
    {
        if (Utils.isEmpty(format))
        {
            format = DateTime.getDateFormat() + " " + DateTime.getTimeFormat();
        }
        if (override)
        {
            format = null;
        }
        if (Utils.isEmpty(dateTime))
        {
            dateTime = new Date();
        }
        if (Utils.isEmpty(format))
        {
            format = "MMMM Do YYYY, h:mm:ss a";
        }
        return moment(dateTime, format);
    }

    static date(dateTime: moment.MomentInput = null): string
    {
        return DateTime.moment(dateTime).format(DateTime.getDateFormat());
    }

    static time(dateTime: moment.MomentInput = null): string
    {
        return DateTime.moment(dateTime).format(DateTime.getTimeFormat());
    }

}