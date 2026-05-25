import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import type { AdMeta } from "../types";
import { url } from "../url";

export default function Ad() {
  const { id } = useParams<{ id: string }>();
  const [meta, setMeta] = useState<AdMeta | null>(null);
  const [md, setMd] = useState<string>("");

  useEffect(() => {
    if (!id) return;
    fetch(url(`/ads/${id}/meta.json`), { cache: "no-store" })
      .then((r) => r.json())
      .then(setMeta);

    fetch(url(`/ads/${id}/content.md`), { cache: "no-store" })
      .then((r) => r.text())
      .then(setMd);
  }, [id]);

  if (!meta) return <div>Laster…</div>;

  return (
    <div className="ad">
      <div className="ad-header">
        <Link to={meta.kategori ? `/kategori/${meta.kategori}` : "/"} className="back-link">
          ← {meta.kategori ?? "Alle annonser"}
        </Link>
        <h1>{meta.title}</h1>
        <div className="ad-badges">
          <span className="pris">Pris: {meta.pris}</span>
          {meta.innbytte && <span className="innbytte">Innbytte: {meta.innbytte}</span>}
        </div>
      </div>

      <div className="ad-content">
        <ReactMarkdown
          components={{
            img: ({ src, alt, title }) => (
              <figure>
                <img src={src ? url(src) : src} alt={alt} />
                {title && <figcaption>{title}</figcaption>}
              </figure>
            ),
          }}
        >
          {md}
        </ReactMarkdown>
      </div>
    </div>
  );
}
