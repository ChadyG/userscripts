// ==UserScript==
// @name         BitBucket Commit Date
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Enforce useful date formatting on BitBucket Commits.
// @author       ChadyG
// @match        https://bitbucket.org/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function formatDate(elem) {
        var d = new Date(Date.parse(this.title))
        this.textContent = d.toDateString()
    };

    $('#commit-list-container').find('time').each(formatDate);
    $('#commit-list-container').find('time').on('DOMSubtreeModified', formatDate);
})();
