export async function verifyImage(filePath, lat, lon){
  // Simple mock: random-ish green score based on filename length (fast, deterministic-ish)
  try{
    const base = (filePath || '').length;
    const score = Math.min(0.9, Math.max(0.05, ((base % 100) / 200) + Math.random()*0.3));
    const confidence = Math.min(0.99, 0.5 + score*0.8);
    const passed = score > 0.12;
    return { passed, green_score: +score.toFixed(3), confidence: +confidence.toFixed(3) };
  }catch(e){
    return { passed: true, green_score: 0.45, confidence: 0.85 };
  }
}
