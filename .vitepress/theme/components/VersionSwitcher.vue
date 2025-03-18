<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from "vue";
import { useRoute, useRouter } from "vitepress";

const route = useRoute();
const router = useRouter();

const versions = [
  {
    text: "Master",
    version: "master",
    link: "/master/",
  },
];

const isDropdownOpen = ref(false);
const currentVersion = ref("");
const isHomePage = ref(false);

function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value;
}

function setVersion(version) {
  const currentPath = window.location.pathname;
  const currentVersion = detectCurrentVersion(currentPath);

  if (currentVersion) {
    const newPath = currentPath.replace(`/${currentVersion}/`, `/${version.version}/`);
    router.go(newPath);
  } else {
    router.go(version.link);
  }
}

function detectCurrentVersion(path) {
  for (const version of versions) {
    if (path.includes(`/${version.version}/`)) {
      return version.version;
    }
  }
  return null;
}

function checkIfHomePage() {
  const path = route.path || window.location.pathname;

  const homePatterns = ["/", "/index.html"];

  const versionRoots = versions.map((v) => `/${v.version}/`);

  isHomePage.value =
    homePatterns.some((pattern) => path === pattern) ||
    versionRoots.some((vRoot) => path === vRoot) ||
    path.endsWith("/index.html");
}

function updateVersionFromPath() {
  const path = route.path || window.location.pathname;
  const detectedVersion = detectCurrentVersion(path);

  if (detectedVersion) {
    const matchedVersion = versions.find((v) => v.version === detectedVersion);

    if (matchedVersion) {
      currentVersion.value = matchedVersion.text;
    }
  } else {
    currentVersion.value = versions[0].text;
  }
}

function closeDropdown(event) {
  if (!event.target.closest(".version-switcher-container")) {
    isDropdownOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener("click", closeDropdown);
  updateVersionFromPath();
  checkIfHomePage();

  window.addEventListener("popstate", () => {
    updateVersionFromPath();
    checkIfHomePage();
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("click", closeDropdown);
  window.removeEventListener("popstate", updateVersionFromPath);
});

watch(
  () => route.path,
  () => {
    updateVersionFromPath();
    checkIfHomePage();
  }
);
</script>

<template>
  <div v-if="!isHomePage" class="version-switcher">
    <div class="version-switcher-container">
      <button @click.stop="toggleDropdown" class="version-switcher-button">
        <span class="version-text">{{ currentVersion }}</span>
        <span class="version-switcher-icon">▼</span>
      </button>

      <transition name="fade">
        <div v-if="isDropdownOpen" class="version-switcher-dropdown">
          <ul>
            <li v-for="version in versions" :key="version.text">
              <a
                href="#"
                :class="{ active: currentVersion === version.text }"
                @click.prevent="setVersion(version)"
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
  width: 120px;
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
