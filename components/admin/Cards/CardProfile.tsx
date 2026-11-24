"use client";
import Image from "next/image";
import { useState } from "react";
import {
  MapPin,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

export const CardProfile = () => {
  const [expanded, setExpanded] = useState(false);

  const bio =
    "An artist of considerable range, Jenna, the name taken by Melbourne-raised, Brooklyn-based Nick Murphy, writes, performs and records all of his own music, giving it a warm, intimate feel with a solid groove structure. An artist of considerable range.";

  return (
    <div className="relative mb-6 mt-16 flex min-w-0 w-full flex-col break-words rounded-lg bg-white shadow-xl">
      <div className="px-6">
        {/* Profile Image */}
        <div className="flex flex-wrap justify-center">
          <div className="flex w-full justify-center px-4">
            <div className="relative">
              <Image
                src="/images/admin/team-2-800x800.jpg"
                alt="Jenna Stones"
                width={150}
                height={150}
                className="absolute -m-16 -ml-20 h-[150px] w-[150px] max-w-[150px] rounded-full border-4 border-white object-cover shadow-xl lg:-ml-16"
                priority
              />
            </div>
          </div>

          {/* Profile Stats */}
          <div className="mt-20 w-full px-4 text-center">
            <div className="flex justify-center pb-4 pt-8 lg:pt-4">
              <div className="mr-4 p-3 text-center">
                <span className="block text-xl font-bold uppercase tracking-wide text-slate-600">
                  22
                </span>
                <span className="text-sm text-slate-400">
                  Friends
                </span>
              </div>

              <div className="mr-4 p-3 text-center">
                <span className="block text-xl font-bold uppercase tracking-wide text-slate-600">
                  10
                </span>
                <span className="text-sm text-slate-400">
                  Photos
                </span>
              </div>

              <div className="p-3 text-center lg:mr-4">
                <span className="block text-xl font-bold uppercase tracking-wide text-slate-600">
                  89
                </span>
                <span className="text-sm text-slate-400">
                  Comments
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Information */}
        <div className="mt-12 text-center">
          <h3 className="mb-2 text-xl font-semibold leading-normal text-slate-700">
            Jenna Stones
          </h3>

          <div className="mb-2 mt-0 inline-flex items-center text-sm font-bold uppercase leading-normal text-slate-400">
            <MapPin className="mr-2 h-5 w-5" />
            Los Angeles, California
          </div>

          <div className="mb-2 mt-10 flex items-center justify-center text-slate-600">
            <BriefcaseBusiness className="mr-2 h-5 w-5 text-slate-400" />
            Solution Manager - Creative Tim Officer
          </div>

          <div className="mb-2 flex items-center justify-center text-slate-600">
            <GraduationCap className="mr-2 h-5 w-5 text-slate-400" />
            University of Computer Science
          </div>
        </div>

        {/* Biography */}
        <div className="mt-10 border-t border-slate-200 py-10 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full px-4 lg:w-9/12">
              <p className="mb-4 text-base leading-relaxed text-slate-700">
                {expanded
                  ? bio
                  : `${bio.slice(0, 160)}...`}
              </p>

              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="font-medium text-sky-500 transition-colors hover:text-sky-700"
                aria-expanded={expanded}
              >
                {expanded ? "Show less" : "Show more"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
