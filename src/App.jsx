import { useEffect, useState } from "react";

const App = () => {
  const [steps, setSteps] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    if ("DeviceMotionEvent" in window) {
      let lastAcceleration = { x: null, y: null, z: null };
      let stepCount = 0;

      const handleMotion = (event) => {
        const { x, y, z } = event.accelerationIncludingGravity;
        
        if (x !== null && y !== null && z !== null) {
          const delta = Math.abs(x - lastAcceleration.x) + Math.abs(y - lastAcceleration.y) + Math.abs(z - lastAcceleration.z);

          if (delta > 2.5) { // Harakat sezilarli bo'lsa qadam qo'shiladi
            stepCount++;
            setSteps(stepCount);
          }
        }

        lastAcceleration = { x, y, z };
      };

      window.addEventListener("devicemotion", handleMotion);

      return () => {
        window.removeEventListener("devicemotion", handleMotion);
      };
    } else {
      alert("Ushbu qurilmada qadam hisoblash qo'llab-quvvatlanmaydi.");
    }
  }, []);

  useEffect(() => {
    const newLevel = Math.floor(steps / 10000) + 1;
    if (newLevel !== level) setLevel(newLevel);
  }, [steps, level]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-green-50 ">
      <h1 className="text-4xl font-bold mb-4">🌳 Virtual Daraxt Ektirish Ilovasi</h1>
      <p className="text-lg">Qadamlar: <span className="font-semibold">{steps}</span></p>
      <p className="text-lg mb-6">Daraxt darajasi: <span className="font-semibold">{level}</span></p>

      <div className="mt-10 text-center">
        {level === 1 && <p>🌱 Nihol bosqichida!</p>}
        {level === 2 && <p>🌿 Kichik daraxtga aylandi!</p>}
        {level === 3 && <p>🌳 Katta daraxt bo'ldi!</p>}
        {level >= 4 && <p>🍎 Mevali daraxt! Ajoyib ish!</p>}
      </div>

      <p className="mt-8 text-sm text-gray-500">📱 Qadamlaringiz avtomatik hisoblanmoqda. Harakat qiling!</p>
    </div>
  );
};

export default App;
