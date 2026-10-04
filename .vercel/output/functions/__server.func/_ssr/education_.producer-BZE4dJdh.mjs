import { i as __toESM } from "../_runtime.mjs";
import { C as require_jsx_runtime, Y as require_react } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Play, o as Pause } from "../_libs/lucide-react.mjs";
import { B as cn, F as lessonById, H as moistureCopy, U as sharePctForScore, V as POLICY } from "./router-DSNp4tp8.mjs";
import { a as Sheet, r as Eyebrow, t as Button } from "./ui-DI4E79SW.mjs";
import { n as LessonBody } from "./inline-lesson-BC0DjaEt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/education_.producer-BZE4dJdh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ProducerPage() {
	const lesson = lessonById("d2");
	const [locale, setLocale] = (0, import_react.useState)("vi");
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [t, setT] = (0, import_react.useState)(0);
	const duration = 272;
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		const id = window.setInterval(() => setT((x) => (x + 1) % 273), 1e3);
		return () => window.clearInterval(id);
	}, [playing, duration]);
	const mm = (n) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, "0")}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-6",
		lang: locale,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Eyebrow, { children: ["Track D · ", locale === "vi" ? "Nông dân & đại lý" : "Producer & collector"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 max-w-[16ch] font-display text-4xl",
						children: locale === "vi" ? "Bạn được trả hai lần." : "You are paid twice."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-slate",
						children: locale === "vi" ? "Tiền sàn khi xác minh. Chia sẻ doanh thu khi lô bán. Không bài học nào được phép chặn tiền sàn." : "Floor at verification. Revenue share when the lot sells. No lesson in this track may gate a floor payment."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase", locale === "vi" ? "border-ink bg-ink text-paper" : "border-hair-strong"),
						onClick: () => setLocale("vi"),
						children: "Tiếng Việt"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: cn("min-h-11 border px-3 font-mono text-[11px] tracking-[0.14em] uppercase", locale === "en" ? "border-ink bg-ink text-paper" : "border-hair-strong"),
						onClick: () => setLocale("en"),
						children: "English"
					})]
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "kicker",
					children: locale === "vi" ? "Bài 2 · Nghe bài học" : "Lesson 2 · Listen"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-2xl",
					children: locale === "vi" ? "Đọc biên nhận giá thực" : "Reading your True Price Receipt"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 border border-hair bg-sheet px-4 py-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							tone: "stamp",
							onClick: () => setPlaying((p) => !p),
							"aria-label": playing ? "Pause" : "Play",
							children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { size: 16 }), locale === "vi" ? playing ? "Tạm dừng" : "Nghe bài học" : playing ? "Pause" : "Listen"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1.5 bg-hair",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full bg-ink",
									style: { width: `${t / duration * 100}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 font-mono text-[11px] tabular text-slate",
								children: [
									mm(t),
									" / ",
									mm(duration)
								]
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-slate",
						children: locale === "vi" ? "Âm thanh là cách chính. Video không phải mặc định. Bài đã lưu ngoại tuyến khi có." : "Audio is the primary modality. Video is the wrong default. Offline cache when available."
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-6 space-y-2 text-sm",
					children: [
						[
							"①",
							"Tên nông dân",
							"Farmer name"
						],
						[
							"②",
							"Trọng lượng thực",
							"Net weight"
						],
						[
							"③",
							"Điểm cupping",
							"Cup score"
						],
						[
							"④",
							"Giá sàn",
							"Floor price"
						],
						[
							"⑤",
							"Giá bán cuối",
							"Final sale"
						],
						[
							"⑥",
							"Khấu trừ",
							"Deductions"
						],
						[
							"⑦",
							`Tỷ lệ chia sẻ (${sharePctForScore(86.42)}% ở 86.42)`,
							"Share %"
						],
						[
							"⑧",
							"Số tiền nhận — cuối biên nhận",
							"Amount received — at the bottom"
						]
					].map(([n, vi, en]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "grid grid-cols-[2rem_1fr] gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-slate",
							children: n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: locale === "vi" ? vi : en })]
					}, n))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-slate",
					children: locale === "vi" ? `Độ ẩm mục tiêu ${moistureCopy()} theo phụ lục hợp đồng. Cup ${POLICY.shareByCup[0].minScore}+ = ${POLICY.shareByCup[0].sharePct}%.` : `Moisture band ${moistureCopy()} from the contract exhibit. Cup ${POLICY.shareByCup[0].minScore}+ = ${POLICY.shareByCup[0].sharePct}%.`
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LessonBody, {
				lesson,
				locale
			})
		]
	});
}
//#endregion
export { ProducerPage as component };
