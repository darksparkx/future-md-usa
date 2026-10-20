"use client";

import { Badge } from "@/components/ui/badge";
import { useSiteOption } from "@/lib/site-option";

export function PortalMark() {
  const { option } = useSiteOption();
  return (
    <Badge variant="outline" className="h-6 w-fit px-2">
      Option {option === 3 ? 3 : 2}
    </Badge>
  );
}
