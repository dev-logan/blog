import { ImageResponse } from "next/og"
import { getSiteConfig } from "@/lib/config"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function Image() {
  const siteConfig = getSiteConfig()

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090b",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div
          style={{ color: "#f4f4f5", fontSize: 64, fontWeight: 700 }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{ color: "#a1a1aa", fontSize: 32, marginTop: 24 }}
        >
          {siteConfig.description}
        </div>
      </div>
    ),
    { ...size }
  )
}
