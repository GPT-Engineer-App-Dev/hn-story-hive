import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Alert variant="destructive">
          <AlertTitle>Something went wrong</AlertTitle>
          <AlertDescription>
            An unexpected error occurred. Please try refreshing the page.
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;