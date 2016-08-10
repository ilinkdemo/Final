/*jslint browser: true*/
/*jslint unparam: true, node: true, forin: true */
/*global $, bbvnApp, ProgressEnableFlag: true, ww: true*/
ticketApp.factory("restService",['$http', "config", '$cacheFactory', '$q',
    function ($http, config, $cacheFactory, $q) {

        var restCall = {},
            cache = $cacheFactory('dataCache'),
            baseUrl = config.baseUrl,
            cacheId,
            cachedData,
            encodeObject = function formEncode(obj) {
                var encodedString = '',
                    key;
                for (key in obj) {
                    if (encodedString.length !== 0) {
                        encodedString += '&';
                    }

                    encodedString += key + '=' + encodeURIComponent(obj[key]);
                }
                return encodedString;
            };

        (function () {
            ww = {};
            var self;
            ww.angular = {
                // extends deferred with $http compatible .success and .error functions
                $httpDeferredExtender: function (deferred) {
                    deferred.promise.success = function (fn) {
                        deferred.promise.then(fn, null);
                        return deferred.promise;
                    };
                    deferred.promise.error = function (fn) {
                        deferred.promise.then(null, fn);
                        return deferred.promise;
                    };
                    return deferred;
                },
                // creates a resolved/rejected promise from a value
                $httpPromiseFromValue: function ($q, val, reject) {
                    var def = $q.defer();
                    if (reject) {
                        def.reject(val);
                    } else {
                        def.resolve(val);
                    }
                    self.$httpDeferredExtender(def);
                    return def.promise;
                }
            };
            self = ww.angular;
        }());

        restCall._getRecords = function (cntrlUrl) {
            var deferred = $q.defer();
            $http({
                method: "GET",
                url: baseUrl + cntrlUrl,
                headers: { 'Content-Type': "application/json" },
                params: { 'cacheclear': new Date().getTime() }
            })
            .success(function (data, status, headers, config) {
                // any required additional processing here
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(new errorData(data, status, headers, config));
            });
            return deferred.promise;
        };
        var errorData = function (data, status, headers, config) {
            this.error = data,
            this.status = status,
            this.headers = headers,
            this.config = config
        };
        restCall._postRecords = function (cntrlUrl, inputData) {
            var deferred = $q.defer();
            $http({
                method: "POST",
                url: baseUrl + cntrlUrl,
                contentType: "application/json; charset=utf-8",
                datatype: "json",
                headers: "user", //headers: { user: JSON.stringify(user) },
                data: JSON.stringify(inputData)
            })
            .success(function (data, status, headers, config) {
                // any required additional processing here
                deferred.resolve(data);
            })
            .error(function (data, status, headers, config) {
                deferred.reject(new errorData(data, status, headers, config));
            });
            return deferred.promise;
        };
        restCall.getMethod = function (inputString) {

            return $http({
                type: "GET",
                url: baseUrl + inputString,
                contentType: "application/json; charset=utf-8",
                datatype: 'json'
            });
        };
        restCall.getUniqueCheckMethod = function (inputString) {

            return $http({
                type: "GET",
                url: baseUrl + inputString,
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                ignoreLoadingBar: true
            });
        };
        restCall.postMethod = function (cntrlName, inputData, noCache) {

            return $http({
                method: "POST",
                url: baseUrl + cntrlName,
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                data: JSON.stringify(inputData)
            }).success(function (data) {
                cache.put(cacheId, data);
            }).error(function (data, status) { });
        };
        restCall.putMethod = function (cntrlName, inputData, noCache) {
            return $http({
                method: "PUT",
                url: baseUrl + cntrlName,
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                data: JSON.stringify(inputData)
            }).success(function (data) {
                cache.put(cacheId, data);
            }).error(function (data, status) { });
        };
        restCall.postMethodTwoObject = function (cntrlName, inputData, SecondInputData) {
            return $http({
                method: "POST",
                url: baseUrl + cntrlName,
                contentType: "application/json; charset=utf-8",
                datatype: 'json',
                data: inputRequest
            });
        };
        return restCall;
    }]);