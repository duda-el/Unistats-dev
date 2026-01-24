"use client";

import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import slugify from "slugify";
import { useSupabaseFetch } from "@/src/hooks/useSupabaseFetch";
import { universityQueries } from "@/src/api/api";
import type { University, Faculty } from "@/src/types";

export default function Page() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;

  const query = useMemo(() => universityQueries.getAllFullData(), []);
  const { data: universities, loading, error } =
    useSupabaseFetch<University[]>(query);

  const uni = useMemo(() => {
    if (!universities || !slug) return null;

    return (
      universities.find(
        (u) =>
          slugify(u.name, { lower: true, strict: true, locale: "en" }) === slug
      ) || null
    );
  }, [universities, slug]);

  if (loading)
    return <div className="p-6 font-bold text-slate-400">იტვირთება...</div>;

  if (error)
    return (
      <div className="p-6 font-bold text-red-500">
        შეცდომა: {String(error)}
      </div>
    );

  if (!uni)
    return (
      <div className="p-6 font-bold text-slate-400">
        უნივერსიტეტი ვერ მოიძებნა
      </div>
    );

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black text-[#1B2559] uppercase tracking-tight">
          {uni.name}
        </h1>

        <div className="mt-6 grid gap-4">
          <div className="rounded-2xl border border-gray-100 p-5">
            <div className="text-xs font-bold text-slate-400 uppercase">ტიპი</div>
            <div className="mt-1 font-black text-[#1B2559]">
              {uni.uni_type ? "სახელმწიფო" : "კერძო"}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 p-5">
            <div className="text-xs font-bold text-slate-400 uppercase">
              ვებგვერდი
            </div>
            <a
              href={uni.website_url || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-block font-black text-brand-primary"
            >
              {uni.website_url || "არ არის მითითებული"}
            </a>
          </div>

          <div className="rounded-2xl border border-gray-100 p-5">
            <div className="text-xs font-bold text-slate-400 uppercase">
              ფაკულტეტები
            </div>

            <div className="mt-2 grid gap-2">
              {(uni.faculties || []).map((f: Faculty) => (
                <div
                  key={f.id}
                  className="rounded-xl bg-[#F4F7FE] px-4 py-3 font-bold text-[#1B2559]"
                >
                  {f.name}
                </div>
              ))}

              {(uni.faculties || []).length === 0 && (
                <div className="font-bold text-slate-400">არ არის დამატებული</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
