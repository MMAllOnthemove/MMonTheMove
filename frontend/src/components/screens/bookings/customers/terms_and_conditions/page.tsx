"use client"
import useAssemblyTerms from '@/hooks/useGetAssemblyTerm';
import { datetimestamp } from '@/lib/date_formats';
import jsPDF from 'jspdf';
import moment from 'moment';
import { useParams } from 'next/navigation';
import { useRouter } from 'nextjs-toploader/app';
import { useEffect, useRef, useState } from 'react';
type Rule = {
    id: string;
    unique_id: string;
    term?: string;
    bold?: boolean | null;
    created_at?: string;
    checked?: boolean;
}



const TermsAndConditionsScreen = () => {
    const params = useParams(); // Fetch URL parameters
    const {
        customer_name } = params;
    const { assemblyTermsList } = useAssemblyTerms()
    const router = useRouter()
    const customer = customer_name ? decodeURIComponent(Array.isArray(customer_name) ? customer_name[0] : customer_name) : null
    const [rules, setRules] = useState<Rule[]>([]);
    const [title, setTitle] = useState("MM ALL Electronics");
    const [description, setDescription] = useState("Acknowledgement of assessment damages:");
    const signatureCanvasRef = useRef<HTMLCanvasElement>(null);
    const isDrawingRef = useRef(false);
    const [customerName, setCustomerName] = useState("");
    // Fetch rules from API
    useEffect(() => {
        if (assemblyTermsList?.length) {
            const initializedRules = assemblyTermsList.map((rule) => ({
                ...rule,
                checked: false, // Initialize checked as false
            }));
            setRules(initializedRules);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [assemblyTermsList]);

    // Handle checkbox change
    const handleCheckboxChange = (id: string) => {
        setRules((prev) =>
            prev.map((rule) =>
                rule.id === id ? { ...rule, checked: !rule.checked } : rule
            )
        );
    };
    // Initialize drawing on the canvas
    useEffect(() => {
        const canvas = signatureCanvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const startDrawing = (event: MouseEvent | TouchEvent) => {
            isDrawingRef.current = true;
            const rect = canvas.getBoundingClientRect();
            const x = "touches" in event ? event.touches[0].clientX : event.clientX;
            const y = "touches" in event ? event.touches[0].clientY : event.clientY;
            context.moveTo(x - rect.left, y - rect.top);
        };

        const draw = (event: MouseEvent | TouchEvent) => {
            if (!isDrawingRef.current) return;
            const rect = canvas.getBoundingClientRect();
            const x = "touches" in event ? event.touches[0].clientX : event.clientX;
            const y = "touches" in event ? event.touches[0].clientY : event.clientY;
            context.lineTo(x - rect.left, y - rect.top);
            context.stroke();
        };

        const stopDrawing = () => {
            isDrawingRef.current = false;
            context.beginPath();
        };

        canvas.addEventListener("mousedown", startDrawing);
        canvas.addEventListener("mousemove", draw);
        canvas.addEventListener("mouseup", stopDrawing);
        canvas.addEventListener("mouseleave", stopDrawing);

        canvas.addEventListener("touchstart", startDrawing);
        canvas.addEventListener("touchmove", draw);
        canvas.addEventListener("touchend", stopDrawing);

        return () => {
            canvas.removeEventListener("mousedown", startDrawing);
            canvas.removeEventListener("mousemove", draw);
            canvas.removeEventListener("mouseup", stopDrawing);
            canvas.removeEventListener("mouseleave", stopDrawing);

            canvas.removeEventListener("touchstart", startDrawing);
            canvas.removeEventListener("touchmove", draw);
            canvas.removeEventListener("touchend", stopDrawing);
        };
    }, []);
    // Clear the signature
    const clearSignature = () => {
        const canvas = signatureCanvasRef.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            if (context) {
                context.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
    };

    const handleDownloadPdf = () => {
        if (typeof window !== 'undefined') {
            const canvas = signatureCanvasRef.current;

            if (!canvas) {
                alert("Please provide a signature.");
                return;
            }

            const margin = 2; // Define the margin size
            const pageWidth = 210 - 2 * margin; // A4 page width with margins
            const pageHeight = 297 - 2 * margin; // A4 page height with margins


            const signatureImage = canvas.toDataURL("image/png");
            const doc = new jsPDF({
                unit: 'mm',
                format: [pageWidth, pageHeight], // Set the page size with margins
            });


            const currentDate = datetimestamp;

            // Set title and description
            doc.setFontSize(16);
            doc.text(title, 105, 20, { align: "center" });
            doc.setFontSize(12);
            doc.text(description, 105, 30, { align: "center" });

            // Set customer information
            doc.setFontSize(10);
            doc.text(`Customer Name: ${customer}`, 20, 40);
            doc.text(`Date: ${moment(currentDate).format("YYYY-MM-DD HH:mm:ss")}`, 20, 50);

            let yPosition = 60;
            const maxYPosition = 280;

            // Add rules and signatures
            rules.forEach((rule, index) => {
                const splitText = doc.splitTextToSize(`${index + 1}. ${rule.term}`, 150);

                doc.text(splitText, 20, yPosition);

                const textHeight = splitText.length * 2; // Adjusted line height

                if (rule.checked) {
                    doc.addImage(signatureImage, "PNG", 170, yPosition, 20, 10);
                    yPosition += Math.max(textHeight, 15); // Ensure enough space for the image
                } else {
                    yPosition += textHeight; // Add some padding after each term
                }

                // Check if yPosition exceeds the page height, create a new page if necessary
                if (yPosition > maxYPosition) {
                    doc.addPage();
                    yPosition = 20;
                }
            });

            // Add customer signature section at the bottom
            const signatureSectionYPosition = 270; // Adjust the y position as needed
            doc.text('Customer signature', 20, signatureSectionYPosition);
            doc.addImage(signatureImage, 'PNG', 50, signatureSectionYPosition - 5, 20, 10);
            doc.text(`Date: ${moment(currentDate).format("YYYY-MM-DD HH:mm:ss")}`, 20, signatureSectionYPosition + 15);

            doc.save(`${customer}.pdf`);
            router.push("/bookings/customers/welcome")
        }
    };
    return (
        <>


            <div className="container mx-auto p-4">
                <h1 className="text-center text-2xl font-bold">{title}</h1>
                <p className="text-center text-gray-600 mb-4">{description}</p>
                <div className="mb-4">
                    <label htmlFor="customerName" className="block text-gray-700 font-medium">
                        Customer Name
                    </label>
                    <input
                        type="text"
                        id="customerName"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 w-full"
                    />
                </div>
                <ul className="space-y-2">
                    {rules.map((rule) => (
                        <li key={rule.id} className="flex items-center">
                            {rule.bold && (
                                <input
                                    type="checkbox"
                                    id={`rule-${rule.id}`}
                                    className="mr-2"
                                    checked={rule.checked}
                                    onChange={() => handleCheckboxChange(rule.id)}
                                />
                            )}
                            <label htmlFor={`rule-${rule.id}`} className="text-gray-800">
                                {rule.term}
                            </label>
                        </li>
                    ))}
                </ul>


                <div className="mt-4">
                    <h2 className="text-lg font-semibold">Signature</h2>
                    <canvas
                        ref={signatureCanvasRef}
                        width={400}
                        height={150}
                        className="border border-gray-300 rounded-md"
                    ></canvas>
                    <div className="flex space-x-2 mt-2">
                        <button
                            onClick={clearSignature}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Clear
                        </button>
                        <button
                            onClick={handleDownloadPdf}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Generate PDF
                        </button>
                    </div>
                </div>
            </div>

        </>
    )
}

export default TermsAndConditionsScreen