import { createFileRoute } from "@tanstack/react-router";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { LessonBody } from "@/components/inline-lesson";
import { Button, Eyebrow, Sheet } from "@/components/ui";
import { lessonById } from "@/lib/education";
import { POLICY, moistureCopy, sharePctForScore } from "@/lib/policy";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/education_/producer")({ component: ProducerPage });

function ProducerPage() {
  const lesson = lessonById("d2")!;
  const [locale, setLocale] = useState<"vi" | "en">("vi");
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const duration = 4 * 60 + 32;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setT((x) => (x + 1) % (duration + 1)), 1000);
    return () => window.clearInterval(id);
  }, [playing, duration]);

  const mm = (n: number) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;

  return (
    <div className="space-y-6" lang={locale}>
      <Sheet>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <Eyebrow>Track D · {locale === "vi" ? "Nông dân & đại lý" : "Producer & collector"}</Eyebrow>
            <h1 className="mt-2 max-w-[16ch] font-display text-4xl">
              {locale === "vi" ? "Bạn được trả hai lần." : "You are paid twice."}
            </h1>
            <p className="mt-3 max-w-xl text-slate">
              {locale === "vi"
                ? "Tiền sàn khi xác minh. Chia sẻ doanh thu khi lô bán. Không bài học nào được phép chặn tiền sàn."
                : "Floor at verification. Revenue share when the lot sells. No lesson in this track may gate a floor payment."}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              className={cn(
                "min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase",
                locale === "vi" ? "border-ink bg-ink text-paper" : "border-hair-strong",
              )}
              onClick={() => setLocale("vi")}
            >
              Tiếng Việt
            </button>
            <button
              type="button"
              className={cn(
                "min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase",
                locale === "en" ? "border-ink bg-ink text-paper" : "border-hair-strong",
              )}
              onClick={() => setLocale("en")}
            >
              English
            </button>
          </div>
        </div>
      </Sheet>

      <Sheet>
        <p className="kicker">
          {locale === "vi" ? "Bài 2 · Nghe bài học" : "Lesson 2 · Listen"}
        </p>
        <h2 className="mt-2 font-display text-2xl">
          {locale === "vi" ? "Đọc biên nhận giá thực" : "Reading your True Price Receipt"}
        </h2>
        <div className="mt-5 border border-hair bg-sheet px-4 py-5">
          <div className="flex items-center gap-3">
            <Button tone="stamp" onClick={() => setPlaying((p) => !p)} aria-label={playing ? "Pause" : "Play"}>
              {playing ? <Pause size={16} /> : <Play size={16} />}
              {locale === "vi" ? (playing ? "Tạm dừng" : "Nghe bài học") : playing ? "Pause" : "Listen"}
            </Button>
            <div className="min-w-0 flex-1">
              <div className="h-1.5 bg-hair">
                <div className="h-full bg-ink" style={{ width: `${(t / duration) * 100}%` }} />
              </div>
              <p className="mt-1 font-mono text-[11px] tabular text-slate">
                {mm(t)} / {mm(duration)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-slate">
            {locale === "vi"
              ? "Âm thanh là cách chính. Video không phải mặc định. Bài đã lưu ngoại tuyến khi có."
              : "Audio is the primary modality. Video is the wrong default. Offline cache when available."}
          </p>
        </div>
        <ol className="mt-6 space-y-2 text-sm">
          {[
            ["①", "Tên nông dân", "Farmer name"],
            ["②", "Trọng lượng thực", "Net weight"],
            ["③", "Điểm cupping", "Cup score"],
            ["④", "Giá sàn", "Floor price"],
            ["⑤", "Giá bán cuối", "Final sale"],
            ["⑥", "Khấu trừ", "Deductions"],
            ["⑦", `Tỷ lệ chia sẻ (${sharePctForScore(86.42)}% ở 86.42)`, "Share %"],
            ["⑧", "Số tiền nhận — cuối biên nhận", "Amount received — at the bottom"],
          ].map(([n, vi, en]) => (
            <li key={n} className="grid grid-cols-[2rem_1fr] gap-2">
              <span className="font-mono text-slate">{n}</span>
              <span>{locale === "vi" ? vi : en}</span>
            </li>
          ))}
        </ol>
        <p className="mt-4 text-xs text-slate">
          {locale === "vi"
            ? `Độ ẩm mục tiêu ${moistureCopy()} theo phụ lục hợp đồng. Cup ${POLICY.shareByCup[0].minScore}+ = ${POLICY.shareByCup[0].sharePct}%.`
            : `Moisture band ${moistureCopy()} from the contract exhibit. Cup ${POLICY.shareByCup[0].minScore}+ = ${POLICY.shareByCup[0].sharePct}%.`}
        </p>
      </Sheet>

      <LessonBody lesson={lesson} locale={locale} />
    </div>
  );
}
