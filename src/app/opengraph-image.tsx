import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "직장내 괴롭힘 판단기 - 근로기준법 제76조의2 기반 AI 분석";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #1e40af 100%)",
          padding: "60px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "80px",
              height: "80px",
              borderRadius: "16px",
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              marginBottom: "32px",
              fontSize: "48px",
            }}
          >
            ⚖️
          </div>
          <div
            style={{
              fontSize: "56px",
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              lineHeight: 1.2,
              marginBottom: "20px",
            }}
          >
            직장내 괴롭힘 판단기
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "rgba(191, 219, 254, 0.9)",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            근로기준법 제76조의2 기반 AI 분석
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "20px",
            color: "rgba(191, 219, 254, 0.6)",
          }}
        >
          workplacebully.vercel.app
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
