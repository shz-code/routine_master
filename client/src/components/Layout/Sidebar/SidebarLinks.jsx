import { ArrowDown, ArrowUp, BookText, Library } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const SidebarLink = ({ link, setSidebarOpen }) => {
  const [nestedOpen, setNestedOpen] = useState(false);

  return (
    <div className="relative">
      <Link
        className="sidebarLink hover:bg-blue-100 cursor-pointer"
        onClick={() => {
          setNestedOpen((prev) => !prev);
          if (!link.nested) setSidebarOpen(false);
          if (!link.nested) window.scrollTo(0, 0);
        }}
        to={link.nested ? "#" : link.url}
      >
        <BookText size={20} />
        {link.name}
        {link.nested ? (
          nestedOpen ? (
            <ArrowUp size={20} className="text-gray-400" />
          ) : (
            <ArrowDown size={20} className="text-gray-400" />
          )
        ) : null}
      </Link>
      {link.nested && nestedOpen && (
        <div className="border rounded shadow w-full z-10">
          {link.pages.map((l) => (
            <Link
              key={l.url}
              to={l.url}
              className="sidebarLinkNested"
              onClick={() => {
                setSidebarOpen(false);
                window.scrollTo(0, 0);
              }}
            >
              <Library size={20} />
              {l.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

const SidebarLinks = ({ setSidebarOpen }) => {
  let links = [
    {
      name: "Teachers",
      url: "teachers",
      icon: "description",
      nested: true,
      pages: [
        {
          name: "Add Teacher",
          url: "/teacher/new",
          icon: "description",
        },
        {
          name: "All Teachers",
          url: "/teacher/all",
          icon: "description",
        },
      ],
    },
    {
      name: "Semesters",
      url: "Semesters",
      icon: "description",
      nested: true,
      pages: [
        {
          name: "Add Semester",
          url: "/semester/new",
          icon: "description",
        },
        {
          name: "All Semesters",
          url: "/semester/all",
          icon: "description",
        },
      ],
    },
    {
      name: "Courses",
      url: "courses",
      icon: "description",
      nested: true,
      pages: [
        {
          name: "Add Course",
          url: "/course/new",
          icon: "description",
        },
        {
          name: "All Courses",
          url: "/course/all",
          icon: "description",
        },
      ],
    },
    {
      name: "Time Slots",
      url: "timeSlots",
      icon: "description",
      nested: true,
      pages: [
        {
          name: "Add Time slot",
          url: "/timeSlot/new",
          icon: "description",
        },
        {
          name: "All Time slots",
          url: "/timeSlot/all",
          icon: "description",
        },
      ],
    },
    {
      name: "Room Allocation",
      url: "roomAllocation",
      icon: "description",
      nested: true,
      pages: [
        {
          name: "New Allocation",
          url: "/roomAllocation/new",
          icon: "description",
        },
        {
          name: "All Records",
          url: "/roomAllocation/all",
          icon: "description",
        },
      ],
    },
    {
      name: "Generate Section",
      url: "generateRoutine",
      icon: "description",
      nested: true,
      pages: [
        {
          name: "Generate Section",
          url: "/section/new",
          icon: "description",
        },
        {
          name: "All Sections",
          url: "/section/all",
          icon: "description",
        },
        {
          name: "Assign Teacher",
          url: "/section/assign",
          icon: "description",
        },
      ],
    },
    {
      name: "Routine",
      url: "routine",
      icon: "description",
      nested: true,
      pages: [
        {
          name: "Generate Routine",
          url: "/routine/createRoutine",
          icon: "done_all",
        },
        {
          name: "Get Teacher Routine",
          url: "/routine/teacherRoutine",
          icon: "done_all",
        },
        {
          name: "Get Course Routine",
          url: "/routine/courseRoutine",
          icon: "done_all",
        },
      ],
    },
  ];

  return (
    <div className="flex-grow">
      {links.map((l) => (
        <SidebarLink key={l.url} link={l} setSidebarOpen={setSidebarOpen} />
      ))}
    </div>
  );
};

export default SidebarLinks;
