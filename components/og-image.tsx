type OgImageProps = {
  eyebrow: string;
  title: string;
  description: string;
  accent?: string;
};

export function OgImage({ eyebrow, title, description, accent = "#63d8b0" }: OgImageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        padding: "68px 76px",
        color: "#f4f7f5",
        backgroundColor: "#07130f",
        backgroundImage:
          "radial-gradient(circle at 87% 12%, #164e3c 0, transparent 31%), radial-gradient(circle at 9% 90%, #0d3025 0, transparent 30%)",
        fontFamily: "sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16, color: accent, fontSize: 24, fontWeight: 700, letterSpacing: 2 }}>
        <div style={{ display: "flex", width: 18, height: 18, borderRadius: 18, backgroundColor: accent }} />
        {eyebrow.toUpperCase()}
      </div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", maxWidth: 970 }}>
        <div style={{ display: "flex", fontSize: title.length > 58 ? 58 : 72, lineHeight: 1.08, fontWeight: 700, letterSpacing: -2.5 }}>
          {title}
        </div>
        <div style={{ display: "flex", marginTop: 30, color: "#b9c8c1", fontSize: 28, lineHeight: 1.4, maxWidth: 900 }}>
          {description}
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", color: "#a7bbb1", fontSize: 23 }}>
        <span>muaathrifath.me</span>
        <span style={{ color: accent }}>Software Engineer</span>
      </div>
    </div>
  );
}
