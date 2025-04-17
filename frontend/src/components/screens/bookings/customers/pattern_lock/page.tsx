"use client"
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useRef, useState } from "react";
interface Point {
    x: number;
    y: number;
}


const PatternLockScreen = () => {
    const router = useRouter()
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
    const [drawing, setDrawing] = useState(false);
    const [points, setPoints] = useState<Point[]>([]);
    const [customer, setCustomer] = useState("")
    const imageUrl = "/dots.png"; // Assuming the image is in the public folder

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctxRef.current = ctx;

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    }, [imageUrl]);

    useEffect(() => {
        const loadCustomerInfo = () => {
            if (typeof window !== undefined && window.localStorage) {
                const parsedData = JSON.parse(localStorage.getItem('customer') || '""');
                if (parsedData !== null) {
                    setCustomer(parsedData?.customer)

                }
            }
        };
        loadCustomerInfo()
    }, [])


    const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
        setDrawing(true);
        const { offsetX, offsetY } = e.nativeEvent;
        setPoints([{ x: offsetX, y: offsetY }]);
    };

    const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!drawing) return;

        const { offsetX, offsetY } = e.nativeEvent;
        const newPoint = { x: offsetX, y: offsetY };
        setPoints((prev) => [...prev, newPoint]);

        const ctx = ctxRef.current;
        if (!ctx) return;

        // Draw only the new line segment
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = 4;
        ctx.moveTo(points[points.length - 1].x, points[points.length - 1].y);
        ctx.lineTo(newPoint.x, newPoint.y);
        ctx.stroke();
    };


    const stopDrawing = () => {
        setDrawing(false);
    };

    const savePattern = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const dataUrl = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "pattern-lock.png";
        link.click();
        router.push(`/assembly_terms/${encodeURIComponent(customer)}`)
    };

    const clearPattern = () => {
        const ctx = ctxRef.current;
        if (!ctx) return;

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => {
            ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
        };

        setPoints([]); // Reset drawn points
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-2xl font-bold mb-4">Draw Your Pattern</h1>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <canvas
                    ref={canvasRef}
                    width={400}
                    height={400}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    className="border border-gray-300 cursor-crosshair"
                />
                <div className="flex gap-4 mt-4">
                    <button
                        onClick={savePattern}
                        className="flex-1 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                    >
                        Save Pattern
                    </button>
                    <button
                        onClick={clearPattern}
                        className="flex-1 p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                    >
                        Clear Pattern
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PatternLockScreen