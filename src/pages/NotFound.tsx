import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="bg-primary-gray h-full pt-48 flex-1">
      <div className=" flex flex-col items-center max-w-[400px] mx-auto">
        <img src="/not_found.svg" width={100} height={100} />
        <h2 className="text-lg font-bold mt-2">
          This content isn't available at the moment
        </h2>
        <p className="text-center">
          When this happens, it's usually because the owner only shared it with
          a small group of people, changed who can see it or it's been deleted.
        </p>
        <Link
          to="/"
          className="mt-4 rounded bg-primary-blue py-2 px-8 text-white font-semibold"
        >
          Go to News Feed
        </Link>
        <button
          onClick={() => window.history.back()}
          className="text-primary-blue font-semibold mt-2"
        >
          Go back
        </button>
      </div>
    </div>
  );
};

export default NotFound;
