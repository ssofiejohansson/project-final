import { Avatar } from "@material-tailwind/react"


export const Team = () => {

  return (
    <>
      <div className="flex items-center -space-x-4 justify-center mt-8">
        <a href="https://www.linkedin.com/" target="_blank">
          <Avatar
            size="xl"
            variant="circular"
            alt="Oskar image"
            className="border-2 border-white hover:z-10 focus:z-10"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1480&q=80"
          />
        </a>
        <a href="https://www.linkedin.com/in/sofia-lennbom-91252195/" target="_blank">
          <Avatar
            size="xl"
            variant="circular"
            alt="Sofia image"
            className="border-2 border-white hover:z-10 focus:z-10"
            src="../../public/sofia.webp"
          />
        </a>
        <a href="https://www.linkedin.com/in/ssofiejohansson" target="_blank">
          <Avatar
            size="xl"
            variant="circular"
            alt="Sofie image"
            className="border-2 border-white hover:z-10 focus:z-10"
            src="../../public/sofie.jpg"
          />
        </a>
      </div>
      <div className="flex justify-center mt-6 gap-4">
        <a
          href="https://www.technigo.io/courses/javascript-development-bootcamp"
          target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold text-main hover:underline"
        >
          Technigo JS Bootcamp
        </a>
        <a
          href="https://github.com/ssofiejohansson/project-final"
          target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold text-main hover:underline"
        >
          Project on GitHub
        </a>
        <a
          href="#"
          target="_blank" rel="noopener noreferrer"
          className="text-xs font-bold text-main hover:underline"
        >
          Other Links
        </a>
      </div>
    </>
  )
}