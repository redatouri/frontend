const WARRANTY_SPEC_KEYS = new Set(["garantie", "warranty", "ضمان"]);

export function isWarrantySpec(key: string): boolean {
  return WARRANTY_SPEC_KEYS.has(key.trim().toLowerCase());
}

export function withoutWarrantySpecs<T extends { key: string }>(specs: T[]): T[] {
  return specs.filter((spec) => !isWarrantySpec(spec.key));
}
