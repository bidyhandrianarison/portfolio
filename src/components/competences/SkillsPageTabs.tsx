"use client";

import { useState } from "react";
import type { Skill } from "@/sanity/types";
import type { Certification } from "@/sanity/types";
import { SkillsTab } from "./SkillsTab";
import { CertificationsTab } from "./CertificationsTab";

interface SkillsPageTabsProps {
  skills: Skill[];
  certifications: Certification[];
  locale: string;
  initialTab: "skills" | "certifications";
  labels: {
    skillsTab: string;
    certificationsTab: string;
    tabsAria: string;
  };
}

export function SkillsPageTabs({
  skills,
  certifications,
  locale,
  initialTab,
  labels,
}: SkillsPageTabsProps) {
  const [activeTab, setActiveTab] = useState(initialTab);

  const selectTab = (tab: "skills" | "certifications") => {
    setActiveTab(tab);
    const url = new URL(window.location.href);
    if (tab === "skills") {
      url.searchParams.delete("tab");
    } else {
      url.searchParams.set("tab", tab);
    }
    window.history.replaceState(window.history.state, "", url);
  };

  return (
    <div>
      <div
        className="mb-8 flex gap-1 rounded-xl border border-neutral-200 bg-neutral-100 p-1 dark:border-neutral-800 dark:bg-neutral-900"
        role="tablist"
        aria-label={labels.tabsAria}
      >
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "skills"}
          aria-controls="panel-skills"
          onClick={() => selectTab("skills")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            activeTab === "skills"
              ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-50"
              : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          {labels.skillsTab}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "certifications"}
          aria-controls="panel-certifications"
          onClick={() => selectTab("certifications")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all ${
            activeTab === "certifications"
              ? "bg-white text-neutral-900 shadow-sm dark:bg-neutral-800 dark:text-neutral-50"
              : "text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          }`}
        >
          {labels.certificationsTab}
        </button>
      </div>

      <div id="panel-skills" role="tabpanel" hidden={activeTab !== "skills"}>
        <SkillsTab skills={skills} locale={locale} />
      </div>

      <div
        id="panel-certifications"
        role="tabpanel"
        hidden={activeTab !== "certifications"}
      >
        <CertificationsTab certifications={certifications} locale={locale} />
      </div>
    </div>
  );
}
