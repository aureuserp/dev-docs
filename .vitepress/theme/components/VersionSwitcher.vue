<script setup>
import "@theme/styles/version-switcher.css";
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
