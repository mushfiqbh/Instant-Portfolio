import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>

          <h3 className="text-2xl font-bold mb-4">Instant Portfolio Builder</h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            The easiest way to create professional portfolios that get you
            hired.
          </p>

          <div className="border-t border-gray-800 pt-6">
            <p className="text-gray-500 text-sm">
              © 2025 Portfolio Builder. Built with ❤️ for professionals
              everywhere.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
