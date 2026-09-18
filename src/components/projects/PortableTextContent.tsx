"use client";

import { PortableText, type PortableTextComponents } from "next-sanity";
import type { PortableTextBlock } from "@/sanity/types";

const components: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mt-12 mb-4 border-b border-neutral-200 pb-2 text-xl font-semibold text-neutral-900 dark:border-neutral-800 dark:text-neutral-100">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-8 mb-3 text-lg font-medium text-neutral-800 dark:text-neutral-200">
        {children}
      </h3>
    ),
    normal: ({ children }) => (
      <p className="mb-4 leading-relaxed text-neutral-600 dark:text-neutral-400">
        {children}
      </p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-primary-500 border-l-4 pl-4 text-neutral-600 italic dark:text-neutral-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-4 space-y-3 text-neutral-600 dark:text-neutral-400">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mb-4 list-inside list-decimal space-y-3 text-neutral-600 dark:text-neutral-400">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="pl-2 leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="pl-2 leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-neutral-900 dark:text-neutral-100">
        {children}
      </strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-sm text-neutral-800 dark:bg-neutral-800 dark:text-neutral-200">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const rel = !value?.href?.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const target = !value?.href?.startsWith("/") ? "_blank" : undefined;
      return (
        <a
          href={value?.href}
          rel={rel}
          target={target}
          className="text-primary-600 hover:text-primary-700 underline"
        >
          {children}
        </a>
      );
    },
  },
};

interface PortableTextContentProps {
  value: PortableTextBlock[];
}

export function PortableTextContent({ value }: PortableTextContentProps) {
  if (!value || value.length === 0) return null;

  return (
    <article className="max-w-3xl">
      <PortableText value={value} components={components} />
    </article>
  );
}
