import Image from "next/image";
import { TableDropdown } from "@/components/admin/Dropdowns/TableDropdown";

type CardTableProps = {
  color?: "light" | "dark";
};

type Project = {
  name: string;
  image: string;
  budget: string;
  status: "pending" | "completed" | "delayed" | "on schedule";
  progress: number;
  progressColor: string;
  progressTrack: string;
};

const teamMembers = [
  "images/admin/team-1-800x800.jpg",
  "images/admin/team-2-800x800.jpg",
  "images/admin/team-3-800x800.jpg",
  "images/admin/team-4-470x470.png",
];

const projects: Project[] = [
  {
    name: "Argon Design System",
    image: "/images/admin/bootstrap.jpg",
    budget: "$2,500 USD",
    status: "pending",
    progress: 60,
    progressColor: "bg-orange-500",
    progressTrack: "bg-orange-100",
  },
  {
    name: "Angular Now UI Kit PRO",
    image: "/images/admin/angular.jpg",
    budget: "$1,800 USD",
    status: "completed",
    progress: 100,
    progressColor: "bg-emerald-500",
    progressTrack: "bg-emerald-100",
  },
  {
    name: "Black Dashboard Sketch",
    image: "/images/admin/sketch.jpg",
    budget: "$3,150 USD",
    status: "delayed",
    progress: 73,
    progressColor: "bg-red-500",
    progressTrack: "bg-red-100",
  },
  {
    name: "React Material Dashboard",
    image: "/images/admin/react.jpg",
    budget: "$4,400 USD",
    status: "on schedule",
    progress: 90,
    progressColor: "bg-teal-500",
    progressTrack: "bg-teal-100",
  },
  {
    name: "React Material Dashboard",
    image: "/images/admin/vue.jpg",
    budget: "$2,200 USD",
    status: "completed",
    progress: 100,
    progressColor: "bg-emerald-500",
    progressTrack: "bg-emerald-100",
  },
];

const statusStyles: Record<Project["status"], string> = {
  pending: "text-orange-500",
  completed: "text-emerald-500",
  delayed: "text-red-500",
  "on schedule": "text-teal-500",
};

export const CardTable = ({
  color = "light",
}: CardTableProps) => {
  const isLight = color === "light";

  const textColor = isLight ? "text-slate-700" : "text-white";
  const mutedText = isLight ? "text-slate-500" : "text-slate-300";

  const headerStyle = isLight
    ? "border-slate-200 bg-slate-50 text-slate-500"
    : "border-slate-700 bg-slate-800 text-slate-300";

  const cellBorder = isLight
    ? "border-slate-200"
    : "border-slate-700";

  const avatarBorder = isLight
    ? "border-white"
    : "border-slate-800";

  return (
    <div
      className={`relative mb-6 flex min-w-0 w-full flex-col break-words rounded-lg shadow-lg ${
        isLight
          ? "bg-white text-slate-700"
          : "bg-slate-900 text-white"
      }`}
    >
      {/* Header */}
      <div className="mb-0 rounded-t px-4 py-4 sm:px-6">
        <h3 className={`text-lg font-semibold ${textColor}`}>
          Card Tables
        </h3>
      </div>

      {/* Table */}
      <div className="block w-full overflow-x-auto">
        <table className="w-full border-collapse bg-transparent text-left">
          <thead>
            <tr>
              {[
                "Project",
                "Budget",
                "Status",
                "Users",
                "Completion",
                "",
              ].map((heading, index) => (
                <th
                  key={`${heading}-${index}`}
                  className={`border-y border-l-0 border-r-0 px-6 py-3 text-xs font-semibold uppercase tracking-wider whitespace-nowrap ${headerStyle}`}
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {projects.map((project, index) => (
              <tr
                key={`${project.name}-${index}`}
                className="transition-colors hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
              >
                {/* Project */}
                <th
                  scope="row"
                  className={`flex items-center gap-3 border-b border-l-0 border-r-0 px-6 py-4 text-left text-xs whitespace-nowrap ${cellBorder}`}
                >
                  <Image
                    src={project.image}
                    alt=""
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full border border-slate-200 bg-white object-cover"
                  />

                  <span className={`font-bold ${textColor}`}>
                    {project.name}
                  </span>
                </th>

                {/* Budget */}
                <td
                  className={`border-b border-l-0 border-r-0 px-6 py-4 text-xs whitespace-nowrap ${mutedText} ${cellBorder}`}
                >
                  {project.budget}
                </td>

                {/* Status */}
                <td
                  className={`border-b border-l-0 border-r-0 px-6 py-4 text-xs whitespace-nowrap ${mutedText} ${cellBorder}`}
                >
                  <span className="inline-flex items-center gap-2">
                    <span
                      className={`h-2 w-2 rounded-full ${project.progressColor}`}
                    />
                    <span className={statusStyles[project.status]}>
                      {project.status}
                    </span>
                  </span>
                </td>

                {/* Users */}
                <td
                  className={`border-b border-l-0 border-r-0 px-6 py-4 ${cellBorder}`}
                >
                  <div className="flex items-center">
                    {teamMembers.map((member, memberIndex) => (
                      <Image
                        key={member}
                        src={member}
                        alt={`Team member ${memberIndex + 1}`}
                        width={40}
                        height={40}
                        className={`relative h-10 w-10 rounded-full border-2 object-cover shadow ${
                          avatarBorder
                        } ${memberIndex > 0 ? "-ml-4" : ""}`}
                        style={{ zIndex: teamMembers.length - memberIndex }}
                      />
                    ))}
                  </div>
                </td>

                {/* Completion */}
                <td
                  className={`border-b border-l-0 border-r-0 px-6 py-4 text-xs whitespace-nowrap ${cellBorder}`}
                >
                  <div className="flex min-w-[120px] items-center gap-2">
                    <span className={`min-w-9 ${mutedText}`}>
                      {project.progress}%
                    </span>

                    <div
                      className={`h-2 w-full overflow-hidden rounded-full ${project.progressTrack}`}
                      role="progressbar"
                      aria-valuenow={project.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${project.name} completion`}
                    >
                      <div
                        className={`h-full rounded-full ${project.progressColor} transition-all duration-500`}
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td
                  className={`border-b border-l-0 border-r-0 px-6 py-4 text-right ${cellBorder}`}
                >
                  <TableDropdown />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
