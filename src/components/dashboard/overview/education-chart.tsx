"use client";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
    TooltipComponent,
    GridComponent,
    TitleComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([BarChart, TooltipComponent, GridComponent, TitleComponent, CanvasRenderer]);

interface EducationChartProps {
    data: {
        pendidikan?: {
            tahun?: string;
            tidak_sekolah?: number;
            sd?: number;
            smp?: number;
            sma?: number;
            perguruan_tinggi?: number;
        } | null;
    };
}

export default function EducationChart({ data }: EducationChartProps) {
    const edu = data?.pendidikan;

    if (!edu) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-center h-[350px]">
                <p className="text-gray-400">Data pendidikan belum tersedia</p>
            </div>
        );
    }

    const categories = ["Tidak Sekolah", "SD", "SMP", "SMA", "Perguruan Tinggi"];
    const values = [
        edu.tidak_sekolah ?? 0,
        edu.sd ?? 0,
        edu.smp ?? 0,
        edu.sma ?? 0,
        edu.perguruan_tinggi ?? 0,
    ];

    const colors = [
        ["#f87171", "#ef4444"],
        ["#fbbf24", "#d97706"],
        ["#34d399", "#059669"],
        ["#60a5fa", "#2563eb"],
        ["#a78bfa", "#7c3aed"],
    ];

    const option: echarts.EChartsCoreOption = {
        title: {
            text: `Statistik Pendidikan ${edu.tahun ?? ""}`,
            left: "center",
            textStyle: { fontSize: 16, fontWeight: 600, color: "#1f2937" },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            backgroundColor: "rgba(255,255,255,0.96)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: { color: "#374151", fontSize: 13 },
            formatter: (params: any) => {
                const p = params[0];
                return `<strong>${p.name}</strong><br/>${p.value.toLocaleString("id-ID")} orang`;
            },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "8%",
            top: "16%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: categories,
            axisLabel: { fontSize: 11, color: "#6b7280" },
            axisLine: { lineStyle: { color: "#e5e7eb" } },
            axisTick: { show: false },
        },
        yAxis: {
            type: "value",
            minInterval: 1,
            axisLabel: { fontSize: 11, color: "#6b7280" },
            splitLine: { lineStyle: { type: "dashed", color: "#f3f4f6" } },
        },
        series: [
            {
                type: "bar",
                data: values.map((v, i) => ({
                    value: v,
                    itemStyle: {
                        borderRadius: [6, 6, 0, 0],
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: colors[i][0] },
                            { offset: 1, color: colors[i][1] },
                        ]),
                    },
                })),
                barMaxWidth: 48,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 8,
                        shadowColor: "rgba(0,0,0,0.1)",
                    },
                },
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
