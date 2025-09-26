/**
 * A component that renders a "Made with Dyad" link.
 * This is used to attribute the creation of the application to Dyad.
 * @returns {JSX.Element} The rendered "Made with Dyad" link.
 */
export const MadeWithDyad = () => {
  return (
    <div className="p-4 text-center">
      <a
        href="https://www.dyad.sh/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      >
        Made with Dyad
      </a>
    </div>
  );
};
