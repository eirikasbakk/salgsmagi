import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { url } from "../url";

export default function Om() {
  const [md, setMd] = useState("");

  useEffect(() => {
    fetch(url("/om.md"), { cache: "no-store" })
      .then((r) => r.text())
      .then(setMd);
  }, []);

  return (
    <div className="home">
      <h1>Om Salgsmagi</h1>
      <div className="ad-content">
        <ReactMarkdown>{md}</ReactMarkdown>
      </div>
    </div>
  );
}
