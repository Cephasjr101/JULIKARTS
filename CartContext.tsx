import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { findCatalogItem } from "@contracts/catalog";

export type CartLine = { catalogId: string; quantity: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  totalPesewas: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (catalogId: string, quantity?: number) => void;
  setQuantity: (catalogId: string, quantity: number) => void;
  remove: (catalogId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((catalogId: string, quantity = 1) => {
    setLines((prev) => {
      const existing = prev.find((l) => l.catalogId === catalogId);
      if (existing) {
        return prev.map((l) =>
          l.catalogId === catalogId ? { ...l, quantity: Math.min(50, l.quantity + quantity) } : l,
        );
      }
      return [...prev, { catalogId, quantity }];
    });
  }, []);

  const setQuantity = useCallback((catalogId: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.catalogId !== catalogId)
        : prev.map((l) => (l.catalogId === catalogId ? { ...l, quantity: Math.min(50, quantity) } : l)),
    );
  }, []);

  const remove = useCallback((catalogId: string) => {
    setLines((prev) => prev.filter((l) => l.catalogId !== catalogId));
  }, []);

  const clear = useCallback(() => setLines([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    let count = 0;
    let totalPesewas = 0;
    for (const l of lines) {
      const item = findCatalogItem(l.catalogId);
      if (!item) continue;
      count += l.quantity;
      totalPesewas += item.pricePesewas * l.quantity;
    }
    return { lines, count, totalPesewas, isOpen, openCart, closeCart, add, setQuantity, remove, clear };
  }, [lines, isOpen, openCart, closeCart, add, setQuantity, remove, clear]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
