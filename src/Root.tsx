// Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id
// Lisensi MIT + syarat kredit-maliki (lihat LICENSE): kredit wajib tetap ada, tidak untuk diperjualbelikan.
import React from "react";
import { Composition } from "remotion";
import { T05AppUI, DURASI_T05 } from "./T05AppUI";

export const Root: React.FC = () => (
  <Composition id="T05AppUI" component={T05AppUI} durationInFrames={DURASI_T05} fps={30} width={1080} height={1920} />
);
