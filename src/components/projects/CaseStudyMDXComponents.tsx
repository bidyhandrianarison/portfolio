import type { ComponentPropsWithoutRef } from "react";

function H2({ children, ...props }: ComponentPropsWithoutRef<"h2">) {
  return (
    <h2
      className="mt-12 mb-4 border-b border-neutral-200 pb-2 text-xl font-semibold text-neutral-900 dark:border-neutral-800 dark:text-neutral-100"
      {...props}
    >
      {children}
    </h2>
  );
}

function H3({ children, ...props }: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className="mt-8 mb-3 text-lg font-medium text-neutral-800 dark:text-neutral-200"
      {...props}
    >
      {children}
    </h3>
  );
}

function P({ children, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className="mb-4 leading-relaxed text-neutral-600 dark:text-neutral-400"
      {...props}
    >
      {children}
    </p>
  );
}

function Ul({ children, ...props }: ComponentPropsWithoutRef<"ul">) {
  return (
    <ul
      className="mb-4 space-y-3 text-neutral-600 dark:text-neutral-400"
      {...props}
    >
      {children}
    </ul>
  );
}

function Ol({ children, ...props }: ComponentPropsWithoutRef<"ol">) {
  return (
    <ol
      className="mb-4 list-inside list-decimal space-y-3 text-neutral-600 dark:text-neutral-400"
      {...props}
    >
      {children}
    </ol>
  );
}

function Li({ children, ...props }: ComponentPropsWithoutRef<"li">) {
  return (
    <li className="pl-2 leading-relaxed" {...props}>
      {children}
    </li>
  );
}

function Strong({ children, ...props }: ComponentPropsWithoutRef<"strong">) {
  return (
    <strong
      className="font-semibold text-neutral-900 dark:text-neutral-100"
      {...props}
    >
      {children}
    </strong>
  );
}

export const caseStudyComponents = {
  h2: H2,
  h3: H3,
  p: P,
  ul: Ul,
  ol: Ol,
  li: Li,
  strong: Strong,
};
