'use strict';

//============================================================
//	the global environment (probably the window object)
//	and the main object

//var util = util || {};
//util.global = this || {};
//	see http://blog.jcoglan.com/2011/01/19/going-global/

(function(){
    var GLOBAL = (typeof global === "object")? global: this;
    GLOBAL.util = GLOBAL.util || {};
    util.global = GLOBAL;
}.call(this));


// the document;
util.document = util.global.document || {};


//============================================================
// usefull

if (!String.prototype.trim)
{
    // IE does not have trim() for strings
    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g, "");
    };
}


//------------------------------------------------------------
// special functions
//
util.identity = function(x) {
    return x;
};

util.nothing  = function() { };

(function(util){
    var ostring = Object.prototype.toString;
	
    var BOOLEAN  = ostring.call(true);
    var NUMBER   = ostring.call(1);
    var STRING   = ostring.call("");
    var ARRAY    = ostring.call([]);
    var FUNCTION = ostring.call(util.nothing);
	
    util.isBoolean  = function(x) {
        return ostring.call(x) === BOOLEAN;
    };
    util.isNumber   = function(x) {
        return ostring.call(x) === NUMBER;
    };
    util.isString   = function(x) {
        return ostring.call(x) === STRING;
    };
    util.isArray    = function(x) {
        return ostring.call(x) === ARRAY;
    };
    util.isFunction = function(x) {
        return ostring.call(x) === FUNCTION;
    };

    util.isObject   = function(x) {
        return Object(x) === x;
    };
    util.isGlobal   = function(x) {
        return ostring.call(x) === "[object global]";
    };
	
    util.isDefined  = function(x) {
        return x !== undefined && x !== null;
    }
	
    // if the value is of the indicated type then use that value
    // otherwise use the alternate value
	
    util.ifDefined = function ifDefined(x, alternate) {
        if (util.isDefined(x)) {
            return x;
        }
        return ifDefined(alternate, false);
    };
	
    util.ifNumber = function ifNumber(x, alternate) {
        if (util.isNumber(x)) {
            return x;
        }
        return ifNumber(alternate, 0);
    };
	
    util.ifString = function ifString(x, alternate) {
        if (util.isString(x)) {
            return x;
        }
        return ifString(alternate, "");
    };
	
    util.ifArray = function ifArray(x, alternate) {
        if (util.isArray(x)) {
            return x;
        }
        return ifArray(alternate, []);
    };
	
    var nothing = util.nothing;
	
    util.ifFunction = function ifFunction(x, alternate) {
        if (util.isFunction(x)) {
            return x;
        }
        return ifFunction(alternate, nothing);
    };
	
    util.ifObject = function ifObject(x, alternate) {
        if (util.isObject(x)) {
            return x;
        }
        return ifObject(alternate, {});
    };
	
}(util));
