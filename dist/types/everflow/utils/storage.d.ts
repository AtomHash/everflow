/**
 * Creates an Everflow Storage object. Adds the ability to load objects and save objects in localstorage(ASYNC)
 * @class
 */
export default class Storage {
    /**
     * Initializes Sotage with a storage config object
     * @constructor
     * @param {object} config - everflow storage config
     */
    constructor(config: object);
    /**
     * Set a local storage object with a value
     * @function set
     * @param {string} key - local storage index-key
     * @param {any} value - value to save
     */
    set(key: string, value: any, onSuccess: CallableFunction | null, onFail: CallableFunction | null): void;
    /**
     * Get a local storage object with key
     * @function get
     * @param {string} key - local storage index-key
     * @param {callable} callback - callback for when data is loaded
     */
    get(key: string, callback: any): void;
    /**
     * Get a local storage object with key
     * @function remove
     * @param {string} key - local storage index-key
     * @param {callable} callback - callback for when data is removed
     */
    remove(key: string, callback?: any): void;
}
