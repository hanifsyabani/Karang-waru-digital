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

interface ApbdChartProps {
    data: {
        apbd?: {
            tahun?: string;
            pendapatan_asli_desa?: number;
            transfer?: number;
            pendapatan_lain?: number;
            belanja_pemerintahan?: number;
            belanja_pembangunan?: number;
            belanja_pembinaan?: number;
            belanja_pemberdayaan?: number;
            belanja_takterduga?: number;
            total_pendapatan?: number;
            total_belanja?: number;
            surplus_defisit?: number;
        } | null;
    };
}

function formatRupiah(value: number): string {
    if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(1)} M`;
    if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1)} Jt`;
    if (value >= 1_000) return `Rp ${(value / 1_000).toFixed(0)} Rb`;
    return `Rp ${value}`;
}

export default function ApbdChart({ data }: ApbdChartProps) {
    const apbd = data?.apbd;

    if (!apbd) {
        return (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center justify-center h-[300px]">
                <p className="text-gray-400">Data APBD belum tersedia</p>
            </div>
        );
    }

    const pendapatanItems = [
        { name: "PAD", value: apbd.pendapatan_asli_desa ?? 0 },
        { name: "Transfer", value: apbd.transfer ?? 0 },
        { name: "Lain-lain", value: apbd.pendapatan_lain ?? 0 },
    ];

    const belanjaItems = [
        { name: "Pemerintahan", value: apbd.belanja_pemerintahan ?? 0 },
        { name: "Pembangunan", value: apbd.belanja_pembangunan ?? 0 },
        { name: "Pembinaan", value: apbd.belanja_pembinaan ?? 0 },
        { name: "Pemberdayaan", value: apbd.belanja_pemberdayaan ?? 0 },
        { name: "Tak Terduga", value: apbd.belanja_takterduga ?? 0 },
    ];

    const categories = [...pendapatanItems, ...belanjaItems].map((i) => i.name);
    const pendapatanValues = pendapatanItems.map((i) => i.value);
    const belanjaValues = belanjaItems.map((i) => i.value);

    // Pad arrays: pendapatan has 3 items, belanja has 5 items
    const pendapatanData = [...pendapatanValues, ...Array(belanjaItems.length).fill(0)];
    const belanjaData = [...Array(pendapatanItems.length).fill(0), ...belanjaValues];

    const option: echarts.EChartsCoreOption = {
        title: {
            text: `APBD Desa ${apbd.tahun ?? ""}`,
            subtext: `Surplus/Defisit: ${formatRupiah(apbd.surplus_defisit ?? 0)}`,
            left: "center",
            textStyle: { fontSize: 16, fontWeight: 600, color: "#1f2937" },
            subtextStyle: {
                fontSize: 12,
                color: (apbd.surplus_defisit ?? 0) >= 0 ? "#059669" : "#dc2626",
            },
        },
        tooltip: {
            trigger: "axis",
            axisPointer: { type: "shadow" },
            backgroundColor: "rgba(255,255,255,0.96)",
            borderColor: "#e5e7eb",
            borderWidth: 1,
            textStyle: { color: "#374151", fontSize: 13 },
            formatter: (params: any) => {
                const item = params[0] || params[1];
                const val = params.find((p: any) => p.value > 0);
                if (!val) return "";
                return `<strong>${item.name}</strong><br/>${val.seriesName}: ${formatRupiah(val.value)}`;
            },
        },
        legend: {
            bottom: 0,
            textStyle: { fontSize: 13, color: "#374151" },
        },
        grid: {
            left: "3%",
            right: "4%",
            bottom: "12%",
            top: "18%",
            containLabel: true,
        },
        xAxis: {
            type: "category",
            data: categories,
            axisLabel: {
                rotate: 25,
                fontSize: 11,
                color: "#6b7280",
            },
            axisLine: { lineStyle: { color: "#e5e7eb" } },
            axisTick: { show: false },
        },
        yAxis: {
            type: "value",
            axisLabel: {
                formatter: (v: number) => formatRupiah(v),
                fontSize: 11,
                color: "#6b7280",
            },
            splitLine: { lineStyle: { type: "dashed", color: "#f3f4f6" } },
        },
        series: [
            {
                name: "Pendapatan",
                type: "bar",
                data: pendapatanData,
                barMaxWidth: 40,
                itemStyle: {
                    borderRadius: [6, 6, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#34d399" },
                        { offset: 1, color: "#059669" },
                    ]),
                },
            },
            {
                name: "Belanja",
                type: "bar",
                data: belanjaData,
                barMaxWidth: 40,
                itemStyle: {
                    borderRadius: [6, 6, 0, 0],
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#f87171" },
                        { offset: 1, color: "#dc2626" },
                    ]),
                },
            },
        ],
    };


    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <ReactEChartsCore
                echarts={echarts}
                option={option}
                style={{ height: 380 }}
                notMerge={true}
                lazyUpdate={true}
            />
        </div>
    );
}
