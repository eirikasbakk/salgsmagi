import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import type { AdMeta } from "../types";
import AdTile from "../components/AdTile";

type AdSummary = AdMeta & { id: string };

export default function Kategori() {
  const { navn } = useParams<{ navn: string }>();
  const [ads, setAds] = useState<AdSummary[]>([]);

  useEffect(() => {
    fetch("/ads/index.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((ids: string[]) =>
        Promise.all(
          ids.map((id) =>
            fetch(`/ads/${id}/meta.json`, { cache: "no-store" })
              .then((r) => r.json())
              .then((meta: AdMeta) => ({ ...meta, id }))
          )
        )
      )
      .then((alle) => setAds(alle.filter((ad) => ad.kategori === navn)));
  }, [navn]);

  return (
    <div className="home">
      <Link to="/" className="back-link">← Alle kategorier</Link>
      <h1>{navn}</h1>
      <div className="ad-grid">
        {ads.map((ad) => <AdTile key={ad.id} {...ad} />)}
      </div>
      {ads.length === 0 && <p className="empty">Ingen annonser i denne kategorien.</p>}
    </div>
  );
}
