(function () {
    const match = document.cookie.match(/theme=(dark|light)/);
    const theme = match ? match[1] : 'light';
    document.documentElement.classList.add(theme + '-theme');
})();
(function () {
    // Read saved lang from cookie (or default to 'en')
    var match = document.cookie.match(/(?:^|;\s*)lang=(\w+)/);
    var lang = match ? match[1] : 'en';

    // Set direction based on lang
    var rtlLangs = ['ar'];
    var dir = rtlLangs.includes(lang) ? 'rtl' : 'ltr';

    // Apply immediately
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', dir);
})();