import type { ReactNode } from 'react';

/**
 * Rich elements for MDX blog posts. MDX here runs without remark-gfm, so
 * posts import these for figures and tables instead of markdown syntax.
 */

export function PostFigure({
  src,
  alt,
  caption,
  width = 1600,
  height = 900,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  width?: number;
  height?: number;
}) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        className="border-border w-full rounded-2xl border"
      />
      {caption && (
        <figcaption className="text-muted-foreground mt-2 text-center text-sm">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export function PostTable({
  head,
  rows,
}: {
  head: ReactNode[];
  rows: ReactNode[][];
}) {
  return (
    <div className="border-border my-6 overflow-x-auto rounded-xl border">
      <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
        <thead className="bg-muted/60">
          <tr>
            {head.map((cell, i) => (
              <th key={i} className="text-foreground px-4 py-2.5 font-semibold">
                {cell}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, r) => (
            <tr key={r} className="border-border border-t">
              {row.map((cell, c) => (
                <td
                  key={c}
                  className="text-foreground/90 px-4 py-2.5 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
