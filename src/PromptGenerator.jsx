import { useState } from "react";

// --- NEW: Dữ liệu cho Scene Builder ---
const scenes = [
  {
    id: "custom",
    name: "Tùy chỉnh (Thủ công)",
    background: "",
    lighting: "Natural sunlight",
    mood: "Fresh"
  },
  {
    id: "minimal_studio",
    name: "Studio Tối Giản",
    background: "Seamless plain white background",
    lighting: "Bright studio softbox light",
    mood: "Clean, elegant, and minimal"
  },
  {
    id: "cozy_kitchen",
    name: "Căn Bếp Ấm Cúng",
    background: "A rustic wooden kitchen table",
    lighting: "Warm, soft window light",
    mood: "Cozy, rustic, and inviting"
  },
  {
    id: "dramatic_moody",
    name: "Sân khấu Kịch tính",
    background: "A dark, textured surface like slate or dark wood",
    lighting: "Dramatic side light creating deep shadows",
    mood: "Moody, intense, and sophisticated"
  },
  {
    id: "outdoor_cafe",
    name: "Quán Cafe Ngoài trời",
    background: "A small marble cafe table, with a blurred street scene behind",
    lighting: "Bright, natural afternoon sunlight",
    mood: "Casual, relaxed, and vibrant"
  }
];

const cameraAngles = [
  { value: "Three-Quarters (45°) view", display: "Góc 3/4 (45°)" },
  { value: "Eye-Level (10°) shot", display: "Ngang tầm mắt (10°)" },
  { value: "Top-Down (90°) shot", display: "Chụp từ trên xuống (90°)" },
  { value: "High Angle (75°) shot", display: "Góc cao (75°)" },
  { value: "Low Angle shot", display: "Góc thấp" },
  { value: "Macro (Extreme Close-Up) shot", display: "Siêu cận cảnh (Macro)" },
  { value: "Dutch Angle shot", display: "Góc nghiêng (Dutch Angle)" },
];

