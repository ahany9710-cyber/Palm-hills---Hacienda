import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const enPath = path.join(root, "public/prototype/en/index.html");
let html = readFileSync(enPath, "utf8");

const pairs = [
  ['<html lang="ar" dir="rtl">', '<html lang="en" dir="ltr">'],
  [
    '<title>هاسيندا راس الحكمة — Unlike Anywhere</title>',
    "<title>Hacienda Ras El Hekma — Unlike Anywhere</title>",
  ],
  [
    'content="هاسيندا راس الحكمة — أول مدينة ساحلية مسوّرة من بالم هيلز على كيلو ٢٣٨. ١٬٤٠٠ فدان، ٤.٨ كم شاطئ، ٨٦٪ مساحات خضراء ومائية."',
    'content="Hacienda Ras El Hekma — Palm Hills\' first gated coastal city at KM 238. 1,400 acres, 4.8 km shoreline, 86% green and water spaces."',
  ],
  ['aria-label="هاسيندا راس الحكمة"', 'aria-label="Hacienda Ras El Hekma"'],
  [
    '<button type="button" class="lang-toggle" aria-label="تبديل اللغة">\n        <span class="active">ع</span>\n        <span>/</span>\n        <span>EN</span>\n      </button>',
    '<button type="button" class="lang-toggle" data-lang-switch="/" aria-label="Switch to Arabic">\n        <span>ع</span>\n        <span>/</span>\n        <span class="active">EN</span>\n      </button>',
  ],
  ['aria-label="اتصل بنا"', 'aria-label="Call us"'],
  ['<span class="label call-label">اتصل بنا</span>', '<span class="label call-label">Call us</span>'],
  ['aria-label="تواصل واتساب"', 'aria-label="WhatsApp"'],
  ['<span class="label">تواصل واتساب</span>', '<span class="label">WhatsApp</span>'],
  ['aria-label="استكشف الوحدات"', 'aria-label="Explore residences"'],
  [
    '<span>هاسيندا</span> <span class="serif">راس الحكمة</span><br>',
    '<span class="serif">Hacienda</span> <span>Ras El Hekma</span><br>',
  ],
  [
    `<p class="hero-value">
      أول مدينة ساحلية مسوّرة من بالم هيلز على كيلو ٢٣٨ — <strong>١٬٤٠٠ فدان</strong>،
      شاطئ <strong>٤.٨ كم</strong> على المتوسط، و<strong>٨٦٪</strong> مساحات خضراء ومائية.
    </p>`,
    `<p class="hero-value">
      Palm Hills' first gated coastal city at KM 238 — <strong>1,400 acres</strong>,
      <strong>4.8 km</strong> of Mediterranean shoreline, and <strong>86%</strong> green and water spaces.
    </p>`,
  ],
  ["<span>تواصل واتساب الآن</span>", "<span>WhatsApp now</span>"],
  ['احجز معاينة ←', "Book a viewing →"],
  ["<span>بالم هيلز</span>", "<span>Palm Hills</span>"],
  ["<span>بالشراكة مع ميران هيلز</span>", "<span>In partnership with Miran Hills</span>"],
  ['aria-label="أبرز المميزات"', 'aria-label="Key highlights"'],
  ['<div class="stat-value">١٬٤٠٠<span class="small">فدان</span></div>', '<div class="stat-value">1,400<span class="small">acres</span></div>'],
  ['<div class="stat-value">٤.٨<span class="small">كم</span></div>', '<div class="stat-value">4.8<span class="small">km</span></div>'],
  ['<div class="stat-value">٨٦<span class="small">%</span></div>', '<div class="stat-value">86<span class="small">%</span></div>'],
  ['<div class="stat-value">١٤<span class="small">%</span></div>', '<div class="stat-value">14<span class="small">%</span></div>'],
  ['<div class="stat-value">٢٣٨<span class="small">KM</span></div>', '<div class="stat-value">238<span class="small">KM</span></div>'],
  ['<div class="stat-value">٣<span class="small">Hotels</span></div>', '<div class="stat-value">3<span class="small">Hotels</span></div>'],
  ['<div class="partner-meta">مصر · منذ ١٩٩٧</div>', '<div class="partner-meta">Egypt · Since 1997</div>'],
  ['<div class="partner-meta">الإمارات</div>', '<div class="partner-meta">UAE</div>'],
  ['<span class="eyebrow">المنظومة · The City</span>', '<span class="eyebrow">The Ecosystem · The City</span>'],
  ['<h2 class="h2">مدينة <span class="accent serif">تتجاوز</span> الساحل</h2>', '<h2 class="h2">A city <span class="accent serif">beyond</span> the coast</h2>'],
  [
    `<p class="lede">
        راس الحكمة تتحول إلى وجهة متوسطية متكاملة — مطار دولي، مارينا للسفن السياحية، مركز أعمال،
        وشبكة نقل سريع. بنية تحتية بمعايير عالمية تدعم أسلوب حياة ساحلي على مدار العام.
      </p>`,
    `<p class="lede">
        Ras El Hekma is becoming a fully integrated Mediterranean destination — international airport,
        cruise marina, business district, and rapid transit. World-class infrastructure for year-round coastal living.
      </p>`,
  ],
  ['<h3 class="eco-label">مطار راس الحكمة الدولي</h3>', '<h3 class="eco-label">Ras El Hekma International Airport</h3>'],
  ['<h3 class="eco-label">مارينا دولية + سفن سياحية</h3>', '<h3 class="eco-label">International Marina & Cruise Terminal</h3>'],
  ['<h3 class="eco-label">مركز الأعمال المركزي</h3>', '<h3 class="eco-label">Central Business District</h3>'],
  ['<h3 class="eco-label">شبكة النقل السريع</h3>', '<h3 class="eco-label">Rapid Transit Network</h3>'],
  ['<h3 class="eco-label">المدينة الذكية</h3>', '<h3 class="eco-label">Smart City Infrastructure</h3>'],
  ['<h3 class="eco-label">منطقة الخدمات الحرة</h3>', '<h3 class="eco-label">Private Services Free Zone</h3>'],
  ['<h3 class="eco-label">٣ علامات فندقية عالمية</h3>', '<h3 class="eco-label">3 International Hotel Brands</h3>'],
  ['<h3 class="eco-label">مطاعم وbeach clubs عالمية</h3>', '<h3 class="eco-label">Fine Dining & Beach Clubs</h3>'],
  ['<span class="eyebrow">المجموعة السكنية · Residences</span>', '<span class="eyebrow">Residential Collection · Residences</span>'],
  ['<h2 class="h2" style="margin-top:18px">اختار <span class="accent serif">وحدتك</span></h2>', '<h2 class="h2" style="margin-top:18px">Choose your <span class="accent serif">residence</span></h2>'],
  ['<p class="units-kicker">بـ <strong>٥٪</strong> مقدم فقط — تبدأ من <strong>٥٥٠ ألف</strong> مقدم</p>', '<p class="units-kicker">Only <strong>5%</strong> down payment — from <strong>550K</strong> EGP down</p>'],
  [
    `<p class="lede">
        تشكيلة كاملة من الفلل الفائقة الفخامة إلى الـBranded Residences —
        كل وحدة بتشطيب فُل فينِش وتكييفات. الأسعار استرشادية في انتظار التأكيد الرسمي.
      </p>`,
    `<p class="lede">
        From ultraluxury villas to branded residences — every unit is fully finished with AC.
        Prices are indicative pending official launch confirmation.
      </p>`,
  ],
  ['alt="Ultraluxury Villa — هاسيندا راس الحكمة"', 'alt="Ultraluxury Villa — Hacienda Ras El Hekma"'],
  ['<h3 class="unit-type-ar">فيلا فائقة الفخامة</h3>', '<h3 class="unit-type-ar">Ultraluxury Villa</h3>'],
  ['<span class="from">من</span>', '<span class="from">From</span>'],
  ['<span class="val">١٦٥ مليون جنيه</span>', '<span class="val">EGP 165M</span>'],
  ['<p class="unit-note">فُل فينِش + تكييفات <span class="pending">· في انتظار التأكيد</span></p>', '<p class="unit-note">Fully finished + AC <span class="pending">· Pending confirmation</span></p>'],
  ['<span>استفسر على واتساب</span>', '<span>Inquire on WhatsApp</span>'],
  ['alt="شاليه — هاسيندا راس الحكمة"', 'alt="Chalet — Hacienda Ras El Hekma"'],
  ['<h3 class="unit-type-ar">شاليه</h3>', '<h3 class="unit-type-ar">Chalet</h3>'],
  ['<span class="val">٢٤ مليون</span>', '<span class="val">EGP 24M</span>'],
  ['<p class="unit-note">إطلالة بحر <span class="pending">· في انتظار التأكيد</span></p>', '<p class="unit-note">Sea view <span class="pending">· Pending confirmation</span></p>'],
  ['<span>استفسر</span>', '<span>Inquire</span>'],
  ['alt="توين هاوس — هاسيندا راس الحكمة"', 'alt="Twin House — Hacienda Ras El Hekma"'],
  ['<h3 class="unit-type-ar">توين هاوس</h3>', '<h3 class="unit-type-ar">Twin House</h3>'],
  ['<span class="val">٤٤ مليون</span>', '<span class="val">EGP 44M</span>'],
  ['<p class="unit-note">إطلالة لاندسكيب <span class="pending">· في انتظار التأكيد</span></p>', '<p class="unit-note">Landscape view <span class="pending">· Pending confirmation</span></p>'],
  ['alt="ستوديو — هاسيندا راس الحكمة"', 'alt="Studio — Hacienda Ras El Hekma"'],
  ['<h3 class="unit-type-ar">ستوديو</h3>', '<h3 class="unit-type-ar">Studio</h3>'],
  ['<span class="val">١١.٥ مليون</span>', '<span class="val">EGP 11.5M</span>'],
  ['<p class="unit-note">داخل The Core <span class="pending">· في انتظار التأكيد</span></p>', '<p class="unit-note">Inside The Core <span class="pending">· Pending confirmation</span></p>'],
  ['alt="Branded Residences — هاسيندا راس الحكمة"', 'alt="Branded Residences — Hacienda Ras El Hekma"'],
  ['<span class="from">السعر</span>', '<span class="from">Price</span>'],
  ['<span class="val">حسب الطلب</span>', '<span class="val">On request</span>'],
  ['<p class="unit-note">إدارة فندقية <span class="pending">· في انتظار التأكيد</span></p>', '<p class="unit-note">Hotel-managed <span class="pending">· Pending confirmation</span></p>'],
  ['<span class="eyebrow">خطط السداد · Payment</span>', '<span class="eyebrow">Payment Plans · Payment</span>'],
  ['<h2 class="h2">سداد <span class="accent serif">مرن</span> — حتى ١٠ سنوات</h2>', '<h2 class="h2"><span class="accent serif">Flexible</span> payment — up to 10 years</h2>'],
  ['<div class="pay-label">المقدم</div>', '<div class="pay-label">Down payment</div>'],
  ['<div class="pay-num">٥<span class="unit-sm">%</span></div>', '<div class="pay-num">5<span class="unit-sm">%</span></div>'],
  ['<p class="pay-text">مقدم + ٥٪ بعد ٣ شهور</p>', '<p class="pay-text">5% down + 5% after 3 months</p>'],
  ['<div class="pay-label">التقسيط</div>', '<div class="pay-label">Installments</div>'],
  ['<div class="pay-num">١٠<span class="unit-sm">سنوات</span></div>', '<div class="pay-num">10<span class="unit-sm">years</span></div>'],
  ['<p class="pay-text">تقسيط على الوحدات / ٨ سنوات على الفلل</p>', '<p class="pay-text">Units up to 10 years / villas up to 8 years</p>'],
  ['<div class="pay-label">الاستلام</div>', '<div class="pay-label">Delivery</div>'],
  ['<div class="pay-num">٤<span class="unit-sm">سنوات</span></div>', '<div class="pay-num">4<span class="unit-sm">years</span></div>'],
  ['<p class="pay-text">فُل فينِش + تكييفات + مطابخ</p>', '<p class="pay-text">Fully finished + AC + kitchens</p>'],
  ['<p class="payment-flag">في انتظار التأكيد من المطور — الأرقام استرشادية قبل الإطلاق الرسمي</p>', '<p class="payment-flag">Pending developer confirmation — figures are indicative before official launch</p>'],
  ['<span class="eyebrow">المعرض · The Place</span>', '<span class="eyebrow">Gallery · The Place</span>'],
  ['<h2 class="h2">من <span class="serif accent">الشاطئ</span> إلى الـCore</h2>', '<h2 class="h2">From the <span class="serif accent">shore</span> to The Core</h2>'],
  [
    `<p class="lede">
        ماستر بلان متكامل — ٤.٨ كم شاطئ، حدائق وممرات خضراء، The Core للريتيل والمطاعم،
        Palm Hills Sporting Club للرياضات.
      </p>`,
    `<p class="lede">
        An integrated master plan — 4.8 km beach, parks and green corridors, The Core for retail and dining,
        and Palm Hills Sporting Club.
      </p>`,
  ],
  ['alt="٤.٨ كم شاطئ متوسطي"', 'alt="4.8 km Mediterranean shoreline"'],
  ['<span class="gal-cap">٤.٨ كم شاطئ متوسطي</span>', '<span class="gal-cap">4.8 km Mediterranean shoreline</span>'],
  ['alt="الماستر بلان"', 'alt="Master plan"'],
  ['<span class="gal-cap">الماستر بلان</span>', '<span class="gal-cap">Master plan</span>'],
  ['alt="الحدائق واللاندسكيب"', 'alt="Parks and landscape"'],
  ['<span class="gal-cap">الحدائق واللاندسكيب</span>', '<span class="gal-cap">Parks & landscape</span>'],
  ['alt="ريتيل ومطاعم وأمفيتياتر"', 'alt="Retail, dining and amphitheater"'],
  ['<span class="gal-cap">ريتيل ومطاعم وأمفيتياتر</span>', '<span class="gal-cap">Retail, dining & amphitheater</span>'],
  ['alt="المارينا الدولية"', 'alt="International marina"'],
  ['<span class="gal-cap">المارينا الدولية</span>', '<span class="gal-cap">International marina</span>'],
  ['<span class="eyebrow">سلسلة هاسيندا · Legacy</span>', '<span class="eyebrow">Hacienda Series · Legacy</span>'],
  ['<h2 class="h2" style="font-size: clamp(26px, 3vw, 38px)">سبع وجهات على <span class="accent serif">الساحل الشمالي</span></h2>', '<h2 class="h2" style="font-size: clamp(26px, 3vw, 38px)">Seven destinations on the <span class="accent serif">North Coast</span></h2>'],
  ['alt="هاسيندا باي"', 'alt="Hacienda Bay"'],
  ['<div class="sister-name">هاسيندا باي</div>', '<div class="sister-name">Hacienda Bay</div>'],
  ['alt="هاسيندا وايت"', 'alt="Hacienda White"'],
  ['<div class="sister-name">هاسيندا وايت</div>', '<div class="sister-name">Hacienda White</div>'],
  ['alt="هاسيندا بلو"', 'alt="Hacienda Blue"'],
  ['<div class="sister-name">هاسيندا بلو</div>', '<div class="sister-name">Hacienda Blue</div>'],
  ['alt="هاسيندا ريد"', 'alt="Hacienda Red"'],
  ['<div class="sister-name">هاسيندا ريد</div>', '<div class="sister-name">Hacienda Red</div>'],
  ['alt="هاسيندا ووترز"', 'alt="Hacienda Waters"'],
  ['<div class="sister-name">هاسيندا ووترز</div>', '<div class="sister-name">Hacienda Waters</div>'],
  ['alt="بالم هيلز — Unlike Anywhere"', 'alt="Palm Hills — Unlike Anywhere"'],
  ['<span class="eyebrow">المطور · Developer</span>', '<span class="eyebrow">Developer · Developer</span>'],
  ['<h2 class="h2" style="margin-top:16px">مطور <span class="accent serif">موثوق</span> منذ ١٩٩٧</h2>', '<h2 class="h2" style="margin-top:16px">A <span class="accent serif">trusted</span> developer since 1997</h2>'],
  [
    `<p class="lede" style="margin-top:18px">
          بالم هيلز للتطوير العقاري — واحد من أكبر المطورين في مصر، مع سجل تنفيذي يمتد لـ ٢٥+ سنة،
          و٨ مشاريع على الساحل الشمالي. الشراكة مع Miran Hills الإماراتية بتضيف خبرة عالمية للتطوير الفاخر.
        </p>`,
    `<p class="lede" style="margin-top:18px">
          Palm Hills Developments — one of Egypt's largest developers, with 25+ years of delivery
          and 8 North Coast projects. The partnership with UAE-based Miran Hills adds global luxury expertise.
        </p>`,
  ],
  ['<div class="trust-lbl">مساحات مطورة</div>', '<div class="trust-lbl">Developed sqm</div>'],
  ['<div class="trust-lbl">مشروع منفّذ</div>', '<div class="trust-lbl">Projects delivered</div>'],
  ['<div class="trust-lbl">مشاريع بالساحل</div>', '<div class="trust-lbl">Coast projects</div>'],
  ['<div class="trust-lbl">تأسست</div>', '<div class="trust-lbl">Established</div>'],
  ['<span class="eyebrow">سجّل اهتمامك · Reserve</span>', '<span class="eyebrow">Register interest · Reserve</span>'],
  ['<h2 class="h2" style="margin-top:18px">اترك <span class="accent serif">بياناتك</span></h2>', '<h2 class="h2" style="margin-top:18px">Leave your <span class="accent serif">details</span></h2>'],
  [
    `<p class="lede" style="margin-top:18px">
          فريق المبيعات هيرد عليك في دقايق — أو كمّل على واتساب للرد الأسرع.
        </p>`,
    `<p class="lede" style="margin-top:18px">
          Our sales team will reply within minutes — or continue on WhatsApp for a faster response.
        </p>`,
  ],
  ['<span>دقايق للرد</span>', '<span>Reply in minutes</span>'],
  ['<span>بياناتك سرية ١٠٠٪</span>', '<span>100% confidential</span>'],
  ['<span>واتساب</span>', '<span>WhatsApp</span>'],
  ['<h3 class="form-h">٤ خانات بس — وفريقنا هيرد عليك</h3>', '<h3 class="form-h">Just 4 fields — we\'ll get back to you</h3>'],
  ['<label for="f-name">الاسم <span class="req">*</span></label>', '<label for="f-name">Name <span class="req">*</span></label>'],
  ['placeholder="الاسم الكامل"', 'placeholder="Full name"'],
  ['<label for="f-phone">رقم الموبايل <span class="req">*</span></label>', '<label for="f-phone">Mobile number <span class="req">*</span></label>'],
  ['<label for="f-alt-phone">رقم آخر للتواصل <span class="opt">(اختياري)</span></label>', '<label for="f-alt-phone">Alternate number <span class="opt">(optional)</span></label>'],
  ['<label for="f-unit">نوع الوحدة</label>', '<label for="f-unit">Unit type</label>'],
  ['<option value="غير محدد">غير محدد</option>', '<option value="Not specified">Not specified</option>'],
  ['<option value="فيلا فائقة الفخامة">فيلا فائقة الفخامة</option>', '<option value="Ultraluxury Villa">Ultraluxury Villa</option>'],
  ['<option value="توين هاوس">توين هاوس</option>', '<option value="Twin House">Twin House</option>'],
  ['<option value="تاون هاوس">تاون هاوس</option>', '<option value="Townhouse">Townhouse</option>'],
  ['<option value="شاليه">شاليه</option>', '<option value="Chalet">Chalet</option>'],
  ['<option value="ستوديو">ستوديو</option>', '<option value="Studio">Studio</option>'],
  ['<span class="label">ابعت استفساري</span>', '<span class="label">Send inquiry</span>'],
  ['<p class="form-privacy">بياناتك سرية ولن تُستخدم إلا للتواصل معك</p>', '<p class="form-privacy">Your details are private and used only to contact you</p>'],
  ['<h3 class="form-h" style="font-style:normal;font-family:var(--f-sans);font-weight:800;font-size:24px">تم استلام بياناتك</h3>', '<h3 class="form-h" style="font-style:normal;font-family:var(--f-sans);font-weight:800;font-size:24px">We received your details</h3>'],
  ['<p style="font-family:var(--f-serif);font-size:17px;color:rgba(20,20,20,.7);margin:0">فريق المبيعات هيتواصل معاك قريب — أو كمّل على واتساب دلوقتي.</p>', '<p style="font-family:var(--f-serif);font-size:17px;color:rgba(20,20,20,.7);margin:0">Our sales team will contact you soon — or continue on WhatsApp now.</p>'],
  ['<span>كمّل على واتساب</span>', '<span>Continue on WhatsApp</span>'],
  [
    `<p>
          أول مدينة ساحلية مسوّرة من بالم هيلز على كيلو ٢٣٨ — راس الحكمة.
          ١٬٤٠٠ فدان، ٤.٨ كم شاطئ، ٨٦٪ مساحات خضراء ومائية.
        </p>`,
    `<p>
          Palm Hills' first gated coastal city at KM 238 — Ras El Hekma.
          1,400 acres, 4.8 km shoreline, 86% green and water spaces.
        </p>`,
  ],
  ['مكاتب المبيعات', 'Sales offices'],
  ['<span class="office-area">أكتوبر · Palm Central</span>', '<span class="office-area">October · Palm Central</span>'],
  ['<span class="office-phone">اتصل بنا</span>', '<span class="office-phone">Call us</span>'],
  ['<span class="office-area">الإسكندرية</span>', '<span class="office-area">Alexandria</span>'],
  ['<span class="office-area">الزمالك</span>', '<span class="office-area">Zamalek</span>'],
  ['<span class="office-area">التجمع الخامس</span>', '<span class="office-area">Fifth Settlement</span>'],
  ['<p class="footer-legal">© 2026 · الأسعار استرشادية قبل الإطلاق الرسمي</p>', '<p class="footer-legal">© 2026 · Prices are indicative before official launch</p>'],
  ['aria-label="إغلاق"', 'aria-label="Close"'],
  ['<span class="eyebrow popup-eyebrow">فرصة محدودة · Master Plan</span>', '<span class="eyebrow popup-eyebrow">Limited opportunity · Master Plan</span>'],
  ['<h2 class="h2 popup-title" id="popup-title">احجز <span class="accent serif">مكانك</span> على الماستر بلان</h2>', '<h2 class="h2 popup-title" id="popup-title">Reserve your <span class="accent serif">spot</span> on the master plan</h2>'],
  [
    `<p class="popup-lede">
          سجّل دلوقتي واحصل على <strong>ضمان تخصيص موقع مميز</strong> على ماستر بلان هاسيندا راس الحكمة —
          قبل ما الأماكن المميزة تتملى.
        </p>`,
    `<p class="popup-lede">
          Register now and get a <strong>priority allocation guarantee</strong> on the Hacienda Ras El Hekma master plan —
          before premium locations fill up.
        </p>`,
  ],
  ['<li><span class="perk-icon" aria-hidden="true">✓</span> أولوية اختيار الموقع — فيو بحر · The Core · الشاطئ</li>', '<li><span class="perk-icon" aria-hidden="true">✓</span> Priority location selection — sea view · The Core · beachfront</li>'],
  ['<li><span class="perk-icon" aria-hidden="true">✓</span> <strong>٥٪</strong> مقدم فقط — تبدأ من <strong>٥٥٠ ألف</strong> جنيه</li>', '<li><span class="perk-icon" aria-hidden="true">✓</span> Only <strong>5%</strong> down — from <strong>550K</strong> EGP</li>'],
  ['<li><span class="perk-icon" aria-hidden="true">✓</span> فريق المبيعات يرد عليك في دقايق</li>', '<li><span class="perk-icon" aria-hidden="true">✓</span> Sales team replies within minutes</li>'],
  ['<p class="popup-urgency">الأماكن المميزة على الماستر بلان محدودة — لا تفوّت فرصتك</p>', '<p class="popup-urgency">Premium master plan locations are limited — don\'t miss your chance</p>'],
  ['<h3 class="form-h">املأ بياناتك — واحجز مكانك الآن</h3>', '<h3 class="form-h">Fill in your details — reserve your spot now</h3>'],
  ['<label for="pf-name">الاسم <span class="req">*</span></label>', '<label for="pf-name">Name <span class="req">*</span></label>'],
  ['<label for="pf-phone">رقم الموبايل <span class="req">*</span></label>', '<label for="pf-phone">Mobile number <span class="req">*</span></label>'],
  ['<label for="pf-alt-phone">رقم آخر للتواصل <span class="opt">(اختياري)</span></label>', '<label for="pf-alt-phone">Alternate number <span class="opt">(optional)</span></label>'],
  ['<label for="pf-unit">نوع الوحدة</label>', '<label for="pf-unit">Unit type</label>'],
  ['<span class="label">احجز موقعي الآن</span>', '<span class="label">Reserve my spot</span>'],
  ['<p class="popup-wa-hurry-text">عارفين إنك مستعجل على التفاصيل — ممكن تكلمنا على واتساب</p>', '<p class="popup-wa-hurry-text">Need details fast? Message us on WhatsApp</p>'],
  ['<p class="form-privacy">بياناتك سرية · ضمان تخصيص موقع مميز للمسجّلين</p>', '<p class="form-privacy">Your details are private · priority allocation for registrants</p>'],
  ['<p class="popup-submitted-title">تم حجز اهتمامك</p>', '<p class="popup-submitted-title">Interest registered</p>'],
  ['<p class="popup-submitted-text">فريقنا هيتواصل معاك قريب لتأكيد موقعك على الماستر بلان.</p>', '<p class="popup-submitted-text">Our team will contact you soon to confirm your master plan location.</p>'],
  ['<script src="/prototype/script.js?v=7"></script>', '<script src="/prototype/script.js?v=8"></script>'],
];

for (const [from, to] of pairs) {
  if (!html.includes(from)) {
    console.warn("Missing:", from.slice(0, 60));
  }
  html = html.split(from).join(to);
}

writeFileSync(enPath, html, "utf8");
console.log("English prototype written to", enPath);
