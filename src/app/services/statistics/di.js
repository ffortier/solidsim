'use strict';

var objects = {};
var entries = [];

function getArgumentNames(fn) {
    return fn.toString().match(/\bfunction\b[^(]*\(([^(]*)\)/)[1].replace(/\s/g, '').split(',');
}

function instantiate(Type, args) {
    return new Type(...args);
}

function findEntry(name) {
    for (let i = 0; i < entries.length; i++) {
        if (entries[i].name === name) {
            return entries[i];
        }
    }
}

export default {
    register: function(name, cls) {
        var entry = { name, cls, deps: getArgumentNames(cls) };

        for (let i = 0; i < entries.length; i++) {
            if (entries[i].deps.indexOf(name)) {
                entries.splice(i, 0, entry);
                return;
            }
        }

        entries.push(entry);
    },
    initialize: function() {
        for (let i = 0; i < entries.length; i++) {
            objects[entries[i].name] = instantiate(entries[i].cls, entries[i].deps.map(p => objects[p]));
        }
    },
    inject: function(name, deps) {
        var entry = findEntry(name);

        return instantiate(entry.cls, entry.deps.map(p => typeof deps[p] !== 'undefined' ? deps[p] : objects[p]));
    }
};