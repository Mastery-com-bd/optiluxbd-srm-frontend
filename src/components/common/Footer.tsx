export const Footer = () => {
  return (
    <footer className="border-t bg-muted/30 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-muted-foreground">
          <p className="text-sm">
            © 2025 OptiluxBD SRM & Inventory System. Built with React, Redux
            Toolkit Query & TypeScript.
          </p>
          <p className="text-xs mt-1">
            Developed and Maintained by{" "}
            <a
              href="https://mdrokonuzzaman.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Md Rokonuzzaman
            </a>
            <span> Full Stack Developer</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
