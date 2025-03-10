<script setup>
import "../styles/version-switcher.css";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const versions = [{ label: "Master", value: "master" }];

const isDropdownOpen = ref(false);
const currentVersionValue = ref("");

const currentVersion = computed(() => {
  const found = versions.find((v) => v.value === currentVersionValue.value);
  return found ? found.label : versions[versions.length - 1].label;
});

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function setVersion(version) {
  localStorage.setItem("preferred-version", version);
  currentVersionValue.value = version;
  isDropdownOpen.value = false;
}

function getVersionUrl(version) {
  const currentPath = window.location.pathname;
  let path = currentPath;

  for (const v of versions) {
    if (currentPath.includes(`/${v.value}/`)) {
      path = currentPath.replace(`/${v.value}/`, "/");
      break;
    }
  }

  if (path === "/" || path === "") {
    return version === versions[versions.length - 1].value ? "/" : `/${version}/`;
  }

  return version === versions[versions.length - 1].value ? path : `/${version}${path}`;
}

function clickOutside(event) {
  const dropdown = document.querySelector(".version-switcher");
  if (dropdown && !dropdown.contains(event.target)) {
    isDropdownOpen.value = false;
  }
}

onMounted(() => {
  const savedVersion = localStorage.getItem("preferred-version");

  if (savedVersion && versions.some((v) => v.value === savedVersion)) {
    currentVersionValue.value = savedVersion;
  } else {
    for (const version of versions) {
      if (window.location.pathname.includes(`/${version.value}/`)) {
        currentVersionValue.value = version.value;
        break;
      }
    }

    if (!currentVersionValue.value) {
      currentVersionValue.value = versions[versions.length - 1].value;
    }
  }

  document.addEventListener("click", clickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", clickOutside);
});
</script>

<template>
  <div class="version-switcher">
    <div class="version-switcher-container">
      <button @click="toggleDropdown" class="version-switcher-button">
        <span class="version-text">{{ currentVersion }}</span>
        <span class="version-switcher-icon">▼</span>
      </button>
      <transition name="fade">
        <div v-if="isDropdownOpen" class="version-switcher-dropdown">
          <ul>
            <li v-for="version in versions" :key="version.value">
              <a
                :href="getVersionUrl(version.value)"
                :class="{ active: currentVersion === version.label }"
                @click="setVersion(version.value)"
              >
                {{ version.label }}
              </a>
            </li>
          </ul>
        </div>
      </transition>
    </div>
  </div>
</template>
