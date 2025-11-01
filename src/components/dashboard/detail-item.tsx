'use client'
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";




interface DetailItemProps {
    label: string;
    value: string | number | undefined | null;

    isCurrency?: boolean;

    isStatus?: boolean;
}

export default function DetailItem({ label, value, isCurrency, isStatus }: DetailItemProps) {


    return (
        <div>
            <Label className="text-sm text-muted-foreground">{label}</Label>

            {isStatus ? (
                // --- Jika isStatus true ---
                // Render sebagai badge status
                <p className={`mt-0.5 text-base font-semibold w-fit px-2 py-0.5 rounded ${value === 'published'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                    {value === 'published' ? 'Published' : 'Draft'}
                </p>
            ) : (
                // --- Jika isStatus false ---
                // Render sebagai teks biasa atau mata uang
                <p className="mt-0.5 text-base font-medium">
                    {isCurrency
                        ? formatCurrency(value as number)
                        : (value || "-") // Tampilkan '-' jika value kosong
                    }
                </p>
            )}
        </div>
    );
};