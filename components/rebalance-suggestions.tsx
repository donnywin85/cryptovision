"use client";

import { ArrowRight, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockRebalanceSuggestions as defaultSuggestions } from "@/lib/mock-data";
import type { RebalanceSuggestion } from "@/types";

interface RebalanceSuggestionsProps {
  suggestions?: RebalanceSuggestion[];
}

export function RebalanceSuggestions({
  suggestions = defaultSuggestions,
}: RebalanceSuggestionsProps) {
  return (
    <div className="space-y-4">
      {suggestions.map((suggestion, index) => (
        <Card key={index} className="border-zinc-800 bg-zinc-900/50 transition-shadow hover:shadow-lg hover:shadow-indigo-500/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-amber-400" />
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-zinc-100">
                  Reduce {suggestion.fromAsset}
                </span>
                <ArrowRight className="h-3 w-3 text-zinc-500" />
                <span className="font-medium text-zinc-100">
                  Increase {suggestion.toAsset}
                </span>
                <Badge className="border-none bg-indigo-400/10 text-indigo-400">
                  {suggestion.percentage}%
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm leading-relaxed text-zinc-400">
              {suggestion.reason}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
