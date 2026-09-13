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
    <div className="border-primary-200 bg-primary-50 text-primary-800 dark:border-primary-800 dark:bg-primary-950 dark:text-primary-200 mb-10 rounded-xl border px-6 py-4 text-sm font-medium">
      {label}
    </div>
  );
}
