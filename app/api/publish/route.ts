import { exec } from "child_process"
import { NextResponse } from "next/server"

export async function POST() {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "개발 환경에서만 사용 가능합니다." }, { status: 403 })
  }

  return new Promise((resolve) => {
    exec("bash /Users/jeongho/Documents/development/blog/scripts/publish.sh", (error, stdout, stderr) => {
      if (error) {
        resolve(NextResponse.json({ success: false, message: stderr || error.message }, { status: 500 }))
      } else {
        resolve(NextResponse.json({ success: true, message: stdout }))
      }
    })
  })
}
