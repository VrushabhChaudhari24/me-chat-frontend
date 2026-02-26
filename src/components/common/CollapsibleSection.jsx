import { useState } from "react";

const CollapsibleSection = ({ title, count, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200">
      {/* Header */}
      <div
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3"
      >
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm">{title}</span>
          {count > 0 && (
            <span className="text-xs bg-secondary text-gray px-2 py-0.5 rounded-full">
              {count}
            </span>
          )}
        </div>

        <span className="text-gray-500 text-sm">
          {open ? "▾" : "▸"}
        </span>
      </div>

      {/* Content */}
      {open && <div className="px-4 py-2">{children}</div>}
    </div>
  );
};

export default CollapsibleSection;
