"use client";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { PieChart } from "echarts/charts";
import {
    TooltipComponent,
    LegendComponent,
    TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([PieChart, TooltipComponent, LegendComponent, TitleComponent, CanvasRenderer]);

interface ServiceChartProps {
    data: {
        layanan?: {
            total_submissions?: number;
            submissions_by_status?: Array<{ status: string; count: number }>;
        };
    };
}

const statusColors: Record<string, string[]> = {
    Pending: ["#fbbf24", "#f59e0b"],
    Processing: ["#60a5fa", "#3b82f6"],
    Approved: ["#34d399", "#10b981"],
    Rejected: ["#f87171", "#ef4444"],
    Completed: ["#a78bfa", "#8b5cf6"],
};

export default function ServiceChart({ data }: ServiceChartProps) {
    const submissions = data?.layanan?.submissions_by_status ?? [];
    const total = data?.layanan?.total_submissions ?? 0;

    if (submissions.length === 0) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-center h-[350px]">
                <p className="text-gray-400">Belum ada data pengajuan</p>
            </div>
        );
    }

    const pieData = submissions.map((item) => {
        const colors = statusColors[item.status] || ["#9ca3af", "#6b7280"];
        return {
            value: item.count,
            name: item.status,
            itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                    { offset: 0, color: colors[0] },
                    { offset: 1, color: colors[1] },
                ]),
            },
        };
    });

    const option: echarts.EChartsCoreOption = {
        title: {
            text: "Status Pengajuan Layanan",
            subtext: `Total: ${total.toLocaleString("id-ID")} pengajuan`,
            left: "center",
            textStyle: { fontSize: 16, fontWeight: 600, color: "#1f2937" },
            subtextStyle: { fontSize: 12, color: "#6b7280" },
        },
        tooltip: {
            trigger: "item",
            backgroundColor: "rgba(255,255,255,0.96)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: { color: "#374151", fontSize: 13 },
            formatter: (params: any) =>
                `<strong>${params.name}</strong><br/>${params.value} pengajuan (${params.percent}%)`,
        },
        legend: {
            bottom: 0,
            itemGap: 16,
            textStyle: { fontSize: 12, color: "#374151" },
        },
        series: [
            {
                name: "Status",
                type: "pie",
                radius: ["40%", "68%"],
                center: ["50%", "52%"],
                avoidLabelOverlap: true,
                itemStyle: {
                    borderRadius: 6,
                    borderColor: "#fff",
                    borderWidth: 2,
                },
                label: {
                    show: true,
                    formatter: "{b}\n{d}%",
                    fontSize: 11,
                    color: "#374151",
                },
                emphasis: {
                    label: { show: true, fontSize: 14, fontWeight: "bold" },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowColor: "rgba(0,0,0,0.12)",
                    },
                },
                data: pieData,
                animationType: "scale",
                animationEasing: "elasticOut",
            },
        ],
    };

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <ReactEChartsCore
                echarts={echarts}
                option={option}
                style={{ height: 350 }}
                notMerge={true}
                lazyUpdate={true}
            />
        </div>
    );
}
