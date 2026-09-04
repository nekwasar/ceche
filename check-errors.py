#!/usr/bin/env python3
"""
Comprehensive Next.js error finder.
Catches:
  1. TypeScript / compilation errors (via next build)
  2. Missing locale keys (compares all locale files against en.json)
  3. Structural mismatches (arrays vs strings, missing nested keys)
"""

import json
import subprocess
import sys
import os

os.chdir("/var/www/ceche")

LOCALES = ["en", "fr", "de", "es", "pt", "ko", "zh", "ja", "it"]
errors = []
warnings = []

# ── 1. next build ──────────────────────────────────────────────────────
print("=" * 60)
print("STEP 1: next build (TypeScript + compilation)")
print("=" * 60)

result = subprocess.run(
    ["npx", "next", "build"],
    capture_output=True, text=True, timeout=600
)

build_output = result.stdout + result.stderr

if result.returncode != 0:
    # Extract error lines
    for line in build_output.split("\n"):
        if "Type error:" in line or "Error:" in line or "Failed to compile" in line:
            errors.append(f"[BUILD] {line.strip()}")
    print(f"  ❌ Build FAILED — {len(errors)} error(s) found")
    for e in errors:
        print(f"    {e}")
else:
    print("  ✅ Build passed")

# ── 2. Locale key coverage ─────────────────────────────────────────────
print()
print("=" * 60)
print("STEP 2: Locale key coverage (all locales vs en.json)")
print("=" * 60)

def get_all_keys(obj, prefix=""):
    keys = set()
    if isinstance(obj, dict):
        for k, v in obj.items():
            full = f"{prefix}.{k}" if prefix else k
            keys.add(full)
            keys.update(get_all_keys(v, full))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            full = f"{prefix}[{i}]"
            keys.add(full)
            keys.update(get_all_keys(v, full))
    return keys

def get_leaf_types(obj, prefix=""):
    """Returns dict mapping key -> type name"""
    types = {}
    if isinstance(obj, dict):
        for k, v in obj.items():
            full = f"{prefix}.{k}" if prefix else k
            types.update(get_leaf_types(v, full))
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            full = f"{prefix}[{i}]"
            types.update(get_leaf_types(v, full))
    else:
        types[prefix] = type(obj).__name__
    return types

with open("messages/en.json") as f:
    en = json.load(f)

en_keys = get_all_keys(en)
en_types = get_leaf_types(en)

for locale in LOCALES:
    if locale == "en":
        continue

    try:
        with open(f"messages/{locale}.json") as f:
            loc = json.load(f)
    except json.JSONDecodeError as e:
        errors.append(f"[{locale}] Invalid JSON: {e}")
        print(f"  ❌ {locale}: Invalid JSON — {e}")
        continue

    loc_keys = get_all_keys(loc)
    loc_types = get_leaf_types(loc)

    missing = en_keys - loc_keys
    extra = loc_keys - en_keys

    if missing:
        for k in sorted(missing):
            errors.append(f"[{locale}] Missing key: {k}")
        print(f"  ❌ {locale}: {len(missing)} missing key(s)")
        for k in sorted(missing)[:5]:
            print(f"      {k}")
        if len(missing) > 5:
            print(f"      ... and {len(missing) - 5} more")
    else:
        print(f"  ✅ {locale}: All keys present")

    # Type mismatches (e.g., string in en but array in locale)
    type_mismatches = []
    for key in en_keys & loc_keys:
        en_type = en_types.get(key, "")
        loc_type = loc_types.get(key, "")
        if en_type != loc_type:
            # Skip known intentional differences
            if key.endswith(".included") or key.endswith(".dark") or key.endswith(".bar"):
                continue
            if en_type in ("bool", "int") and loc_type in ("bool", "int"):
                continue
            type_mismatches.append((key, en_type, loc_type))

    if type_mismatches:
        for key, en_t, loc_t in type_mismatches:
            warnings.append(f"[{locale}] Type mismatch at {key}: en={en_t}, {locale}={loc_t}")
        print(f"  ⚠️  {locale}: {len(type_mismatches)} type mismatch(es)")

# ── 3. Structural checks ──────────────────────────────────────────────
print()
print("=" * 60)
print("STEP 3: Structural checks (arrays, nested objects)")
print("=" * 60)

# Check that helpApi.endpoints is an array in all locales
for locale in LOCALES:
    try:
        with open(f"messages/{locale}.json") as f:
            loc = json.load(f)
        endpoints = loc.get("helpApi", {}).get("endpoints")
        if not isinstance(endpoints, list):
            errors.append(f"[{locale}] helpApi.endpoints is {type(endpoints).__name__}, expected list")
            print(f"  ❌ {locale}: helpApi.endpoints is {type(endpoints).__name__} (should be list)")
        elif len(endpoints) != 6:
            errors.append(f"[{locale}] helpApi.endpoints has {len(endpoints)} items, expected 6")
            print(f"  ❌ {locale}: helpApi.endpoints has {len(endpoints)} items (should be 6)")
        else:
            print(f"  ✅ {locale}: helpApi.endpoints OK")
    except Exception as e:
        errors.append(f"[{locale}] Error checking structure: {e}")

# Check that company.about.cta is an array (not split into .0 .1)
for locale in LOCALES:
    try:
        with open(f"messages/{locale}.json") as f:
            loc = json.load(f)
        cta = loc.get("company", {}).get("about", {}).get("cta", {})
        if isinstance(cta, dict) and "0" in cta and "1" in cta:
            # Check if it's the split format vs array
            if "marketplace" not in cta:
                warnings.append(f"[{locale}] company.about.cta uses index keys (0,1) instead of named keys")
    except Exception:
        pass

# ── Summary ────────────────────────────────────────────────────────────
print()
print("=" * 60)
print("SUMMARY")
print("=" * 60)

if errors:
    print(f"❌ {len(errors)} ERROR(s) found:")
    for e in errors:
        print(f"  • {e}")
else:
    print("✅ No errors found")

if warnings:
    print(f"⚠️  {len(warnings)} WARNING(s):")
    for w in warnings:
        print(f"  • {w}")

print()
sys.exit(1 if errors else 0)
