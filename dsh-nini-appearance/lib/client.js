window.__ModuleLoader__.load({
	id: "dsh-nini-appearance",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react = require("react");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		let react_jsx_runtime = require("react/jsx-runtime");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region node_modules/.pnpm/clsx@2.1.1/node_modules/clsx/dist/clsx.mjs
		function r(e) {
			var t, f, n = "";
			if ("string" == typeof e || "number" == typeof e) n += e;
			else if ("object" == typeof e) if (Array.isArray(e)) {
				var o = e.length;
				for (t = 0; t < o; t++) e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
			} else for (f in e) e[f] && (n && (n += " "), n += f);
			return n;
		}
		function clsx() {
			for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++) (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
			return n;
		}
		/** Max emphasized-text tint alpha (schema bound for the inline-code chips). */
		const EMPHASIS_ALPHA_MAX = .45;
		/**
		* The color roles the customizer exposes. Each role maps to one or more
		* `--dsw-alias-*` tokens; an empty string means "keep the stock token".
		* Bubble roles were removed: the harness renders its only bubble background
		* on user messages (assistant turns have none), so bubbles now follow the
		* accent color instead of owning separate settings.
		*/
		const APPEARANCE_ROLES = [
			"accent",
			"background",
			"panel",
			"input",
			"text",
			"border"
		];
		/** The section with every color role left stock and every effect off. */
		const DEFAULT_SETTINGS = {
			accent: "",
			background: "",
			panel: "",
			input: "",
			text: "",
			border: "",
			backgroundImage: "",
			backgroundVideo: "",
			imageDark: false,
			backgroundOpacity: 1,
			backgroundFit: "cover",
			backgroundPositionX: 50,
			backgroundPositionY: 50,
			backgroundBlur: 0,
			scrim: 0,
			surfaceAlpha: 1,
			sidebarOpaque: false,
			glassBlur: 0,
			emphasisAlpha: .22,
			preset: ""
		};
		/** Number fields and their schema bounds, used to sanitize persisted input. */
		const NUMERIC_BOUNDS = {
			backgroundOpacity: {
				min: 0,
				max: 1
			},
			backgroundPositionX: {
				min: 0,
				max: 100
			},
			backgroundPositionY: {
				min: 0,
				max: 100
			},
			backgroundBlur: {
				min: 0,
				max: 30
			},
			scrim: {
				min: 0,
				max: 1
			},
			surfaceAlpha: {
				min: 0,
				max: 1
			},
			glassBlur: {
				min: 0,
				max: 20
			},
			emphasisAlpha: {
				min: 0,
				max: EMPHASIS_ALPHA_MAX
			}
		};
		/** Boolean fields, used to sanitize persisted input. */
		const BOOLEAN_FIELDS = ["imageDark", "sidebarOpaque"];
		/** Canonicalize a hex color: lowercase, 3-digit expanded to 6-digit. */
		function normalizeHex(value) {
			if (value.length === 4) {
				const [, r, g, b] = value;
				return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
			}
			return value.toLowerCase();
		}
		/**
		* Validate and coerce one parsed settings document against the schema, so
		* hand-edited or stale localStorage can never produce invalid CSS (e.g. a
		* string blur feeding `${value}px` or an alpha outside 0..1). Unknown fields
		* are dropped; every field that fails its check falls back to the default.
		* Legacy persisted `1`/`0` booleans (older checkbox writes) are coerced to
		* real booleans so existing users keep their settings.
		* @param raw - the parsed localStorage section, or any foreign value.
		* @returns a complete, schema-valid settings section.
		*/
		function sanitizeSettings(raw) {
			if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return { ...DEFAULT_SETTINGS };
			const source = raw;
			const result = { ...DEFAULT_SETTINGS };
			for (const role of APPEARANCE_ROLES) {
				const value = source[role];
				if (typeof value === "string" && (value === "" || /^#[0-9a-f]{3}([0-9a-f]{3})?$/i.test(value))) result[role] = value === "" ? "" : normalizeHex(value);
			}
			const strings = [
				"backgroundImage",
				"backgroundVideo",
				"preset"
			];
			const index = result;
			for (const field of strings) {
				const value = source[field];
				if (typeof value === "string") index[field] = value;
			}
			if (source.backgroundFit === "cover" || source.backgroundFit === "contain" || source.backgroundFit === "fill") result.backgroundFit = source.backgroundFit;
			for (const [field, { min, max }] of Object.entries(NUMERIC_BOUNDS)) {
				const value = source[field];
				if (typeof value === "number" && Number.isFinite(value)) index[field] = Math.min(max, Math.max(min, value));
			}
			for (const field of BOOLEAN_FIELDS) {
				const value = source[field];
				if (typeof value === "boolean") result[field] = value;
				else if (value === 0) result[field] = false;
				else if (value === 1) result[field] = true;
			}
			return result;
		}
		//#endregion
		//#region src/client/color.ts
		const HEX_RE = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
		/**
		* Validate a user-typed hex color.
		* @param value - candidate `#rgb` or `#rrggbb` string.
		* @returns whether the value is a valid hex color.
		*/
		function isHexColor(value) {
			return HEX_RE.test(value);
		}
		/**
		* Parse a hex color to rgb channels.
		* @param value - `#rgb` or `#rrggbb` string.
		* @returns the parsed channels.
		*/
		function parseHex(value) {
			const hex = value.slice(1);
			if (hex.length === 3) {
				const first = hex.slice(0, 1);
				return {
					r: parseInt(first + first, 16),
					g: parseInt(hex.slice(1, 2) + hex.slice(1, 2), 16),
					b: parseInt(hex.slice(2, 3) + hex.slice(2, 3), 16)
				};
			}
			return {
				r: parseInt(hex.slice(0, 2), 16),
				g: parseInt(hex.slice(2, 4), 16),
				b: parseInt(hex.slice(4, 6), 16)
			};
		}
		/**
		* Format rgb channels back to a canonical lowercase `#rrggbb` string.
		* @param channels - the rgb channels to format.
		* @returns the hex color string.
		*/
		function formatHex(channels) {
			const to = (channel) => channel.toString(16).padStart(2, "0");
			return `#${to(channels.r)}${to(channels.g)}${to(channels.b)}`;
		}
		/**
		* Mix a color toward a base by weight: `weight = 0` returns the color,
		* `weight = 1` returns the base.
		* @param value - source hex color.
		* @param base - target hex color.
		* @param weight - 0..1 fraction of the base in the result.
		* @returns the mixed hex color.
		*/
		function mixHex(value, base, weight) {
			const from = parseHex(value);
			const to = parseHex(base);
			const channel = (a, b) => Math.round(a + (b - a) * weight);
			return formatHex({
				r: channel(from.r, to.r),
				g: channel(from.g, to.g),
				b: channel(from.b, to.b)
			});
		}
		/**
		* Render a hex color with an alpha channel as an rgba() string.
		* @param value - `#rgb` or `#rrggbb` string.
		* @param alpha - 0..1 opacity.
		* @returns the rgba() CSS color.
		*/
		function withAlpha(value, alpha) {
			const { r, g, b } = parseHex(value);
			return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		}
		const HEX6_RE = /^#[0-9a-fA-F]{6}$/;
		/**
		* Relative luminance of a 6-digit hex color, 0 (black) .. 1 (white), using
		* sRGB weights. Used to keep foreground text readable over user-picked
		* backgrounds.
		* @param value - `#rrggbb` string.
		* @returns the luminance, or 0 for malformed input.
		*/
		function relativeLuminance(value) {
			if (!HEX6_RE.test(value)) return 0;
			const r = parseInt(value.slice(1, 3), 16) / 255;
			const g = parseInt(value.slice(3, 5), 16) / 255;
			const b = parseInt(value.slice(5, 7), 16) / 255;
			const linear = (c) => c <= .03928 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4;
			return .2126 * linear(r) + .7152 * linear(g) + .0722 * linear(b);
		}
		/**
		* Whether a hex color counts as "dark" for the surface-family flip (relative
		* luminance below 0.18).
		* @param value - `#rrggbb` string.
		* @returns whether the color is dark.
		*/
		function isDarkColor(value) {
			return relativeLuminance(value) < .18;
		}
		//#endregion
		//#region src/client/image.ts
		/**
		* Browser-side image reading for the background upload: samples the source
		* brightness, then walks a (max-edge × quality) ladder — shrinking by edge
		* first, then lowering JPEG/WebP quality — until the encoded data URL fits the
		* storage budget. Falls back to the raw file data URL when the browser cannot
		* decode the format.
		*/
		/** Input file size cap (bytes); larger files are refused up front. */
		const MAX_INPUT_BYTES = 5242880;
		/** Storage budget for the persisted data URL (bytes of encoded payload). */
		const MAX_STORED_BYTES = 2097152;
		/** Max-edge ladder: shrink by dimension first. */
		const EDGE_LADDER = [
			1920,
			1280,
			960
		];
		/** Quality ladder walked after each edge step. */
		const QUALITY_LADDER = [
			.82,
			.74,
			.66,
			.58,
			.5
		];
		/** Average-brightness threshold below which an image counts as dark. */
		const IMAGE_DARK_THRESHOLD = .35;
		/** MIME types accepted by the upload controls. */
		const ACCEPTED_IMAGE_TYPES = [
			"image/jpeg",
			"image/png",
			"image/webp",
			"image/gif",
			"image/avif"
		];
		/** Extract a restrained accent color from a persisted wallpaper data URL. */
		async function extractImageAccent(url) {
			const image = await new Promise((resolve, reject) => {
				const element = new Image();
				element.onload = () => {
					resolve(element);
				};
				element.onerror = () => {
					reject(/* @__PURE__ */ new Error("image decode failed"));
				};
				element.src = url;
			});
			const size = 32;
			const canvas = document.createElement("canvas");
			canvas.width = size;
			canvas.height = size;
			const context = canvas.getContext("2d");
			if (context === null) throw new Error("canvas unavailable");
			context.drawImage(image, 0, 0, size, size);
			const data = context.getImageData(0, 0, size, size).data;
			let red = 0;
			let green = 0;
			let blue = 0;
			let weightSum = 0;
			for (let index = 0; index < data.length; index += 4) {
				const alpha = data[index + 3] / 255;
				if (alpha < .4) continue;
				const r = data[index];
				const g = data[index + 1];
				const b = data[index + 2];
				const max = Math.max(r, g, b);
				const min = Math.min(r, g, b);
				const lightness = (max + min) / 510;
				const saturation = max === min ? 0 : (max - min) / (255 - Math.abs(max + min - 255));
				if (lightness < .12 || lightness > .92) continue;
				const weight = alpha * (.35 + saturation);
				red += r * weight;
				green += g * weight;
				blue += b * weight;
				weightSum += weight;
			}
			if (weightSum === 0) return "#e9709a";
			const channel = (value) => Math.round(value / weightSum).toString(16).padStart(2, "0");
			return `#${channel(red)}${channel(green)}${channel(blue)}`;
		}
		/**
		* Fit a bitmap so its longest edge is at most `maxEdge`, preserving aspect.
		* @param width - source width.
		* @param height - source height.
		* @param maxEdge - longest-edge bound in px.
		* @returns the fitted size.
		*/
		function fitWithin(width, height, maxEdge) {
			const safe = (v) => Number.isFinite(v) && v > 0 ? Math.round(v) : 1;
			if (!Number.isFinite(width) || !Number.isFinite(height) || !Number.isFinite(maxEdge) || maxEdge <= 0) return {
				width: safe(width),
				height: safe(height)
			};
			if (width <= 0 || height <= 0) return {
				width: safe(width),
				height: safe(height)
			};
			const scale = Math.min(1, maxEdge / Math.max(width, height));
			return {
				width: Math.round(width * scale),
				height: Math.round(height * scale)
			};
		}
		/**
		* Estimate the encoded payload bytes of a data URL from its length (base64).
		* @param dataUrl - the data URL.
		* @returns estimated bytes.
		*/
		function estimateDataUrlBytes(dataUrl) {
			const comma = dataUrl.indexOf(",");
			if (comma === -1) return 0;
			return Math.floor((dataUrl.length - comma - 1) * 3 / 4);
		}
		/**
		* Sample the average brightness of a bitmap on a fixed small grid, so the
		* cost stays constant regardless of file size.
		* @param bmp - the decoded source bitmap.
		* @returns true when the average perceived luminance is below the dark threshold.
		*/
		function sampleImageDarkness(bmp) {
			const grid = 24;
			const canvas = document.createElement("canvas");
			canvas.width = grid;
			canvas.height = grid;
			const context = canvas.getContext("2d");
			if (context === null) return false;
			context.drawImage(bmp, 0, 0, grid, grid);
			let data;
			try {
				data = context.getImageData(0, 0, grid, grid).data;
			} catch (_readbackUnavailable) {
				return false;
			}
			let sum = 0;
			for (let i = 0; i < data.length; i += 4) {
				const r = data[i];
				const g = data[i + 1];
				const b = data[i + 2];
				sum += (.299 * r + .587 * g + .114 * b) / 255;
			}
			return sum / 576 < IMAGE_DARK_THRESHOLD;
		}
		/**
		* Read, sample, and compress an image file into a data URL.
		* @param file - the selected image file.
		* @returns the compressed result, or falls back to the raw bytes.
		*/
		async function readImageFile(file) {
			if (!file.type.startsWith("image/")) throw new Error(`unsupported file type "${file.type}"`);
			if (file.size > 5242880) throw new Error(`image exceeds the ${MAX_INPUT_BYTES / 1024 / 1024}MB input limit`);
			const bitmap = await tryDecode(file);
			if (bitmap === void 0) {
				const raw = await readRawDataUrl(file);
				if (estimateDataUrlBytes(raw) > 2097152) throw new Error(`image exceeds the ${MAX_STORED_BYTES / 1024 / 1024}MB storage budget`);
				return {
					url: raw,
					imageDark: false
				};
			}
			try {
				const imageDark = sampleImageDarkness(bitmap);
				const url = await encodeWithinBudget(bitmap, file.type === "image/png");
				if (url === void 0) throw new Error(`compressed image still exceeds the ${MAX_STORED_BYTES / 1024 / 1024}MB storage budget`);
				return {
					url,
					imageDark
				};
			} catch (_encodeUnavailable) {
				return {
					url: await readRawDataUrl(file),
					imageDark: false
				};
			} finally {
				bitmap.close();
			}
		}
		/** Decode the file to a bitmap, or undefined when the format is unsupported. */
		async function tryDecode(file) {
			try {
				return await createImageBitmap(file);
			} catch (_unsupportedImageFormat) {
				return;
			}
		}
		/**
		* Walk the edge ladder, then the quality ladder, until an encode fits the
		* storage budget. WebP is preferred (smaller); browsers without WebP encode
		* fall back to JPEG at the same size and quality.
		* @param bitmap - decoded source.
		* @param keepAlpha - whether to keep a transparent channel (PNG).
		* @returns the first data URL within budget, or undefined when none fits.
		*/
		async function encodeWithinBudget(bitmap, keepAlpha) {
			for (const edge of EDGE_LADDER) {
				const size = fitWithin(bitmap.width, bitmap.height, edge);
				const canvas = document.createElement("canvas");
				canvas.width = size.width;
				canvas.height = size.height;
				const ctx = canvas.getContext("2d");
				if (ctx === null) continue;
				ctx.drawImage(bitmap, 0, 0, size.width, size.height);
				for (const quality of QUALITY_LADDER) {
					const url = encodeDataUrl(canvas, keepAlpha, quality);
					if (estimateDataUrlBytes(url) <= 2097152) return url;
				}
			}
		}
		/**
		* Encode a canvas to a data URL: PNG keeps alpha; everything else tries WebP
		* first and falls back to JPEG. Both encode synchronously, so the byte budget
		* check can walk the ladder without waiting.
		*/
		function encodeDataUrl(canvas, keepAlpha, quality) {
			if (keepAlpha) return canvas.toDataURL("image/png");
			const webp = canvas.toDataURL("image/webp", quality);
			if (webp.startsWith("data:image/webp")) return webp;
			return canvas.toDataURL("image/jpeg", quality);
		}
		/** Fallback: hand back the original file bytes when decoding is impossible. */
		function readRawDataUrl(file) {
			if (file.size > 2097152) return Promise.reject(/* @__PURE__ */ new Error(`image too large (${file.size} bytes) to persist without re-encoding`));
			return new Promise((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => {
					resolve(reader.result);
				};
				reader.onerror = () => {
					reject(/* @__PURE__ */ new Error("image read failed"));
				};
				reader.readAsDataURL(file);
			});
		}
		//#endregion
		//#region src/client/video-store.ts
		/**
		* IndexedDB-backed storage for background videos. Videos are too large for
		* localStorage, so the settings section only carries the record key; the
		* blob lives here and is streamed into the background layer on demand.
		*/
		/** Database identity. */
		const DB_NAME = "dsh-nini-appearance";
		/** Object store holding background video blobs keyed by record id. */
		const STORE_NAME = "videos";
		/** Version bump when the record shape changes. */
		const DB_VERSION = 1;
		/** Video upload cap (bytes); larger files are refused up front. */
		const MAX_VIDEO_BYTES = 20971520;
		/** MIME types accepted by the video upload control. */
		const ACCEPTED_VIDEO_TYPES = [
			"video/mp4",
			"video/webm",
			"video/ogg"
		];
		/** Open (and create) the database, resolving once it is ready. */
		function openDb() {
			return new Promise((resolve, reject) => {
				const request = indexedDB.open(DB_NAME, DB_VERSION);
				request.onupgradeneeded = () => {
					if (!request.result.objectStoreNames.contains(STORE_NAME)) request.result.createObjectStore(STORE_NAME);
				};
				request.onsuccess = () => {
					resolve(request.result);
				};
				request.onerror = () => {
					reject(request.error ?? /* @__PURE__ */ new Error("indexeddb open failed"));
				};
			});
		}
		/** Wrap one IDB transaction in a promise, resolving after the transaction commits. */
		function run(mode, action) {
			return new Promise((resolve, reject) => {
				openDb().then((db) => {
					const transaction = db.transaction(STORE_NAME, mode);
					const request = action(transaction.objectStore(STORE_NAME));
					let result;
					request.onsuccess = () => {
						result = request.result;
					};
					request.onerror = () => {
						reject(request.error ?? /* @__PURE__ */ new Error("indexeddb request failed"));
					};
					transaction.oncomplete = () => {
						db.close();
						resolve(result);
					};
					transaction.onerror = () => {
						reject(transaction.error ?? /* @__PURE__ */ new Error("indexeddb transaction failed"));
					};
				}, reject);
			});
		}
		/**
		* Store a video blob and return its record key.
		* @param blob - the video payload.
		* @param name - original file name.
		* @returns the record key to persist in the settings section.
		*/
		async function saveVideo(blob, name) {
			if (blob.size > 20971520) throw new Error(`video exceeds the ${MAX_VIDEO_BYTES / 1024 / 1024}MB limit`);
			const key = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
			const record = {
				data: await blob.arrayBuffer(),
				type: blob.type,
				name
			};
			await run("readwrite", (store) => store.put(record, key));
			return key;
		}
		/**
		* Load a stored video by key, materialized back into a Blob.
		* @param key - record key from the settings section.
		* @returns the video blob, or undefined when absent.
		*/
		async function getVideo(key) {
			const record = await run("readonly", (store) => store.get(key));
			if (record === void 0) return void 0;
			return new Blob([record.data], { type: record.type });
		}
		/**
		* Delete a stored video by key.
		* @param key - record key to remove.
		* @returns settlement of the delete transaction.
		*/
		function deleteVideo(key) {
			return run("readwrite", (store) => store.delete(key));
		}
		//#endregion
		//#region src/client/url-load.ts
		/**
		* Loading background media from a remote URL: fetch the resource, then feed
		* it through the same image/video pipelines as local uploads (compression,
		* darkness sampling, IndexedDB storage). CORS-unfriendly hosts are reported
		* as a distinct user-facing error instead of a silent failure.
		*/
		/** Video extensions the URL classifier recognizes. */
		const VIDEO_EXT = /\.(mp4|webm|ogg|mov|m4v)([?#]|$)/i;
		/** A remote-load failure carrying a user-facing code. */
		var UrlLoadFailure = class extends Error {
			/** The user-facing failure code. */
			code;
			constructor(code) {
				super(code);
				this.code = code;
			}
		};
		/**
		* Guess the media kind from the URL. Extension-based; unknown extensions
		* default to image (a wrong guess surfaces as a type error after fetch).
		* @param url - the remote URL.
		* @returns the guessed kind.
		*/
		function classifyUrl(url) {
			return VIDEO_EXT.test(url) ? "video" : "image";
		}
		/**
		* Fetch a remote resource as a blob, mapping failures to user-facing codes.
		* @param url - the remote URL.
		* @returns the fetched blob.
		* @throws UrlLoadFailure with a 'cors', 'http' or 'network' code.
		*/
		async function fetchBlob(url) {
			let response;
			try {
				response = await fetch(url, { mode: "cors" });
			} catch {
				throw new UrlLoadFailure("cors");
			}
			if (!response.ok) throw new UrlLoadFailure("http");
			let blob;
			try {
				blob = await response.blob();
			} catch {
				throw new UrlLoadFailure("network");
			}
			if (blob.size === 0) throw new UrlLoadFailure("network");
			return blob;
		}
		/** Derive a display name from the URL path. */
		function urlToName(url) {
			try {
				const name = new URL(url).pathname.split("/").pop();
				return name !== void 0 && name !== "" ? name : "background";
			} catch {
				return "background";
			}
		}
		/** Fallback MIME per guessed kind when the server omits Content-Type. */
		function mimeFor(kind) {
			return kind === "video" ? "video/mp4" : "image/jpeg";
		}
		/**
		* Load an image from a URL through the compression pipeline.
		* @param url - the remote image URL.
		* @returns the compressed result (data URL + darkness flag).
		* @throws UrlLoadFailure with a 'type' or 'size' code past the fetch stage.
		*/
		async function loadImageFromUrl(url) {
			const kind = classifyUrl(url);
			const blob = await fetchBlob(url);
			const type = blob.type === "" ? mimeFor(kind) : blob.type;
			if (!type.startsWith("image/")) throw new UrlLoadFailure("type");
			if (blob.size > 5242880) throw new UrlLoadFailure("size");
			return readImageFile(new File([blob], urlToName(url), { type }));
		}
		/**
		* Load a video from a URL into a File ready for the IndexedDB store.
		* @param url - the remote video URL.
		* @returns the video file.
		* @throws UrlLoadFailure with a 'type' or 'size' code past the fetch stage.
		*/
		async function loadVideoFromUrl(url) {
			const kind = classifyUrl(url);
			const blob = await fetchBlob(url);
			const type = blob.type === "" ? mimeFor(kind) : blob.type;
			if (!type.startsWith("video/")) throw new UrlLoadFailure("type");
			if (blob.size > 20971520) throw new UrlLoadFailure("size");
			return new File([blob], urlToName(url), { type });
		}
		//#endregion
		//#region src/client/color-scheme.ts
		/**
		* Color scheme export/import: a portable JSON carrier for the eight color
		* roles. Pure functions — no DOM, no storage — so the format is unit-testable
		* and shared by the settings row.
		*/
		/** Current scheme format version. */
		const SCHEME_VERSION = 1;
		/**
		* Serialize the current color roles into the portable scheme JSON.
		* @param settings - current appearance settings.
		* @returns the scheme JSON string.
		*/
		function exportColorScheme(settings) {
			const colors = {};
			for (const role of APPEARANCE_ROLES) colors[role] = settings[role];
			return JSON.stringify({
				version: SCHEME_VERSION,
				colors
			}, null, 2);
		}
		/**
		* Parse and validate an imported scheme JSON.
		* @param json - the pasted scheme text.
		* @returns the validated role colors, or throws with a descriptive message.
		*/
		function parseColorScheme(json) {
			let raw;
			try {
				raw = JSON.parse(json);
			} catch {
				throw new Error("not valid JSON");
			}
			if (typeof raw !== "object" || raw === null || Array.isArray(raw)) throw new Error("scheme root must be an object");
			const colors = raw.colors;
			if (typeof colors !== "object" || colors === null || Array.isArray(colors)) throw new Error("scheme.colors must be an object");
			const result = {};
			for (const [role, value] of Object.entries(colors)) {
				if (!APPEARANCE_ROLES.includes(role)) continue;
				if (value !== "" && !(typeof value === "string" && isHexColor(value))) throw new Error(`role "${role}" has an invalid color: ${JSON.stringify(value)}`);
				result[role] = value;
			}
			return result;
		}
		//#endregion
		//#region src/client/tokens.ts
		/** Override-layer source name pinned to this package (also names inspection). */
		const OVERRIDE_SOURCE = "dsh-nini-appearance";
		/** Mode base a derived step mixes toward: light mixes toward white. */
		const LIGHT_BASE = "#ffffff";
		/** Mode base a derived step mixes toward: dark mixes toward near-black. */
		const DARK_BASE = "#151517";
		/**
		* Stock surface colors per mode (design-platform.css alias tokens, resolved
		* to their static steps). The translucent pass bakes these into rgba() when
		* no role color or dark-flip value applies; keep in sync with the theme
		* package's design-platform.css.
		*/
		const DEFAULT_SURFACE_COLORS = {
			"--dsw-alias-bg-base": {
				light: "#ffffff",
				dark: "#151517"
			},
			"--dsw-alias-bg-layer-1": {
				light: "#ffffff",
				dark: "#232324"
			},
			"--dsw-alias-bg-layer-2": {
				light: "#ffffff",
				dark: "#2c2c2e"
			},
			"--dsw-alias-bg-layer-3": {
				light: "#ffffff",
				dark: "#353638"
			},
			"--dsw-alias-bg-overlay": {
				light: "#e9ecf2",
				dark: "#61666b"
			},
			"--dsw-alias-bg-module-platform": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-bg-multi-select": {
				light: "#f5f6f7",
				dark: "#2c2c2e"
			},
			"--dsw-specific-sidebar-fill": {
				light: "#f9fafb",
				dark: "#1b1b1c"
			},
			"--dsw-specific-input-major": {
				light: "#ffffff",
				dark: "#2c2c2e"
			},
			"--dsw-specific-bubble-highlight": {
				light: "#d3e2ff",
				dark: "#43454a"
			},
			"--dsw-specific-bubble": {
				light: "#edf3fe",
				dark: "#2c2c2e"
			},
			"--dsw-specific-sidebar-nav-item-active": {
				light: "#ebeef2",
				dark: "#43454a"
			},
			"--dsw-specific-sidebar-nav-item-hover": {
				light: "#f1f3f5",
				dark: "#2c2c2e"
			},
			"--dsw-specific-menu": {
				light: "#ffffff",
				dark: "#353638"
			},
			"--dsw-specific-selector": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-fill-l2": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-interactive-bg-hover-solid": {
				light: "#f1f3f5",
				dark: "#353638"
			},
			"--dsw-specific-tip": {
				light: "#f5f6f7",
				dark: "#353638"
			},
			"--dsw-alias-markdown-inline-code": {
				light: "#ebeef2",
				dark: "#2c2c2e"
			},
			"--dsw-alias-markdown-code-block": {
				light: "#f9fafb",
				dark: "#1b1b1c"
			},
			"--dsw-alias-markdown-code-block-banner": {
				light: "#f9fafb",
				dark: "#2c2c2e"
			},
			"--dsw-alias-button-elevated-fill": {
				light: "#ffffff",
				dark: "#43454a"
			},
			"--dsw-alias-button-floating-fill": {
				light: "#ffffff",
				dark: "#2c2c2e"
			},
			"--dsw-alias-button-floating-hover": {
				light: "#f1f3f5",
				dark: "#353638"
			},
			"--dsw-alias-button-primary-fill": {
				light: "#0f1115",
				dark: "#f9fafb"
			},
			"--dsw-alias-button-info-fill": {
				light: "#4176e6",
				dark: "#679efe"
			}
		};
		/**
		* Compute the full override layer for one settings snapshot. Every role with
		* a non-empty color contributes its token group; a surfaceAlpha below 1 turns
		* the major surface tokens translucent. Returns an empty object when nothing
		* is customized, which removes the override layer entirely.
		* @param settings - current appearance settings.
		* @returns token-name → per-mode value pairs.
		*/
		function buildTokenOverrides(settings) {
			const tokens = {};
			const emit = (name, light, dark) => {
				tokens[name] = {
					light,
					dark
				};
			};
			const modePair = (value) => [value, value];
			const step = (value, weight) => [mixHex(value, LIGHT_BASE, weight), mixHex(value, DARK_BASE, weight)];
			const { accent, background, panel, input, text, border, backgroundImage, imageDark, surfaceAlpha, sidebarOpaque, emphasisAlpha } = settings;
			if (accent !== "") {
				const [light, dark] = modePair(accent);
				emit("--dsw-alias-brand-primary", light, dark);
				emit("--dsw-alias-state-business-primary", light, dark);
				emit("--dsw-alias-button-info-fill", light, dark);
				const [hoverLight, hoverDark] = step(accent, .15);
				emit("--dsw-alias-button-info-hover", hoverLight, hoverDark);
				const [primaryHoverLight, primaryHoverDark] = step(accent, .22);
				emit("--dsw-alias-button-primary-hover", primaryHoverLight, primaryHoverDark);
				emit("--dsw-specific-bubble", light, dark);
				emit("--dsw-specific-bubble-highlight", light, dark);
			}
			if (background !== "") {
				const [light, dark] = modePair(background);
				emit("--dsw-alias-bg-base", light, dark);
				const [l1l, l1d] = step(background, .04);
				emit("--dsw-alias-bg-layer-1", l1l, l1d);
				const [l2l, l2d] = step(background, .08);
				emit("--dsw-alias-bg-layer-2", l2l, l2d);
				const [l3l, l3d] = step(background, .14);
				emit("--dsw-alias-bg-layer-3", l3l, l3d);
				const [modl, modd] = step(background, .06);
				emit("--dsw-alias-bg-module-platform", modl, modd);
				const [ovl, ovd] = step(background, .18);
				emit("--dsw-alias-bg-overlay", ovl, ovd);
				if (panel === "") {
					const [sideL, sideD] = step(background, .05);
					emit("--dsw-specific-sidebar-fill", sideL, sideD);
				}
			}
			if (panel !== "") {
				const [light, dark] = modePair(panel);
				emit("--dsw-alias-bg-layer-1", light, dark);
				const [l2l, l2d] = step(panel, .08);
				emit("--dsw-alias-bg-layer-2", l2l, l2d);
				const [l3l, l3d] = step(panel, .14);
				emit("--dsw-alias-bg-layer-3", l3l, l3d);
				const [ovl, ovd] = step(panel, .1);
				emit("--dsw-alias-bg-overlay", ovl, ovd);
				const [modl, modd] = step(panel, .06);
				emit("--dsw-alias-bg-module-platform", modl, modd);
				const [sideL, sideD] = step(panel, .04);
				emit("--dsw-specific-sidebar-fill", sideL, sideD);
			}
			if (input !== "") {
				const [light, dark] = modePair(input);
				emit("--dsw-specific-input-major", light, dark);
				const [loginL, loginD] = step(input, .06);
				emit("--dsw-specific-login-input", loginL, loginD);
			}
			if (text !== "") {
				const [light, dark] = modePair(text);
				emit("--dsw-alias-label-primary", light, dark);
				const [secL, secD] = step(text, .38);
				emit("--dsw-alias-label-secondary", secL, secD);
				const [terL, terD] = step(text, .58);
				emit("--dsw-alias-label-tertiary", terL, terD);
			}
			if (border !== "") {
				const [light, dark] = modePair(border);
				emit("--dsw-alias-border-l1", light, dark);
				emit("--dsw-alias-border-l2", light, dark);
				const [l3l, l3d] = step(border, .3);
				emit("--dsw-alias-border-l3", l3l, l3d);
			}
			if (backgroundImage !== "") emit("--dsw-alias-bg-base", "transparent", "transparent");
			const flipBase = backgroundImage !== "" ? imageDark ? "#151517" : void 0 : background !== "" && isDarkColor(background) ? background : void 0;
			let flipLayer1;
			let flipLayer2;
			let flipSidebar;
			let flipButtonElevated;
			let flipButtonFloating;
			let flipButtonFloatingHover;
			if (flipBase !== void 0) {
				flipLayer1 = mixHex(flipBase, LIGHT_BASE, .06);
				flipLayer2 = mixHex(flipBase, LIGHT_BASE, .12);
				flipSidebar = mixHex(flipBase, LIGHT_BASE, .03);
				flipButtonElevated = "rgb(67, 69, 74)";
				flipButtonFloating = "rgb(44, 44, 46)";
				flipButtonFloatingHover = "rgb(53, 54, 56)";
				emit("--dsw-alias-bg-layer-1", flipLayer1, flipLayer1);
				emit("--dsw-alias-bg-layer-2", flipLayer2, flipLayer2);
				emit("--dsw-specific-sidebar-fill", flipSidebar, flipSidebar);
				if (text === "") {
					emit("--dsw-alias-label-primary", "#fafaf9", "#fafaf9");
					emit("--dsw-alias-label-secondary", "#d6d3d1", "#d6d3d1");
				}
				emit("--dsw-alias-button-elevated-fill", flipButtonElevated, flipButtonElevated);
				emit("--dsw-alias-button-floating-fill", flipButtonFloating, flipButtonFloating);
				emit("--dsw-alias-button-floating-hover", flipButtonFloatingHover, flipButtonFloatingHover);
			}
			if (surfaceAlpha < 1) {
				const alpha = surfaceAlpha;
				const translucent = (token, explicit, flip) => {
					if (explicit === "transparent") {
						emit(token, "transparent", "transparent");
						return;
					}
					const base = explicit !== void 0 && explicit !== "" ? {
						light: explicit,
						dark: explicit
					} : flip !== void 0 ? {
						light: flip,
						dark: flip
					} : DEFAULT_SURFACE_COLORS[token] ?? {
						light: LIGHT_BASE,
						dark: DARK_BASE
					};
					emit(token, withAlpha(base.light, alpha), withAlpha(base.dark, alpha));
				};
				translucent("--dsw-alias-bg-base", backgroundImage !== "" ? "transparent" : background, void 0);
				translucent("--dsw-alias-bg-layer-1", panel, flipLayer1);
				translucent("--dsw-alias-bg-layer-2", panel !== "" ? mixHex(panel, LIGHT_BASE, .08) : void 0, flipLayer2);
				translucent("--dsw-alias-bg-layer-3", void 0, void 0);
				translucent("--dsw-alias-bg-overlay", void 0, void 0);
				translucent("--dsw-alias-bg-module-platform", void 0, void 0);
				translucent("--dsw-alias-bg-multi-select", void 0, void 0);
				if (!sidebarOpaque) translucent("--dsw-specific-sidebar-fill", panel ?? background, flipSidebar);
				translucent("--dsw-specific-input-major", input, void 0);
				translucent("--dsw-specific-bubble", accent, void 0);
				translucent("--dsw-specific-bubble-highlight", accent, void 0);
				translucent("--dsw-specific-sidebar-nav-item-active", void 0, void 0);
				translucent("--dsw-specific-sidebar-nav-item-hover", void 0, void 0);
				translucent("--dsw-specific-menu", void 0, void 0);
				translucent("--dsw-specific-selector", void 0, void 0);
				translucent("--dsw-alias-fill-l2", void 0, void 0);
				translucent("--dsw-alias-interactive-bg-hover-solid", void 0, void 0);
				translucent("--dsw-specific-tip", void 0, void 0);
				const inlineCodeBase = accent !== "" && accent !== void 0 ? accent : "#4176e6";
				const inlineCodeBaseDark = accent !== "" && accent !== void 0 ? accent : "#679efe";
				emit("--dsw-alias-markdown-inline-code", withAlpha(inlineCodeBase, emphasisAlpha), withAlpha(inlineCodeBaseDark, emphasisAlpha));
				translucent("--dsw-alias-markdown-code-block", void 0, void 0);
				translucent("--dsw-alias-markdown-code-block-banner", void 0, void 0);
				translucent("--dsw-alias-button-elevated-fill", void 0, flipButtonElevated);
				translucent("--dsw-alias-button-floating-fill", void 0, flipButtonFloating);
				translucent("--dsw-alias-button-floating-hover", void 0, flipButtonFloatingHover);
				translucent("--dsw-alias-button-primary-fill", accent, void 0);
				translucent("--dsw-alias-button-info-fill", accent, void 0);
			}
			return tokens;
		}
		/** The shipped presets; `default` clears every role color. */
		const APPEARANCE_PRESETS = [
			{
				id: "default",
				colors: {}
			},
			{
				id: "niniPink",
				colors: {
					accent: "#e9709a",
					background: "#fff8fb",
					panel: "#fffdfd",
					input: "#fff8fa",
					text: "#46373d",
					border: "#f1dce4"
				}
			},
			{
				id: "niniMint",
				colors: {
					accent: "#58aa91",
					background: "#f7fcfa",
					panel: "#ffffff",
					input: "#f5fbf8",
					text: "#33433e",
					border: "#d8ebe4"
				}
			},
			{
				id: "midnight",
				colors: {
					accent: "#7c9cff",
					background: "#1b1e2c",
					panel: "#232737",
					input: "#202435",
					text: "#e6e9f4",
					border: "#343a52"
				}
			},
			{
				id: "ocean",
				colors: {
					accent: "#4fc3f7",
					background: "#0c2231",
					panel: "#12303f",
					input: "#0f2a38",
					text: "#e1f1fa",
					border: "#1e455c"
				}
			},
			{
				id: "forest",
				colors: {
					accent: "#81c784",
					background: "#12241b",
					panel: "#183026",
					input: "#152b21",
					text: "#e7f0ea",
					border: "#2b4637"
				}
			},
			{
				id: "rose",
				colors: {
					accent: "#f48fb1",
					background: "#291a21",
					panel: "#36232d",
					input: "#2e1f27",
					text: "#f7e9ee",
					border: "#4a3340"
				}
			},
			{
				id: "monochrome",
				colors: {
					accent: "#b4b4b9",
					background: "#17171a",
					panel: "#202025",
					input: "#1c1c20",
					text: "#eeeef0",
					border: "#333338"
				}
			}
		];
		//#endregion
		//#region \0dsh-css:C:\Users\28150\Desktop\lyfy\dsh-nini-appearance\src\client\AppearanceCustomizerRow.module.css.mjs
		const css = "._1WEQQa_group{border-bottom:1px solid var(--dsw-alias-border-l2);padding:16px 0}._1WEQQa_body{flex-direction:column;gap:18px;padding:14px 0 4px;display:flex}._1WEQQa_section{flex-direction:column;gap:10px;display:flex}._1WEQQa_sectionTitle{color:var(--dsw-alias-label-secondary);font-size:13px;font-weight:500;line-height:20px}._1WEQQa_chipRow{flex-wrap:wrap;gap:8px;display:flex}._1WEQQa_chip{border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:999px;padding:5px 12px;font-size:13px;line-height:20px}._1WEQQa_chip:hover:not(._1WEQQa_chipSelected){background:var(--dsw-alias-interactive-bg-hover)}._1WEQQa_chipSelected{background:var(--dsw-alias-bg-module-platform);border-color:var(--dsw-static-neutral-bluish-400)}._1WEQQa_colorGrid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:10px 16px;display:grid}._1WEQQa_colorField{align-items:center;gap:8px;min-width:0;display:flex}._1WEQQa_colorLabel{min-width:0;color:var(--dsw-alias-label-primary);text-overflow:ellipsis;white-space:nowrap;flex:1;font-size:13px;line-height:20px;overflow:hidden}._1WEQQa_colorSwatch{border:1px solid var(--dsw-alias-border-l2);cursor:pointer;background:0 0;border-radius:6px;flex:none;width:26px;height:26px;padding:0}._1WEQQa_colorHex{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-input-major);width:66px;color:var(--dsw-alias-label-primary);font:inherit;text-transform:lowercase;border-radius:6px;flex:none;padding:4px 8px;font-size:12px;line-height:18px}._1WEQQa_uploadRow{flex-wrap:wrap;align-items:center;gap:10px;display:flex}._1WEQQa_fileInput{display:none}._1WEQQa_urlRow{align-items:center;gap:10px;margin-top:10px;display:flex}._1WEQQa_urlInput{border:1px solid var(--dsw-alias-border-l2);min-width:0;font:inherit;color:var(--dsw-alias-label-primary);background:0 0;border-radius:8px;flex:1;padding:5px 10px;font-size:13px;line-height:20px}._1WEQQa_urlInput::placeholder{color:var(--dsw-alias-label-tertiary)}._1WEQQa_urlInput:focus-visible{outline:2px solid var(--dsw-alias-state-business-primary);outline-offset:-1px}._1WEQQa_thumb{border:1px solid var(--dsw-alias-border-l2);object-fit:cover;border-radius:6px;flex:none;width:52px;height:32px}._1WEQQa_ghostButton{border:1px solid var(--dsw-alias-border-l2);font:inherit;color:var(--dsw-alias-label-primary);cursor:pointer;background:0 0;border-radius:8px;padding:5px 12px;font-size:13px;line-height:20px}._1WEQQa_ghostButton:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover)}._1WEQQa_ghostButton:disabled{cursor:default;opacity:.55}._1WEQQa_sliderRow{align-items:center;gap:10px;display:flex}._1WEQQa_sliderLabel{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;line-height:20px}._1WEQQa_slider{min-width:96px;height:16px;accent-color:var(--dsw-alias-brand-primary);flex:auto}._1WEQQa_sliderValue{width:44px;color:var(--dsw-alias-label-secondary);font-variant-numeric:tabular-nums;text-align:right;flex:none;font-size:12px;line-height:18px}._1WEQQa_checkRow{cursor:pointer;align-items:center;gap:8px;display:flex}._1WEQQa_checkbox{accent-color:var(--dsw-alias-brand-primary)}._1WEQQa_hint{color:var(--dsw-alias-label-tertiary);font-size:12px;line-height:18px}._1WEQQa_errorHint{color:#c44b6f;font-size:12px;line-height:18px}._1WEQQa_fitRow{align-items:center;gap:10px;display:flex}._1WEQQa_segmented{border:1px solid var(--dsw-alias-border-l2);border-radius:7px;display:inline-flex;overflow:hidden}._1WEQQa_segmentButton{border:0;border-right:1px solid var(--dsw-alias-border-l2);min-width:54px;color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer;background:0 0;padding:4px 10px;font-size:12px;line-height:20px}._1WEQQa_segmentButton:last-child{border-right:0}._1WEQQa_segmentButtonActive{background:color-mix(in srgb, var(--dsw-alias-brand-primary) 14%, transparent);color:var(--dsw-alias-label-primary)}._1WEQQa_footer{justify-content:flex-start;display:flex}._1WEQQa_dragging{outline:1px dashed var(--dsw-alias-border-l3);outline-offset:6px;border-radius:8px}._1WEQQa_schemePanel{flex-direction:column;gap:8px;display:flex}._1WEQQa_schemeInput{box-sizing:border-box;border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-specific-input-major);width:100%;color:var(--dsw-alias-label-primary);font:inherit;resize:vertical;border-radius:6px;padding:8px 10px;font-size:12px;line-height:18px}";
		const tagId = "dsh-nini-appearance/AppearanceCustomizerRow.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-nini-appearance";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var AppearanceCustomizerRow_module_css_default = {
			"sectionTitle": "_1WEQQa_sectionTitle",
			"thumb": "_1WEQQa_thumb",
			"sliderRow": "_1WEQQa_sliderRow",
			"checkbox": "_1WEQQa_checkbox",
			"fitRow": "_1WEQQa_fitRow",
			"section": "_1WEQQa_section",
			"colorSwatch": "_1WEQQa_colorSwatch",
			"colorHex": "_1WEQQa_colorHex",
			"schemeInput": "_1WEQQa_schemeInput",
			"segmentButton": "_1WEQQa_segmentButton",
			"hint": "_1WEQQa_hint",
			"segmented": "_1WEQQa_segmented",
			"slider": "_1WEQQa_slider",
			"schemePanel": "_1WEQQa_schemePanel",
			"colorGrid": "_1WEQQa_colorGrid",
			"sliderValue": "_1WEQQa_sliderValue",
			"group": "_1WEQQa_group",
			"footer": "_1WEQQa_footer",
			"uploadRow": "_1WEQQa_uploadRow",
			"colorField": "_1WEQQa_colorField",
			"chipSelected": "_1WEQQa_chipSelected",
			"colorLabel": "_1WEQQa_colorLabel",
			"errorHint": "_1WEQQa_errorHint",
			"fileInput": "_1WEQQa_fileInput",
			"chipRow": "_1WEQQa_chipRow",
			"dragging": "_1WEQQa_dragging",
			"body": "_1WEQQa_body",
			"ghostButton": "_1WEQQa_ghostButton",
			"urlRow": "_1WEQQa_urlRow",
			"segmentButtonActive": "_1WEQQa_segmentButtonActive",
			"sliderLabel": "_1WEQQa_sliderLabel",
			"chip": "_1WEQQa_chip",
			"urlInput": "_1WEQQa_urlInput",
			"checkRow": "_1WEQQa_checkRow"
		};
		//#endregion
		//#region src/client/AppearanceCustomizerRow.tsx
		/**
		* The Appearance customizer row registered into the General section item slot
		* (below ui-theme's Appearance preference row): preset chips, eight color
		* pickers, the background upload/drop zone with opacity and blur sliders, and
		* the interface transparency / glass sliders. All writes go through the
		* injected face; the scope round-trip reconciles.
		*/
		/** One color field row: native swatch + hex text input. */
		function ColorField(props) {
			const { label, value, onChange } = props;
			const [draft, setDraft] = (0, react.useState)(value);
			(0, react.useEffect)(() => {
				setDraft(value);
			}, [value]);
			const commit = () => {
				const hex = draft.trim();
				if (hex === value) return;
				if (isHexColor(hex)) onChange(hex);
				else setDraft(value);
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
				className: AppearanceCustomizerRow_module_css_default.colorField,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.colorLabel,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "color",
						className: AppearanceCustomizerRow_module_css_default.colorSwatch,
						"aria-label": `${label} (color picker)`,
						value: value === "" ? "#ffffff" : value,
						onChange: (event) => {
							onChange(event.target.value);
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "text",
						className: AppearanceCustomizerRow_module_css_default.colorHex,
						"aria-label": `${label} (hex)`,
						value: draft,
						spellCheck: false,
						onChange: (event) => {
							setDraft(event.target.value);
						},
						onBlur: commit,
						onKeyDown: (event) => {
							if (event.key === "Enter") commit();
						}
					})
				]
			});
		}
		/** One labeled slider with a formatted value readout. */
		function Slider(props) {
			const { label, value, min, max, step, format, onChange } = props;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: AppearanceCustomizerRow_module_css_default.sliderRow,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.sliderLabel,
						children: label
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						type: "range",
						className: AppearanceCustomizerRow_module_css_default.slider,
						"aria-label": label,
						min,
						max,
						step,
						value,
						onChange: (event) => {
							onChange(Number(event.target.value));
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: AppearanceCustomizerRow_module_css_default.sliderValue,
						children: format(value)
					})
				]
			});
		}
		/** Map a remote-load failure code to the localized message key. */
		function urlErrorText(code, t) {
			return t(`background.urlError.${code}`);
		}
		/**
		* Render the appearance customizer row.
		* @param props - composed slot props.
		* @returns the row element tree.
		*/
		function AppearanceCustomizerRow({ t, useStore, set, setImage, setVideo, applyPreset, applyColors, resetAll }) {
			const settings = useStore((s) => s.settings);
			const [open, setOpen] = (0, react.useState)(false);
			const [reading, setReading] = (0, react.useState)(false);
			const [readError, setReadError] = (0, react.useState)(false);
			const [videoReading, setVideoReading] = (0, react.useState)(false);
			const [videoError, setVideoError] = (0, react.useState)(false);
			const [dragging, setDragging] = (0, react.useState)(false);
			const [urlDraft, setUrlDraft] = (0, react.useState)("");
			const [urlReading, setUrlReading] = (0, react.useState)(false);
			const [urlError, setUrlError] = (0, react.useState)(null);
			const [accentReading, setAccentReading] = (0, react.useState)(false);
			const [accentError, setAccentError] = (0, react.useState)(false);
			const [schemeOpen, setSchemeOpen] = (0, react.useState)(false);
			const [schemeDraft, setSchemeDraft] = (0, react.useState)("");
			const [schemeError, setSchemeError] = (0, react.useState)(false);
			const [exported, setExported] = (0, react.useState)(false);
			const fileRef = (0, react.useRef)(null);
			const videoRef = (0, react.useRef)(null);
			const readFile = async (file) => {
				if (file === void 0) return;
				setReading(true);
				setReadError(false);
				try {
					setImage(await readImageFile(file));
				} catch {
					setReadError(true);
				} finally {
					setReading(false);
				}
			};
			const readVideo = async (file) => {
				if (file === void 0) return;
				if (!file.type.startsWith("video/")) {
					setVideoError(true);
					return;
				}
				setVideoReading(true);
				setVideoError(false);
				try {
					const oldKey = settings.backgroundVideo;
					if (oldKey !== "") deleteVideo(oldKey);
					setVideo(await saveVideo(file, file.name));
				} catch {
					setVideoError(true);
				} finally {
					setVideoReading(false);
				}
			};
			const removeVideo = () => {
				if (settings.backgroundVideo !== "") deleteVideo(settings.backgroundVideo);
				setVideo(null);
			};
			const loadFromUrl = async () => {
				const url = urlDraft.trim();
				if (url === "") return;
				setUrlReading(true);
				setUrlError(null);
				try {
					if (classifyUrl(url) === "video") {
						const file = await loadVideoFromUrl(url);
						const oldKey = settings.backgroundVideo;
						if (oldKey !== "") deleteVideo(oldKey);
						setVideo(await saveVideo(file, file.name));
					} else setImage(await loadImageFromUrl(url));
					setUrlDraft("");
				} catch (error) {
					setUrlError(error instanceof UrlLoadFailure ? error.code : "network");
				} finally {
					setUrlReading(false);
				}
			};
			const onPick = (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				readFile(file);
			};
			const onPickVideo = (event) => {
				const file = event.target.files?.[0];
				event.target.value = "";
				readVideo(file);
			};
			const onDrop = (event) => {
				event.preventDefault();
				setDragging(false);
				const file = event.dataTransfer.files?.[0];
				if (file?.type.startsWith("video/")) readVideo(file);
				else readFile(file);
			};
			const changeRole = (role, hex) => {
				set(role, hex.length === 4 ? formatHex(parseHex(hex)) : hex.toLowerCase());
				set("preset", "custom");
			};
			const doExport = async () => {
				setExported(false);
				try {
					await navigator.clipboard.writeText(exportColorScheme(settings));
					setExported(true);
				} catch {
					setSchemeError(true);
				}
			};
			const doImport = () => {
				setSchemeError(false);
				try {
					applyColors(parseColorScheme(schemeDraft));
					setSchemeOpen(false);
					setSchemeDraft("");
				} catch {
					setSchemeError(true);
				}
			};
			const pickAccentFromBackground = async () => {
				if (settings.backgroundImage === "") return;
				setAccentReading(true);
				setAccentError(false);
				try {
					applyColors({ accent: await extractImageAccent(settings.backgroundImage) });
				} catch {
					setAccentError(true);
				} finally {
					setAccentReading(false);
				}
			};
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: AppearanceCustomizerRow_module_css_default.group,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.DisclosureRow, {
					icon: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.IconPersonalizationOutline16, {}),
					title: t("row.title"),
					open,
					expandable: true,
					expandOnRowClick: true,
					onToggle: () => {
						setOpen((value) => !value);
					},
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: AppearanceCustomizerRow_module_css_default.body,
						onClick: (event) => {
							event.stopPropagation();
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.sectionTitle,
									children: t("presets.title")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.chipRow,
									role: "group",
									children: APPEARANCE_PRESETS.map((preset) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
										type: "button",
										className: clsx(AppearanceCustomizerRow_module_css_default.chip, settings.preset === preset.id && AppearanceCustomizerRow_module_css_default.chipSelected),
										"aria-pressed": settings.preset === preset.id,
										onClick: () => {
											applyPreset(preset.id);
										},
										children: t(`preset.${preset.id}`)
									}, preset.id))
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.sectionTitle,
									children: t("colors.title")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
									className: AppearanceCustomizerRow_module_css_default.colorGrid,
									children: APPEARANCE_ROLES.map((role) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorField, {
										label: t(`color.${role}`),
										value: settings[role],
										onChange: (hex) => {
											changeRole(role, hex);
										}
									}, role))
								})]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: clsx(AppearanceCustomizerRow_module_css_default.section, dragging && AppearanceCustomizerRow_module_css_default.dragging),
								onDragOver: (event) => {
									event.preventDefault();
									setDragging(true);
								},
								onDragLeave: () => {
									setDragging(false);
								},
								onDrop,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("background.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.uploadRow,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												ref: fileRef,
												className: AppearanceCustomizerRow_module_css_default.fileInput,
												type: "file",
												accept: ACCEPTED_IMAGE_TYPES.join(","),
												onChange: onPick
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												disabled: reading,
												onClick: () => {
													fileRef.current?.click();
												},
												children: reading ? t("background.reading") : settings.backgroundImage === "" ? t("background.upload") : t("background.replace")
											}),
											settings.backgroundImage !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, { children: [
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("img", {
													className: AppearanceCustomizerRow_module_css_default.thumb,
													src: settings.backgroundImage,
													alt: ""
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: AppearanceCustomizerRow_module_css_default.ghostButton,
													disabled: accentReading,
													onClick: () => {
														pickAccentFromBackground();
													},
													children: accentReading ? t("background.extracting") : t("background.extractAccent")
												}),
												/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: AppearanceCustomizerRow_module_css_default.ghostButton,
													onClick: () => {
														setImage(null);
													},
													children: t("background.remove")
												})
											] }),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
												ref: videoRef,
												className: AppearanceCustomizerRow_module_css_default.fileInput,
												type: "file",
												accept: ACCEPTED_VIDEO_TYPES.join(","),
												onChange: onPickVideo
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												disabled: videoReading,
												onClick: () => {
													videoRef.current?.click();
												},
												children: videoReading ? t("background.reading") : settings.backgroundVideo !== "" ? t("background.replace") : t("background.videoUpload")
											}),
											settings.backgroundVideo !== "" && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: removeVideo,
												children: t("background.videoRemove")
											})
										]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.urlRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "url",
											className: AppearanceCustomizerRow_module_css_default.urlInput,
											"aria-label": t("background.url"),
											placeholder: t("background.urlPlaceholder"),
											value: urlDraft,
											spellCheck: false,
											onChange: (event) => {
												setUrlDraft(event.target.value);
												setUrlError(null);
											},
											onKeyDown: (event) => {
												if (event.key === "Enter") loadFromUrl();
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: AppearanceCustomizerRow_module_css_default.ghostButton,
											disabled: urlReading || urlDraft.trim() === "",
											onClick: () => {
												loadFromUrl();
											},
											children: urlReading ? t("background.urlLoading") : t("background.urlLoad")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.hint,
										children: urlError !== null ? urlErrorText(urlError, t) : videoError ? t("background.videoError") : settings.backgroundVideo !== "" ? t("background.videoHint") : readError ? t("background.readError") : t("background.dropHint")
									}),
									accentError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.errorHint,
										children: t("background.extractError")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.opacity"),
										value: settings.backgroundOpacity,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("backgroundOpacity", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.blur"),
										value: settings.backgroundBlur,
										min: 0,
										max: 30,
										step: 1,
										format: (value) => `${value}px`,
										onChange: (value) => {
											set("backgroundBlur", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.scrim"),
										value: settings.scrim,
										min: 0,
										max: 1,
										step: .05,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("scrim", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.hint,
										children: t("background.scrimHint")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.fitRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("background.fit")
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
											className: AppearanceCustomizerRow_module_css_default.segmented,
											role: "group",
											"aria-label": t("background.fit"),
											children: [
												"cover",
												"contain",
												"fill"
											].map((fit) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: clsx(AppearanceCustomizerRow_module_css_default.segmentButton, settings.backgroundFit === fit && AppearanceCustomizerRow_module_css_default.segmentButtonActive),
												"aria-pressed": settings.backgroundFit === fit,
												onClick: () => {
													set("backgroundFit", fit);
												},
												children: t(`background.fit.${fit}`)
											}, fit))
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.positionX"),
										value: settings.backgroundPositionX,
										min: 0,
										max: 100,
										step: 1,
										format: (value) => `${value}%`,
										onChange: (value) => {
											set("backgroundPositionX", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("background.positionY"),
										value: settings.backgroundPositionY,
										min: 0,
										max: 100,
										step: 1,
										format: (value) => `${value}%`,
										onChange: (value) => {
											set("backgroundPositionY", value);
										}
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("surface.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.opacity"),
										value: settings.surfaceAlpha,
										min: 0,
										max: 1,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("surfaceAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.emphasis"),
										value: settings.emphasisAlpha,
										min: 0,
										max: EMPHASIS_ALPHA_MAX,
										step: .01,
										format: (value) => `${Math.round(value * 100)}%`,
										onChange: (value) => {
											set("emphasisAlpha", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("label", {
										className: AppearanceCustomizerRow_module_css_default.checkRow,
										children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
											type: "checkbox",
											className: AppearanceCustomizerRow_module_css_default.checkbox,
											checked: settings.sidebarOpaque,
											onChange: (event) => {
												set("sidebarOpaque", event.target.checked);
											}
										}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
											className: AppearanceCustomizerRow_module_css_default.sliderLabel,
											children: t("surface.sidebar")
										})]
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)(Slider, {
										label: t("surface.glass"),
										value: settings.glassBlur,
										min: 0,
										max: 20,
										step: 1,
										format: (value) => `${value}px`,
										onChange: (value) => {
											set("glassBlur", value);
										}
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.hint,
										children: t("surface.hint")
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: AppearanceCustomizerRow_module_css_default.section,
								children: [
									/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: AppearanceCustomizerRow_module_css_default.sectionTitle,
										children: t("scheme.title")
									}),
									/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.uploadRow,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: () => {
													doExport();
												},
												children: t("scheme.export")
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
												type: "button",
												className: AppearanceCustomizerRow_module_css_default.ghostButton,
												onClick: () => {
													setSchemeOpen((value) => !value);
												},
												children: t("scheme.import")
											}),
											exported && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
												className: AppearanceCustomizerRow_module_css_default.hint,
												children: t("scheme.exported")
											})
										]
									}),
									schemeOpen && /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
										className: AppearanceCustomizerRow_module_css_default.schemePanel,
										children: [
											/* @__PURE__ */ (0, react_jsx_runtime.jsx)("textarea", {
												className: AppearanceCustomizerRow_module_css_default.schemeInput,
												"aria-label": t("scheme.import"),
												rows: 4,
												placeholder: t("scheme.importPlaceholder"),
												value: schemeDraft,
												onChange: (event) => {
													setSchemeDraft(event.target.value);
													setSchemeError(false);
												}
											}),
											schemeError && /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
												className: AppearanceCustomizerRow_module_css_default.hint,
												children: t("scheme.invalid")
											}),
											/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
												className: AppearanceCustomizerRow_module_css_default.uploadRow,
												children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: AppearanceCustomizerRow_module_css_default.ghostButton,
													onClick: doImport,
													children: t("scheme.apply")
												}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
													type: "button",
													className: AppearanceCustomizerRow_module_css_default.ghostButton,
													onClick: () => {
														setSchemeOpen(false);
														setSchemeDraft("");
														setSchemeError(false);
													},
													children: t("scheme.cancel")
												})]
											})
										]
									})
								]
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
								className: AppearanceCustomizerRow_module_css_default.footer,
								children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: AppearanceCustomizerRow_module_css_default.ghostButton,
									onClick: resetAll,
									children: t("actions.reset")
								})
							})
						]
					})
				})
			});
		}
		//#endregion
		//#region src/client/settings-store.ts
		/**
		* Appearance row slot store: a mirror of the settings scope section plus
		* optimistic patches from the row's own write path. The apply-world change
		* listener is the authoritative writer; the injected `set` patches first so
		* sliders and pickers feel instant, then the scope round-trip reconciles.
		*/
		/**
		* Declares the Appearance customizer row state and write surface.
		* @returns the store handle.
		*/
		function createAppearanceRowStore() {
			return (0, _deepseek_ai_dsh_client_runtime_client.defineStore)({
				init: () => ({
					settings: { ...DEFAULT_SETTINGS },
					revision: -1
				}),
				actions: {
					sync: (d, settings, revision) => {
						if (revision <= d.revision) return;
						d.settings = { ...settings };
						d.revision = revision;
					},
					patch: (d, partial) => {
						d.settings = {
							...d.settings,
							...partial
						};
					}
				}
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/** `settings.niniAppearance` namespace dictionaries (the customizer row's copy). */
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"row.title": "尼尼外观实验室",
			"presets.title": "预设主题",
			"preset.default": "默认",
			"preset.niniPink": "尼尼浅粉",
			"preset.niniMint": "薄荷清新",
			"preset.midnight": "午夜",
			"preset.ocean": "海洋",
			"preset.forest": "森林",
			"preset.rose": "玫瑰",
			"preset.monochrome": "单色",
			"colors.title": "主题颜色",
			"color.accent": "主色",
			"color.background": "背景色",
			"color.panel": "面板色",
			"color.input": "输入框色",
			"color.text": "文字色",
			"color.border": "边框色",
			"background.title": "背景",
			"background.upload": "上传图片",
			"background.replace": "更换图片",
			"background.remove": "删除图片",
			"background.extractAccent": "从背景取色",
			"background.extracting": "取色中…",
			"background.extractError": "背景取色失败,请手动选择主色",
			"background.reading": "读取中…",
			"background.dropHint": "支持 JPG / PNG / WebP,也可以把图片拖到这里",
			"background.readError": "无法读取该图片,请换一张试试",
			"background.video": "视频背景",
			"background.videoUpload": "上传视频",
			"background.videoRemove": "删除视频",
			"background.videoError": "无法读取该视频,请换一个试试",
			"background.videoHint": "视频自动静音循环播放;与背景图片互斥",
			"background.url": "从 URL 加载背景",
			"background.urlPlaceholder": "粘贴图片或视频 URL",
			"background.urlLoad": "加载",
			"background.urlLoading": "加载中…",
			"background.urlError.network": "无法加载该地址,请检查网络或地址是否正确",
			"background.urlError.cors": "该地址不允许跨域读取(CORS),无法作为背景使用",
			"background.urlError.http": "服务器返回错误状态,无法加载",
			"background.urlError.type": "该地址的内容不是图片或视频",
			"background.urlError.size": "文件超过大小限制(图片 5MB / 视频 20MB)",
			"background.opacity": "背景图片不透明度",
			"background.fit": "背景适配",
			"background.fit.cover": "铺满",
			"background.fit.contain": "完整",
			"background.fit.fill": "拉伸",
			"background.positionX": "水平位置",
			"background.positionY": "垂直位置",
			"background.blur": "背景模糊",
			"background.scrim": "背景遮罩",
			"background.scrimHint": "调高遮罩,背景图片上的文字更易读",
			"surface.title": "界面",
			"surface.opacity": "面板不透明度",
			"surface.emphasis": "强调字浓度",
			"surface.sidebar": "侧边栏保持不透明",
			"surface.glass": "毛玻璃强度",
			"surface.hint": "背景图会显示在主区域;调低面板不透明度可让卡片、侧边栏也透出",
			"scheme.title": "配色方案",
			"scheme.export": "导出配色",
			"scheme.import": "导入配色",
			"scheme.importPlaceholder": "粘贴导出的配色 JSON…",
			"scheme.apply": "应用",
			"scheme.cancel": "取消",
			"scheme.invalid": "配色 JSON 无效,请检查后重试",
			"scheme.exported": "配色已复制到剪贴板",
			"actions.reset": "恢复默认"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"row.title": "Nini Appearance Studio",
			"presets.title": "Presets",
			"preset.default": "Default",
			"preset.niniPink": "Nini Pink",
			"preset.niniMint": "Fresh Mint",
			"preset.midnight": "Midnight",
			"preset.ocean": "Ocean",
			"preset.forest": "Forest",
			"preset.rose": "Rose",
			"preset.monochrome": "Monochrome",
			"colors.title": "Theme colors",
			"color.accent": "Accent",
			"color.background": "Background",
			"color.panel": "Panels",
			"color.input": "Input",
			"color.text": "Text",
			"color.border": "Border",
			"background.title": "Background",
			"background.upload": "Upload image",
			"background.replace": "Replace image",
			"background.remove": "Remove image",
			"background.extractAccent": "Pick color from image",
			"background.extracting": "Picking…",
			"background.extractError": "Could not extract a color; choose the accent manually",
			"background.reading": "Reading…",
			"background.dropHint": "JPG / PNG / WebP — or drop an image here",
			"background.readError": "Could not read this image, try another one",
			"background.video": "Video background",
			"background.videoUpload": "Upload video",
			"background.videoRemove": "Remove video",
			"background.videoError": "Could not read that video, try another one",
			"background.videoHint": "Video plays muted in a loop; exclusive with the image background",
			"background.url": "Load background from URL",
			"background.urlPlaceholder": "Paste an image or video URL",
			"background.urlLoad": "Load",
			"background.urlLoading": "Loading…",
			"background.urlError.network": "Could not load that URL — check the network or the address",
			"background.urlError.cors": "That address does not allow cross-origin reads (CORS)",
			"background.urlError.http": "The server returned an error status",
			"background.urlError.type": "That address is not an image or a video",
			"background.urlError.size": "File exceeds the size limit (images 5MB / videos 20MB)",
			"background.opacity": "Image opacity",
			"background.fit": "Background fit",
			"background.fit.cover": "Cover",
			"background.fit.contain": "Contain",
			"background.fit.fill": "Stretch",
			"background.positionX": "Horizontal position",
			"background.positionY": "Vertical position",
			"background.blur": "Background blur",
			"background.scrim": "Background scrim",
			"background.scrimHint": "Raise the scrim to keep text readable over the image",
			"surface.title": "Interface",
			"surface.opacity": "Panel opacity",
			"surface.emphasis": "Emphasis tint",
			"surface.sidebar": "Keep the sidebar opaque",
			"surface.glass": "Glass blur",
			"surface.hint": "The wallpaper shows in the main area; lower panel opacity to reveal cards and the sidebar",
			"scheme.title": "Color scheme",
			"scheme.export": "Export colors",
			"scheme.import": "Import colors",
			"scheme.importPlaceholder": "Paste an exported color scheme JSON…",
			"scheme.apply": "Apply",
			"scheme.cancel": "Cancel",
			"scheme.invalid": "Invalid color scheme JSON, check and retry",
			"scheme.exported": "Color scheme copied to clipboard",
			"actions.reset": "Reset to default"
		};
		//#endregion
		//#region src/client/applier.ts
		/** Background layer element id (the stylesheet targets it). */
		const BG_LAYER_ID = "dsw-appearance-bg";
		/** Stylesheet element id owned by this plugin. */
		const STYLE_ID = "dsw-appearance-styles";
		/** CSS variables the applier writes on body, consumed by the stylesheet. */
		const BODY_VARIABLES = [
			"--dsw-appearance-bg-image",
			"--dsw-appearance-bg-opacity",
			"--dsw-appearance-bg-fit",
			"--dsw-appearance-bg-position-x",
			"--dsw-appearance-bg-position-y",
			"--dsw-appearance-blur",
			"--dsw-appearance-scrim"
		];
		/**
		* Static sheet: the background layer sits above the body background but below
		* #root (lifted with a minimal stacking context), so surfaces painted with
		* translucent tokens show the image through. `inset: -48px` gives the blur
		* filter room so edges never show transparent bleed.
		*
		* The blur is applied to the LAYER itself (`--dsw-appearance-blur`, the sum
		* of the wallpaper blur and glass sliders), never `backdrop-filter` on
		* #root: a non-none backdrop-filter turns #root into the containing block of
		* every fixed-position descendant (menus, tooltips, toasts), which re-anchors
		* them to #root instead of the viewport. Blurring the wallpaper directly is
		* visually equivalent here — the only thing behind #root is this layer — and
		* leaves fixed positioning alone.
		*
		* The readability scrim rides inside the layer's own background-image stack:
		* a uniform veil whose alpha is `var(--dsw-appearance-scrim)` — the browser
		* re-rasterizes the layer live as the slider moves, no JS wiring needed.
		* The veil hue follows the base theme (white-ish in light mode, near-black in
		* dark mode). Selection and focus rings follow the user's accent through the
		* overridden brand tokens.
		*/
		const SHEET = `
#${BG_LAYER_ID} {
  position: fixed;
  inset: -48px;
  z-index: 0;
  pointer-events: none;
  background-repeat: no-repeat;
  background-position: var(--dsw-appearance-bg-position-x, 50%) var(--dsw-appearance-bg-position-y, 50%);
  background-size: var(--dsw-appearance-bg-fit, cover);
  background-image:
    linear-gradient(rgba(255, 255, 255, var(--dsw-appearance-scrim, 0)) 0%, rgba(255, 255, 255, var(--dsw-appearance-scrim, 0)) 100%),
    var(--dsw-appearance-bg-image, none);
  opacity: var(--dsw-appearance-bg-opacity, 1);
  filter: blur(var(--dsw-appearance-blur, 0px));
}
#${BG_LAYER_ID} video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: var(--dsw-appearance-bg-fit, cover);
  object-position: var(--dsw-appearance-bg-position-x, 50%) var(--dsw-appearance-bg-position-y, 50%);
  display: none;
}
#${BG_LAYER_ID}[data-video] video {
  display: block;
}
#${BG_LAYER_ID}[data-video] {
  background-image: none;
}
body[data-ds-dark-theme] #${BG_LAYER_ID} {
  background-image:
    linear-gradient(rgba(8, 10, 18, var(--dsw-appearance-scrim, 0)) 0%, rgba(8, 10, 18, var(--dsw-appearance-scrim, 0)) 100%),
    var(--dsw-appearance-bg-image, none);
}
#root {
  position: relative;
  z-index: 1;
}
#root ::selection {
  background: var(--dsw-alias-brand-primary);
  color: var(--dsw-alias-label-primary-foreground);
}
#root :focus-visible {
  outline: 2px solid var(--dsw-alias-state-business-primary);
  outline-offset: 2px;
}
`;
		/**
		* Projects one appearance settings snapshot onto the document. Replaces the
		* token override layer on every apply; retracts everything in dispose.
		*/
		var AppearanceApplier = class {
			ctx;
			style;
			layer;
			videoEl;
			videoUrl;
			videoKey = "";
			removeOverrides;
			/**
			* @param ctx - client context providing the theme service.
			*/
			constructor(ctx) {
				this.ctx = ctx;
				this.style = document.createElement("style");
				this.style.id = STYLE_ID;
				this.style.textContent = SHEET;
				document.head.append(this.style);
				this.layer = document.createElement("div");
				this.layer.id = BG_LAYER_ID;
				document.body.prepend(this.layer);
			}
			/**
			* Apply a settings snapshot: rebuild the theme override layer and refresh
			* the body CSS variables. Undefined values (settings not yet loaded) apply
			* the stock defaults, which removes the override layer.
			* @param settings - current appearance settings or undefined while loading.
			*/
			apply(settings) {
				const value = settings ?? DEFAULT_SETTINGS;
				this.removeOverrides?.();
				this.removeOverrides = void 0;
				const tokens = buildTokenOverrides(value);
				if (Object.keys(tokens).length > 0) this.removeOverrides = this.ctx.theme.overrideTokens(OVERRIDE_SOURCE, tokens);
				const body = document.body;
				body.style.setProperty("--dsw-appearance-bg-image", value.backgroundImage === "" ? "none" : `url("${value.backgroundImage}")`);
				body.style.setProperty("--dsw-appearance-bg-opacity", String(value.backgroundOpacity));
				body.style.setProperty("--dsw-appearance-bg-fit", value.backgroundFit);
				body.style.setProperty("--dsw-appearance-bg-position-x", `${value.backgroundPositionX}%`);
				body.style.setProperty("--dsw-appearance-bg-position-y", `${value.backgroundPositionY}%`);
				body.style.setProperty("--dsw-appearance-blur", `${value.backgroundBlur + value.glassBlur}px`);
				body.style.setProperty("--dsw-appearance-scrim", String(value.scrim));
				this.syncVideo(value.backgroundVideo);
			}
			/**
			* Load or clear the background video for a record key. Reuses the element
			* and object URL when the key is unchanged, so repeated applies never
			* re-read IndexedDB.
			* @param key - video record key, or '' to clear.
			*/
			async syncVideo(key) {
				if (key === this.videoKey) return;
				this.videoKey = key;
				this.teardownVideo();
				if (key === "") {
					this.layer.removeAttribute("data-video");
					return;
				}
				const record = await getVideo(key);
				if (record === void 0 || this.videoKey !== key) {
					this.videoKey = "";
					this.layer.removeAttribute("data-video");
					return;
				}
				const video = this.ensureVideo();
				this.videoUrl = URL.createObjectURL(record);
				video.src = this.videoUrl;
				video.play().catch(() => {});
				video.onerror = () => {
					this.videoKey = "";
					this.layer.removeAttribute("data-video");
					this.teardownVideo();
				};
				this.layer.setAttribute("data-video", "");
			}
			/** Create the background video element once. */
			ensureVideo() {
				if (this.videoEl === void 0) {
					const video = document.createElement("video");
					video.muted = true;
					video.loop = true;
					video.playsInline = true;
					video.autoplay = true;
					this.layer.append(video);
					this.videoEl = video;
				}
				return this.videoEl;
			}
			/** Remove the video element and revoke its object URL. */
			teardownVideo() {
				this.videoEl?.remove();
				this.videoEl = void 0;
				if (this.videoUrl !== void 0) {
					URL.revokeObjectURL(this.videoUrl);
					this.videoUrl = void 0;
				}
			}
			/** Retract the override layer, the stylesheet, the layer element, and body variables. */
			dispose() {
				this.removeOverrides?.();
				this.removeOverrides = void 0;
				this.videoKey = "";
				this.teardownVideo();
				this.style.remove();
				this.layer.remove();
				const body = document.body;
				for (const name of BODY_VARIABLES) body.style.removeProperty(name);
			}
		};
		//#endregion
		//#region src/client/index.ts
		/** Namespace owning this feature's settings-row copy. */
		const SETTINGS_NS = "settings.niniAppearance";
		/** Required services: slots/locale for the row, theme for token overrides. */
		const inject = [
			"slots",
			"locale",
			"theme"
		];
		/** localStorage key holding the whole settings section. */
		const STORAGE_KEY = "dsh-nini-appearance.settings";
		/**
		* Read the persisted section, tolerating a missing, corrupt, or out-of-schema
		* entry: parse failures fall back to the stock defaults, and every parsed
		* field is validated against the schema bounds before it reaches the UI.
		* @returns the stored settings, or the stock defaults.
		*/
		function readStoredSettings() {
			try {
				const raw = localStorage.getItem(STORAGE_KEY);
				if (raw === null) return { ...DEFAULT_SETTINGS };
				return sanitizeSettings(JSON.parse(raw));
			} catch (_unreadableStorage) {
				return { ...DEFAULT_SETTINGS };
			}
		}
		/**
		* Client plugin body: load the persisted section, mount the DOM applier, and
		* register the customizer row into the General section.
		* @param ctx - client cordis context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(SETTINGS_NS, {
				zh,
				en
			}), "nini-appearance: settings row dictionaries");
			const store = createAppearanceRowStore();
			let bound;
			let current = readStoredSettings();
			let revision = 0;
			let applier;
			const publish = () => {
				revision += 1;
				bound?.sync(current, revision);
				applier?.apply(current);
			};
			ctx.effect(() => {
				applier = new AppearanceApplier(ctx);
				applier.apply(current);
				return () => {
					applier?.dispose();
					applier = void 0;
				};
			}, "nini-appearance: DOM applier");
			ctx.effect(() => {
				const onStorage = (event) => {
					if (event.key !== null && event.key !== "dsh-nini-appearance.settings") return;
					current = readStoredSettings();
					publish();
				};
				window.addEventListener("storage", onStorage);
				return () => {
					window.removeEventListener("storage", onStorage);
				};
			}, "nini-appearance: storage sync");
			const commit = () => {
				try {
					localStorage.setItem(STORAGE_KEY, JSON.stringify(current));
				} catch (_storageQuota) {}
				publish();
			};
			const set = (field, value) => {
				const patch = { ...current };
				patch[field] = value;
				current = patch;
				commit();
			};
			const setImage = (image) => {
				const patch = { ...current };
				patch.backgroundImage = image?.url ?? "";
				patch.imageDark = image?.imageDark ?? false;
				if (image !== null) patch.backgroundVideo = "";
				current = patch;
				commit();
			};
			const setVideo = (key) => {
				if (key !== null && key !== current.backgroundVideo && current.backgroundVideo !== "") deleteVideo(current.backgroundVideo);
				const patch = { ...current };
				patch.backgroundVideo = key ?? "";
				if (key !== null) {
					patch.backgroundImage = "";
					patch.imageDark = false;
				}
				current = patch;
				commit();
			};
			const applyPreset = (id) => {
				const preset = APPEARANCE_PRESETS.find((candidate) => candidate.id === id);
				if (preset === void 0) return;
				const partial = { preset: id };
				if (id === "default") for (const role of APPEARANCE_ROLES) partial[role] = "";
				else for (const [role, hex] of Object.entries(preset.colors)) {
					if (hex === void 0) continue;
					partial[role] = hex;
				}
				current = {
					...current,
					...partial
				};
				commit();
			};
			const applyColors = (colors) => {
				const entries = Object.entries(colors).filter((entry) => APPEARANCE_ROLES.includes(entry[0]) && entry[1] !== void 0 && entry[1] !== "");
				if (entries.length === 0) return;
				const partial = { preset: "custom" };
				for (const [role, hex] of entries) partial[role] = hex;
				current = {
					...current,
					...partial
				};
				commit();
			};
			const resetAll = () => {
				current = {
					...DEFAULT_SETTINGS,
					preset: "default"
				};
				commit();
			};
			const injected = (actions) => {
				bound = actions;
				publish();
				return {
					set,
					setImage,
					setVideo,
					applyPreset,
					applyColors,
					resetAll
				};
			};
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "nini-appearance-custom",
				order: 20,
				store,
				locale: SETTINGS_NS,
				inject: injected
			}, AppearanceCustomizerRow));
		}
		//#endregion
		exports.SETTINGS_NS = SETTINGS_NS;
		exports.STORAGE_KEY = STORAGE_KEY;
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map