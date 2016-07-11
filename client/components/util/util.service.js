'use strict';

angular.module('LightIt.util')
    .factory('Util', UtilService);
/**
 * The Util service is for thin, globally reusable, utility functions
 */

UtilService.$inject = ['$window'];

function UtilService($window) {

    return {
        safeCb: safeCb,
        urlParse: urlParse,
        isSameOrigin: isSameOrigin
    };


    /**
     * Return a callback or noop function
     *
     * @param  {Function|*} cb - a 'potential' function
     * @return {Function}
     */
    function safeCb(cb) {
        return angular.isFunction(cb) ? cb : angular.noop;
    }

    /**
     * Parse a given url with the use of an anchor element
     *
     * @param  {String} url - the url to parse
     * @return {Object}     - the parsed url, anchor element
     */
    function urlParse(url) {
        var a = document.createElement('a');
        a.href = (a.host === '') ? a.href : url;
        return a;
    }

    /**
     * Test whether or not a given url is same origin
     *
     * @param  {String}           url       - url to test
     * @param  {String|String[]}  [origins] - additional origins to test against
     * @return {Boolean}                    - true if url is same origin
     */
    function isSameOrigin(url, origins) {
        var url = urlParse(url);
        var origins = origins && [].concat(origins) || [];

        origins = origins.map(urlParse);
        origins.push($window.location);

        origins = origins.filter(function (o) {
            var hostnameCheck = url.hostname === o.hostname;
            var protocolCheck = url.protocol === o.protocol;
            var portCheck = url.port === o.port || o.port === '' && (url.port === '80' || url
                    .port === '443');
            return hostnameCheck && protocolCheck && portCheck;
        });
        return origins.length >= 1;
    }
}