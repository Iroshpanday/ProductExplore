// app/components/NetworkErrorHandler.tsx
"use client";

import { WifiOff, RefreshCw } from "lucide-react";

interface NetworkErrorHandlerProps {
  onRetry?: () => void;
  message?: string;
}

export default function NetworkErrorHandler({ 
  onRetry, 
  message = "Network connection failed" 
}: NetworkErrorHandlerProps) {
  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center border border-gray-200 dark:border-gray-700">
        {/* Icon */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-orange-500 dark:bg-orange-600 rounded-full blur-xl opacity-30 animate-pulse" />
          <div className="relative bg-orange-100 dark:bg-orange-900/30 rounded-full p-6">
            <WifiOff className="h-16 w-16 text-orange-600 dark:text-orange-400" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Connection Lost
        </h2>

        {/* Message */}
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {message}. Please check your internet connection and try again.
        </p>

        {/* Retry Button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            Retry Connection
          </button>
        )}

        {/* Tips */}
        <div className="mt-8 text-left bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
            Troubleshooting Tips:
          </p>
          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
            <li>• Check your Wi-Fi or mobile data connection</li>
            <li>• Try refreshing the page</li>
            <li>• Disable VPN if you&apos;re using one</li>
            <li>• Contact support if the issue persists</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// Alternative compact version for inline use
export function InlineNetworkError({ onRetry }: { onRetry?: () => void }) {
  return (
    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 flex items-start space-x-3">
      <WifiOff className="h-6 w-6 text-orange-600 dark:text-orange-400 shrink-0 mt-0.5" />
      <div className="flex-1">
        <h3 className="text-sm font-semibold text-orange-900 dark:text-orange-200 mb-1">
          Network Error
        </h3>
        <p className="text-sm text-orange-700 dark:text-orange-300 mb-3">
          Unable to fetch data. Please check your connection.
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
          >
            Try again
          </button>
        )}
      </div>
    </div>
  );
}