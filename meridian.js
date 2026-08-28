/* Meridian — shared helpers. No dependencies. */
(function (global) {
  'use strict';

  /* ---------- city table: 한국어 이름 -> [IANA tz, 위도, 경도, 국가] ---------- */
  var CITIES = {
    '서울':        ['Asia/Seoul',            37.5665, 126.9780, '대한민국'],
    '부산':        ['Asia/Seoul',            35.1796, 129.0756, '대한민국'],
    '도쿄':        ['Asia/Tokyo',            35.6762, 139.6503, '일본'],
    '오사카':      ['Asia/Tokyo',            34.6937, 135.5023, '일본'],
    '베이징':      ['Asia/Shanghai',         39.9042, 116.4074, '중국'],
    '상하이':      ['Asia/Shanghai',         31.2304, 121.4737, '중국'],
    '홍콩':        ['Asia/Hong_Kong',        22.3193, 114.1694, '중국'],
    '타이베이':    ['Asia/Taipei',           25.0330, 121.5654, '대만'],
    '싱가포르':    ['Asia/Singapore',         1.3521, 103.8198, '싱가포르'],
    '방콕':        ['Asia/Bangkok',          13.7563, 100.5018, '태국'],
    '하노이':      ['Asia/Ho_Chi_Minh',      21.0278, 105.8342, '베트남'],
    '호치민':      ['Asia/Ho_Chi_Minh',      10.8231, 106.6297, '베트남'],
    '자카르타':    ['Asia/Jakarta',          -6.2088, 106.8456, '인도네시아'],
    '마닐라':      ['Asia/Manila',           14.5995, 120.9842, '필리핀'],
    '델리':        ['Asia/Kolkata',          28.6139,  77.2090, '인도'],
    '뭄바이':      ['Asia/Kolkata',          19.0760,  72.8777, '인도'],
    '두바이':      ['Asia/Dubai',            25.2048,  55.2708, '아랍에미리트'],
    '이스탄불':    ['Europe/Istanbul',       41.0082,  28.9784, '튀르키예'],
    '모스크바':    ['Europe/Moscow',         55.7558,  37.6173, '러시아'],
    '런던':        ['Europe/London',         51.5074,  -0.1278, '영국'],
    '파리':        ['Europe/Paris',          48.8566,   2.3522, '프랑스'],
    '베를린':      ['Europe/Berlin',         52.5200,  13.4050, '독일'],
    '프랑크푸르트':['Europe/Berlin',         50.1109,   8.6821, '독일'],
    '암스테르담':  ['Europe/Amsterdam',      52.3676,   4.9041, '네덜란드'],
    '취리히':      ['Europe/Zurich',         47.3769,   8.5417, '스위스'],
    '로마':        ['Europe/Rome',           41.9028,  12.4964, '이탈리아'],
    '마드리드':    ['Europe/Madrid',         40.4168,  -3.7038, '스페인'],
    '리스본':      ['Europe/Lisbon',         38.7223,  -9.1393, '포르투갈'],
    '카이로':      ['Africa/Cairo',          30.0444,  31.2357, '이집트'],
    '요하네스버그':['Africa/Johannesburg',  -26.2041,  28.0473, '남아프리카공화국'],
    '뉴욕':        ['America/New_York',      40.7128, -74.0060, '미국'],
    '워싱턴':      ['America/New_York',      38.9072, -77.0369, '미국'],
    '시카고':      ['America/Chicago',       41.8781, -87.6298, '미국'],
    '덴버':        ['America/Denver',        39.7392, -104.9903, '미국'],
    '로스앤젤레스':['America/Los_Angeles',   34.0522, -118.2437, '미국'],
    '샌프란시스코':['America/Los_Angeles',   37.7749, -122.4194, '미국'],
    '시애틀':      ['America/Los_Angeles',   47.6062, -122.3321, '미국'],
    '밴쿠버':      ['America/Vancouver',     49.2827, -123.1207, '캐나다'],
    '토론토':      ['America/Toronto',       43.6532, -79.3832, '캐나다'],
    '멕시코시티':  ['America/Mexico_City',   19.4326, -99.1332, '멕시코'],
    '상파울루':    ['America/Sao_Paulo',    -23.5505, -46.6333, '브라질'],
    '부에노스아이레스':['America/Argentina/Buenos_Aires', -34.6037, -58.3816, '아르헨티나'],
    '시드니':      ['Australia/Sydney',     -33.8688, 151.2093, '호주'],
    '멜버른':      ['Australia/Melbourne',  -37.8136, 144.9631, '호주'],
    '오클랜드':    ['Pacific/Auckland',     -36.8485, 174.7633, '뉴질랜드'],
    '호놀룰루':    ['Pacific/Honolulu',      21.3069, -157.8583, '미국']
  };

  var DEFAULT_CITIES = ['서울', '방콕', '두바이', '런던', '뉴욕', '로스앤젤레스'];
  var DEFAULT_CURRENCIES = ['USD', 'EUR', 'JPY', 'CNY', 'GBP', 'AUD'];

  var CURRENCY_NAMES = {
    USD: '미국 달러', EUR: '유로', JPY: '일본 엔', CNY: '중국 위안',
    GBP: '영국 파운드', AUD: '호주 달러', CAD: '캐나다 달러', CHF: '스위스 프랑',
    HKD: '홍콩 달러', SGD: '싱가포르 달러', THB: '태국 바트', NZD: '뉴질랜드 달러',
    SEK: '스웨덴 크로나', NOK: '노르웨이 크로네', DKK: '덴마크 크로네',
    PLN: '폴란드 즈워티', CZK: '체코 코루나', HUF: '헝가리 포린트',
    TRY: '튀르키예 리라', ZAR: '남아공 란드', BRL: '브라질 헤알',
    MXN: '멕시코 페소', INR: '인도 루피', IDR: '인도네시아 루피아',
    MYR: '말레이시아 링깃', PHP: '필리핀 페소', ILS: '이스라엘 셰켈',
    RON: '루마니아 레우', BGN: '불가리아 레프', ISK: '아이슬란드 크로나', KRW: '대한민국 원'
  };

  /* 100 단위로 고시하는 통화 (한국 관행) */
  var PER_100 = { JPY: true, IDR: true, HUF: true };

  /* ---------- storage ---------- */
  function load(key, fallback) {
    try {
      var raw = localStorage.getItem('meridian.' + key);
      if (!raw) return fallback;
      var v = JSON.parse(raw);
      return (v && v.length) ? v : fallback;
    } catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem('meridian.' + key, JSON.stringify(value)); } catch (e) {}
  }

  /* ---------- time ---------- */
  var partsCache = {};
  function tzParts(tz, date) {
    var f = partsCache[tz];
    if (!f) {
      f = partsCache[tz] = new Intl.DateTimeFormat('en-US', {
        timeZone: tz, hour12: false,
        year: 'numeric', month: '2-digit', day: '2-digit',
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
    }
    var out = {};
    f.formatToParts(date).forEach(function (p) {
      if (p.type !== 'literal') out[p.type] = parseInt(p.value, 10);
    });
    if (out.hour === 24) out.hour = 0;
    return out;
  }

  /* 도시 로컬 시각과 기준 도시 로컬 시각의 날짜 차이 (-1 / 0 / +1) */
  function dayDelta(refParts, cityParts) {
    var a = Date.UTC(refParts.year, refParts.month - 1, refParts.day);
    var b = Date.UTC(cityParts.year, cityParts.month - 1, cityParts.day);
    return Math.round((b - a) / 86400000);
  }

  /* 두 타임존의 UTC 오프셋 차이(분) */
  function offsetMinutes(tzA, tzB, date) {
    function off(tz) {
      var p = tzParts(tz, date);
      var asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second);
      return (asUTC - Math.floor(date.getTime() / 1000) * 1000) / 60000;
    }
    return Math.round(off(tzB) - off(tzA));
  }

  function pad2(n) { return (n < 10 ? '0' : '') + n; }

  function formatOffset(minutes) {
    if (minutes === 0) return '시차 없음';
    var sign = minutes > 0 ? '+' : '-';
    var m = Math.abs(minutes);
    var h = Math.floor(m / 60), r = m % 60;
    return sign + h + (r ? '시간 ' + r + '분' : '시간');
  }

  /* 날짜 표기는 Intl 에 맡긴다. 직접 조립하면 로케일이 바뀔 때 어긋난다. */
  var dateFmtCache = {};
  function formatDate(tz, date) {
    var f = dateFmtCache[tz];
    if (!f) {
      f = dateFmtCache[tz] = new Intl.DateTimeFormat('ko-KR', {
        timeZone: tz, month: 'long', day: 'numeric', weekday: 'long'
      });
    }
    return f.format(date);
  }

  /* ---------- sunrise / sunset (NOAA 근사) ---------- */
  function sunTimes(lat, lon, date) {
    var rad = Math.PI / 180;
    var J2000 = 2451545;
    var jd = date.getTime() / 86400000 + 2440587.5;
    var n = Math.round(jd - J2000 - 0.0009 + lon / 360);
    var Jstar = n + 0.0009 - lon / 360 + J2000;
    var M = (357.5291 + 0.98560028 * (Jstar - J2000)) % 360;
    var Mr = M * rad;
    var C = 1.9148 * Math.sin(Mr) + 0.02 * Math.sin(2 * Mr) + 0.0003 * Math.sin(3 * Mr);
    var lambda = (M + C + 180 + 102.9372) % 360;
    var Lr = lambda * rad;
    var Jtransit = Jstar + 0.0053 * Math.sin(Mr) - 0.0069 * Math.sin(2 * Lr);
    var delta = Math.asin(Math.sin(Lr) * Math.sin(23.44 * rad));
    var phi = lat * rad;
    var cosOmega = (Math.sin(-0.833 * rad) - Math.sin(phi) * Math.sin(delta)) /
                   (Math.cos(phi) * Math.cos(delta));
    if (cosOmega >= 1) return { polar: 'night' };   // 해가 뜨지 않음
    if (cosOmega <= -1) return { polar: 'day' };    // 해가 지지 않음
    var omega = Math.acos(cosOmega) / rad;
    return {
      rise: new Date((Jtransit - omega / 360 - 2440587.5) * 86400000),
      set:  new Date((Jtransit + omega / 360 - 2440587.5) * 86400000)
    };
  }

  /* 도시 기준 '낮인 로컬 시각' 집합과 일출/일몰 라벨 */
  function daylight(city, date) {
    var meta = CITIES[city];
    if (!meta) return { hours: {}, riseLabel: '', setLabel: '' };
    var s = sunTimes(meta[1], meta[2], date);
    var hours = {}, i;
    if (s.polar === 'day') { for (i = 0; i < 24; i++) hours[i] = true; return { hours: hours, riseLabel: '백야', setLabel: '' }; }
    if (s.polar === 'night') { return { hours: hours, riseLabel: '극야', setLabel: '' }; }
    var r = tzParts(meta[0], s.rise), t = tzParts(meta[0], s.set);
    var rh = r.hour + r.minute / 60, th = t.hour + t.minute / 60;
    for (i = 0; i < 24; i++) {
      var mid = i + 0.5;
      hours[i] = (rh <= th) ? (mid >= rh && mid <= th) : (mid >= rh || mid <= th);
    }
    return {
      hours: hours,
      riseLabel: pad2(r.hour) + ':' + pad2(r.minute),
      setLabel: pad2(t.hour) + ':' + pad2(t.minute)
    };
  }

  /* ---------- weather codes (WMO) ---------- */
  var WMO = {
    0:  ['맑음', 'clear'],        1:  ['대체로 맑음', 'clear'],
    2:  ['구름 조금', 'partly'],  3:  ['흐림', 'cloud'],
    45: ['안개', 'mist'],         48: ['서리 안개', 'mist'],
    51: ['약한 이슬비', 'rain'],  53: ['이슬비', 'rain'],       55: ['짙은 이슬비', 'rain'],
    56: ['어는 이슬비', 'rain'],  57: ['짙게 어는 이슬비', 'rain'],
    61: ['약한 비', 'rain'],      63: ['비', 'rain'],           65: ['강한 비', 'rain'],
    66: ['어는 비', 'rain'],      67: ['강하게 어는 비', 'rain'],
    71: ['약한 눈', 'snow'],      73: ['눈', 'snow'],           75: ['강한 눈', 'snow'],
    77: ['싸락눈', 'snow'],
    80: ['소나기', 'rain'],       81: ['강한 소나기', 'rain'],   82: ['매우 강한 소나기', 'rain'],
    85: ['소나기눈', 'snow'],     86: ['강한 소나기눈', 'snow'],
    95: ['뇌우', 'storm'],        96: ['우박 섞인 뇌우', 'storm'], 99: ['강한 우박 뇌우', 'storm']
  };
  function describe(code) { return WMO[code] || ['정보 없음', 'cloud']; }

  /* ---------- icons (Tabler Icons, MIT) ---------- */
  var PATHS = {
    clear: '<circle cx="12" cy="12" r="4"/><path d="M12 3v1M12 20v1M3 12h1M20 12h1M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7"/>',
    moon:  '<path d="M16.5 6.5a6.5 6.5 0 1 1-8.9 8.9a7 7 0 0 0 8.9-8.9"/>',
    partly:'<path d="M12 4v1M5.6 6.6l.7.7M4 13h1M18.4 6.6l-.7.7"/><path d="M8.5 13a3.5 3.5 0 1 1 6.9-.8"/><path d="M8 20a3 3 0 0 1 0-6a4 4 0 0 1 7.5.5h.5a2.75 2.75 0 0 1 0 5.5z"/>',
    cloud: '<path d="M6.7 18C4.1 18 2 16 2 13.5S4.1 9 6.7 9c.4-1.8 1.8-3.2 3.7-3.8s3.9-.2 5.4 1c1.5 1.2 2.2 3 1.8 4.8h1c1.9 0 3.4 1.6 3.4 3.5S20.5 18 18.6 18z"/>',
    rain:  '<path d="M7 16a4 4 0 0 1 0-8a5 5 0 0 1 9.3.9h.7a3.5 3.5 0 0 1 0 7"/><path d="M10 19l-1 2M14 19l-1 2M17 19l-1 2"/>',
    snow:  '<path d="M7 15a4 4 0 0 1 0-8a5 5 0 0 1 9.3.9h.7a3.5 3.5 0 0 1 0 7"/><path d="M9 19h.01M13 18h.01M11 21h.01M16 20h.01"/>',
    storm: '<path d="M7 15a4 4 0 0 1 0-8a5 5 0 0 1 9.3.9h.7a3.5 3.5 0 0 1 0 7"/><path d="M12.5 16l-2 3.5h3l-2 3.5"/>',
    mist:  '<path d="M4 8h10M8 12h11M4 16h9M17 16h2"/>',
    close: '<path d="M18 6L6 18M6 6l12 12"/>',
    swap:  '<path d="M7 4v16l-3-3M17 20V4l3 3"/>'
  };
  function icon(name, size) {
    var p = PATHS[name] || PATHS.cloud;
    return '<svg class="i" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" ' +
      'fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" ' +
      'stroke-linejoin="round" aria-hidden="true" focusable="false">' + p + '</svg>';
  }
  /* 밤이면 맑음 아이콘을 달로 바꾼다 */
  function iconFor(kind, isDay, size) {
    if (!isDay && (kind === 'clear' || kind === 'partly')) return icon('moon', size);
    return icon(kind, size);
  }

  /* ---------- numbers ---------- */
  function num(v, digits) {
    return v.toLocaleString('ko-KR', { minimumFractionDigits: digits, maximumFractionDigits: digits });
  }
  function rateDigits(v) { return v >= 1000 ? 2 : v >= 100 ? 2 : v >= 1 ? 4 : 6; }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------- shared chrome ---------- */
  function nav(current) {
    var items = [['index.html', '세계시간'], ['weather.html', '날씨'], ['exchange.html', '환율']];
    return '<a class="skip" href="#main">본문으로 건너뛰기</a>' +
      '<div class="wrap"><header class="nav">' +
      '<a class="brand" href="index.html" translate="no">' +
      '<span aria-hidden="true"></span>Meridian</a>' +
      '<nav class="nav-links" aria-label="주요">' +
      items.map(function (it) {
        return '<a href="' + it[0] + '"' + (it[1] === current ? ' aria-current="page"' : '') + '>' + it[1] + '</a>';
      }).join('') +
      '</nav>' +
      '<div class="nav-actions" id="navActions"></div>' +
      '</header></div>';
  }

  function foot(source) {
    return '<div class="wrap"><footer class="foot">' +
      '<span>Meridian</span>' +
      '<span class="src">' + source + '</span>' +
      '</footer></div>';
  }

  /* ---------- fetch with timeout ---------- */
  function getJSON(url, timeoutMs) {
    var ctrl = ('AbortController' in global) ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, timeoutMs || 12000);
    return fetch(url, ctrl ? { signal: ctrl.signal } : undefined)
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .then(function (j) { clearTimeout(timer); return j; },
            function (e) { clearTimeout(timer); throw e; });
  }

  /* ---------- polyline helper ---------- */
  function polyline(values, w, h) {
    if (!values.length) return '';
    var lo = Math.min.apply(null, values), hi = Math.max.apply(null, values);
    var range = (hi - lo) || 1;
    var step = values.length > 1 ? w / (values.length - 1) : 0;
    return values.map(function (v, i) {
      return (i * step).toFixed(1) + ',' + (h - (v - lo) / range * h).toFixed(1);
    }).join(' ');
  }

  global.M = {
    CITIES: CITIES,
    DEFAULT_CITIES: DEFAULT_CITIES,
    DEFAULT_CURRENCIES: DEFAULT_CURRENCIES,
    CURRENCY_NAMES: CURRENCY_NAMES,
    PER_100: PER_100,
    load: load, save: save,
    tzParts: tzParts, dayDelta: dayDelta, offsetMinutes: offsetMinutes,
    formatOffset: formatOffset, formatDate: formatDate, pad2: pad2,
    daylight: daylight, describe: describe,
    icon: icon, iconFor: iconFor,
    num: num, rateDigits: rateDigits, escapeHtml: escapeHtml,
    nav: nav, foot: foot, getJSON: getJSON, polyline: polyline
  };
})(window);
