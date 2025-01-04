import React from 'react';

interface DeviceData {
    id: string;
    date_booked: string;
    created_at: string;
    qc_date: string | null;
    parts_ordered_date: string | null;
    parts_pending_date: string | null;
    parts_issued_date: string | null;
}

interface Metrics {
    bookingToAssessmentTime: number | null;
    assessmentToCompletedTime: number | null;
    assessmentToPartsOrderedTime: number | null;
    assessmentToPartsPendingTime: number | null;
    assessmentToPartsIssuedTime: number | null;
}

const DateCalculationsScreen = ({ data, openTaskId }: { data: DeviceData[], openTaskId: string }) => {
    const calculateMetrics = (deviceData: DeviceData): Metrics => {
        const bookingDate = new Date(deviceData.date_booked);

        // Check if assessment date exists, if not return an empty result or null
        const assessmentDate = deviceData.created_at ? new Date(deviceData.created_at) : null;

        if (!assessmentDate) {
            return {
                bookingToAssessmentTime: null,
                assessmentToCompletedTime: null,
                assessmentToPartsOrderedTime: null,
                assessmentToPartsPendingTime: null,
                assessmentToPartsIssuedTime: null,
            };
        }

        const bookingToAssessmentTime = Math.round((assessmentDate.getTime() - bookingDate.getTime()) / (1000 * 3600)); // Hours

        const assessmentToCompletedTime = deviceData.qc_date
            ? Math.round((new Date(deviceData.qc_date).getTime() - assessmentDate.getTime()) / (1000 * 3600)) // Hours
            : null;

        const assessmentToPartsOrderedTime = deviceData.parts_ordered_date
            ? Math.round((new Date(deviceData.parts_ordered_date).getTime() - assessmentDate.getTime()) / (1000 * 3600)) // Hours
            : null;

        const assessmentToPartsPendingTime = deviceData.parts_pending_date
            ? Math.round((new Date(deviceData.parts_pending_date).getTime() - assessmentDate.getTime()) / (1000 * 3600)) // Hours
            : null;

        const assessmentToPartsIssuedTime = deviceData.parts_issued_date
            ? Math.round((new Date(deviceData.parts_issued_date).getTime() - assessmentDate.getTime()) / (1000 * 3600)) // Hours
            : null;

        return {
            bookingToAssessmentTime,
            assessmentToCompletedTime,
            assessmentToPartsOrderedTime,
            assessmentToPartsPendingTime,
            assessmentToPartsIssuedTime,
        };
    };


    const openTask = data.find((task) => task.id === openTaskId);
    const metrics = openTask ? calculateMetrics(openTask) : null;


    return (
        <div>
            {metrics && (
                <>
                    <h2>Device Metrics</h2>
                    <p>Booking to Assessment Time: {metrics.bookingToAssessmentTime} hours</p>
                    <p>Assessment to Completed Time(QC Pass): {metrics.assessmentToCompletedTime} hours</p>
                    <p>Assessment to Parts Ordered Time: {metrics.assessmentToPartsOrderedTime} hours</p>
                    <p>Assessment to Parts Pending Time: {metrics.assessmentToPartsPendingTime} hours</p>
                    <p>Assessment to Parts Issued Time: {metrics.assessmentToPartsIssuedTime} hours</p>
                </>
            )}
        </div>
    );
};

export default DateCalculationsScreen;