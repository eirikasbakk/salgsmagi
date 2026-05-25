import { Link } from "react-router-dom";
import type { AdMeta } from "../types";

type Props = AdMeta & { id: string };

export default function AdTile({ id, title, pris, kategori, thumbnail }: Props) {
  return (
    <Link to={`/ads/${id}`} className="ad-tile">
      <div className="ad-tile-image">
        {thumbnail
          ? <img src={thumbnail} alt={title} />
          : <div className="ad-tile-no-image" />}
      </div>
      <div className="ad-tile-body">
        <p className="ad-tile-title">{title}</p>
        <div className="ad-tile-footer">
          {kategori && <span className="kategori-chip small">{kategori}</span>}
          <span className="pris">{pris}</span>
        </div>
      </div>
    </Link>
  );
}
