'use client';

import ParentStyles from '@/app/dashboard/blog/settings/styles.module.sass';
import { useAuthContext } from '@/contexts/AuthContext';
import styles from './styles.module.sass';
import { useState } from 'react';

export default function GeneralSettings() {
  const { blog } = useAuthContext();
  const [isContactEnabled, setIsContactEnabled] = useState(false);

  return (
    <>
      <div className={`${ParentStyles['settings__content__group']} d-flex flex-row`}>
        <div className={`${ParentStyles['settings__content__left']} d-flex flex-col`}>
          <div className={ParentStyles['settings__content__header']}>
            <span>Name</span>
          </div>
          <div className={ParentStyles['settings__content__description']}>
            <span>Changes will update all URLs. You can change this once per month.</span>
          </div>
        </div>
        <div className={`${ParentStyles['settings__content__right']} d-flex flex-col`}>
          <input type="text" value={blog?.name || 'error loading profile'} readOnly />
        </div>
      </div>

      <div className={`${ParentStyles['settings__content__group']} d-flex flex-row`}>
        <div className={`${ParentStyles['settings__content__left']} d-flex flex-col`}>
          <div className={ParentStyles['settings__content__header']}>
            <span>Description</span>
          </div>
          <div className={ParentStyles['settings__content__description']}>
            <span>A short summary of your blog. This appears in search results and previews. Keep it concise and relevant.</span>
          </div>
        </div>
        <div className={`${ParentStyles['settings__content__right']} d-flex flex-col`}>
          <input type="text" value={blog?.description || 'error loading profile'} readOnly />
        </div>
      </div>

      <div className={`${ParentStyles['settings__content__group']} d-flex flex-row`}>
        <div className={`${ParentStyles['settings__content__left']} d-flex flex-col`}>
          <div className={ParentStyles['settings__content__header']}>
            <span>Blog Language</span>
          </div>
          <div className={ParentStyles['settings__content__description']}>
            <span>Set the primary language for your blog.</span>
          </div>
        </div>
        <div className={`${ParentStyles['settings__content__right']} d-flex flex-col`}>
          <select value={'en'} onChange={(e) => console.log(e.target.value)}>
            <option value="af">Afrikaans</option>
            <option value="am">Amharic - አማርኛ</option>
            <option value="ar">Arabic - العربية</option>
            <option value="bn">Bangla - বাংলা</option>
            <option value="eu">Basque - euskara</option>
            <option value="bg">Bulgarian - български</option>
            <option value="ca">Catalan - català</option>
            <option value="zh-CN">Chinese (Simplified) - 中文（简体）</option>
            <option value="zh-TW">Chinese (Taiwan) - 中文（台灣）</option>
            <option value="zh">Chinese (Traditional) - 中文（繁體）</option>
            <option value="hr">Croatian - hrvatski</option>
            <option value="cs">Czech - čeština</option>
            <option value="da">Danish - dansk</option>
            <option value="nl">Dutch - Nederlands</option>
            <option value="en-GB">English (United Kingdom)</option>
            <option value="en">English</option>
            <option value="et">Estonian - eesti</option>
            <option value="fil">Filipino</option>
            <option value="fi">Finnish - suomi</option>
            <option value="fr-CA">French (Canada) - français (Canada)</option>
            <option value="fr">French - français</option>
            <option value="gl">Galician - galego</option>
            <option value="de">German - Deutsch</option>
            <option value="el">Greek - Ελληνικά</option>
            <option value="gu">Gujarati - ગુજરાતી</option>
            <option value="he">Hebrew - עברית</option>
            <option value="hi">Hindi - हिन्दी</option>
            <option value="hu">Hungarian - magyar</option>
            <option value="is">Icelandic - íslenska</option>
            <option value="id">Indonesian - Indonesia</option>
            <option value="it">Italian - italiano</option>
            <option value="ja">Japanese - 日本語</option>
            <option value="kn">Kannada - ಕನ್ನಡ</option>
            <option value="ko">Korean - 한국어</option>
            <option value="lv">Latvian - latviešu</option>
            <option value="lt">Lithuanian - lietuvių</option>
            <option value="ms">Malay - Melayu</option>
            <option value="ml">Malayalam - മലയാളം</option>
            <option value="mr">Marathi - मराठी</option>
            <option value="no">Norwegian - norsk</option>
            <option value="fa">Persian - فارسی</option>
            <option value="pl">Polish - polski</option>
            <option value="pt-BR">Portuguese (Brazil) - português (Brasil)</option>
            <option value="pt-PT">Portuguese (Portugal) - português (Portugal)</option>
            <option value="ro">Romanian - română</option>
            <option value="ru">Russian - русский</option>
            <option value="sr">Serbian - српски</option>
            <option value="sk">Slovak - slovenčina</option>
            <option value="sl">Slovenian - slovenščina</option>
            <option value="es-419">Spanish (Latin America) - español (Latinoamérica)</option>
            <option value="es">Spanish - español</option>
            <option value="sw">Swahili - Kiswahili</option>
            <option value="sv">Swedish - svenska</option>
            <option value="ta">Tamil - தமிழ்</option>
            <option value="te">Telugu - తెలుగు</option>
            <option value="th">Thai - ไทย</option>
            <option value="tr">Turkish - Türkçe</option>
            <option value="uk">Ukrainian - українська</option>
            <option value="ur">Urdu - اردو</option>
            <option value="vi">Vietnamese - Tiếng Việt</option>
            <option value="zu">Zulu - isiZulu</option>
          </select>
        </div>
      </div>

      <div className={`${ParentStyles['settings__content__group']} d-flex flex-row`}>
        <div className={`${ParentStyles['settings__content__left']} d-flex flex-col`}>
          <div className={ParentStyles['settings__content__header']}>
            <span>Contact Info</span>
          </div>
          <div className={ParentStyles['settings__content__description']}>
            <span>Set the email address where readers can contact you directly for inquiries, feedback, or support.</span>
          </div>
        </div>
        <div className={`${ParentStyles['settings__content__right']} d-flex flex-col`}>
          <div className={styles.toggleContainer}>
            <label className={styles.toggleLabel}>
              <span>Enable Contact Page</span>
              <div className={styles.toggleSwitch}>
                <input
                  type="checkbox"
                  checked={isContactEnabled}
                  onChange={() => setIsContactEnabled(!isContactEnabled)}
                />
                <span className={styles.slider}></span>
              </div>
            </label>
          </div>
          <div className={`${ParentStyles['settings__content__right__item']}`}>
            <span>Email Address</span>
            <input type="email" value={'error loading profile'} readOnly />
          </div>
          <div className={`${ParentStyles['settings__content__right__item']}`}>
            <span>Phone Number (optional)</span>
            <input type="text" value={'error loading profile'} readOnly />
          </div>
        </div>
      </div>
    </>
  );
}
