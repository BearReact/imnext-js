/* eslint no-multi-assign: "off" */
const rules = [
    {name: 'example', pattern: '/example', page: '/example'},
    {name: 'example-news', pattern: '/example/news', page: '/example/news'},
    {name: 'example-news-detail', pattern: '/example/news/:id', page: '/example/news/detail'},
    {name: 'example-contact', pattern: '/example/contact', page: '/example/contact'},
    {name: 'home', pattern: '/', page: '/index'},
];

module.exports = rules;
