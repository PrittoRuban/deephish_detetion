export default function Layout({ children }) {
  return (
    <div className="antialiased bg-gray-50 text-gray-950 relative pt-20 dark:bg-gray-900 dark:text-gray-50 dark:text-opacity-90">
      {children}
    </div>
  );
}