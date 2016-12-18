/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against my application.
 */

$(function() {
    /* This is my first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in my application.
    */
    describe('RSS Feeds', function() {
        /* This is my first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        for (var i = 0; i < allFeeds.length; i++) {
            (function (allFeeds) {
                it('are defined', function () {
                    expect(allFeeds.url).toBeDefined();
                    expect(allFeeds.url.length).not.toBe(0);
                });
            })(allFeeds[i]);
        };

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        for (var i = 0; i < allFeeds.length; i++) {

            (function (allFeeds) {
                it('are defined', function () {
                    expect(allFeeds.name).toBeDefined();
                    expect(allFeeds.name.length).not.toBe(0);
                });
            })(allFeeds[i]);
        };
    });

    /* A new test suite named "The menu" */
    describe('The menu', function() {
        /* This is a test that ensures the menu element is
         * hidden by default.
         */
        it('The default class is menu-hidden', function () {
            var defaultClass = ($("body").hasClass("menu-hidden"));
            expect(defaultClass).toBe(true);
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('Toggles visibility', function () {
            var menuIcon = $('.menu-icon-link');
            /* click first time toggleClass */
            menuIcon.trigger('click');
            var bodyClass = ($("body").hasClass("menu-hidden"));
            expect(bodyClass).toBe(false);

            /* click second time toggleClass */
            menuIcon.trigger('click');
            var bodyClass = ($("body").hasClass("menu-hidden"));
            expect(bodyClass).toBe(true);
        });
    });

    /* A new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* This is to make sure .entry h2 has content in it */
        it('has an entry in feed container', function () {
            var feedEntry = $('.feed .entry').length;
            expect(feedEntry).not.toBe(0);
        });
    });

    /* A new test suite named "New Feed Selection"  */ 
    describe('New Feed Selection', function() {
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */

        var oldFeed,
        newFeed;

        beforeEach(function (done) {
            loadFeed(0, function () {
                    oldFeed = $('.feed').html();
                loadFeed(1, function () {
                    newFeed = $('.feed').html();
                    done();
                });
            });
        });
        it('content changes', function () {
            expect(oldFeed).not.toBe(newFeed);
        });
    });
}());
