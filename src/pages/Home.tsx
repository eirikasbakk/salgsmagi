import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { AdMeta } from "../types";
import AdTile from "../components/AdTile";
import { url } from "../url";

type AdSummary = AdMeta & { id: string };

export default function Home() {
  const [ads, setAds] = useState<AdSummary[]>([]);

  useEffect(() => {
    fetch(url("/ads/index.json"), { cache: "no-store" })
      .then((r) => r.json())
      .then((ids: string[]) =>
        Promise.all(
          ids.map((id) =>
            fetch(url(`/ads/${id}/meta.json`), { cache: "no-store" })
              .then((r) => r.json())
              .then((meta: AdMeta) => ({ ...meta, id }))
          )
        )
      )
      .then(setAds);
  }, []);

  const kategorier = [...new Set(ads.map((ad) => ad.kategori).filter(Boolean))] as string[];

  return (
    <div className="home">
      <h1>Artikler</h1>

      {kategorier.length > 0 && (
        <nav className="kategori-nav">
          {kategorier.map((k) => (
            <Link key={k} to={`/kategori/${k}`} className="kategori-chip">
              {k}
            </Link>
          ))}
        </nav>
      )}

      <div className="ad-grid">
        {ads.map((ad) => <AdTile key={ad.id} {...ad} />)}
      </div>
    </div>
  );
}
