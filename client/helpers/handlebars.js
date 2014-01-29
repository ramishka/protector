//This is a global helper that can be used with any template

Handlebars.registerHelper('pluralize', function(n, thing) {
    // fairly stupid pluralizer
    if (n === 1) {
        return '1 ' + thing;
    } else {
        return n + ' ' + thing + 's';
    }
});
