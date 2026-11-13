// Template oleh Maliki Saputra (@malikisaputra) — https://malikisaputra.biz.id
// Lisensi MIT + syarat kredit-maliki (lihat LICENSE): kredit wajib tetap ada, tidak untuk diperjualbelikan.
// T05 v2 · UI Aplikasi Kaca — mengikuti ritme reel acuan per detik (9 Nov 2026).
// Urutan: pil kecil tumbuh + titik biru memantul → pil melebar berisi keluhan → kartu kalender jatuh miring dengan kata
// raksasa abu di belakang + kilat warna latar → ikon 3D + "Lagi?" → kalender naik, kartu log meluncur dari bawah, centang
// berurutan → "Taklukkan semua target" + kalender terisi hijau → pil ajakan → garis bantu + kilau → "Mulai hari ini" → avatar + handle.
import React from "react";
import { K } from "./konten";
import { SlotAudio } from "./SlotAudio";
import { AbsoluteFill, Easing, interpolate, Sequence, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { loadFont as muatInter } from "@remotion/google-fonts/Inter";

const INTER = muatInter().fontFamily;
const E = Easing.bezier(0.22, 1, 0.36, 1);
const k = (f: number, a: number, b: number, d: number[], ease = E) =>
  interpolate(f, [a, b], d, { easing: ease, extrapolateLeft: "clamp", extrapolateRight: "clamp" });
const HIJAU = K.warna.hijau, MERAH = K.warna.merah, BIRU = K.warna.biru;

export const DURASI_T05 = 380;

const Pil: React.FC<{ lebar: number; children?: React.ReactNode; skala?: number }> = ({ lebar, children, skala = 1 }) => (
  <div style={{ width: lebar, height: 96, borderRadius: 48, background: "#fff", boxShadow: "0 14px 34px rgba(60,90,150,0.18), inset 0 -4px 0 rgba(0,0,0,0.05)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", whiteSpace: "nowrap", fontFamily: INTER, fontWeight: 600, fontSize: 40, transform: `scale(${skala})` }}>{children}</div>
);

const Kalender: React.FC<{ isi: number; merah?: number[] }> = ({ isi, merah = [3, 11, 19] }) => (
  <div style={{ width: 560, padding: 34, borderRadius: 36, background: "rgba(255,255,255,0.92)", boxShadow: "0 30px 60px rgba(60,90,150,0.22)", fontFamily: INTER }}>
    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, fontWeight: 700, marginBottom: 18 }}><span>‹</span><span>{K.kalender.judul}</span><span>›</span></div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 12, fontSize: 16, color: "#999", textAlign: "center", marginBottom: 10 }}>{K.kalender.hari.map((d) => <span key={d}>{d}</span>)}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 12 }}>
      {Array.from({ length: 28 }).map((_, i) => {
        const on = i < isi;
        const m = merah.includes(i);
        return <div key={i} style={{ aspectRatio: "1", borderRadius: "50%", background: on ? (m ? MERAH : HIJAU) : "#eef1f7", color: on ? "#fff" : "#666", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${on ? 1 : 0.92})` }}>{i + 1}</div>;
      })}
    </div>
  </div>
);

const Log: React.FC<{ f: number; mulai: number }> = ({ f, mulai }) => {
  const item = K.log.item;
  return (
    <div style={{ width: 600, padding: 36, borderRadius: 36, background: "#fff", boxShadow: "0 30px 70px rgba(60,90,150,0.25)", fontFamily: INTER }}>
      <div style={{ fontSize: 36, fontWeight: 700, marginBottom: 16 }}>{K.log.judul}</div>
      {item.map((it, i) => {
        const c = k(f, mulai + 10 + i * 10, mulai + 18 + i * 10, [0, 1], Easing.bezier(0.3, 1.6, 0.5, 1));
        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 18, padding: "16px 0", borderBottom: "2px solid #f0f2f7", fontSize: 30 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: HIJAU, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>{K.log.ikon[i]}</div>
            <span style={{ flex: 1 }}>{it}</span>
            <span style={{ color: HIJAU, fontSize: 40, transform: `scale(${c})` }}>✓</span>
          </div>
        );
      })}
      <div style={{ marginTop: 22, height: 20, borderRadius: 10, background: "#eef1f7", overflow: "hidden" }}>
        <div style={{ width: `${k(f, mulai + 14, mulai + 50, [0, 100])}%`, height: "100%", background: `repeating-linear-gradient(45deg,${HIJAU} 0 12px,#7bd796 12px 24px)` }} />
      </div>
    </div>
  );
};

const Kilau: React.FC<{ x: number; y: number; s: number }> = ({ x, y, s }) => (
  <svg width={60} height={60} viewBox="-30 -30 60 60" style={{ position: "absolute", left: x - 30, top: y - 30, transform: `scale(${s}) rotate(${s * 90}deg)` }}><path d="M0 -28 Q3 -3 28 0 Q3 3 0 28 Q-3 3 -28 0 Q-3 -3 0 -28Z" fill="#111" /></svg>
);

export const T05AppUI: React.FC = () => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const sp = (d: number, c = { damping: 14, stiffness: 170 }) => spring({ frame: f - d, fps, config: c });

  // latar: biru pucat, kilat biru (54–66) & merah muda (66–110)
  const kilatBiru = k(f, 50, 56, [0, 1]) * k(f, 62, 72, [1, 0]) + k(f, 280, 286, [0, 1]) * k(f, 300, 312, [1, 0]);
  const kilatPink = k(f, 64, 76, [0, 1]) * k(f, 120, 140, [1, 0]);

  return (
    <AbsoluteFill style={{ background: "#e8f0fc", overflow: "hidden", fontFamily: INTER }}>
      <AbsoluteFill style={{ background: "linear-gradient(180deg,#9cc0ff,#cfe0ff)", opacity: kilatBiru }} />
      <AbsoluteFill style={{ background: "radial-gradient(80% 60% at 50% 80%, #f7c9cf, transparent)", opacity: kilatPink }} />

      <AbsoluteFill style={{ transform: "scale(1.3)" }}>
      {/* 1 · pil kecil tumbuh, titik memantul, pil melebar */}
      <Sequence durationInFrames={56}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "absolute", top: 800 - Math.abs(Math.sin(f / 5)) * 120 * k(f, 6, 30, [1, 0]), width: 26, height: 26, borderRadius: "50%", background: BIRU, opacity: k(f, 6, 10, [0, 1]) * k(f, 28, 32, [1, 0]) }} />
          <Pil lebar={k(f, 0, 12, [60, 180]) + k(f, 30, 44, [0, 380])} skala={sp(0)}>
            {f < 30 ? <span>{K.pil1.awal}</span> : <span style={{ transform: `translateX(${k(f, 30, 44, [60, 0])}px)` }}>{K.pil1.depan} <span style={{ background: BIRU, color: "#fff", padding: "4px 10px", borderRadius: 10 }}>{K.pil1.sorot}</span> {K.pil1.belakang}</span>}
          </Pil>
        </AbsoluteFill>
      </Sequence>

      {/* 2 · kata raksasa + kalender jatuh + ikon + "Lagi?" */}
      <Sequence from={50} durationInFrames={60}>
        {(() => {
          const t = f - 50;
          return (
            <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
              <div style={{ position: "absolute", top: 820, fontFamily: INTER, fontWeight: 900, fontStyle: "italic", fontSize: 300, color: "rgba(90,100,120,0.35)", letterSpacing: -10, transform: `scale(${k(t, 0, 50, [1.15, 1])})` }}>{K.kataBesar}</div>
              <div style={{ position: "absolute", top: 360, transform: `translateY(${k(t, 0, 14, [-700, 0], Easing.bezier(0.3, 1.3, 0.5, 1))}px) rotate(${k(t, 0, 20, [-14, -6])}deg) scale(0.85)` }}><Kalender isi={14} merah={[2, 5, 9, 12, 13]} /></div>
              {t > 18 && (
                <>
                  <div style={{ position: "absolute", top: 1180, fontSize: 200, transform: `scale(${sp(68, { damping: 9, stiffness: 160 })}) rotate(${Math.sin(t / 5) * 8}deg)`, filter: "drop-shadow(0 20px 20px rgba(0,0,0,0.3))" }}>{K.ikon}</div>
                  <div style={{ position: "absolute", top: 1080 }}><Pil lebar={260} skala={sp(72)}>{K.tanya}</Pil></div>
                </>
              )}
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* 3 · kalender naik kecil, log meluncur, centang, lalu tukar posisi + terisi hijau */}
      <Sequence from={110} durationInFrames={95}>
        {(() => {
          const t = f - 110;
          const tukar = k(t, 40, 56, [0, 1]);
          const isi = Math.round(k(t, 50, 90, [10, 28], Easing.linear));
          return (
            <AbsoluteFill>
              <div style={{ position: "absolute", left: 260, top: interpolate(tukar, [0, 1], [220, 1180]), transform: `scale(${interpolate(tukar, [0, 1], [0.7, 0.8])}) rotate(${interpolate(tukar, [0, 1], [-3, 4])}deg)`, transformOrigin: "50% 0" }}><Kalender isi={isi} merah={[2, 9]} /></div>
              <div style={{ position: "absolute", left: 240, top: interpolate(tukar, [0, 1], [k(t, 0, 16, [1900, 640]), 280]), transform: `rotate(${interpolate(tukar, [0, 1], [2, -3])}deg)` }}><Log f={t} mulai={8} /></div>
              <div style={{ position: "absolute", top: 1010, width: "100%", textAlign: "center", fontSize: 54, fontWeight: 700, opacity: tukar }}>
                {K.target.depan} <span style={{ background: `linear-gradient(90deg,${BIRU},#9db9ff)`, WebkitBackgroundClip: "text", color: "transparent" }}>{K.target.sorot}</span> {K.target.belakang}
              </div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* 4 · pil ajakan */}
      <Sequence from={205} durationInFrames={35}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <Pil lebar={k(f, 205, 218, [120, 470])} skala={sp(205)}>{K.ajakan} <span style={{ marginLeft: 12 }}>{K.ajakanIkon}</span></Pil>
        </AbsoluteFill>
      </Sequence>

      {/* 5 · teks geser + garis bantu + kilau */}
      <Sequence from={240} durationInFrames={40}>
        {(() => {
          const t = f - 240;
          const g = k(t, 8, 22, [0, 1]);
          return (
            <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
              {[[0, 905], [0, 1015]].map(([, y], i) => <div key={i} style={{ position: "absolute", left: 0, top: y, height: 2, width: `${g * 100}%`, borderTop: "2px dashed #555" }} />)}
              {[300, 780].map((x, i) => <div key={i} style={{ position: "absolute", left: x, top: 0, width: 2, height: `${g * 100}%`, borderLeft: "2px dashed #555" }} />)}
              <Kilau x={300} y={905} s={k(t, 16, 26, [0, 1])} />
              <Kilau x={780} y={1015} s={k(t, 20, 30, [0, 1])} />
              <div style={{ fontSize: 58, fontWeight: 700, transform: `translateX(${k(t, 0, 14, [300, 0])}px)` }}>{K.versi}</div>
            </AbsoluteFill>
          );
        })()}
      </Sequence>

      {/* 6 · "Mulai hari ini" */}
      <Sequence from={280} durationInFrames={50}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 76, fontWeight: 800, transform: `scale(${k(f, 280, 296, [1.25, 1])})` }}>
            {K.mulai.depan} <span style={{ background: `linear-gradient(90deg,${BIRU},#8fd0ff)`, WebkitBackgroundClip: "text", color: "transparent", display: "inline-block", transform: `translateY(${k(f, 284, 296, [20, 0])}px)` }}>{K.mulai.sorot}</span>
          </div>
        </AbsoluteFill>
      </Sequence>

      </AbsoluteFill>
      {/* 7 · avatar + handle */}
      <Sequence from={330}>
        <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
          <svg width={220} height={220} style={{ position: "absolute", top: 740 }}><circle cx={110} cy={110} r={100} stroke={HIJAU} strokeWidth={8} fill="none" strokeDasharray={`${k(f, 330, 360, [0, 630])} 700`} transform="rotate(-90 110 110)" /></svg>
          <div style={{ position: "absolute", top: 760, width: 180, height: 180, borderRadius: "50%", background: "linear-gradient(135deg,#1d1b4b,#4f8cff)", color: "#fff", fontWeight: 900, fontSize: 64, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${sp(334)})` }}>{K.avatar}</div>
          <div style={{ position: "absolute", top: 990, fontSize: 52, fontWeight: 700, opacity: k(f, 338, 350, [0, 1]) }}>{K.akun}</div>
        </AbsoluteFill>
      </Sequence>
    <SlotAudio audio={K.audio} />
    </AbsoluteFill>
  );
};
