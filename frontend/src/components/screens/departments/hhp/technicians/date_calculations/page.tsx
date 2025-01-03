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
        const assessmentDate = new Date(deviceData.created_at);

        const bookingToAssessmentTime = Math.round((assessmentDate.getTime() - bookingDate.getTime()) / (1000 * 3600 * 24));

        const assessmentToCompletedTime = deviceData.qc_date
            ? Math.round((new Date(deviceData.qc_date).getTime() - assessmentDate.getTime()) / (1000 * 3600 * 24))
            : null;

        const assessmentToPartsOrderedTime = deviceData.parts_ordered_date
            ? Math.round((new Date(deviceData.parts_ordered_date).getTime() - assessmentDate.getTime()) / (1000 * 3600 * 24))
            : null;

        const assessmentToPartsPendingTime = deviceData.parts_pending_date
            ? Math.round((new Date(deviceData.parts_pending_date).getTime() - assessmentDate.getTime()) / (1000 * 3600 * 24))
            : null;

        const assessmentToPartsIssuedTime = deviceData.parts_issued_date
            ? Math.round((new Date(deviceData.parts_issued_date).getTime() - assessmentDate.getTime()) / (1000 * 3600 * 24))
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
                    <p>Booking to Assessment Time: {metrics.bookingToAssessmentTime} days</p>
                    <p>Assessment to Completed Time(QC Pass): {metrics.assessmentToCompletedTime} days</p>
                    <p>Assessment to Parts Ordered Time: {metrics.assessmentToPartsOrderedTime} days</p>
                    <p>Assessment to Parts Pending Time: {metrics.assessmentToPartsPendingTime} days</p>
                    <p>Assessment to Parts Issued Time: {metrics.assessmentToPartsIssuedTime} days</p>
                </>
            )}
        </div>
    );
};

export default DateCalculationsScreen;