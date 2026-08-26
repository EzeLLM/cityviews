/* CityViews project page — task explorer, gallery filter, theme, copy */
(function () {
  'use strict';

  // CityViews-9B-SU on the held-out benchmark split (Tab. 2 of the paper).
  var TASKS = [
    { k: 'land_use',             g: 'u', sat: 72.0, sv: 72.5, full: 73.9, syn:  1.4, n: 421, d: 'dominant land use around the marker' },
    { k: 'building_height',      g: 'u', sat: 63.7, sv: 66.3, full: 66.8, syn:  0.5, n: 190, d: 'low / mid / high-rise' },
    { k: 'urban_density',        g: 'u', sat: 71.5, sv: 64.8, full: 74.6, syn:  3.1, n: 421, d: 'built-up density' },
    { k: 'road_type',            g: 'u', sat: 69.6, sv: 76.7, full: 76.7, syn:  0.0, n: 421, d: 'road category' },
    { k: 'junction_type',        g: 'u', sat: 74.0, sv: 71.3, full: 76.3, syn:  2.4, n: 334, d: 'intersection type' },
    { k: 'amenity_richness',     g: 'u', sat: 53.0, sv: 55.6, full: 55.6, syn:  0.0, n: 421, d: 'shops and services nearby' },
    { k: 'transit_density',      g: 'u', sat: 45.8, sv: 44.9, full: 49.4, syn:  3.6, n: 421, d: 'transit stops nearby' },
    { k: 'camera_direction',     g: 'x', sat: 22.8, sv: 25.2, full: 43.7, syn: 18.5, n: 421, d: 'which arrow is the camera heading' },
    { k: 'mismatch_binary_easy', g: 'x', sat: 51.8, sv: 52.7, full: 98.8, syn: 46.1, n: 421, d: 'do these views match (other-city distractor)' },
    { k: 'mismatch_binary_hard', g: 'x', sat: 43.7, sv: 44.2, full: 87.9, syn: 43.7, n: 421, d: 'do these views match (same-city distractor)' },
    { k: 'mismatch_mcq_easy',    g: 'x', sat: 24.7, sv: 23.3, full: 92.6, syn: 67.9, n: 421, d: 'which of four sets matches (other city)' },
    { k: 'mismatch_mcq_hard',    g: 'x', sat: 25.4, sv: 29.7, full: 84.8, syn: 55.1, n: 421, d: 'which of four sets matches (same city)' }
  ];

  var $ = function (id) { return document.getElementById(id); };
  var css = getComputedStyle(document.documentElement);
  var pick = $('taskpick');

  function accent(g) {
    return css.getPropertyValue(g === 'u' ? '--sat' : '--verm').trim();
  }

  function show(t, btn) {
    Array.prototype.forEach.call(pick.children, function (b) { b.classList.remove('on'); });
    if (btn) btn.classList.add('on');

    ['sat', 'sv', 'full'].forEach(function (m) {
      $('v-' + m).textContent = t[m].toFixed(1);
      $('c-' + m).style.height = (t[m] / 100 * 150 + 8).toFixed(1) + 'px';
    });

    var sign = t.syn >= 0 ? '+' : '−';
    var n = $('syn-n');
    n.textContent = sign + Math.abs(t.syn).toFixed(1);
    n.style.color = accent(t.g);
    $('syn-t').textContent = 'fusion synergy — ' + t.k;
    $('syn-d').textContent = t.g === 'u'
      ? 'Inside the ±3-point band: the second view adds no meaningful benefit. ' + t.n + ' questions.'
      : 'Far outside the ±3-point band: the answer lives between the views. ' + t.n + ' questions.';
  }

  if (pick) {
    TASKS.forEach(function (t, i) {
      var b = document.createElement('button');
      b.textContent = t.k;
      b.setAttribute('data-g', t.g);
      b.title = t.d;
      b.addEventListener('click', function () { show(t, b); });
      pick.appendChild(b);
      if (i === 0) { setTimeout(function () { show(t, b); }, 120); }
    });
  }

  // ---- gallery filter
  var gf = $('gfilter');
  if (gf) {
    gf.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b) { return; }
      Array.prototype.forEach.call(gf.children, function (x) { x.classList.remove('on'); });
      b.classList.add('on');
      var f = b.getAttribute('data-f');
      Array.prototype.forEach.call($('gallery').children, function (c) {
        c.classList.toggle('hide', f !== 'all' && c.getAttribute('data-g') !== f);
      });
    });
  }

  // ---- theme
  var tb = $('theme');
  if (tb) {
    tb.addEventListener('click', function () {
      var dark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (dark) { document.documentElement.removeAttribute('data-theme'); }
      else { document.documentElement.setAttribute('data-theme', 'dark'); }
      try { localStorage.setItem('cv-theme', dark ? 'light' : 'dark'); } catch (err) {}
      css = getComputedStyle(document.documentElement);
      var on = pick && pick.querySelector('.on');
      if (on) {
        var t = TASKS.filter(function (x) { return x.k === on.textContent; })[0];
        if (t) { $('syn-n').style.color = accent(t.g); }
      }
    });
  }

  // ---- copy bibtex
  var cb = $('copybib');
  if (cb) {
    cb.addEventListener('click', function () {
      var txt = $('bib').textContent;
      var done = function () {
        cb.textContent = 'Copied';
        cb.classList.add('done');
        setTimeout(function () { cb.textContent = 'Copy'; cb.classList.remove('done'); }, 1600);
      };
      if (navigator.clipboard) { navigator.clipboard.writeText(txt).then(done, function () {}); }
      else {
        var ta = document.createElement('textarea');
        ta.value = txt; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); done(); } catch (err) {}
        document.body.removeChild(ta);
      }
    });
  }
})();
