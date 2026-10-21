import type { MDXComponents } from "mdx/types";

type Stat = { value: string; label: string };

function Stats({ items }: { items: Stat[] }) {
  return (
    <dl className="my-10 grid gap-4 sm:grid-cols-3">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl bg-surface p-5">
          <dt className="sr-only">{item.label}</dt>
          <dd className="font-display text-4xl text-ink">{item.value}</dd>
          <dd className="mt-2 text-sm text-muted">{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}

const components: MDXComponents = {
  h2: (props) => <h2 className="mt-14 mb-4 font-display text-3xl text-ink" {...props} />,
  h3: (props) => <h3 className="mt-10 mb-3 text-xl font-semibold text-ink" {...props} />,
  p: (props) => <p className="my-5 text-lg leading-relaxed text-body" {...props} />,
  ul: (props) => <ul className="my-5 list-disc space-y-2 pl-6 text-lg text-body marker:text-muted" {...props} />,
  ol: (props) => <ol className="my-5 list-decimal space-y-2 pl-6 text-lg text-body" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="my-10 border-l-2 border-ink pl-6 [&>p]:font-display [&>p]:text-3xl [&>p]:leading-snug [&>p]:text-ink"
      {...props}
    />
  ),
  a: (props) => <a className="underline decoration-1 underline-offset-4 hover:text-ink" {...props} />,
  Stats,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
