<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const versions = [
  {
    text: "Master",
    version: "master",
    link: "/master/",
  },
];

const isDropdownOpen = ref(false);
const currentVersion = ref("");

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function setVersion(versionText) {
  const version = versions.find((v) => v.text === versionText);
  if (version) {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(/^(\/[^/]+\/)/, `/${version.version}/`);
    window.location.href = newPath;
  }
}

onMounted(() => {
  document.addEventListener("click", closeDropdown);

  const currentPath = window.location.pathname;

  const matchedVersion = versions.find((v) => currentPath.startsWith(`/${v.version}/`));

  if (matchedVersion) {
    currentVersion.value = matchedVersion.text;
  } else {
    currentVersion.value = versions[0].text;
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
});

function closeDropdown(event) {
  if (!event.target.closest(".version-switcher-container")) {
    isDropdownOpen.value = false;
  }
}
</script>

<template>
  <div class="version-switcher">
    <div class="version-switcher-container relative inline-block text-left">
      <button
        @click.stop="toggleDropdown"
        class="version-switcher-button px-3 py-2 bg-gray-200 dark:bg-gray-600 rounded-md flex items-center"
      >
        <span class="version-text text-sm font-semibold">{{ currentVersion }}</span>
        <span class="version-switcher-icon ml-2">▼</span>
      </button>
      <transition name="fade">
        <div
          v-if="isDropdownOpen"
          class="version-switcher-dropdown absolute mt-2 w-40 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg"
        >
          <ul class="text-sm space-y-1 p-2">
            <li v-for="version in versions" :key="version.text">
              <a
                href="#"
                :class="{ active: currentVersion === version.text }"
                @click.prevent="setVersion(version.text)"
                class="block px-2 py-1 rounded-md text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-500 cursor-pointer"
              >
                {{ version.text }}
              </a>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.version-switcher {
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 12px;
}

.version-switcher-container {
  position: relative;
}

.version-switcher-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  background-color: var(--vp-c-bg-soft);
  cursor: pointer;
  transition: border-color 0.25s;
}

.version-switcher-button:hover {
  border-color: var(--vp-c-brand);
}

.version-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
}

.version-switcher-icon {
  font-size: 10px;
  margin-left: 6px;
  opacity: 0.8;
}

.version-switcher-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 120px; /* Match button width */
  margin-top: 6px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
  overflow: hidden;
}

.version-switcher-dropdown ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.version-switcher-dropdown li {
  margin: 0;
  padding: 0;
}

.version-switcher-dropdown a {
  display: block;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  transition: background-color 0.25s;
}

.version-switcher-dropdown a:hover {
  background-color: var(--vp-c-bg-soft);
}

.version-switcher-dropdown a.active {
  font-weight: 600;
  color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
