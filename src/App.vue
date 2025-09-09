<script setup>

import { computed, ref } from "vue";
import { normalizePunctuation } from "./normalizePunctuation.js";

const input = ref("");
const output = computed(() => normalizePunctuation(input.value));

const copyText = async () => {
  try {
    await navigator.clipboard.writeText(normalizePunctuation(input.value));
    return true;
  } catch {
    return false;
  }
};

</script>

<template>
<div class="min-h-full relative overflow-hidden">
    <!-- Decorative background blobs -->
    <div aria-hidden="true" class="pointer-events-none absolute inset-0">
      <div class="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl"></div>
      <div class="absolute -bottom-24 -right-20 h-72 w-72 rounded-full bg-sky-400/20 blur-3xl"></div>
    </div>

    <!-- Header -->
    <header class="sticky top-0 z-10 bg-white/70 dark:bg-slate-900/60 backdrop-blur md:backdrop-blur-sm border-b border-slate-200/70 dark:border-slate-800">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="relative">
            <div class="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-500 to-sky-500 shadow-soft flex items-center justify-center">
              <svg version="1.1" width="36" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 122.88 80.99" style="enable-background:new 0 0 122.88 80.99" xml:space="preserve"><g><path fill="#fff" d="M0.22,4.23c-0.63-1.59,0.15-3.39,1.74-4.01c1.59-0.63,3.39,0.15,4.01,1.74l3.64,9.21c5.66-4.89,11.11-7.72,16.19-8.92 c6.86-1.62,13.01-0.31,18.13,2.86c7.26,4.49,12.33,6.76,17.05,6.85c4.67,0.1,9.45-1.94,16.17-6.05C82.94,2.36,90.12,0.4,97.5,1.91 c5.44,1.12,10.91,4.1,15.9,9.7l3.48-9.57c0.58-1.6,2.35-2.43,3.95-1.85c1.6,0.58,2.43,2.35,1.85,3.95L99.98,66.52 c-0.36,1.31-1.56,2.27-2.98,2.27H27.83c-1.23,0-2.4-0.74-2.88-1.96L0.22,4.23L0.22,4.23z M27.96,80.99c-1.66,0-3-1.34-3-3 s1.34-3,3-3h69.03c1.66,0,3,1.34,3,3s-1.34,3-3,3H27.96L27.96,80.99z M12.03,17.3l17.9,45.3h64.91l16.19-44.46 c-0.31-0.19-0.59-0.43-0.83-0.73c-4.43-5.62-9.24-8.49-13.93-9.45c-5.68-1.17-11.3,0.41-15.9,3.22 c-7.73,4.73-13.44,7.07-19.51,6.95c-6.02-0.12-11.95-2.69-20.17-7.77c-3.78-2.34-8.35-3.3-13.49-2.08 C22.59,9.36,17.49,12.19,12.03,17.3L12.03,17.3z"/></g></svg>
            </div>
            <span class="sr-only">AI Text Sanitizer</span>
          </div>
          <div>
            <h1 class="text-lg font-semibold tracking-tight">AI Text Sanitizer</h1>
            <p class="text-xs text-slate-500 dark:text-slate-400">Remove AI ASCII characters from outputs to regular keyboard inputs </p>
          </div>
        </div>
      </div>
      <div class="h-1 bg-gradient-to-r from-brand-600 via-sky-500 to-brand-700"></div>
    </header>

    <!-- Main -->
    <main class="max-w-6xl mx-auto px-4 py-8 md:py-12">
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Input card -->
        <section class="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-soft">
          <div class="p-4 md:p-6 flex items-center justify-between">
            <h2 class="text-base font-medium">Input</h2>
             <button id="clearBtn"  @click="input = ''" class="text-sm px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 transition">
              Clear
            </button>
          </div>
          <div class="px-4 md:px-6 pb-2">
            <label for="input" class="sr-only">Paste AI output</label>
            <textarea id="input"
            v-model="input"
              class="h-64 w-full resize-y rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-950/40 p-3 outline-none focus:ring-2 focus:ring-brand-600 font-mono text-sm"
              placeholder="Paste AI output..."
              spellcheck="false"></textarea>
          </div>
            <div class="px-4 md:px-6 pb-6 flex items-center gap-3 justify-end">
            <span id="inChars" class="text-xs text-slate-500 dark:text-slate-400">{{ input.length}} chars</span>
            </div>
        </section>

        <!-- Output card -->
        <section class="relative rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/60 shadow-soft">
          <div class="p-4 md:p-6 flex items-center justify-between">
            <h2 class="text-base font-medium">Sanitized</h2>
            <div class="flex items-center gap-3">
              <button id="copyBtn" @click="copyText" class="text-sm px-3 py-1.5 rounded-lg bg-brand-600 text-white hover:bg-brand-700 active:scale-95 transition">
                Copy
              </button>
            </div>
          </div>
          <div class="px-4 md:px-6 pb-6">
            <pre id="output"
                 class="h-64 w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white/90 dark:bg-slate-950/40 p-3 overflow-auto whitespace-pre-wrap break-words font-mono text-sm transition-opacity"
                 aria-live="polite" v-text="output"></pre>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped></style>
