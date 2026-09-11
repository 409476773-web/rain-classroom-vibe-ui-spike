// Static routing reviewed against the Tabs color consumer contract.
export const tabsPaints = {
  "line": {
    "normal": {
      "label": "text-rain-category-text-neutral-3 group-hover/tabs:text-rain-category-text-neutral-2 group-active/tabs:text-rain-category-text-neutral-1",
      "count": "text-rain-category-text-neutral-3 group-hover/tabs:text-rain-category-text-neutral-2 group-active/tabs:text-rain-category-text-neutral-1",
      "icon": "text-rain-category-icon-neutral-3 group-hover/tabs:text-rain-category-icon-neutral-2 group-active/tabs:text-rain-category-icon-neutral-1",
      "paint": "bg-transparent",
      "border": "border-transparent"
    },
    "selected": {
      "label": "text-rain-category-text-neutral-1 group-hover/tabs:text-rain-category-text-neutral-2 group-active/tabs:text-rain-category-text-neutral-1",
      "count": "text-rain-category-text-neutral-2",
      "icon": "text-rain-category-icon-neutral-1",
      "paint": "bg-transparent",
      "border": "border-transparent"
    },
    "disabled": {
      "label": "text-rain-category-text-neutral-6",
      "count": "text-rain-category-text-neutral-6",
      "icon": "text-rain-category-icon-neutral-5",
      "paint": "bg-transparent",
      "border": "border-transparent"
    },
    "selectedDisabled": {
      "label": "text-rain-category-text-neutral-6",
      "count": "text-rain-category-text-neutral-6",
      "icon": "text-rain-category-icon-neutral-5",
      "paint": "bg-transparent",
      "border": "border-transparent"
    }
  },
  "contained": {
    "normal": {
      "label": "text-rain-category-text-neutral-3 group-hover/tabs:text-rain-category-text-neutral-2 group-active/tabs:text-rain-category-text-neutral-1",
      "count": "text-rain-category-text-neutral-3 group-hover/tabs:text-rain-category-text-neutral-2 group-active/tabs:text-rain-category-text-neutral-1",
      "icon": "text-rain-category-icon-neutral-3 group-hover/tabs:text-rain-category-icon-neutral-2 group-active/tabs:text-rain-category-icon-neutral-1",
      "paint": "bg-transparent group-hover/tabs:bg-rain-category-fill-neutral-alpha-6 group-active/tabs:bg-rain-category-fill-neutral-alpha-5",
      "border": "border-transparent"
    },
    "selected": {
      "label": "text-rain-category-text-neutral-1 group-hover/tabs:text-rain-category-text-neutral-2 group-active/tabs:text-rain-category-text-neutral-1",
      "count": "text-rain-category-text-neutral-2",
      "icon": "text-rain-category-icon-neutral-1",
      "paint": "bg-rain-category-background-neutral-1",
      "border": "border-transparent"
    },
    "disabled": {
      "label": "text-rain-category-text-neutral-6",
      "count": "text-rain-category-text-neutral-6",
      "icon": "text-rain-category-icon-neutral-5",
      "paint": "bg-transparent",
      "border": "border-transparent"
    },
    "selectedDisabled": {
      "label": "text-rain-category-text-neutral-6",
      "count": "text-rain-category-text-neutral-6",
      "icon": "text-rain-category-icon-neutral-5",
      "paint": "bg-rain-category-background-neutral-1",
      "border": "border-transparent"
    }
  },
  "soft": {
    "normal": {
      "label": "text-rain-category-text-neutral-4 group-hover/tabs:text-rain-category-text-neutral-3 group-active/tabs:text-rain-category-text-neutral-2",
      "count": "text-rain-category-text-neutral-4 group-hover/tabs:text-rain-category-text-neutral-3 group-active/tabs:text-rain-category-text-neutral-2",
      "icon": "text-rain-category-icon-neutral-3 group-hover/tabs:text-rain-category-icon-neutral-2 group-active/tabs:text-rain-category-icon-neutral-1",
      "paint": "bg-rain-category-fill-neutral-alpha-6 group-hover/tabs:bg-rain-category-fill-neutral-alpha-5 group-active/tabs:bg-rain-category-fill-neutral-alpha-4",
      "border": "border-transparent"
    },
    "selected": {
      "label": "text-rain-category-text-brand-1",
      "count": "text-rain-category-text-brand-1",
      "icon": "text-rain-category-icon-brand-1",
      "paint": "bg-rain-category-fill-brand-alpha-4",
      "border": "border-transparent"
    },
    "disabled": {
      "label": "text-rain-category-text-neutral-6",
      "count": "text-rain-category-text-neutral-6",
      "icon": "text-rain-category-icon-neutral-5",
      "paint": "bg-rain-category-fill-neutral-alpha-6",
      "border": "border-transparent"
    },
    "selectedDisabled": {
      "label": "text-rain-category-text-neutral-6",
      "count": "text-rain-category-text-neutral-6",
      "icon": "text-rain-category-icon-neutral-5",
      "paint": "bg-rain-category-fill-brand-alpha-4",
      "border": "border-transparent"
    }
  },
  "more": {
    "label": "text-rain-category-text-neutral-3 group-hover/tabs:text-rain-category-text-neutral-2 group-active/tabs:text-rain-category-text-neutral-1",
    "icon": "text-rain-category-icon-neutral-3 group-hover/tabs:text-rain-category-icon-neutral-2 group-active/tabs:text-rain-category-icon-neutral-1"
  },
  "tray": "bg-rain-category-background-neutral-3",
  "indicator": "bg-rain-category-fill-brand-solid-2",
  "divider": "bg-rain-category-border-neutral-3"
} as const;

// Freeze the three object layers so imported aliases cannot change a reviewed Part.
[tabsPaints, ...Object.values(tabsPaints), ...Object.values(tabsPaints).flatMap(value => typeof value === "object" ? Object.values(value) : [])].filter(value => typeof value === "object").forEach(Object.freeze);
