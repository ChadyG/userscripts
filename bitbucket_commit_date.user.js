// ==UserScript==
// @name         BitBucket Commit Date
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Enforce useful date formatting on BitBucket Commits.
// @author       ChadyG
// @match        https://bitbucket.org/*
// @grant        none
// @require http://code.jquery.com/jquery-3.4.1.min.js
// @require https://greasyfork.org/scripts/5392-waitforkeyelements/code/WaitForKeyElements.js?version=115012
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    function formatDate(elem) {
        var d = new Date(Date.parse(this.title))
        var year = d.toLocaleDateString('en-US', {year: 'numeric'})
        var month = d.toLocaleDateString('en-US', {month: '2-digit'})
        var day = d.toLocaleDateString('en-US', {day: '2-digit'})
        
        this.textContent = `${year}-${month}-${day}`
    };
    
    //FIXME: Needs to run after Bitbucket's lazy load
    waitForKeyElements("[data-qa=commit-list-container]", formatCommitList);
    setTimeout(formatCommitList, 5000);

    function formatCommitList() {
        //Older style
        $('#commit-list-container').find('time').each(formatDate);
        $('#commit-list-container').find('time').on('DOMSubtreeModified', formatDate);
        
        //Newer
        $('[data-qa=commit-list-container]').find('span[title]').each(formatDate);
        $('[data-qa=commit-list-container]').find('span[title]').on('DOMSubtreeModified', formatDate);
    }
})();
