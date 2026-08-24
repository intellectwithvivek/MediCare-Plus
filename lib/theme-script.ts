/**
 * Sets `data-theme` before first paint so a dark-mode visitor never sees a
 * white flash.
 *
 * VivekUI exports `createThemeScript()` for exactly this, but that export lives
 * inside a `'use client'` module — importing it into the server-rendered root
 * layout would hand back a client reference, not a callable function. The
 * script is four lines, so it is reproduced here instead, matching the
 * storage key passed to `ThemeProvider` in components/providers.tsx.
 */
export const THEME_STORAGE_KEY = 'medicareplus-theme';

export const themeScript = `!function(){try{var s=localStorage.getItem("${THEME_STORAGE_KEY}"),t=s==="light"||s==="dark"||s==="system"?s:"light",r=t==="system"?(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"):t,e=document.documentElement;e.setAttribute("data-theme",r);e.style.colorScheme=r}catch(_){}}()`;
