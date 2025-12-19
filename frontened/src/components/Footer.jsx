import { Facebook, Twitter, Instagram } from "lucide-react";

export default function ElegantFooter() {
  return (
    <footer className=" bg-gray-900 text-white py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* About + Newsletter */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8">

          {/* About */}
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-3">JobPortal</h3>
            <p className="text-gray-400 text-sm">
              Discover your dream job or hire the best talent. Stay updated with the latest opportunities.
            </p>

            {/* Social icons */}
            <div className="flex space-x-4 mt-4">
              <a href="" className="text-gray-400 hover:text-white">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="" className="text-gray-400 hover:text-white">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="" className="text-gray-400 hover:text-white">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="md:w-1/2">
            <h3 className="text-xl font-semibold mb-3">Job Alerts</h3>
            <p className="text-gray-400 text-sm mb-2">
              Subscribe to receive the latest jobs in your inbox.
            </p>
            <div className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-3 py-2 rounded-md text-gray-900 focus:outline-none mb-2 sm:mb-0 sm:mr-2"
              />
              <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
                Subscribe
              </button>
            </div>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-10 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
