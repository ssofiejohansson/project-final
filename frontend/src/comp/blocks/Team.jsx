import { Avatar } from "@material-tailwind/react";

const teamMembers = [
  {
    name: "Oskar",
    linkedin: "https://www.linkedin.com/in/oskarnordin/",
    src: "/oskar.webp",
  },
  {
    name: "Sofia",
    linkedin: "https://www.linkedin.com/in/sofia-lennbom-91252195/",
    src: "/sofia.webp",
  },
  {
    name: "Sofie",
    linkedin: "https://www.linkedin.com/in/ssofiejohansson",
    src: "/sofie.webp",
  },
];

const links = [
  {
    label: "Technigo",
    href: "https://www.technigo.io/courses/javascript-development-bootcamp",
  },
  {
    label: "GitHub",
    href: "https://github.com/ssofiejohansson/project-final",
  },

];

export const Team = () => {
  return (
    <>
      <div className="flex items-center -space-x-4 justify-center mt-8">
        {teamMembers.map((member) => (
          <a
            key={member.name}
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Avatar
              size="xl"
              variant="circular"
              alt={`${member.name} image`}
              className="border-2 border-white hover:z-10 focus:z-10"
              src={member.src}
            />
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-4">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-text hover:underline"
          >
            {link.label}
          </a>
        ))}
      </div>
    </>
  );
};
