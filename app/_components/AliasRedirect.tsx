"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AliasRedirect({ section }: { section: string }) {
  const router = useRouter();

  useEffect(() => {
    router.replace(`/${window.location.search}#${section}`);
  }, [router, section]);

  return <div className="route-loading" role="status">Loading section…</div>;
}
