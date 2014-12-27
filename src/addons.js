if (typeof RegExp.escape !== 'function') {
    RegExp.escape = function(str) {
        return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    };
}
