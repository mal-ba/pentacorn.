// ====== i18n.js : 사이트 공용 다국어 스위처 ======
// 우측 하단에 떠 있는 언어 버튼 하나로 메뉴/커뮤니티 등 공용 UI 텍스트를 바꿔줘요.
// 선택한 언어는 localStorage(unexposed-lang)에 저장되어 다른 페이지로 이동해도 유지돼요.
//
// 1단계 범위: 사이드 메뉴(side-menu.html)와 각 페이지 헤더의 "커뮤니티" 버튼 등
// 공용 내비게이션 텍스트. 각 페이지 본문(히어로, 설명문 등)은 이후 data-i18n 키를
// 추가하는 방식으로 점진적으로 넓힐 수 있어요.
(function(){
  const LANGS = [
    { code:'ko', name:'한국어' },
    { code:'en', name:'English' },
    { code:'ru', name:'Русский' },
    { code:'zh', name:'中文' },
    { code:'ja', name:'日本語' },
    { code:'fr', name:'Français' },
    { code:'de', name:'Deutsch' },
    { code:'ar', name:'العربية' },
    { code:'vi', name:'Tiếng Việt' },
    { code:'ne', name:'नेपाली' },
    { code:'th', name:'ไทย' },
    { code:'fa', name:'فارسی' },
    { code:'sv', name:'Svenska' },
    { code:'bn', name:'বাংলা' },
    { code:'id', name:'Bahasa Indonesia/Melayu' },
    { code:'tr', name:'Türkçe' },
    { code:'nl', name:'Nederlands' },
    { code:'hi', name:'हिन्दी' },
    { code:'pt', name:'Português' },
    { code:'it', name:'Italiano' },
    { code:'es', name:'Español' },
    { code:'pl', name:'Polski' },
  ];

  const DICT = {
    menu:        { ko:'메뉴', en:'Menu', ru:'Меню', zh:'菜单', ja:'メニュー', fr:'Menu', de:'Menü', ar:'القائمة', vi:'Menu', ne:'मेनु', th:'เมนู', fa:'منو', sv:'Meny', bn:'মেনু', id:'Menu', tr:'Menü', nl:'Menu', hi:'मेनू', pt:'Menu', it:'Menu', es:'Menú', pl:'Menu' },
    close:       { ko:'닫기', en:'Close', ru:'Закрыть', zh:'关闭', ja:'閉じる', fr:'Fermer', de:'Schließen', ar:'إغلاق', vi:'Đóng', ne:'बन्द गर्नुहोस्', th:'ปิด', fa:'بستن', sv:'Stäng', bn:'বন্ধ করুন', id:'Tutup', tr:'Kapat', nl:'Sluiten', hi:'बंद करें', pt:'Fechar', it:'Chiudi', es:'Cerrar', pl:'Zamknij' },
    community:   { ko:'커뮤니티', en:'Community', ru:'Сообщество', zh:'社区', ja:'コミュニティ', fr:'Communauté', de:'Community', ar:'المجتمع', vi:'Cộng đồng', ne:'समुदाय', th:'ชุมชน', fa:'انجمن', sv:'Gemenskap', bn:'কমিউনিটি', id:'Komunitas', tr:'Topluluk', nl:'Community', hi:'समुदाय', pt:'Comunidade', it:'Community', es:'Comunidad', pl:'Społeczność' },
    about:       { ko:'소개', en:'About', ru:'О нас', zh:'关于', ja:'概要', fr:'À propos', de:'Über uns', ar:'حول', vi:'Giới thiệu', ne:'परिचय', th:'เกี่ยวกับ', fa:'درباره ما', sv:'Om oss', bn:'সম্পর্কে', id:'Tentang', tr:'Hakkında', nl:'Over ons', hi:'परिचय', pt:'Sobre', it:'Chi siamo', es:'Acerca de', pl:'O nas' },
    howto:       { ko:'이용 방법', en:'How it works', ru:'Как пользоваться', zh:'使用方法', ja:'使い方', fr:'Comment ça marche', de:"So funktioniert's", ar:'كيفية الاستخدام', vi:'Cách sử dụng', ne:'प्रयोग विधि', th:'วิธีใช้งาน', fa:'نحوه استفاده', sv:'Så funkar det', bn:'ব্যবহারের নিয়ম', id:'Cara pakai', tr:'Nasıl çalışır', nl:'Hoe het werkt', hi:'उपयोग विधि', pt:'Como funciona', it:'Come funziona', es:'Cómo funciona', pl:'Jak korzystać' },
    privacy:     { ko:'개인정보 처리와 동의', en:'Privacy & Consent', ru:'Обработка данных и согласие', zh:'隐私处理与同意', ja:'個人情報の取り扱いと同意', fr:'Confidentialité et consentement', de:'Datenschutz & Einwilligung', ar:'الخصوصية والموافقة', vi:'Quyền riêng tư & Đồng ý', ne:'गोपनीयता र सहमति', th:'ความเป็นส่วนตัวและความยินยอม', fa:'حریم خصوصی و رضایت', sv:'Integritet och samtycke', bn:'গোপনীয়তা ও সম্মতি', id:'Privasi & Persetujuan', tr:'Gizlilik ve Onay', nl:'Privacy & toestemming', hi:'गोपनीयता और सहमति', pt:'Privacidade e Consentimento', it:'Privacy e Consenso', es:'Privacidad y Consentimiento', pl:'Prywatność i zgoda' },
    shipping:    { ko:'배송과 만드는 과정', en:'Shipping & Process', ru:'Доставка и производство', zh:'配送与制作流程', ja:'配送と製作工程', fr:'Livraison et fabrication', de:'Versand & Herstellung', ar:'الشحن وعملية التصنيع', vi:'Vận chuyển & Quy trình', ne:'ढुवानी र प्रक्रिया', th:'การจัดส่งและขั้นตอนการผลิต', fa:'ارسال و فرآیند تولید', sv:'Frakt och tillverkning', bn:'ডেলিভারি ও প্রক্রিয়া', id:'Pengiriman & Proses', tr:'Kargo ve Üretim Süreci', nl:'Verzending & proces', hi:'शिपिंग और प्रक्रिया', pt:'Envio e Processo', it:'Spedizione e Processo', es:'Envío y Proceso', pl:'Wysyłka i proces' },
    partners:    { ko:'협력 업체', en:'Partners', ru:'Партнёры', zh:'合作伙伴', ja:'パートナー', fr:'Partenaires', de:'Partner', ar:'الشركاء', vi:'Đối tác', ne:'साझेदार', th:'พันธมิตร', fa:'شرکا', sv:'Partners', bn:'পার্টনার', id:'Mitra', tr:'Ortaklar', nl:'Partners', hi:'साझेदार', pt:'Parceiros', it:'Partner', es:'Socios', pl:'Partnerzy' },
    meshyGuide:  { ko:'Meshy AI GLB 가이드', en:'Meshy AI GLB Guide', ru:'Руководство Meshy AI GLB', zh:'Meshy AI GLB 指南', ja:'Meshy AI GLB ガイド', fr:'Guide Meshy AI GLB', de:'Meshy AI GLB Leitfaden', ar:'دليل Meshy AI GLB', vi:'Hướng dẫn Meshy AI GLB', ne:'Meshy AI GLB गाइड', th:'คู่มือ Meshy AI GLB', fa:'راهنمای Meshy AI GLB', sv:'Meshy AI GLB-guide', bn:'Meshy AI GLB গাইড', id:'Panduan Meshy AI GLB', tr:'Meshy AI GLB Rehberi', nl:'Meshy AI GLB-gids', hi:'Meshy AI GLB गाइड', pt:'Guia Meshy AI GLB', it:'Guida Meshy AI GLB', es:'Guía de Meshy AI GLB', pl:'Przewodnik Meshy AI GLB' },
    langSelect:  { ko:'언어 선택', en:'Select language', ru:'Выбор языка', zh:'选择语言', ja:'言語を選択', fr:'Choisir la langue', de:'Sprache wählen', ar:'اختر اللغة', vi:'Chọn ngôn ngữ', ne:'भाषा छान्नुहोस्', th:'เลือกภาษา', fa:'انتخاب زبان', sv:'Välj språk', bn:'ভাষা নির্বাচন করুন', id:'Pilih bahasa', tr:'Dil seçin', nl:'Taal kiezen', hi:'भाषा चुनें', pt:'Selecionar idioma', it:'Seleziona lingua', es:'Seleccionar idioma', pl:'Wybierz język' },
  };

  const STORAGE_KEY = 'unexposed-lang';

  function getLang(){
    return localStorage.getItem(STORAGE_KEY) || 'ko';
  }
  function setLang(code){
    localStorage.setItem(STORAGE_KEY, code);
    apply();
    renderWidgetLabel();
  }

  function apply(){
    const lang = getLang();
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const entry = DICT[key];
      if(!entry) return;
      el.textContent = entry[lang] || entry.ko;
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(el => {
      const key = el.getAttribute('data-i18n-aria');
      const entry = DICT[key];
      if(!entry) return;
      el.setAttribute('aria-label', entry[lang] || entry.ko);
    });
    document.documentElement.setAttribute('lang', lang);
    if(['ar','fa'].includes(lang)){
      document.documentElement.setAttribute('dir','rtl');
    } else {
      document.documentElement.setAttribute('dir','ltr');
    }
  }
  // 다른 스크립트(menu-loader.js 등)가 메뉴를 늦게 주입한 뒤 호출할 수 있도록 전역에 노출
  window.i18nApply = apply;

  function renderWidgetLabel(){
    const btn = document.getElementById('lang-switch-btn');
    if(!btn) return;
    const cur = LANGS.find(l => l.code === getLang()) || LANGS[0];
    btn.querySelector('.lang-switch-code').textContent = cur.code.toUpperCase();
  }

  function buildWidget(){
    if(document.getElementById('lang-switch-btn')) return;

    const style = document.createElement('style');
    style.textContent = `
      #lang-switch-btn.floating{
        position:fixed; right:16px; bottom:16px; z-index:9999;
        background:#0F2E2C; color:#F5F2EA; border:none;
        padding:10px 14px; border-radius:999px;
        box-shadow:0 8px 20px rgba(0,0,0,0.25);
      }
      #lang-switch-btn{
        display:inline-flex; align-items:center; gap:6px;
        font-size:13.5px; font-weight:600; cursor:pointer; font-family:inherit;
      }
      #lang-switch-panel{
        position:fixed; z-index:9999;
        background:#FFFDF8; border:1px solid rgba(20,32,30,0.15);
        border-radius:12px; box-shadow:0 16px 40px rgba(0,0,0,0.25);
        max-height:60vh; overflow-y:auto; min-width:200px;
        display:none; padding:6px;
      }
      #lang-switch-panel.open{ display:block; }
      #lang-switch-panel button{
        display:block; width:100%; text-align:left; background:none; border:none;
        padding:9px 12px; font-size:14px; border-radius:8px; cursor:pointer;
        color:#14201E; font-family:inherit;
      }
      #lang-switch-panel button:hover, #lang-switch-panel button.active{ background:#EFEAE0; }
    `;
    document.head.appendChild(style);

    const footerSlot = document.getElementById('footer-action-boxes');

    const btn = document.createElement('button');
    btn.id = 'lang-switch-btn';
    btn.type = 'button';
    btn.innerHTML = `🌐 <span class="lang-switch-code">KO</span>`;

    if(footerSlot){
      btn.className = 'footer-action-box';
      footerSlot.appendChild(btn);
    } else {
      btn.className = 'floating';
      document.body.appendChild(btn);
    }

    const panel = document.createElement('div');
    panel.id = 'lang-switch-panel';
    LANGS.forEach(l => {
      const item = document.createElement('button');
      item.type = 'button';
      item.textContent = l.name;
      item.dataset.code = l.code;
      item.addEventListener('click', () => {
        setLang(l.code);
        panel.classList.remove('open');
        panel.querySelectorAll('button').forEach(b => b.classList.toggle('active', b.dataset.code === l.code));
      });
      panel.appendChild(item);
    });
    document.body.appendChild(panel);

    function positionPanel(){
      const r = btn.getBoundingClientRect();
      const panelHeight = Math.min(window.innerHeight * 0.6, 420);
      let top = r.top - panelHeight - 8;
      if(top < 8) top = r.bottom + 8;
      let left = r.right - 200;
      if(left < 8) left = 8;
      if(left + 200 > window.innerWidth - 8) left = window.innerWidth - 208;
      panel.style.top = top + 'px';
      panel.style.left = left + 'px';
    }

    btn.addEventListener('click', () => {
      const willOpen = !panel.classList.contains('open');
      if(willOpen) positionPanel();
      panel.classList.toggle('open', willOpen);
    });
    document.addEventListener('click', (e) => {
      if(!panel.contains(e.target) && e.target !== btn && !btn.contains(e.target)) panel.classList.remove('open');
    });
    window.addEventListener('resize', () => { if(panel.classList.contains('open')) positionPanel(); });

    renderWidgetLabel();
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildWidget();
    apply();
  });
})();
