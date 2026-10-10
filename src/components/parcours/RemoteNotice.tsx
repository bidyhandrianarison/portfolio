interface RemoteNoticeProps {
  locale: string;
}

const noticeLabels = {
  fr: "Actuellement ouvert aux postes en remote et freelance.",
  en: "Currently open to remote and freelance opportunities.",
} as const;

export function RemoteNotice({ locale }: RemoteNoticeProps) {
  const label =
    noticeLabels[locale as keyof typeof noticeLabels] ?? noticeLabels.fr;

  return (
    <div className="bg-success-50 text-success-700 dark:bg-success-900/40 dark:text-success-300 border-success-200 dark:border-success-800 mb-10 inline-flex items-center gap-2 rounded-xl border px-6 py-4 text-sm font-medium">
      <span className="bg-success-500 h-1.5 w-1.5 rounded-full" />
      {label}
    </div>
  );
}
