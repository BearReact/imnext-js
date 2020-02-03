/* eslint no-multi-assign: "off" */

/**
 * Route Setting
 *
 * name: route push name
 * pattern: route rules
 * page: next pages path (in: src/pages)
 *
 * @type {*[]}
 */

const rules = [
    {name: 'example', pattern: '/example', page: '/example'},
    {name: 'example-news', pattern: '/example/news', page: '/example/news'},
    {name: 'example-news-detail', pattern: '/example/news/:id', page: '/example/news/detail'},
    {name: 'example-contact', pattern: '/example/contact', page: '/example/contact'},
    {name: 'example-profile', pattern: '/example/profile', page: '/example/profile'},
    {name: 'home', pattern: '/', page: '/index'},
];

module.exports = rules;
