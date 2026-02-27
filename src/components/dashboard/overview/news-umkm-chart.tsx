"use client";

import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import { BarChart } from "echarts/charts";
import {
    TooltipComponent,
    GridComponent,
    TitleComponent,
    LegendComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([BarChart, TooltipComponent, GridComponent, TitleComponent, LegendComponent, CanvasRenderer]);

interface NewsUmkmChartProps {
    data: {
        berita?: {
            by_category?: Array<{ category: string; count: number }>;
        };
        umkm?: {
            by_status?: Array<{ status: string; count: number }>;
        };
    };
}

export default function NewsUmkmChart({ data }: NewsUmkmChartProps) {
    const beritaCategories = data?.berita?.by_category ?? [];
    const umkmStatuses = data?.umkm?.by_status ?? [];

    // === Berita by Category ===
    const beritaOption: echarts.EChartsCoreOption = {
        title: {
            text: "Berita per Kategori",
            left: "center",
            textStyle: { fontSize: 16, fontWeight: 600, color: "#1f2937" },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            backgroundColor: "rgba(255,255,255,0.96)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: { color: "#374151" },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "8%",
            top: "18%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: beritaCategories.map((c) => c.category || "Lainnya"),
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
                data: beritaCategories.map((c) => c.count),
                barMaxWidth: 36,
                itemStyle: {
                    borderRadius: [6, 6, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#60a5fa" },
                        { offset: 1, color: "#2563eb" },
                    ]),
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#93c5fd" },
                            { offset: 1, color: "#3b82f6" },
                        ]),
                    },
                },
            },
        ],
    };

    // === UMKM by Status ===
    const umkmOption: echarts.EChartsCoreOption = {
        title: {
            text: "UMKM per Status",
            left: "center",
            textStyle: { fontSize: 16, fontWeight: 600, color: "#1f2937" },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            backgroundColor: "rgba(255,255,255,0.96)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: { color: "#374151" },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "8%",
            top: "18%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: umkmStatuses.map((s) => s.status || "Lainnya"),
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
                data: umkmStatuses.map((s) => s.count),
                barMaxWidth: 36,
                itemStyle: {
                    borderRadius: [6, 6, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#fbbf24" },
                        { offset: 1, color: "#d97706" },
                    ]),
                },
                emphasis: {
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#fcd34d" },
                            { offset: 1, color: "#f59e0b" },
                        ]),
                    },
                },
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                {beritaCategories.length > 0 ? (
                    <ReactEChartsCore
                        echarts={echarts}
                        option={beritaOption}
                        style={{ height: 320 }}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                ) : (
                    <div className="flex items-center justify-center h-[320px]">
                        <p className="text-gray-400">Belum ada data berita</p>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
                {umkmStatuses.length > 0 ? (
                    <ReactEChartsCore
                        echarts={echarts}
                        option={umkmOption}
                        style={{ height: 320 }}
                        notMerge={true}
                        lazyUpdate={true}
                    />
                ) : (
                    <div className="flex items-center justify-center h-[320px]">
                        <p className="text-gray-400">Belum ada data UMKM</p>
                    </div>
                )}
            </div>
        </div>
    );
}
