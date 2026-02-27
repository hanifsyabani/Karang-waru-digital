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

interface PopulationChartProps {
    data: {
        penduduk?: {
            total?: number;
            male?: number;
            female?: number;
            family_card_count?: number;
        };
    };
}

export default function PopulationChart({ data }: PopulationChartProps) {
    const male = data?.penduduk?.male ?? 0;
    const female = data?.penduduk?.female ?? 0;
    const familyCards = data?.penduduk?.family_card_count ?? 0;
    const total = data?.penduduk?.total ?? 0;

    const option: echarts.EChartsCoreOption = {
        title: {
            text: "Distribusi Penduduk",
            subtext: `Total: ${total.toLocaleString("id-ID")} jiwa · ${familyCards.toLocaleString("id-ID")} KK`,
            left: "center",
            textStyle: {
                fontSize: 16,
                fontWeight: 600,
                color: "#1f2937",
            },
            subtextStyle: {
                fontSize: 12,
                color: "#6b7280",
            },
        },
        tooltip: {
            trigger: "item",
            backgroundColor: "rgba(255,255,255,0.96)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: { color: "#374151", fontSize: 13 },
            formatter: (params: any) => {
                return `<strong>${params.name}</strong><br/>${params.value.toLocaleString("id-ID")} jiwa (${params.percent}%)`;
            },
        },
        legend: {
            bottom: 0,
            itemGap: 24,
            textStyle: { fontSize: 13, color: "#374151" },
        },
        series: [
            {
                name: "Jenis Kelamin",
                type: "pie",
                radius: ["45%", "72%"],
                center: ["50%", "52%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 8,
                    borderColor: "#fff",
                    borderWidth: 3,
                },
                label: {
                    show: true,
                    position: "inside",
                    formatter: "{d}%",
                    fontSize: 13,
                    fontWeight: 600,
                    color: "#fff",
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: "bold",
                    },
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.15)",
                    },
                },
                data: [
                    {
                        value: male,
                        name: "Laki-laki",
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "#3b82f6" },
                                { offset: 1, color: "#1d4ed8" },
                            ]),
                        },
                    },
                    {
                        value: female,
                        name: "Perempuan",
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                { offset: 0, color: "#f472b6" },
                                { offset: 1, color: "#db2777" },
                            ]),
                        },
                    },
                ],
                animationType: "scale",
                animationEasing: "elasticOut",
                animationDelay: () => Math.random() * 200,
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
