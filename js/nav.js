// Single source-of-truth hierarchical navigation.
// Injected on every page so the menu is defined once. Each page declares:
//   <body data-nav-root="../" data-nav-active="shop">
// where data-nav-root is the relative path back to the site root ("" at root,
// "../" one level deep) and data-nav-active is the current section key.
(function () {
  var MENU = [
    { key: 'home', label: 'Home', href: 'index.html' },
    {
      key: 'shop', label: 'Shop', href: 'shop/index.html',
      children: [
        { label: 'All Gear', href: 'shop/index.html' },
        { label: 'Cameras', href: 'shop/cameras.html' },
        { label: 'Lenses', href: 'shop/lenses.html' }
      ]
    },
    {
      key: 'learn', label: 'Learn', href: 'learn/index.html',
      children: [
        { label: 'Overview', href: 'learn/index.html' },
        { label: 'Guides', href: 'learn/guides.html' },
        { label: 'Tutorials', href: 'learn/tutorials.html' }
      ]
    },
    {
      key: 'showcase', label: 'Showcase', href: 'showcase/index.html',
      children: [
        { label: 'Overview', href: 'showcase/index.html' },
        { label: 'Gallery', href: 'showcase/gallery.html' },
        { label: 'Video', href: 'showcase/video.html' },
        { label: 'Slider', href: 'showcase/slider.html' }
      ]
    },
    { key: 'about', label: 'About', href: 'about.html' }
  ];

  function build() {
    var body = document.body;
    var root = body.getAttribute('data-nav-root') || '';
    var active = body.getAttribute('data-nav-active') || '';

    var nav = document.createElement('nav');
    nav.className = 'navbar';

    var inner = document.createElement('div');
    inner.className = 'nav-inner';

    var brand = document.createElement('a');
    brand.className = 'brand';
    brand.href = root + 'index.html';
    brand.textContent = 'Lumen';

    var toggle = document.createElement('button');
    toggle.className = 'nav-toggle';
    toggle.setAttribute('aria-label', 'Toggle navigation');
    toggle.innerHTML = '&#9776;';

    var ul = document.createElement('ul');
    ul.className = 'nav-links';
    ul.id = 'navLinks';

    MENU.forEach(function (item) {
      var li = document.createElement('li');
      var a = document.createElement('a');
      a.href = root + item.href;
      a.textContent = item.label;
      if (item.key === active) { a.className = 'active'; }
      li.appendChild(a);

      if (item.children && item.children.length) {
        li.className = 'has-dropdown';
        var sub = document.createElement('ul');
        sub.className = 'dropdown';
        item.children.forEach(function (child) {
          var cli = document.createElement('li');
          var ca = document.createElement('a');
          ca.href = root + child.href;
          ca.textContent = child.label;
          cli.appendChild(ca);
          sub.appendChild(cli);
        });
        li.appendChild(sub);

        // Mobile: tapping the top-level label toggles its submenu.
        a.addEventListener('click', function (e) {
          if (window.innerWidth <= 768) {
            e.preventDefault();
            li.classList.toggle('open');
          }
        });
      }
      ul.appendChild(li);
    });

    inner.appendChild(brand);
    inner.appendChild(toggle);
    inner.appendChild(ul);
    nav.appendChild(inner);

    body.insertBefore(nav, body.firstChild);

    toggle.addEventListener('click', function () { ul.classList.toggle('open'); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
