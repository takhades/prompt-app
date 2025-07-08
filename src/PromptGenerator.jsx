import { useState } from "react";

export default function PromptGenerator() {
  const [form, setForm] = useState({
    category: "Food",
    subject: "",
    composition: "Top-down (Flat lay)",
    lighting: "Natural sunlight",
    style: "Hyperrealistic",
    background: "Plain white",
    mood: "Fresh",
    extra: ""
  });
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const generatePrompt = () => {
    const {
      category,
      subject,
      composition,
      lighting,
      style,
      background,
      mood,
      extra
    } = form;

    const result = `${style} ${composition.toLowerCase()} photograph of ${subject}, shot in ${lighting.toLowerCase()} on a ${background.toLowerCase()} background. The image conveys a ${mood.toLowerCase()} mood. ${extra}`.trim();

    setPrompt(result);
    setCopied(false);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  const exportComfyUIFormat = () => {
    const comfyFormat = {
      prompt,
      metadata: {
        model: "sdxl",
        type: "photography",
        category: form.category.toLowerCase()
      }
    };
    const blob = new Blob([JSON.stringify(comfyFormat, null, 2)], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "comfyui_prompt.json";
    link.click();
  };

  const presets = {
    "F&B": {
      composition: "Top-down (Flat lay)",
      lighting: "Natural sunlight",
      style: "Hyperrealistic",
      background: "Rustic wood",
      mood: "Fresh"
    },
    Fashion: {
      composition: "Eye-level",
      lighting: "Studio softbox",
      style: "Editorial",
      background: "Neutral seamless",
      mood: "Elegant"
    }
  };

  const applyPreset = (type) => {
    setForm({ ...form, ...presets[type] });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">🎯 Trình Tạo Prompt AI Cho Nhiếp Ảnh Gia</h1>

      <div className="flex gap-4 justify-center">
        <button className="px-3 py-1 bg-pink-500 text-white rounded" onClick={() => applyPreset("F&B")}>Chọn mẫu F&B</button>
        <button className="px-3 py-1 bg-blue-500 text-white rounded" onClick={() => applyPreset("Fashion")}>Chọn mẫu Thời trang</button>
      </div>

      <div className="grid gap-4">
        <label>
          Danh mục
          <select
            className="w-full p-2 border rounded"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
          >
            {"Food,Product,Fashion,Portrait,Interior".split(",").map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </label>

        <label>
          Mô tả chủ thể
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="ví dụ: ly matcha latte trên khay gỗ"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
          />
        </label>

        <label>
          Góc chụp
          <select
            className="w-full p-2 border rounded"
            value={form.composition}
            onChange={(e) => setForm({ ...form, composition: e.target.value })}
          >
            {"Top-down (Flat lay),Eye-level,Low angle".split(",").map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label>
          Ánh sáng
          <select
            className="w-full p-2 border rounded"
            value={form.lighting}
            onChange={(e) => setForm({ ...form, lighting: e.target.value })}
          >
            {"Natural sunlight,Studio softbox,Dramatic side light".split(",").map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label>
          Phong cách
          <select
            className="w-full p-2 border rounded"
            value={form.style}
            onChange={(e) => setForm({ ...form, style: e.target.value })}
          >
            {"Hyperrealistic,Minimal,Cinematic,Editorial,Vintage".split(",").map((opt) => (
              <option key={opt}>{opt}</option>
            ))}
          </select>
        </label>

        <label>
          Phông nền
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="ví dụ: nền gỗ cũ, vải trắng mềm"
            value={form.background}
            onChange={(e) => setForm({ ...form, background: e.target.value })}
          />
        </label>

        <label>
          Cảm xúc / Tông ảnh
          <input
            className="w-full p-2 border rounded"
            type="text"
            placeholder="ví dụ: ấm cúng, thanh lịch"
            value={form.mood}
            onChange={(e) => setForm({ ...form, mood: e.target.value })}
          />
        </label>

        <label>
          Chi tiết bổ sung (tuỳ chọn)
          <textarea
            className="w-full p-2 border rounded"
            rows={3}
            placeholder="ví dụ: hơi nước bốc lên, giọt nước đọng trên ly"
            value={form.extra}
            onChange={(e) => setForm({ ...form, extra: e.target.value })}
          />
        </label>

        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
          onClick={generatePrompt}
        >
          Tạo Prompt
        </button>
      </div>

      {prompt && (
        <div className="mt-6 border-t pt-4 space-y-2">
          <h2 className="font-semibold">Prompt đã tạo:</h2>
          <p className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{prompt}</p>

          <div className="flex gap-4">
            <button
              className="bg-green-500 text-white px-3 py-1 rounded"
              onClick={copyToClipboard}
            >
              {copied ? "Đã sao chép!" : "Sao chép Prompt"}
            </button>

            <button
              className="bg-gray-700 text-white px-3 py-1 rounded"
              onClick={exportComfyUIFormat}
            >
              Xuất cho ComfyUI
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
