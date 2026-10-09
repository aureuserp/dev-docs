<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const languages = [
  ['af', 'Afrikaans'],
  ['sq', 'Albanian'],
  ['am', 'Amharic'],
  ['ar', 'Arabic'],
  ['hy', 'Armenian'],
  ['az', 'Azerbaijani'],
  ['eu', 'Basque'],
  ['be', 'Belarusian'],
  ['bn', 'Bengali'],
  ['bs', 'Bosnian'],
  ['bg', 'Bulgarian'],
  ['ca', 'Catalan'],
  ['ceb', 'Cebuano'],
  ['zh-CN', 'Chinese (Simplified)'],
  ['zh-TW', 'Chinese (Traditional)'],
  ['hr', 'Croatian'],
  ['cs', 'Czech'],
  ['da', 'Danish'],
  ['nl', 'Dutch'],
  ['en', 'English'],
  ['eo', 'Esperanto'],
  ['et', 'Estonian'],
  ['fil', 'Filipino'],
  ['fi', 'Finnish'],
  ['fr', 'French'],
  ['gl', 'Galician'],
  ['ka', 'Georgian'],
  ['de', 'German'],
  ['el', 'Greek'],
  ['gu', 'Gujarati'],
  ['ht', 'Haitian Creole'],
  ['ha', 'Hausa'],
  ['he', 'Hebrew'],
  ['hi', 'Hindi'],
  ['hu', 'Hungarian'],
  ['is', 'Icelandic'],
  ['id', 'Indonesian'],
  ['ga', 'Irish'],
  ['it', 'Italian'],
  ['ja', 'Japanese'],
  ['jv', 'Javanese'],
  ['kn', 'Kannada'],
  ['kk', 'Kazakh'],
  ['km', 'Khmer'],
  ['ko', 'Korean'],
  ['ku', 'Kurdish'],
  ['lo', 'Lao'],
  ['la', 'Latin'],
  ['lv', 'Latvian'],
  ['lt', 'Lithuanian'],
  ['mk', 'Macedonian'],
  ['ms', 'Malay'],
  ['ml', 'Malayalam'],
  ['mr', 'Marathi'],
  ['mn', 'Mongolian'],
  ['ne', 'Nepali'],
  ['no', 'Norwegian'],
  ['fa', 'Persian'],
  ['pl', 'Polish'],
  ['pt', 'Portuguese'],
  ['pa', 'Punjabi'],
  ['ro', 'Romanian'],
  ['ru', 'Russian'],
  ['sr', 'Serbian'],
  ['si', 'Sinhala'],
  ['sk', 'Slovak'],
  ['sl', 'Slovenian'],
  ['so', 'Somali'],
  ['es', 'Spanish'],
  ['sw', 'Swahili'],
  ['sv', 'Swedish'],
  ['ta', 'Tamil'],
  ['te', 'Telugu'],
  ['th', 'Thai'],
  ['tr', 'Turkish'],
  ['uk', 'Ukrainian'],
  ['ur', 'Urdu'],
  ['uz', 'Uzbek'],
  ['vi', 'Vietnamese'],
  ['cy', 'Welsh'],
  ['xh', 'Xhosa'],
  ['yi', 'Yiddish'],
  ['yo', 'Yoruba'],
  ['zu', 'Zulu']
]

const isOpen = ref(false)
const query = ref('')
const current = ref('en')
const root = ref(null)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  return q
    ? languages.filter(([, name]) => name.toLowerCase().includes(q))
    : languages
})

function readCurrent() {
  const match = document.cookie.match(/googtrans=\/[^/]+\/([^;]+)/)
  current.value = match ? decodeURIComponent(match[1]) : 'en'
}

function loadScript() {
  if (document.getElementById('google-translate-script')) return
  window.googleTranslateInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: 'en',
        autoDisplay: false,
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
      },
      'google_translate_element'
    )
  }
  const script = document.createElement('script')
  script.id = 'google-translate-script'
  script.src =
    'https://translate.google.com/translate_a/element.js?cb=googleTranslateInit'
  script.async = true
  document.head.appendChild(script)
}

function selectLanguage(code) {
  const combo = document.querySelector('select.goog-te-combo')
  isOpen.value = false
  query.value = ''
  if (combo) {
    combo.value = code
    combo.dispatchEvent(new Event('change'))
    current.value = code
    return
  }
  // Widget not ready: set cookie and reload so Google applies it.
  const value = code === 'en' ? '' : `/en/${code}`
  const host = window.location.hostname
  document.cookie = `googtrans=${value}; path=/`
  document.cookie = `googtrans=${value}; path=/; domain=${host}`
  window.location.reload()
}

function onClickOutside(event) {
  if (root.value && !root.value.contains(event.target)) {
    isOpen.value = false
  }
}

onMounted(() => {
  readCurrent()
  loadScript()
  document.addEventListener('click', onClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onClickOutside)
})
</script>

<template>
  <div ref="root" class="gt-switcher notranslate">
    <button
      class="gt-button"
      type="button"
      aria-label="Select language"
      :aria-expanded="isOpen"
      @click="isOpen = !isOpen"
    >
      <svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
        />
        <path
          fill="#4285F4"
          d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z"
        />
        <path
          fill="#FBBC05"
          d="M10.5 28.7c-.5-1.5-.8-3-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
        />
      </svg>
    </button>

    <div v-if="isOpen" class="gt-menu">
      <input
        v-model="query"
        class="gt-search"
        type="text"
        placeholder="Search language"
        aria-label="Search language"
      />
      <ul class="gt-list">
        <li v-for="[code, name] in filtered" :key="code">
          <button
            type="button"
            class="gt-item"
            :class="{ active: code === current }"
            @click="selectLanguage(code)"
          >
            {{ name }}
          </button>
        </li>
        <li v-if="!filtered.length" class="gt-empty">No match</li>
      </ul>
    </div>

    <div id="google_translate_element" class="gt-hidden"></div>
  </div>
</template>

<style scoped>
.gt-switcher {
  position: relative;
  display: flex;
  align-items: center;
  margin-left: 8px;
}

.gt-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: none;
  border: none;
  cursor: pointer;
}

.gt-menu {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  width: 220px;
  padding: 8px;
  background: var(--vp-c-bg-elv);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  box-shadow: var(--vp-shadow-3);
}

.gt-search {
  width: 100%;
  padding: 6px 10px;
  margin-bottom: 6px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  outline: none;
}

.gt-search:focus {
  border-color: var(--vp-c-brand-1);
}

.gt-list {
  max-height: 320px;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  list-style: none;
}

.gt-item {
  display: block;
  width: 100%;
  padding: 6px 10px;
  font-size: 14px;
  text-align: left;
  color: var(--vp-c-text-1);
  background: none;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.gt-item:hover {
  background: var(--vp-c-default-soft);
}

.gt-item.active {
  font-weight: 600;
  color: var(--vp-c-brand-1);
}

.gt-empty {
  padding: 6px 10px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.gt-hidden {
  display: none;
}
</style>
