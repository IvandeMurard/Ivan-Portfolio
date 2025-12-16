import { Component, ReactNode } from "react";
import { ResourceLibraryPage } from "@/components/resource-library/ResourceLibraryPage";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<{ children: ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ResourceLibrary Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F0EFEB] flex items-center justify-center p-4">
          <div className="text-center">
            <h1 className="text-2xl font-semibold mb-4 text-[#0A0A0A]">Something went wrong</h1>
            <p className="text-[#2A2A2A] mb-4">{this.state.error?.message || "An error occurred"}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#0A0A0A] text-white rounded-lg hover:bg-[#2A2A2A] transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default function ResourceLibrary() {
  return (
    <ErrorBoundary>
      <ResourceLibraryPage />
    </ErrorBoundary>
  );
}
