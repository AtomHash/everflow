import * as moment from "moment";
export default class DateTime {
    private static getDateFormat();
    private static getTimeFormat();
    static moment(dateTime?: moment.MomentInput, format?: string, override?: boolean): moment.Moment;
    static date(dateTime?: moment.MomentInput): string;
    static time(dateTime?: moment.MomentInput): string;
}
