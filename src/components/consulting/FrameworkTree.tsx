import React, { useState } from "react";
import { TreeNode } from "@/lib/consulting/types";

interface FrameworkTreeProps {
  root: TreeNode;
  color?: string;
}

export function FrameworkTree({ root, color = "#10b981" }: FrameworkTreeProps) {
  const [selectedNode, setSelectedNode] = useState<TreeNode | null>(root);

  return (
    <div className="space-y-6">
      {/* Visual MECE Hierarchy Canvas */}
      <div className="rounded-2xl border border-border bg-card/60 backdrop-blur-md p-6 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between mb-4 border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
            <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              MECE Decision Tree (Click any branch to inspect)
            </h4>
          </div>
          {selectedNode && (
            <span className="text-xs font-mono text-muted-foreground bg-muted px-2.5 py-1 rounded-md">
              Focus: {selectedNode.label}
            </span>
          )}
        </div>

        {/* Tree Render */}
        <div className="min-w-[700px] py-4">
          <RenderNode node={root} level={0} selectedId={selectedNode?.id} onSelect={setSelectedNode} />
        </div>
      </div>

      {/* Node Inspector Detail Panel */}
      {selectedNode && (
        <div className="rounded-xl border border-border bg-muted/40 p-4 transition-all animate-in fade-in duration-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-primary/10 text-primary uppercase">
                {selectedNode.type || "branch"}
              </span>
              <p className="text-sm font-bold text-foreground">{selectedNode.label}</p>
            </div>
            {selectedNode.status && (
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  selectedNode.status === "critical"
                    ? "bg-amber-500/10 text-amber-500"
                    : selectedNode.status === "positive"
                    ? "bg-emerald-500/10 text-emerald-500"
                    : "bg-blue-500/10 text-blue-500"
                }`}
              >
                {selectedNode.status.toUpperCase()}
              </span>
            )}
          </div>
          {selectedNode.description && (
            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {selectedNode.description}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function RenderNode({
  node,
  level,
  selectedId,
  onSelect,
}: {
  node: TreeNode;
  level: number;
  selectedId?: string;
  onSelect: (node: TreeNode) => void;
}) {
  const isSelected = node.id === selectedId;
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className={`relative ${level > 0 ? "ml-6 pl-4 border-l-2 border-border/70" : ""}`}>
      {/* Node Card */}
      <div
        onClick={() => onSelect(node)}
        className={`my-2 cursor-pointer rounded-xl border p-3 transition-all duration-150 select-none ${
          isSelected
            ? "border-primary bg-primary/10 shadow-sm ring-1 ring-primary/40"
            : "border-border/80 bg-background/80 hover:border-primary/50 hover:bg-muted/50"
        } ${level === 0 ? "max-w-md bg-gradient-to-r from-card to-muted/40 font-bold" : "max-w-xl"}`}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span
              className={`h-2 w-2 rounded-full shrink-0 ${
                level === 0
                  ? "bg-primary"
                  : level === 1
                  ? "bg-amber-500"
                  : level === 2
                  ? "bg-blue-500"
                  : "bg-emerald-500"
              }`}
            />
            <span className={`text-xs md:text-sm ${level === 0 ? "font-extrabold" : "font-semibold"}`}>
              {node.label}
            </span>
          </div>
          {hasChildren && (
            <span className="text-[10px] text-muted-foreground bg-muted/60 px-1.5 py-0.5 rounded font-mono">
              {node.children!.length} sub-branches
            </span>
          )}
        </div>
        {node.description && (
          <p className="mt-1 text-[11px] text-muted-foreground line-clamp-1 pl-4">
            {node.description}
          </p>
        )}
      </div>

      {/* Children Branches */}
      {hasChildren && (
        <div className="space-y-1">
          {node.children!.map((child) => (
            <RenderNode
              key={child.id}
              node={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
