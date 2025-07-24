export function getConfig(name) {
  return import.meta.env[`VITE_${name}`];
}