export default function PromptGenerator() {
  const [form, setForm] = useState({
    category: "Food",
    subject: "",
    composition: "Three-Quarters (45°) view",
    lighting: "Natural sunlight",
    style: "Hyperrealistic",
    background: "Plain white",
    mood: "Fresh",
    depthOfField: "Shallow DoF (f/1.8)",
    lens: "50mm",
    focus: "Sharp focus on subject",
    extra: ""
  });
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);
  const [selectedScene, setSelectedScene] = useState("custom"); // --- NEW: State để lưu scene đã chọn

  // --- NEW: Hàm xử lý khi chọn một Scene ---
  const handleSceneChange = (sceneId) => {
    const scene = scenes.find((s) => s.id === sceneId);
    setSelectedScene(sceneId);

    if (scene && scene.id !== "custom") {
      setForm(currentForm => ({
        ...currentForm,
        background: scene.background,
        lighting: scene.lighting,
        mood: scene.mood,
      }));
    }
  };

  const generatePrompt = () => {
    // ... hàm này không thay đổi, giữ nguyên như cũ
    const {
      subject,
      composition,
      lighting,
      style,
      background,
      mood,
      depthOfField,
      lens,
      focus,
      extra
    } = form;

    let mainPrompt = `${style} ${composition.toLowerCase()} photograph of ${subject}, shot in ${lighting.toLowerCase()} on a ${background.toLowerCase()} background. The image should convey a ${mood.toLowerCase()} mood.`;
    let technicalDetails = `Technical details: ${lens} lens, ${depthOfField}, ${focus}.`;
    const result = `${mainPrompt} ${technicalDetails} ${extra}`.trim().replace(/\s+/g, ' ');

    setPrompt(result);
    setCopied(false);
  };

  const copyToClipboard = async () => { /* Giữ nguyên không đổi */ };
  const exportComfyUIFormat = () => { /* Giữ nguyên không đổi */ };
  const presets = { /* Giữ nguyên không đổi */ };
  const applyPreset = (type) => { /* Giữ nguyên không đổi */ };

  const isCustomScene = selectedScene === "custom";

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center">🎯 Trình Tạo Prompt AI Cho Nhiếp Ảnh Gia</h1>
      <div className="flex gap-4 justify-center">{/* Giữ nguyên không đổi */}</div>

      <div className="grid gap-4">
        <label>
          Danh mục
          <select className="w-full p-2 border rounded" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            {"Food,Product,Fashion,Portrait,Interior".split(",").map((cat) => (<option key={cat}>{cat}</option>))}
          </select>
        </label>

        {/* --- NEW: Giao diện Scene Builder --- */}
        <label>
          Chọn Bối cảnh (Tự động điền)
          <select
            className="w-full p-2 border rounded bg-yellow-100"
            value={selectedScene}
            onChange={(e) => handleSceneChange(e.target.value)}
          >
            {scenes.map((scene) => (
              <option key={scene.id} value={scene.id}>
                {scene.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          Mô tả chủ thể
          <input className="w-full p-2 border rounded" type="text" placeholder="ví dụ: ly matcha latte trên khay gỗ" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}/>
        </label>

        <label>
          Góc chụp
          <select className="w-full p-2 border rounded" value={form.composition} onChange={(e) => setForm({ ...form, composition: e.target.value })}>
            {cameraAngles.map((angle) => (<option key={angle.value} value={angle.value}>{angle.display}</option>))}
          </select>
        </label>

        {/* --- CHANGE: Các trường dưới đây sẽ bị vô hiệu hóa nếu không chọn "Tùy chỉnh" --- */}
        <label>
          Ánh sáng
          <input className={`w-full p-2 border rounded ${!isCustomScene ? 'bg-gray-200' : ''}`} type="text" value={form.lighting} onChange={(e) => setForm({ ...form, lighting: e.target.value })} disabled={!isCustomScene}/>
        </label>

        <label>
          Phong cách
          <select className="w-full p-2 border rounded" value={form.style} onChange={(e) => setForm({ ...form, style: e.target.value })}>
            {"Hyperrealistic,Minimal,Cinematic,Editorial,Vintage".split(",").map((opt) => (<option key={opt}>{opt}</option>))}
          </select>
        </label>

        <label>
          Phông nền
          <input className={`w-full p-2 border rounded ${!isCustomScene ? 'bg-gray-200' : ''}`} type="text" value={form.background} onChange={(e) => setForm({ ...form, background: e.target.value })} disabled={!isCustomScene}/>
        </label>

        <label>
          Cảm xúc / Tông ảnh
          <input className={`w-full p-2 border rounded ${!isCustomScene ? 'bg-gray-200' : ''}`} type="text" value={form.mood} onChange={(e) => setForm({ ...form, mood: e.target.value })} disabled={!isCustomScene}/>
        </label>
        
        <h3 className="text-lg font-semibold mt-4 border-t pt-4">Thông số kỹ thuật (Nâng cao)</h3>

        <label>
        Độ sâu trường ảnh (DoF)
        <select
            className="w-full p-2 border rounded"
            value={form.depthOfField}
            onChange={(e) => setForm({ ...form, depthOfField: e.target.value })}
        >
            <option>Shallow DoF (f/1.8)</option>
            <option>Medium DoF (f/5.6)</option>
            <option>Deep DoF (f/16)</option>
        </select>
        </label>

        <label>
        Ống kính (Lens)
        <select
            className="w-full p-2 border rounded"
            value={form.lens}
            onChange={(e) => setForm({ ...form, lens: e.target.value })}
        >
            <option>50mm</option>
            <option>85mm</option>
            <option>35mm</option>
            <option>100mm Macro</option>
        </select>
        </label>

        <label>
        Độ nét (Focus)
        <select
            className="w-full p-2 border rounded"
            value={form.focus}
            onChange={(e) => setForm({ ...form, focus: e.target.value })}
        >
            <option>Sharp focus on subject</option>
            <option>Soft, dreamy focus</option>
        </select>
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
