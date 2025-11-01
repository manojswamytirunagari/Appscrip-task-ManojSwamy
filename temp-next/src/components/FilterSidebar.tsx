"use client";
import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

function Collapsible({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b last:border-b-0 pb-3 mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center text-sm font-medium"
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="mt-3 text-xs text-gray-600">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ onClose }: { onClose?: () => void }) {
  return (
    <aside className="w-full md:w-64 bg-white border rounded-lg p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold">Filters</div>
        {onClose && (
          <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700">
            Hide
          </button>
        )}
      </div>

      <div>
        <Collapsible title="Ideal For">
          <label className="block"><input type="checkbox" /> Men</label>
          <label className="block"><input type="checkbox" /> Women</label>
          <label className="block"><input type="checkbox" /> Baby & Kids</label>
        </Collapsible>

        <Collapsible title="Occasion">
          <label className="block"><input type="checkbox" /> Casual</label>
          <label className="block"><input type="checkbox" /> Formal</label>
        </Collapsible>

        <Collapsible title="Fabric">
          <label className="block"><input type="checkbox" /> Cotton</label>
          <label className="block"><input type="checkbox" /> Leather</label>
        </Collapsible>

        <Collapsible title="Pattern">
          <label className="block"><input type="checkbox" /> Striped</label>
          <label className="block"><input type="checkbox" /> Plain</label>
        </Collapsible>
      </div>
    </aside>
  );
}
