import type { PrintFormat } from "@/components/one-pager";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type MaterialsState = {
  shopName: string;
  line: string;
  logo: string | null;
  lotId: string;
  format: PrintFormat;
  setShopName: (shopName: string) => void;
  setLine: (line: string) => void;
  setLogo: (logo: string | null) => void;
  setLotId: (lotId: string) => void;
  setFormat: (format: PrintFormat) => void;
  markHydrated: () => void;
};

export const useMaterials = create<MaterialsState>()(
  persist(
    (set) => ({
      shopName: "",
      line: "",
      logo: null,
      lotId: "lot-084",
      format: "sheet",
      setShopName: (shopName) => set({ shopName }),
      setLine: (line) => set({ line: line.slice(0, 180) }),
      setLogo: (logo) => set({ logo }),
      setLotId: (lotId) => set({ lotId }),
      setFormat: (format) => set({ format }),
      markHydrated: () => set({}),
    }),
    {
      name: "auctum-materials-v1",
      skipHydration: true,
      partialize: (state) => ({
        shopName: state.shopName,
        line: state.line,
        logo: state.logo,
        lotId: state.lotId,
        format: state.format,
      }),
    },
  ),
);

export function readLogo(file: File) {
  return new Promise<string>((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const max = 480;
      const scale = Math.min(1, max / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(url);
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/png"));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    image.src = url;
  });
}
